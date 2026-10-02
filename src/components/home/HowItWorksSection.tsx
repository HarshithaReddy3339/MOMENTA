import React from 'react';
import { NavigationPage } from '../../types';
import { FileText, SlidersHorizontal, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onNavigate: (page: NavigationPage) => void;
  isStandalonePage?: boolean;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onNavigate,
  isStandalonePage = false
}) => {
  const steps = [
    {
      step: '01',
      title: 'Share Your Vision',
      description: 'Tell MOMENTA about your event, preferences, guest count and budget.',
      icon: FileText,
      detail: 'Specify your event type, intended date range, city or destination, and guest scale.'
    },
    {
      step: '02',
      title: 'Personalize',
      description: 'Choose your preferred venue, food, decoration, entertainment and other requirements.',
      icon: SlidersHorizontal,
      detail: 'Select your culinary style, floral color palettes, acoustic tastes, and special guest requirements.'
    },
    {
      step: '03',
      title: 'Build Your Plan',
      description: 'MOMENTA creates a customized event plan with estimated costs and recommended services.',
      icon: Sparkles,
      detail: 'Our algorithm instantly maps category allocations, itemized timelines, and matching vetted vendors.'
    },
    {
      step: '04',
      title: 'Bring It To Life',
      description: 'Coordinate with selected vendors and manage the event through one platform.',
      icon: CheckCircle2,
      detail: 'Consolidated communications, run-sheets, payment tracking, and on-ground coordination.'
    }
  ];

  return (
    <section
      className={`py-20 lg:py-28 ${
        isStandalonePage ? 'bg-[#FAF7F2]' : 'bg-[#F7EFE9] border-t border-[#EAE0D6]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 lg:mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D96035]">
            The Journey
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#261F1D] text-balance">
            How MOMENTA Works
          </h2>
          <p className="text-base text-[#675953] leading-relaxed">
            From initial conception to celebration day, our four-stage architecture ensures total clarity and effortless execution.
          </p>
        </div>

        {/* Timeline Desktop: Horizontal with connector line */}
        <div className="hidden lg:grid grid-cols-4 gap-8 relative">
          {/* Subtle horizontal connecting line */}
          <div
            className="absolute top-16 left-12 right-12 h-[2px] bg-[#E3D6C9] -z-0"
            aria-hidden="true"
          />

          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative z-10 flex flex-col group bg-white/70 backdrop-blur-xs p-6 rounded-2xl border border-[#EDE2D8] hover:border-[#DFC8B9] hover:bg-white hover:shadow-md transition-all duration-300"
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8DDD3] flex items-center justify-center text-[#D96035] group-hover:bg-[#D96035] group-hover:text-white transition-colors duration-300 shadow-2xs">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#C8B8AE] group-hover:text-[#D96035] transition-colors tabular-nums">
                    {s.step}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#261F1D] mb-2.5">
                  {s.title}
                </h3>
                <p className="text-sm font-medium text-[#4D3F39] leading-snug mb-3">
                  {s.description}
                </p>
                <p className="text-xs text-[#7F7068] leading-relaxed mt-auto pt-3 border-t border-[#F2E8DF]">
                  {s.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Timeline Mobile / Tablet: Vertical */}
        <div className="lg:hidden space-y-6 relative">
          <div
            className="absolute top-6 bottom-6 left-6 w-[2px] bg-[#E3D6C9] -z-0"
            aria-hidden="true"
          />

          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative z-10 flex gap-5 bg-white p-6 rounded-2xl border border-[#EDE2D8] shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF0E8] border border-[#E8DDD3] flex items-center justify-center text-[#D96035] shrink-0 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-[#D96035]">
                      PHASE {s.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#261F1D]">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[#4D3F39] leading-relaxed">
                    {s.description}
                  </p>
                  <p className="text-xs text-[#7F7068] pt-1">
                    {s.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onNavigate('plan')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white font-medium text-sm tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span>Begin Step 01: Share Your Vision</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
