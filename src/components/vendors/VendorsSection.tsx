import React, { useState } from 'react';
import { NavigationPage, Vendor } from '../../types';
import { VENDORS_DATA } from '../../data/mockData';
import { EventImage } from '../common/EventImage';
import { Star, MapPin, ArrowRight, X, Check, ShieldCheck, Mail } from 'lucide-react';

interface VendorsSectionProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectVendorForEnquiry?: (vendor: Vendor) => void;
  isStandalonePage?: boolean;
}

export const VendorsSection: React.FC<VendorsSectionProps> = ({
  onNavigate,
  onSelectVendorForEnquiry,
  isStandalonePage = false
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const categories = [
    'All',
    'Venues',
    'Caterers',
    'Decorators',
    'Photographers',
    'DJs & Entertainment',
    'Florists',
    'Event Staff'
  ];

  const filteredVendors = activeCategory === 'All'
    ? VENDORS_DATA
    : VENDORS_DATA.filter((v) => v.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const handleEnquireWithVendor = (vendor: Vendor) => {
    if (onSelectVendorForEnquiry) {
      onSelectVendorForEnquiry(vendor);
    }
    setSelectedVendor(null);
    onNavigate('contact');
  };

  return (
    <section className={`py-16 lg:py-24 ${isStandalonePage ? 'bg-[#FAF7F2]' : 'bg-[#FAF7F2] border-t border-[#EAE0D6]'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D96035]">
            Curated Artisans & Partners
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#261F1D] text-balance">
            The Right People Behind Your Perfect Event.
          </h2>
          <p className="text-base text-[#6E615B] leading-relaxed">
            Every vendor in the MOMENTA network is vetted for artistic consistency, reliability, and exceptional guest hospitality.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#261F1D] text-white shadow-xs'
                    : 'bg-[#F2E8DE] text-[#5C4F48] hover:bg-[#E8DCD1]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="group bg-white rounded-2xl border border-[#EDE2D8] overflow-hidden hover:border-[#DFC8B9] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Vendor Image */}
                <div className="h-52 w-full relative bg-[#F7EFE9] overflow-hidden">
                  <EventImage
                    src={vendor.imageUrl}
                    alt={vendor.name}
                    aspectRatio="16/9"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    fallbackText={vendor.name}
                  />
                  
                  {/* Category Chip */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-mono uppercase text-[#261F1D]">
                    {vendor.category}
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-semibold text-[#261F1D] flex items-center gap-1 shadow-2xs">
                    <Star className="w-3 h-3 text-[#D96035] fill-[#D96035]" />
                    <span className="tabular-nums">{vendor.rating}</span>
                    <span className="text-[10px] text-[#8C7B73] font-normal">({vendor.reviewCount})</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-[#261F1D] group-hover:text-[#D96035] transition-colors">
                    {vendor.name}
                  </h3>

                  <p className="text-xs text-[#7A6B63] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D96035]" />
                    <span>{vendor.location}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-[#61524B] line-clamp-2 leading-relaxed">
                    {vendor.description}
                  </p>

                  {/* Specialties preview */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {vendor.specialties.slice(0, 2).map((s, i) => (
                      <span key={i} className="text-[11px] text-[#786962] bg-[#FAF5F0] px-2 py-0.5 rounded border border-[#EDE2D8]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-6 pt-0 border-t border-[#F5ECE5] mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#9B8E88] uppercase block tracking-wider font-mono">
                    Starting From
                  </span>
                  <span className="font-serif font-bold text-sm text-[#261F1D]">
                    {vendor.startingPrice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedVendor(vendor)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D96035] hover:text-[#A24322] transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        {!isStandalonePage && (
          <div className="text-center pt-6">
            <button
              onClick={() => onNavigate('vendors')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#5A4D46] hover:bg-[#F2E8DE] transition-colors cursor-pointer"
            >
              <span>Explore All Vetted Vendors</span>
              <ArrowRight className="w-4 h-4 text-[#D96035]" />
            </button>
          </div>
        )}
      </div>

      {/* Vendor Details Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#EAE0D6] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedVendor(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#564A45] hover:text-[#261F1D] border border-[#E8DDD3] shadow-2xs transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D96035]">
                  <span>{selectedVendor.category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#261F1D] font-bold">
                    <Star className="w-3 h-3 text-[#D96035] fill-[#D96035]" />
                    {selectedVendor.rating} ({selectedVendor.reviewCount} client reviews)
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#261F1D] mt-1">
                  {selectedVendor.name}
                </h3>
                <p className="text-xs text-[#7A6B63] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D96035]" />
                  <span>{selectedVendor.location}</span>
                </p>
              </div>

              <div className="rounded-xl overflow-hidden h-60 bg-[#F6EDE5]">
                <EventImage
                  src={selectedVendor.imageUrl}
                  alt={selectedVendor.name}
                  aspectRatio="16/9"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#9B8E88]">
                  About this Artisan
                </h4>
                <p className="text-sm text-[#544640] leading-relaxed">
                  {selectedVendor.description}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#EDE2D8] space-y-3">
                <h4 className="text-xs uppercase font-semibold tracking-wider text-[#261F1D] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D96035]" />
                  <span>MOMENTA Quality Signatures</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#61524B]">
                  {selectedVendor.specialties.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D96035] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EAE0D6]">
                <div>
                  <span className="text-[11px] text-[#8F7E75] block">Starting Engagement</span>
                  <p className="text-xl font-serif font-bold text-[#261F1D]">
                    {selectedVendor.startingPrice}
                  </p>
                </div>
                <button
                  onClick={() => handleEnquireWithVendor(selectedVendor)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Request Availability & Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
