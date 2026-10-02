import React from 'react';
import { NavigationPage } from '../../types';
import { ArrowUpRight, ArrowRight, Sparkles, Calendar, MapPin, ShieldCheck } from 'lucide-react';
import { EventImage } from '../common/EventImage';

interface HeroSectionProps {
  onNavigate: (page: NavigationPage) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-16 lg:pb-28">
      {/* Subtle warm ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FDEEE7]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#F7DDD0]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Copy, Actions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Elegant Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#D96035]">
              <Sparkles className="w-3.5 h-3.5 text-[#D96035]" />
              <span>Personalized Event Orchestration</span>
            </div>

            {/* Display Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261F1D] leading-[1.12] tracking-tight text-balance">
              Your Vision.<br />
              Our Planning.<br />
              <span className="italic font-normal text-[#C94E25]">Moments Worth Remembering.</span>
            </h1>

            {/* Sub-description */}
            <p className="text-base sm:text-lg text-[#5F524C] leading-relaxed max-w-xl">
              From your first idea to the final detail, MOMENTA brings everything together to create an event that feels uniquely yours.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('plan')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white font-medium text-sm tracking-wide shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <span>Plan Your Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F5ECE5] hover:bg-[#EDE1D7] text-[#3D322E] font-medium text-sm tracking-wide transition-colors cursor-pointer border border-[#E8DDD3]"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#7A6B63]" />
              </button>
            </div>

            {/* Claim to Proof Adjacency: Clean unboxed metadata */}
            <div className="pt-6 border-t border-[#EAE0D6] flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-[#6F6058]">
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#261F1D] tabular-nums mr-1.5">
                  450+
                </span>
                <span className="tracking-wide">Curated Celebrations</span>
              </div>
              <span className="text-[#C8B8AE]" aria-hidden="true">·</span>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#261F1D] tabular-nums mr-1.5">
                  98.4%
                </span>
                <span className="tracking-wide">Seamless Coordination</span>
              </div>
              <span className="text-[#C8B8AE]" aria-hidden="true">·</span>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#261F1D] tabular-nums mr-1.5">
                  60+
                </span>
                <span className="tracking-wide">Premier Vetted Vendors</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#EAE0D6] bg-white p-2">
              <div className="rounded-xl overflow-hidden relative">
                <EventImage
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                  alt="MOMENTA Luxury Event Gathering"
                  aspectRatio="4/3"
                  className="w-full h-full object-cover"
                  fallbackText="MOMENTA Curated Evening Banquet"
                />
                
                {/* Subtle warm gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#261F1D]/80 via-transparent to-transparent" />
                
                {/* Floating caption card inside the image frame */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-[#F2E8E0] shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-sm font-semibold text-[#261F1D]">
                        The Tamara Courtyard Gala
                      </p>
                      <p className="text-[12px] text-[#786962] flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#D96035]" />
                        <span>Jubilee Hills · 220 Guests</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] uppercase tracking-wider text-[#A24322] font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D96035]" />
                        <span>Verified MOMENTA Plan</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative subtle corner element */}
            <div className="absolute -bottom-6 -left-6 bg-[#FAF7F2] p-4 rounded-xl border border-[#EAE0D6] shadow-sm hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FDEEE7] flex items-center justify-center text-[#D96035]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#261F1D]">Instant Custom Plans</p>
                <p className="text-[11px] text-[#7A6B63]">Built in under 2 minutes</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
