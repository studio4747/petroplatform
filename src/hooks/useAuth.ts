// hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import client from '@/lib/pocketbase';

export function useAuth() {
  const [user, setUser] = useState(client.authStore.model);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set initial user
    setUser(client.authStore.model);
    setIsLoading(false);

    // Subscribe to auth changes
    const removeListener = client.authStore.onChange(() => {
      setUser(client.authStore.model);
    });

    // Clean up on unmount
    return () => {
      removeListener();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await client.collection('users').authWithPassword(email, password);
    setUser(client.authStore.model);
    setIsLoading(false);
  };

  const logout = () => {
    client.authStore.clear();
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