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
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const msg = await res.text();
      console.error("Login failed:", res.status, msg);
      setIsLoading(false);
      throw new Error("Login failed");
    }

    // ✅ We no longer set `client.authStore.model` manually
    // Just refresh the state from the cookie
    await client.authStore.loadFromCookie(document.cookie);
    setUser(client.authStore.model);
    setIsLoading(false);
  };

 const logout = async () => {
  await fetch("/api/logout", { method: "POST" }); // Clear cookie server side
  client.authStore.clear(); // Clear client-side auth
  setUser(null);
};

  return {
    user,
    isLoading,
    isAuthenticated: client.authStore.isValid,
    login,
    logout
  };
}