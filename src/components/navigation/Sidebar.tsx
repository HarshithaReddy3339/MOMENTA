import React, { useState } from 'react';
import { NavigationPage } from '../../types';
import { 
  Menu, X, User, LogOut, LayoutDashboard, Home, Sparkles, 
  Layers, Calendar, Compass, Info, Mail, LogIn, UserPlus 
} from 'lucide-react';

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onLogout
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Exact 8 items in the exact required vertical order
  const navLinks: { label: string; page: NavigationPage; icon: React.ElementType }[] = [
    { label: 'Home', page: 'home', icon: Home },
    { label: 'Services', page: 'services', icon: Layers },
    { label: 'Plan Your Event', page: 'plan', icon: Calendar },
    { label: 'How It Works', page: 'how-it-works', icon: Sparkles },
    { label: 'Vendors', page: 'vendors', icon: Compass },
    { label: 'About', page: 'about', icon: Info },
    { label: 'Contact', page: 'contact', icon: Mail },
    { label: 'Dashboard', page: 'dashboard', icon: LayoutDashboard },
  ];

  const handleLinkClick = (page: NavigationPage) => {
    onNavigate(page);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* MOBILE TOP BAR (visible on screens < lg)                      */}
      {/* ------------------------------------------------------------- */}
      <header className="lg:hidden sticky top-0 z-30 w-full h-16 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE0D5] px-6 flex items-center justify-between">
        <button
          onClick={() => handleLinkClick('home')}
          className="text-left group cursor-pointer focus:outline-hidden"
          aria-label="MOMENTA Home"
        >
          <span className="font-serif text-2xl font-bold tracking-wider text-[#261F1D] group-hover:text-[#D96035] transition-colors leading-none block">
            MOMENTA
          </span>
          <span className="text-[10px] font-serif italic text-[#7C6A61] tracking-wide block">
            Moments Worth Remembering
          </span>
        </button>

        <div className="flex items-center gap-2">
          {currentUser ? (
            <button
              onClick={() => handleLinkClick('dashboard')}
              className="p-1.5 rounded-full bg-[#FDEEE7] text-[#D96035] border border-[#F3C5AE]"
              title="Dashboard"
            >
              <User className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleLinkClick('login')}
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#D96035]"
            >
              Log In
            </button>
          )}

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg text-[#564A45] hover:text-[#261F1D] hover:bg-[#F2E8DF] transition-colors focus:outline-hidden cursor-pointer"
            aria-label="Toggle navigation sidebar"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-2xs transition-opacity"
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* VERTICAL LEFT SIDEBAR                                         */}
      {/* Fixed to the far left edge of the viewport on desktop/tablet  */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 xl:w-72 bg-[#FAF7F2] border-r border-[#EAE0D5] flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-xs ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Branding Area */}
        <div className="p-6 xl:p-8 border-b border-[#F0E6DD] shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left group cursor-pointer focus:outline-hidden"
              aria-label="MOMENTA Home"
            >
              <span className="font-serif text-2xl xl:text-3xl font-bold tracking-wider text-[#261F1D] group-hover:text-[#D96035] transition-colors block leading-tight">
                MOMENTA
              </span>
              <span className="text-[11px] xl:text-xs font-serif italic text-[#7C6A61] tracking-wide block mt-0.5">
                Moments Worth Remembering
              </span>
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#564A45] hover:text-[#261F1D] hover:bg-[#F2E8DF]"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Middle: Vertical Navigation Links List (Order 1 through 8) */}
        <div className="px-4 py-6 overflow-y-auto flex-1 space-y-1.5">
          <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#A89B95] font-semibold">
            Navigation
          </p>

          <nav className="space-y-1">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.page)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium tracking-wide transition-all duration-150 cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#FDEEE7] text-[#D96035] font-semibold border border-[#F3C5AE] shadow-2xs'
                      : 'text-[#564A45] hover:text-[#261F1D] hover:bg-[#F5ECE5]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-[#D96035]' : 'text-[#8C7B73]'
                    }`}
                  />
                  <span className="flex-1 truncate">{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D96035] shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: User Account / Authentication Panel */}
        <div className="p-4 xl:p-6 border-t border-[#F0E6DD] bg-[#FAF7F2] shrink-0 space-y-3">
          {currentUser ? (
            <div className="space-y-2">
              <button
                onClick={() => handleLinkClick('dashboard')}
                className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#F5ECE5] transition-colors cursor-pointer text-left"
              >
                <div className="w-9 h-9 rounded-full bg-[#FAF0E8] border border-[#EDE2D8] text-[#D96035] flex items-center justify-center font-serif text-sm font-bold shrink-0">
                  {currentUser.name[0]?.toUpperCase() || 'M'}
                </div>
                <div className="flex-1 truncate">
                  <span className="font-serif font-bold text-xs text-[#261F1D] block truncate">
                    {currentUser.name}
                  </span>
                  <span className="text-[11px] text-[#7A6B63] block truncate">
                    {currentUser.email}
                  </span>
                </div>
              </button>

              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#5A4D46] hover:bg-[#F2E8DE] hover:text-[#D96035] transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => handleLinkClick('login')}
                className="w-full py-2.5 px-4 rounded-full border border-[#D5C6BA] text-xs font-semibold uppercase tracking-wider text-[#4D3F39] hover:bg-[#F5ECE5] hover:text-[#D96035] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => handleLinkClick('signup')}
                className="w-full py-2.5 px-4 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          <div className="text-center pt-1">
            <span className="text-[10px] font-mono text-[#A89B95] tracking-wider uppercase block">
              MOMENTA Atelier · 2026
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
