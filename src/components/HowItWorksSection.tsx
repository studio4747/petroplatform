'use client';

import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Search, MessageSquareText } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: "ثبت‌نام تامین‌کننده یا خریدار",
    description: "برای شروع، حساب کاربری خود را به عنوان تامین‌کننده یا خریدار ایجاد کنید و به شبکه بزرگ تجاری ما بپیوندید."
  },
  {
    id: 2,
    icon: Search,
    title: "جستجو و درخواست",
    description: "محصولات پتروشیمی مورد نیاز خود را جستجو کرده، مشخصات دقیق را وارد کنید و درخواست خود را ثبت کنید."
  },
  {
    id: 3,
    icon: MessageSquareText,
    title: "ارتباط مستقیم",
    description: "با تامین‌کننده یا خریدار مستقیماً وارد مذاکره شوید و بهترین قیمت و شرایط را برای معامله خود تعیین کنید."
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-petro-light/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-industrial-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-industrial-orange rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-petro-dark mb-4">
            چگونه کار می‌کند؟
          </h2>
          <p className="text-lg text-petro-slate max-w-3xl mx-auto">
            در سه مرحله ساده به بزرگترین شبکه تجاری مواد پتروشیمی کشور بپیوندید
          </p>
        </div>
        
        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-industrial-blue to-industrial-orange opacity-30 z-0"></div>
              )}
              
              {/* Card */}
              <Card className="relative z-10 bg-white/80 backdrop-blur-sm border border-petro-light shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-industrial-blue to-industrial-orange rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {step.id}
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-4 mt-2">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-petro-light to-industrial-orange/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon 
                        size={32} 
                        className="text-industrial-blue group-hover:text-industrial-orange transition-colors duration-300" 
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-bold text-petro-dark mb-3 group-hover:text-industrial-blue transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-petro-slate text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}