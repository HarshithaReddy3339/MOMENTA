import React, { useState } from 'react';
import { NavigationPage, EventPlan, Vendor } from './types';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { HeroSection } from './components/home/HeroSection';
import { WhatMomentaDoes } from './components/home/WhatMomentaDoes';
import { HowItWorksSection } from './components/home/HowItWorksSection';
import { CuratedMomentsSection } from './components/home/CuratedMomentsSection';
import { ServicesPage } from './components/services/ServicesPage';
import { PlanYourEventPage } from './components/plan/PlanYourEventPage';
import { VendorsSection } from './components/vendors/VendorsSection';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [activePlan, setActivePlan] = useState<EventPlan | null>(null);
  const [selectedVendorForEnquiry, setSelectedVendorForEnquiry] = useState<Vendor | null>(null);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquireWithPlan = (plan: EventPlan) => {
    setActivePlan(plan);
    setSelectedVendorForEnquiry(null);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVendorForEnquiry = (vendor: Vendor) => {
    setSelectedVendorForEnquiry(vendor);
    setActivePlan(null);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#27211E]">
      {/* Sticky Elegant Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div>
            <HeroSection onNavigate={handleNavigate} />
            <WhatMomentaDoes onNavigate={handleNavigate} />
            <HowItWorksSection onNavigate={handleNavigate} />
            <VendorsSection 
              onNavigate={handleNavigate} 
              onSelectVendorForEnquiry={handleSelectVendorForEnquiry}
            />
            <CuratedMomentsSection onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === 'services' && (
          <ServicesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorksSection onNavigate={handleNavigate} isStandalonePage={true} />
        )}

        {currentPage === 'plan' && (
          <PlanYourEventPage 
            onNavigate={handleNavigate} 
            onEnquireWithPlan={handleEnquireWithPlan} 
          />
        )}

        {currentPage === 'vendors' && (
          <VendorsSection 
            onNavigate={handleNavigate} 
            onSelectVendorForEnquiry={handleSelectVendorForEnquiry}
            isStandalonePage={true} 
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage 
            onNavigate={handleNavigate} 
            prefillPlan={activePlan} 
            prefillVendor={selectedVendorForEnquiry} 
          />
        )}
      </main>

      {/* Sophisticated Warm Dark Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
