import React from 'react';
import { NavigationPage } from '../../types';
import { EventImage } from '../common/EventImage';
import { Star, ArrowUpRight, Quote } from 'lucide-react';

interface CuratedMomentsSectionProps {
  onNavigate: (page: NavigationPage) => void;
}

export const CuratedMomentsSection: React.FC<CuratedMomentsSectionProps> = ({ onNavigate }) => {
  const stories = [
    {
      couple: 'Radhika & Siddharth',
      type: 'Bespoke Courtyard Wedding',
      location: 'The Tamara Courtyard, Hyderabad',
      guests: '240 Guests',
      quote: 'MOMENTA took our dream of an intimate, candlelit celebration and orchestrated every single vendor without a moment of stress. Our guests still talk about the floral arches and Nizami tasting menu.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    },
    {
      couple: 'Dev & Meera',
      type: '25th Anniversary Dinner',
      location: 'Sylvan Glasshouse, Gandipet',
      guests: '80 Guests',
      quote: 'Having the budget, string quartet, and sommelier managed under one single MOMENTA coordinator was pure serenity. Everything flowed with natural grace.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7EFE9] border-t border-[#EAE0D6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D96035]">
            Celebrated Experiences
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#261F1D] text-balance">
            Real Moments, Flawlessly Coordinated.
          </h2>
          <p className="text-base text-[#6E615B] leading-relaxed">
            See how MOMENTA brings hosts, families, and master artisans together for celebrations that endure.
          </p>
        </div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {stories.map((story, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-[#EDE2D8] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 h-64 sm:h-auto relative bg-[#F5ECE5]">
                <EventImage
                  src={story.image}
                  alt={story.couple}
                  aspectRatio="auto"
                  className="w-full h-full object-cover"
                  fallbackText={story.couple}
                />
              </div>

              <div className="sm:w-3/5 p-7 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#D96035]">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#D96035]" />
                    ))}
                  </div>

                  <p className="text-sm text-[#544640] italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2EAE2]">
                  <p className="font-serif text-lg font-bold text-[#261F1D]">
                    {story.couple}
                  </p>
                  <p className="text-xs text-[#7F7068] mt-0.5">
                    {story.type} · {story.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('plan')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer shadow-xs"
          >
            <span>Start Your Personalized Plan</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
