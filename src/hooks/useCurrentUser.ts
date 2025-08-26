//hooks/useCurrentUser.ts
"use client";

import { useEffect, useState } from "react";
import pb from "@/lib/pocketbase";

export function useCurrentUser() {
  const [user, setUser] = useState(pb.authStore.model);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ابتدا کوکی auth پکت‌بیس را از document.cookie جدا می‌کنیم
    const cookies = document.cookie.split(";").map(c => c.trim());
    const pbAuthCookie = cookies.find(c => c.startsWith("pb_auth="));

    if (pbAuthCookie) {
      // اگر کوکی هست، loadFromCookie را بزن
      pb.authStore.loadFromCookie(pbAuthCookie);
      setUser(pb.authStore.model);
    } else {
      setUser(null);
    }

    setLoading(false);

    const unsubscribe = pb.authStore.onChange(() => {
      setUser(pb.authStore.model);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}

