import React, { useState, useEffect } from 'react';
import { NavigationPage, EventPlan, Vendor } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/navigation/Sidebar';
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
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { KnowledgeBaseProvider } from './context/KnowledgeBaseContext';

function AppContent() {
  const { user, profile, loading, logout } = useAuth();
  
  // Resolve initial page from URL path if applicable
  const getInitialPage = (): NavigationPage => {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (path === 'login') return 'login';
    if (path === 'signup') return 'signup';
    if (path === 'dashboard') return 'dashboard';
    if (path === 'services') return 'services';
    if (path === 'how-it-works') return 'how-it-works';
    if (path === 'plan' || path === 'plan-your-event') return 'plan';
    if (path === 'vendors') return 'vendors';
    if (path === 'about') return 'about';
    if (path === 'contact') return 'contact';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<NavigationPage>(getInitialPage);
  const [activePlan, setActivePlan] = useState<EventPlan | null>(null);
  const [selectedVendorForEnquiry, setSelectedVendorForEnquiry] = useState<Vendor | null>(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string | null>(null);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Protected route enforcement for /dashboard
  useEffect(() => {
    if (!loading && !user && currentPage === 'dashboard') {
      handleNavigate('login');
    }
  }, [user, loading, currentPage]);

  const handleNavigate = (page: NavigationPage, message?: string) => {
    if (message) {
      setLoginSuccessMessage(message);
    } else if (page !== 'login') {
      setLoginSuccessMessage(null);
    }

    setCurrentPage(page);
    const pathMap: Record<NavigationPage, string> = {
      home: '/',
      services: '/services',
      plan: '/plan-your-event',
      'how-it-works': '/how-it-works',
      vendors: '/vendors',
      about: '/about',
      contact: '/contact',
      dashboard: '/dashboard',
      login: '/login',
      signup: '/signup',
    };
    const targetUrl = pathMap[page] || (page === 'home' ? '/' : `/${page}`);
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await logout();
    handleNavigate('login');
  };

  const handleEnquireWithPlan = (plan: EventPlan) => {
    setActivePlan(plan);
    setSelectedVendorForEnquiry(null);
    handleNavigate('contact');
  };

  const handleSelectVendorForEnquiry = (vendor: Vendor) => {
    setSelectedVendorForEnquiry(vendor);
    setActivePlan(null);
    handleNavigate('contact');
  };

  const currentUserData = user ? {
    name: profile?.name || user.displayName || user.email?.split('@')[0] || 'Member',
    email: user.email || ''
  } : null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#27211E] flex flex-col">
      {/* Vertical Navigation Sidebar attached to far left edge */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(p) => handleNavigate(p)}
        currentUser={currentUserData}
        onLogout={handleLogout}
      />

      {/* Main Content Area (positioned strictly to the right of the left sidebar) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 xl:pl-72">
        <main className="flex-1">
          {currentPage === 'home' && (
            <div>
              <HeroSection onNavigate={(p) => handleNavigate(p)} />
              <WhatMomentaDoes onNavigate={(p) => handleNavigate(p)} />
              <HowItWorksSection onNavigate={(p) => handleNavigate(p)} />
              <VendorsSection 
                onNavigate={(p) => handleNavigate(p)} 
                onSelectVendorForEnquiry={handleSelectVendorForEnquiry}
              />
              <CuratedMomentsSection onNavigate={(p) => handleNavigate(p)} />
            </div>
          )}

          {currentPage === 'services' && (
            <ServicesPage onNavigate={(p) => handleNavigate(p)} />
          )}

          {currentPage === 'how-it-works' && (
            <HowItWorksSection onNavigate={(p) => handleNavigate(p)} isStandalonePage={true} />
          )}

          {currentPage === 'plan' && (
            <PlanYourEventPage 
              onNavigate={(p) => handleNavigate(p)} 
              onEnquireWithPlan={handleEnquireWithPlan} 
            />
          )}

          {currentPage === 'vendors' && (
            <VendorsSection 
              onNavigate={(p) => handleNavigate(p)} 
              onSelectVendorForEnquiry={handleSelectVendorForEnquiry}
              isStandalonePage={true} 
            />
          )}

          {currentPage === 'about' && (
            <AboutPage onNavigate={(p) => handleNavigate(p)} />
          )}

          {currentPage === 'contact' && (
            <ContactPage 
              onNavigate={(p) => handleNavigate(p)} 
              prefillPlan={activePlan} 
              prefillVendor={selectedVendorForEnquiry} 
            />
          )}

          {/* Dedicated MOMENTA Login Page */}
          {currentPage === 'login' && (
            <LoginPage
              onNavigate={(p) => handleNavigate(p)}
              successMessage={loginSuccessMessage}
            />
          )}

          {/* Dedicated MOMENTA Sign Up Page */}
          {currentPage === 'signup' && (
            <SignUpPage
              onNavigate={(p, msg) => handleNavigate(p, msg)}
            />
          )}

          {/* Dedicated Protected MOMENTA Host Dashboard */}
          {currentPage === 'dashboard' && (
            <UserDashboard
              onNavigate={(p) => handleNavigate(p)}
            />
          )}
        </main>

        {/* Sophisticated Warm Dark Footer */}
        <Footer onNavigate={(p) => handleNavigate(p)} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <KnowledgeBaseProvider>
        <AppContent />
      </KnowledgeBaseProvider>
    </AuthProvider>
  );
}
