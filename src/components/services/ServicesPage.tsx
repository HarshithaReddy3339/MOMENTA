import React, { useState } from 'react';
import { NavigationPage, ServiceItem } from '../../types';
import { SERVICES_DATA } from '../../data/mockData';
import { EventImage } from '../common/EventImage';
import { 
  Building2, Utensils, Sparkles, Camera, Music, Coins, 
  Users, Mail, Briefcase, Car, ArrowUpRight, X, Check, ArrowRight
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: NavigationPage) => void;
  onAddServiceToPlan?: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return Building2;
      case 'Utensils': return Utensils;
      case 'Sparkles': return Sparkles;
      case 'Camera': return Camera;
      case 'Music': return Music;
      case 'Coins': return Coins;
      case 'Users': return Users;
      case 'Mail': return Mail;
      case 'Briefcase': return Briefcase;
      case 'Car': return Car;
      default: return Sparkles;
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D96035]">
            Comprehensive Capabilities
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#261F1D] leading-[1.15] text-balance">
            Services Designed Around Your Event.
          </h1>
          <p className="text-base sm:text-lg text-[#61534D] leading-relaxed max-w-2xl">
            From the big picture to the smallest detail, MOMENTA helps you plan every important part of your event.
          </p>
        </div>

        {/* Services Grid: 10 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => {
            const IconComponent = getServiceIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl border border-[#EDE2D8] hover:border-[#DFC8B9] hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image slot */}
                <div className="relative h-48 w-full overflow-hidden bg-[#F6EDE5]">
                  <EventImage
                    src={service.imageUrl}
                    alt={service.name}
                    aspectRatio="16/9"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    fallbackText={service.name}
                  />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#D96035] shadow-xs">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-white drop-shadow-md bg-black/40 px-2 py-0.5 rounded-sm">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl font-semibold text-[#261F1D] group-hover:text-[#D96035] transition-colors">
                        {service.name}
                      </h3>
                      <span className="text-xs font-mono text-[#A89B95] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-sm text-[#665751] leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F5ECE5] flex items-center justify-between">
                    <span className="text-xs text-[#8F7E75]">
                      {service.startingPriceEstimate}
                    </span>
                    <button
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D96035] hover:text-[#B84920] transition-colors cursor-pointer"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Bottom CTA banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#FAF0E7] border border-[#E9DDD1] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#261F1D]">
              Need multiple services tailored to one vision?
            </h2>
            <p className="text-sm text-[#6C5D57] leading-relaxed">
              Use our interactive planner to specify your guest count and budget. MOMENTA automatically allocates your requirements and matches premier service providers.
            </p>
          </div>
          <button
            onClick={() => onNavigate('plan')}
            className="shrink-0 px-8 py-4 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white font-medium text-sm tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Plan Your Event</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#EAE0D6] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#564A45] hover:text-[#261F1D] border border-[#E8DDD3] shadow-2xs transition-colors cursor-pointer"
              aria-label="Close service modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#D96035]">
                  {selectedService.category} · Service Deep Dive
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#261F1D] mt-1">
                  {selectedService.name}
                </h3>
              </div>

              <div className="rounded-xl overflow-hidden h-52 bg-[#F6EDE5]">
                <EventImage
                  src={selectedService.imageUrl}
                  alt={selectedService.name}
                  aspectRatio="16/9"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm sm:text-base text-[#564A45] leading-relaxed">
                {selectedService.fullDescription}
              </p>

              <div className="bg-white p-5 rounded-2xl border border-[#EDE2D8] space-y-3">
                <h4 className="text-xs uppercase font-semibold tracking-wider text-[#261F1D]">
                  What MOMENTA Delivers
                </h4>
                <ul className="space-y-2">
                  {selectedService.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#61524B]">
                      <Check className="w-4 h-4 text-[#D96035] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EAE0D6]">
                <div>
                  <span className="text-xs text-[#8F7E75]">Coordination Benchmark</span>
                  <p className="text-base font-serif font-bold text-[#261F1D]">
                    {selectedService.startingPriceEstimate}
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onNavigate('plan');
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Include in Event Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
