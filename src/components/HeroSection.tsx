'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {


  return (
    <section className="relative h-[80vh] flex flex-col overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/31/khLPhykbRGiQmBGR4V6K__DSC1730.jpg?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjaWxpdHklMjBwZXRyb2NoZW1pY2FsJTIwcGxhbnQlMjBjaGVtaWNhbCUyMHRvd2VycyUyMGluZHVzdHJpYWwlMjBwaXBlc3xlbnwwfDB8fGJsdWV8MTc1NDU4NzkyOHww&ixlib=rb-4.1.0&q=85')`
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Hero Content - Centered */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              بازار آنلاین مواد پتروشیمی
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              اتصال مستقیم خریداران و تامین‌کنندگان در بزرگترین پلتفرم تجاری مواد پتروشیمی کشور با ارائه خدمات فوق‌العاده و فرآیند آسان معاملات
            </p>
          </div>
        </div>
        
        {/* Tabs Section - Bottom of Hero */}
 
      </div>
    </section>
  );
}