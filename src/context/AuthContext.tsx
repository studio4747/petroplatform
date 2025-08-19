// context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import pb from '@/lib/pocketbase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      if (pb.authStore.isValid && pb.authStore.token) {
        try {
          // Refresh auth if token exists
          await pb.collection('users').authRefresh();
          setUser(pb.authStore.model);
        } catch (err) {
          pb.authStore.clear();
          setUser(null);
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      setUser(authData.record);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);