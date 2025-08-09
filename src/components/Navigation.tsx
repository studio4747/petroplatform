'use client';

import { Button } from "@/components/ui/button";
import { Phone, User } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-industrial-orange rounded transform rotate-45"></div>
              </div>
              <span className="text-white font-bold text-2xl">پتروشیمی ایران</span>
            </Link>
          </div>
          
          {/* Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            <Link href="/" className="text-white hover:text-white/80 transition-colors duration-200 font-medium text-lg">
              خانه
            </Link>
            <Link href="/demos" className="text-white hover:text-white/80 transition-colors duration-200 font-medium text-lg">
              نمونه‌ها
            </Link>
            <Link href="/products" className="text-white hover:text-white/80 transition-colors duration-200 font-medium text-lg">
              محصولات
            </Link>
            <Link href="/companies" className="text-white hover:text-white/80 transition-colors duration-200 font-medium text-lg">
              شرکت‌ها
            </Link>
            <Link href="/pages" className="text-white hover:text-white/80 transition-colors duration-200 font-medium text-lg">
              صفحات
            </Link>
            <Link href="/elements" className="text-white hover:text-white/80 transition-colors duration-200 font-medium text-lg">
              عناصر
            </Link>
            <Link href="/search" className="text-white hover:text-white/80 transition-colors duration-200 font-medium text-lg">
              جستجو
            </Link>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {/* Phone */}
            <div className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse text-white">
              <span className="text-lg font-medium">021-1234-5678</span>
              <Phone size={18} />
            </div>
            
            {/* User Account */}
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-10 h-10">
              <User size={22} />
            </Button>
            
            {/* Add Listing Button */}
            <Button 
              asChild
              className="bg-industrial-orange hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              <Link href="/add-listing">
                افزودن آگهی
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}