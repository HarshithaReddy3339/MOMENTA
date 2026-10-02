import React, { useState, useEffect } from 'react';
import { NavigationPage } from '../../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: NavigationPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'How It Works', page: 'how-it-works' },
    { label: 'Vendors', page: 'vendors' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleLinkClick = (page: NavigationPage) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#EAE0D5]'
          : 'bg-[#FAF7F2] border-b border-[#F0E6DC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left group cursor-pointer focus:outline-hidden"
          aria-label="MOMENTA Home"
        >
          <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-wider text-[#261F1D] group-hover:text-[#D96035] transition-colors">
            MOMENTA
          </span>
          <span className="hidden sm:block text-[10px] tracking-[0.25em] uppercase text-[#8A7970] font-sans font-medium -mt-1">
            Moments Worth Remembering
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-[14px] font-medium tracking-wide">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#D96035] font-semibold'
                    : 'text-[#564A45] hover:text-[#261F1D]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D96035] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleLinkClick('plan')}
            className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xs ${
              currentPage === 'plan'
                ? 'bg-[#8F3416] text-white shadow-sm'
                : 'bg-[#D96035] text-white hover:bg-[#C94E25] hover:shadow-sm'
            }`}
          >
            <span>Plan Your Event</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#564A45] hover:text-[#261F1D] hover:bg-[#F2E8DF] transition-colors focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EAE0D5] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleLinkClick(link.page)}
                  className={`text-left text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#FDEEE7] text-[#D96035] font-semibold'
                      : 'text-[#564A45] hover:bg-[#F5ECE4]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-[#EAE0D5]">
            <button
              onClick={() => handleLinkClick('plan')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#D96035] text-white font-medium text-sm tracking-wide shadow-sm"
            >
              <span>Plan Your Event</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
