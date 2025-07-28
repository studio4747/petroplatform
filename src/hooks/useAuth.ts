// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import client from '@/lib/pocketbase';

export function useAuth() {
  const [user, setUser] = useState(client.authStore.model);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(client.authStore.model);
    setIsLoading(false);

    client.authStore.onChange(() => {
      setUser(client.authStore.model);
    });
  }, []);

  return {
    user,
    isLoading,
    login: async (email: string, password: string) => {
      await client.collection('users').authWithPassword(email, password);
      setUser(client.authStore.model);
    },
    logout: () => {
      client.authStore.clear();
      setUser(null);
    }
  };
}