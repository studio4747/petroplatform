'use client';

import { useState, useEffect } from 'react';
import client from '@/lib/pocketbase';

interface UserModel {
  id: string;
  email?: string;
  [key: string]: any;
}

export function useAuth() {
  const [user, setUser] = useState<UserModel | null>(client.authStore.model);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(client.authStore.model);
    setIsLoading(false);

    const removeListener = client.authStore.onChange(() => {
      setUser(client.authStore.model);
    });

    return () => {
      removeListener();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",  // اضافه کردن این خط بسیار مهم است
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const msg = await res.text();
      console.error("Login failed:", res.status, msg);
      setIsLoading(false);
      throw new Error("Login failed");
    }

    // پس از لاگین کوکی‌های httpOnly به صورت خودکار بارگذاری می‌شوند
    // اما بهتر است ما صریحا کوکی‌ها را بارگذاری کنیم
    await client.authStore.loadFromCookie(document.cookie);
    setUser(client.authStore.model);
    setIsLoading(false);
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" }); // اگر api/logout داری، کوکی را پاک کن
    client.authStore.clear(); // پاک کردن authStore کلاینت
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: client.authStore.isValid,
    login,
    logout,
  };
}
