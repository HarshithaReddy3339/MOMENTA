import React, { useState, useEffect } from 'react';
import { NavigationPage } from '../../types';
import { Menu, X, User, LogOut } from 'lucide-react';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onLogout
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exact 8 items in the exact required order
  const navLinks: { label: string; page: NavigationPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Plan Your Event', page: 'plan' },
    { label: 'How It Works', page: 'how-it-works' },
    { label: 'Vendors', page: 'vendors' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
    { label: 'Dashboard', page: 'dashboard' },
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
        
        {/* LEFT SECTION: Brand Logo + Navigation Links moved to the Left */}
        <div className="flex items-center space-x-6 xl:space-x-8 min-w-0">
          {/* Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="text-left group cursor-pointer focus:outline-hidden shrink-0"
            aria-label="MOMENTA Home"
          >
            <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-wider text-[#261F1D] group-hover:text-[#D96035] transition-colors block leading-tight">
              MOMENTA
            </span>
            <span className="text-[11px] sm:text-xs font-serif italic text-[#7C6A61] tracking-wide block mt-0.5">
              Moments Worth Remembering
            </span>
          </button>

          {/* Navigation Links (placed on the left side, exact order) */}
          <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-5 text-[13px] xl:text-[13.5px] font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.page)}
                  className={`relative py-1 transition-colors cursor-pointer whitespace-nowrap ${
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
        </div>

        {/* RIGHT SECTION: Auth actions (Login/Sign Up or Profile/Logout) */}
        <div className="flex items-center space-x-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLinkClick('dashboard')}
                className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-colors cursor-pointer text-xs font-medium ${
                  currentPage === 'dashboard'
                    ? 'bg-[#FDEEE7] border-[#D96035] text-[#8F3416] font-semibold'
                    : 'bg-[#FAF0E8] border-[#EDE2D8] text-[#261F1D] hover:bg-[#F5ECE5]'
                }`}
                title="Go to Dashboard"
              >
                <User className="w-3.5 h-3.5 text-[#D96035]" />
                <span className="truncate max-w-[120px]">{currentUser.name}</span>
              </button>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-[#7A6B63] hover:text-[#D96035] transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={() => handleLinkClick('login')}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  currentPage === 'login'
                    ? 'text-[#D96035] font-bold'
                    : 'text-[#4D3F39] hover:text-[#D96035]'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => handleLinkClick('signup')}
                className="px-5 py-2.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#564A45] hover:text-[#261F1D] hover:bg-[#F2E8DF] transition-colors focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#EAE0D5] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2.5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.label}
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

          {/* Mobile Auth buttons */}
          <div className="pt-3 border-t border-[#EAE0D5]">
            {currentUser ? (
              <div className="flex items-center justify-between p-2">
                <button
                  onClick={() => handleLinkClick('dashboard')}
                  className="text-xs font-medium text-[#261F1D] flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-[#D96035]" />
                  <span>Dashboard ({currentUser.name})</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="text-xs text-[#D96035] font-semibold underline"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLinkClick('login')}
                  className="flex-1 py-2.5 px-4 text-center rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#4D3F39] uppercase tracking-wider"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleLinkClick('signup')}
                  className="flex-1 py-2.5 px-4 text-center rounded-full bg-[#D96035] text-white text-xs font-semibold uppercase tracking-wider shadow-xs"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
