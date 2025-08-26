'use client';

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SearchFormSection from "@/components/SearchFormSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProductCategories from "@/components/ProductCategories";
import WhyIranPetro from "@/components/WhyIranPetro";
import RecentProducts from "@/components/RecentProducts";
import CompaniesSection from "@/components/CompaniesSection";

export default function PetroHomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SearchFormSection />
      <HowItWorksSection />
      <ProductCategories />
      <WhyIranPetro />
      <RecentProducts />
      <CompaniesSection />
    </main>
  );
}