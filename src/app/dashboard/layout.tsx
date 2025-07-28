import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-100 p-4 border-r text-right">
        <h2 className="text-xl font-semibold mb-6">پنل مدیریت</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block hover:underline">داشبورد</Link>
          <Link href="/dashboard/companies" className="block hover:underline">شرکت‌ها</Link>
          <Link href="/dashboard/messages" className="block hover:underline">پیام‌ها</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}