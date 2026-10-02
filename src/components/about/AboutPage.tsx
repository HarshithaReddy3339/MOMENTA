import React from 'react';
import { NavigationPage } from '../../types';
import { Sparkles, Compass, CheckCircle2, Heart, ArrowUpRight, Award, Layers } from 'lucide-react';
import { EventImage } from '../common/EventImage';

interface AboutPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 lg:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
        
        {/* Hero Section of About */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D96035]">
              Our Origins & Purpose
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261F1D] leading-[1.15] text-balance">
              We Turn Ideas Into Experiences.
            </h1>
            <p className="text-base sm:text-lg text-[#5F524C] leading-relaxed">
              MOMENTA was created to make event planning simpler, more personal and more organized. Instead of managing different vendors, budgets and requirements separately, MOMENTA brings the essential pieces together in one place.
            </p>
            <p className="text-sm sm:text-base text-[#6E615B] leading-relaxed">
              Whether you are gathering forty dear friends for an anniversary dinner under candlelight, or orchestrating a three-day celebration with hundreds of guests, the planning journey should feel as joyful and serene as the celebration itself.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('plan')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                <span>Plan Your Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-[#EDE2D8] bg-white p-2.5 shadow-xl">
              <div className="rounded-2xl overflow-hidden h-[420px]">
                <EventImage
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
                  alt="MOMENTA Founders & Event Stylists"
                  className="w-full h-full object-cover"
                  fallbackText="MOMENTA Atelier"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Three Core Values */}
        <div className="space-y-10 pt-10 border-t border-[#EAE0D6]">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D96035]">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#261F1D]">
              The Three Pillars of MOMENTA
            </h2>
            <p className="text-sm sm:text-base text-[#695B54]">
              Every event plan we synthesize and every vendor partnership we form is anchored in three values:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#EDE2D8] shadow-xs space-y-4 hover:border-[#DFC8B9] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E8] flex items-center justify-center text-[#D96035]">
                <Heart className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#261F1D]">
                Personalized
              </h3>
              <p className="text-sm text-[#61524B] leading-relaxed">
                Every event begins with your unique vision. We eschew cookie-cutter templates in favor of menus, aesthetics, and moments that reflect who you are.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#EDE2D8] shadow-xs space-y-4 hover:border-[#DFC8B9] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E8] flex items-center justify-center text-[#D96035]">
                <Layers className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#261F1D]">
                Organized
              </h3>
              <p className="text-sm text-[#61524B] leading-relaxed">
                Keep services, budgets and planning details together. With integrated timelines, real-time allocation calculators, and unified vendor coordination, nothing slips through the cracks.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#EDE2D8] shadow-xs space-y-4 hover:border-[#DFC8B9] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E8] flex items-center justify-center text-[#D96035]">
                <Sparkles className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#261F1D]">
                Thoughtful
              </h3>
              <p className="text-sm text-[#61524B] leading-relaxed">
                Every detail contributes to a memorable experience. From the acoustic balance of the dining room to the warmth of candlelight, every element is curated with purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Philosophy Section */}
        <div className="bg-[#FAF0E7] p-8 sm:p-14 rounded-3xl border border-[#E9DDD1] space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D96035]">
                The MOMENTA Philosophy
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#261F1D] leading-snug">
                Event planning should inspire calmness, not overwhelm.
              </h3>
              <p className="text-sm sm:text-base text-[#61524B] leading-relaxed">
                Traditional event planning forces hosts to juggle dozens of separate vendor WhatsApp groups, fragmented bank invoices, and uncertain timeline handoffs. MOMENTA replaces noise with quiet elegance.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm text-[#4D3F39]">
                  <CheckCircle2 className="w-4 h-4 text-[#D96035] shrink-0 mt-0.5" />
                  <span>Curated, pre-verified vendor standard across every category</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#4D3F39]">
                  <CheckCircle2 className="w-4 h-4 text-[#D96035] shrink-0 mt-0.5" />
                  <span>Honest financial benchmarks with zero hidden vendor markups</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#4D3F39]">
                  <CheckCircle2 className="w-4 h-4 text-[#D96035] shrink-0 mt-0.5" />
                  <span>On-ground lead coordinators so you remain a guest at your own event</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-44 bg-white shadow-2xs border border-[#E8DDD3]">
                  <EventImage
                    src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80"
                    alt="Floral details"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-44 bg-white shadow-2xs border border-[#E8DDD3] mt-6">
                  <EventImage
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80"
                    alt="Culinary details"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
