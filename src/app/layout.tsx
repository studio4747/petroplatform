import type { Metadata } from "next";
import "@/app/globals.css";
import "@fontsource/vazirmatn"; // Load the font

export const metadata: Metadata = {
    title: " شیمی ایران",
  description: "سامانه‌ی آنلاین خرید و فروش محصولات پتروشیمی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazir antialiased bg-gray-50 text-gray-800">
        {children}
      </body>
    </html>
  );
}