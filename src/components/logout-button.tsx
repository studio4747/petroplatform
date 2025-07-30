'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <Button variant="outline" className="w-full text-right mt-4" onClick={handleLogout}>
      خروج
    </Button>
  );
}