import React from 'react';
import { NavigationPage } from '../../types';
import { Building2, Utensils, Sparkles, Camera, Coins, Users, ArrowRight } from 'lucide-react';

interface WhatMomentaDoesProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectServiceCategory?: (categoryName: string) => void;
}

export const WhatMomentaDoes: React.FC<WhatMomentaDoesProps> = ({ onNavigate }) => {
  const coreFeatures = [
    {
      title: 'Venue',
      description: 'Find the right space for your event, based on your occasion, guest count and budget.',
      icon: Building2,
      actionTag: 'Explore Venues'
    },
    {
      title: 'Food & Catering',
      description: 'Explore catering options and create menus that match your preferences and budget.',
      icon: Utensils,
      actionTag: 'Curate Menus'
    },
    {
      title: 'Decoration',
      description: 'Choose themes, colors, flowers, lighting and décor that bring your vision to life.',
      icon: Sparkles,
      actionTag: 'View Aesthetics'
    },
    {
      title: 'Photography & Entertainment',
      description: 'Plan photography, music, DJs, performers and other entertainment requirements.',
      icon: Camera,
      actionTag: 'Discover Artists'
    },
    {
      title: 'Budget Planning',
      description: 'Set your budget and receive an estimated allocation across different event requirements.',
      icon: Coins,
      actionTag: 'Calculate Allocations'
    },
    {
      title: 'Vendor Coordination',
      description: 'Bring multiple event service providers together through one convenient platform.',
      icon: Users,
      actionTag: 'Seamless Execution'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#EFE5DB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D96035]">
            Unified Event Management
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#261F1D] text-balance">
            Everything Your Event Needs, In One Place.
          </h2>
          <p className="text-base text-[#675953] leading-relaxed">
            Tell us what you envision. We'll help turn it into a thoughtfully planned experience.
          </p>
        </div>

        {/* 6 Elegant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative bg-[#FFFFFF] rounded-2xl p-8 border border-[#EDE2D8] hover:border-[#DFC8B9] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF0E8] group-hover:bg-[#FDEEE7] flex items-center justify-center text-[#D96035] transition-colors mb-6">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>

                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="font-serif text-2xl font-semibold text-[#261F1D] group-hover:text-[#D96035] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[12px] font-mono text-[#B8AAA2] tabular-nums">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-sm text-[#665751] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F5ECE5] flex items-center justify-between text-xs font-medium text-[#7D6E66]">
                  <span className="group-hover:text-[#D96035] transition-colors">
                    {item.actionTag}
                  </span>
                  <button
                    onClick={() => onNavigate('services')}
                    className="p-1 rounded-full text-[#B8AAA2] group-hover:text-[#D96035] group-hover:translate-x-1 transition-all cursor-pointer"
                    aria-label={`Learn more about ${item.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Kicker */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#F6ECE4] border border-[#E9DDD1] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-xl font-semibold text-[#261F1D]">
              Ready to assemble your event pieces?
            </h4>
            <p className="text-xs sm:text-sm text-[#6C5D57]">
              Answer a few questions and receive an itemized event blueprint with budget breakdowns.
            </p>
          </div>
          <button
            onClick={() => onNavigate('plan')}
            className="shrink-0 px-6 py-3 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-xs"
          >
            Start Personalizing
          </button>
        </div>
      </div>
    </section>
  );
};
