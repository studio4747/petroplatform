'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import pb from '@/lib/pocketbase';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth(); // isAuthenticated === authStore.isValid
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ✅ Redirect if already logged in
  useEffect(() => {
  if (typeof window !== 'undefined') {
    const isLoggedIn = pb.authStore.isValid;
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }
}, []);

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-6 py-6">
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button className="w-full" onClick={handleLogin}>
            Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}