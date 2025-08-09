'use client';

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SearchFormSection from "@/components/SearchFormSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import RecentProducts from "@/components/RecentProducts";

export default function PetroHomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SearchFormSection />
      <HowItWorksSection />
      <RecentProducts />
    </main>
  );
}