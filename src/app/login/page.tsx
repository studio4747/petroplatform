'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('ورود ناموفق بود. لطفاً اطلاعات خود را بررسی کنید.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-6 py-6">
          <h1 className="text-2xl font-semibold text-center">ورود</h1>
          <div className="space-y-2 text-right">
            <Input
              type="email"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="rtl"
            />
            <Input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="rtl"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? 'در حال ورود...' : 'ورود به حساب'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
