// app/layout.tsx
import type { Metadata } from "next";
import "@/app/globals.css";
import "@fontsource/vazirmatn";

export const metadata: Metadata = {
  title: "شیمی ایران",
  description: "سامانه‌ی آنلاین خرید و فروش محصولات پتروشیمی",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazir antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}