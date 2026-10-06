import React, { useEffect } from 'react';
import { NavigationPage } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { LoginSecuritySection } from './LoginSecuritySection';
import { Calendar, User, Mail, Phone, Clock, ArrowRight, LogOut, Sparkles } from 'lucide-react';

interface UserDashboardProps {
  onNavigate: (page: NavigationPage) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onNavigate }) => {
  const { user, profile, loading, logout } = useAuth();

  // Redirect to /login if unauthenticated after loading finishes
  useEffect(() => {
    if (!loading && !user) {
      onNavigate('login');
    }
  }, [user, loading, onNavigate]);

  if (loading || !user) {
    return (
      <div className="py-24 min-h-[70vh] flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#D96035] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-sm text-[#7A6B63]">Loading your MOMENTA dashboard...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    onNavigate('login');
  };

  return (
    <div className="py-12 lg:py-20 bg-[#FAF7F2] min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-10">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#EAE0D6]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D96035]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Host Dashboard · Firebase UID: {user.uid.slice(0, 8)}...</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#261F1D] font-bold mt-1">
              Welcome, {profile?.name || user.displayName || 'Celebration Host'}
            </h1>
            <p className="text-xs sm:text-sm text-[#6E615B] mt-1">
              Manage your event plans, credentials, and coordinating concierge.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('plan')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              <span>Plan An Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#5A4D46] hover:bg-[#F2E8DE] transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Profile Card & Account Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-[#EDE2D8] p-6 shadow-xs space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A89B95] block">
              Profile Overview
            </span>
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#FAF0E8] border border-[#EDE2D8] flex items-center justify-center text-[#D96035] font-serif text-xl font-bold">
                {profile?.profilePhoto ? (
                  <img src={profile.profilePhoto} alt={profile.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  (profile?.name || user.displayName || 'M')[0].toUpperCase()
                )}
              </div>
              <div className="truncate">
                <h3 className="font-serif font-bold text-lg text-[#261F1D] truncate">
                  {profile?.name || user.displayName || 'MOMENTA Member'}
                </h3>
                <p className="text-xs text-[#7A6B63] truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F5ECE5] space-y-2 text-xs text-[#6E615B]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A89B95]" />
                <span className="truncate">{user.email}</span>
              </div>
              {profile?.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#A89B95]" />
                  <span>{profile.phoneNumber}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#A89B95]" />
                <span>
                  Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '2026'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#EDE2D8] p-6 shadow-xs space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A89B95] block">
              Event Planning
            </span>
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-[#261F1D]">
                Custom Event Blueprint
              </h3>
              <p className="text-xs text-[#6E615B] leading-relaxed">
                Use our multi-step planner to tailor guest counts, catering styles, floral themes, and budget allocations.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('plan')}
                className="w-full py-2.5 rounded-full border border-[#D96035] text-[#D96035] hover:bg-[#FDEEE7] text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Launch Planner
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#EDE2D8] p-6 shadow-xs space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A89B95] block">
              Vendor Shortlists
            </span>
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-[#261F1D]">
                Curated Artisan Network
              </h3>
              <p className="text-xs text-[#6E615B] leading-relaxed">
                Explore vetted venues, Michelin-calibre caterers, floral decorators, and live musical ensembles.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('vendors')}
                className="w-full py-2.5 rounded-full border border-[#D5C6BA] text-[#544640] hover:bg-[#FAF7F2] text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Browse Vendors
              </button>
            </div>
          </div>
        </div>

        {/* Section 6: Login & Security Section */}
        <LoginSecuritySection />

      </div>
    </div>
  );
};
