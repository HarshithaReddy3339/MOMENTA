import React, { useState } from 'react';
import { 
  NavigationPage, EventType, EventDetailsForm, EventPreferencesForm, 
  BudgetAllocation, EventPlan, Vendor, ChecklistItem 
} from '../../types';
import { 
  EVENT_TYPES, VENUE_PREFERENCES, FOOD_PREFERENCES, DECOR_PREFERENCES, 
  PHOTO_PREFERENCES, ENTERTAINMENT_PREFERENCES, DEFAULT_BUDGET_RATIOS, 
  VENDORS_DATA, INITIAL_CHECKLIST, TIMELINE_MILESTONES 
} from '../../data/mockData';
import { EventImage } from '../common/EventImage';
import { 
  Calendar, MapPin, Users, Sparkles, Check, ArrowRight, ArrowLeft, 
  CheckCircle2, Printer, Share2, Star, Coins,
  Clock, HeartHandshake, Sliders, BookOpen
} from 'lucide-react';
import { PersonalizeEventModal } from './PersonalizeEventModal';
import { KnowledgeBaseUploadArea } from './KnowledgeBaseUploadArea';

interface PlanYourEventPageProps {
  onNavigate: (page: NavigationPage) => void;
  onEnquireWithPlan: (plan: EventPlan) => void;
}

export const PlanYourEventPage: React.FC<PlanYourEventPageProps> = ({ 
  onNavigate, 
  onEnquireWithPlan 
}) => {
  // Wizard Step: 1, 2, 3, or 'dashboard'
  const [currentStep, setCurrentStep] = useState<number | 'dashboard'>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  // Step 1: Details
  const [details, setDetails] = useState<EventDetailsForm>({
    eventType: 'Wedding Celebration',
    date: '2026-11-20',
    location: 'Hyderabad, India',
    guestCount: 200
  });

  // Step 2: Preferences
  const [preferences, setPreferences] = useState<EventPreferencesForm>({
    venueType: VENUE_PREFERENCES[0],
    foodStyle: FOOD_PREFERENCES[0],
    decorAesthetic: DECOR_PREFERENCES[0],
    photographyStyle: PHOTO_PREFERENCES[0],
    entertainmentType: ENTERTAINMENT_PREFERENCES[0],
    specialRequests: 'Sunset gathering followed by warm candlelit dining with soft ambient jazz.'
  });

  // Step 3: Budget
  const [totalBudget, setTotalBudget] = useState<number>(2000000);
  const [ratios, setRatios] = useState(DEFAULT_BUDGET_RATIOS);

  // Generated Plan
  const [generatedPlan, setGeneratedPlan] = useState<EventPlan | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'vendors' | 'timeline' | 'checklist'>('overview');
  const [shortlistedVendorIds, setShortlistedVendorIds] = useState<string[]>(['v-palazzo', 'v-artisancat', 'v-blushbotanics']);

  // Format currency in Indian numbering system
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleRatioChange = (key: keyof typeof ratios, newRatio: number) => {
    setRatios((prev) => ({
      ...prev,
      [key]: newRatio
    }));
  };

  const calculateAllocation = (budget: number, currRatios: typeof ratios): BudgetAllocation => {
    return {
      venue: Math.round(budget * currRatios.venue),
      food: Math.round(budget * currRatios.food),
      decoration: Math.round(budget * currRatios.decoration),
      photography: Math.round(budget * currRatios.photography),
      entertainment: Math.round(budget * currRatios.entertainment),
      other: Math.round(budget * currRatios.other)
    };
  };

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const allocation = calculateAllocation(totalBudget, ratios);
      
      // Filter or recommend vendors based on preference & budget
      const matchedVendors = VENDORS_DATA.slice(0, 6);

      const plan: EventPlan = {
        id: `MM-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        details,
        preferences,
        totalBudget,
        currency: 'INR',
        allocation,
        recommendedServices: [
          'Exclusive Venue Booking & Protocol Check',
          'Fine Dining Plated Tasting & Sommelier Selection',
          'Bespoke Peach Rose & Warm Candlelight Tablescape',
          'Cinematic Documentary 4K Film & Editorial Portraits',
          'Acoustic Strings Sunset Performance',
          'Dedicated Lead MOMENTA Coordinator on Site'
        ],
        suggestedVendors: matchedVendors,
        checklist,
        timelineMilestones: TIMELINE_MILESTONES
      };

      setGeneratedPlan(plan);
      setIsGenerating(false);
      setCurrentStep('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const toggleVendorShortlist = (id: string) => {
    setShortlistedVendorIds((prev) =>
      prev.includes(id) ? prev.filter((vId) => vId !== id) : [...prev, id]
    );
  };

  // -------------------------------------------------------------
  // RENDER: DASHBOARD VIEW
  // -------------------------------------------------------------
  if (currentStep === 'dashboard' && generatedPlan) {
    const alloc = generatedPlan.allocation;
    const completedTasksCount = checklist.filter((c) => c.completed).length;

    return (
      <div className="py-10 lg:py-16 bg-[#FAF7F2] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
          
          {/* Top Banner / Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EAE0D6]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D96035]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MOMENTA Custom Blueprint · Ref {generatedPlan.id}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#261F1D] font-bold mt-1">
                {generatedPlan.details.eventType} Plan
              </h1>
              <p className="text-sm text-[#6E615B] mt-1">
                Generated on {generatedPlan.createdAt} for {generatedPlan.details.location}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#5A4D46] hover:bg-[#F2E8DE] transition-colors cursor-pointer"
              >
                Modify Preferences
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#5A4D46] hover:bg-[#F2E8DE] transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#D96035]" />
                <span>Print / PDF</span>
              </button>
              <button
                onClick={() => onEnquireWithPlan(generatedPlan)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer shadow-xs"
              >
                <span>Enquire With Curated Vendors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#EDE2D8] shadow-xs">
              <span className="text-xs uppercase font-mono tracking-wider text-[#A89B95] block mb-1">
                Total Budget
              </span>
              <p className="font-serif text-2xl font-bold text-[#261F1D] tabular-nums">
                {formatINR(generatedPlan.totalBudget)}
              </p>
              <span className="text-[11px] text-[#7A6B63] mt-1 block">
                ≈ {formatINR(Math.round(generatedPlan.totalBudget / generatedPlan.details.guestCount))} / guest
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EDE2D8] shadow-xs">
              <span className="text-xs uppercase font-mono tracking-wider text-[#A89B95] block mb-1">
                Guest Scale
              </span>
              <p className="font-serif text-2xl font-bold text-[#261F1D] tabular-nums">
                {generatedPlan.details.guestCount}
              </p>
              <span className="text-[11px] text-[#7A6B63] mt-1 block">
                Estimated Attendees
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EDE2D8] shadow-xs">
              <span className="text-xs uppercase font-mono tracking-wider text-[#A89B95] block mb-1">
                Target Date
              </span>
              <p className="font-serif text-2xl font-bold text-[#261F1D]">
                {new Date(generatedPlan.details.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <span className="text-[11px] text-[#7A6B63] mt-1 block">
                {generatedPlan.details.location}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EDE2D8] shadow-xs">
              <span className="text-xs uppercase font-mono tracking-wider text-[#A89B95] block mb-1">
                Planning Milestones
              </span>
              <p className="font-serif text-2xl font-bold text-[#D96035] tabular-nums">
                {completedTasksCount} / {checklist.length}
              </p>
              <span className="text-[11px] text-[#7A6B63] mt-1 block">
                Tasks Completed
              </span>
            </div>
          </div>

          {/* Interactive Dashboard Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-[#EFE5DB] rounded-xl w-fit overflow-x-auto max-w-full">
            {[
              { id: 'overview', label: 'Plan Overview' },
              { id: 'budget', label: 'Budget Allocation' },
              { id: 'vendors', label: `Suggested Vendors (${generatedPlan.suggestedVendors.length})` },
              { id: 'timeline', label: 'Event Timeline' },
              { id: 'checklist', label: `Checklist (${completedTasksCount}/${checklist.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-[#261F1D] shadow-xs'
                    : 'text-[#61534D] hover:text-[#261F1D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Vision & Preferences */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-7 rounded-2xl border border-[#EDE2D8] space-y-5">
                  <h3 className="font-serif text-2xl font-bold text-[#261F1D]">
                    Curated Event Architecture
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#F0E6DD]">
                      <span className="text-[11px] font-mono text-[#8C7B73] uppercase tracking-wider block">
                        Selected Venue Aesthetic
                      </span>
                      <span className="font-serif text-base font-semibold text-[#261F1D] mt-0.5 block">
                        {generatedPlan.preferences.venueType}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#F0E6DD]">
                      <span className="text-[11px] font-mono text-[#8C7B73] uppercase tracking-wider block">
                        Culinary Approach
                      </span>
                      <span className="font-serif text-base font-semibold text-[#261F1D] mt-0.5 block">
                        {generatedPlan.preferences.foodStyle}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#F0E6DD]">
                      <span className="text-[11px] font-mono text-[#8C7B73] uppercase tracking-wider block">
                        Floral & Decor Palette
                      </span>
                      <span className="font-serif text-base font-semibold text-[#261F1D] mt-0.5 block">
                        {generatedPlan.preferences.decorAesthetic}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#F0E6DD]">
                      <span className="text-[11px] font-mono text-[#8C7B73] uppercase tracking-wider block">
                        Photography Style
                      </span>
                      <span className="font-serif text-base font-semibold text-[#261F1D] mt-0.5 block">
                        {generatedPlan.preferences.photographyStyle}
                      </span>
                    </div>
                  </div>

                  {generatedPlan.preferences.specialRequests && (
                    <div className="p-4 rounded-xl bg-[#FFF9F6] border border-[#F5E2D8] text-xs text-[#6F5B53] space-y-1">
                      <span className="font-semibold text-[#A24322] uppercase tracking-wider">
                        Special Requests & Atmosphere Notes
                      </span>
                      <p className="italic leading-relaxed">
                        "{generatedPlan.preferences.specialRequests}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Recommended Services List */}
                <div className="bg-white p-7 rounded-2xl border border-[#EDE2D8] space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#261F1D]">
                    Recommended Core Services
                  </h3>
                  <div className="space-y-3">
                    {generatedPlan.recommendedServices.map((service, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE5DB] text-xs sm:text-sm text-[#463934]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#D96035] shrink-0" />
                        <span className="font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Mini Budget Summary & Next Steps */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-7 rounded-2xl border border-[#EDE2D8] space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-[#261F1D]">
                      Budget Breakdown Summary
                    </h3>
                    <button
                      onClick={() => setActiveTab('budget')}
                      className="text-xs text-[#D96035] font-semibold hover:underline cursor-pointer"
                    >
                      View Full Details
                    </button>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-[#F2EAE2]">
                      <span className="text-[#695B54]">Venue & Infrastructure</span>
                      <span className="font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.venue)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#F2EAE2]">
                      <span className="text-[#695B54]">Food & Catering Experience</span>
                      <span className="font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.food)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#F2EAE2]">
                      <span className="text-[#695B54]">Floral, Lighting & Decor</span>
                      <span className="font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.decoration)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#F2EAE2]">
                      <span className="text-[#695B54]">Photography & Videography</span>
                      <span className="font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.photography)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#F2EAE2]">
                      <span className="text-[#695B54]">Entertainment & Audio</span>
                      <span className="font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.entertainment)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[#695B54]">Permits, Staffing & Contingency</span>
                      <span className="font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.other)}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#EAE0D6] flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-[#261F1D]">Total Projected Cost</span>
                    <span className="font-serif text-2xl font-bold text-[#D96035] tabular-nums">
                      {formatINR(generatedPlan.totalBudget)}
                    </span>
                  </div>
                </div>

                {/* Call to Action Box */}
                <div className="bg-[#FAF0E7] p-7 rounded-2xl border border-[#E9DDD1] space-y-4">
                  <h4 className="font-serif text-xl font-bold text-[#261F1D]">
                    Have MOMENTA Coordinate This Plan
                  </h4>
                  <p className="text-xs sm:text-sm text-[#665751] leading-relaxed">
                    Our lead planner will connect with the matching venues and culinary artisans to confirm availability on {new Date(generatedPlan.details.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}.
                  </p>
                  <button
                    onClick={() => onEnquireWithPlan(generatedPlan)}
                    className="w-full py-3 px-4 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Connect With Lead Planner</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BUDGET DETAIL & BREAKDOWN */}
          {activeTab === 'budget' && (
            <div className="bg-white p-8 rounded-3xl border border-[#EDE2D8] space-y-8">
              <div>
                <h3 className="font-serif text-3xl font-bold text-[#261F1D]">
                  Estimated Budget Allocation
                </h3>
                <p className="text-sm text-[#695B54] mt-1">
                  Structured according to industry best practices for {generatedPlan.details.eventType.toLowerCase()}s with {generatedPlan.details.guestCount} guests.
                </p>
              </div>

              {/* Visual Multi-segment Bar */}
              <div className="space-y-2">
                <div className="h-6 w-full rounded-full overflow-hidden flex bg-[#FAF0E8] p-0.5 border border-[#EDE2D8]">
                  <div style={{ width: `${ratios.venue * 100}%` }} className="bg-[#A24322] h-full rounded-l-full transition-all" title="Venue" />
                  <div style={{ width: `${ratios.food * 100}%` }} className="bg-[#D96035] h-full transition-all" title="Food" />
                  <div style={{ width: `${ratios.decoration * 100}%` }} className="bg-[#EAA182] h-full transition-all" title="Decoration" />
                  <div style={{ width: `${ratios.photography * 100}%` }} className="bg-[#C8B8AE] h-full transition-all" title="Photography" />
                  <div style={{ width: `${ratios.entertainment * 100}%` }} className="bg-[#9B8E88] h-full transition-all" title="Entertainment" />
                  <div style={{ width: `${ratios.other * 100}%` }} className="bg-[#60524C] h-full rounded-r-full transition-all" title="Other" />
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-[#7F7068] pt-1">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#A24322]" /> Venue (32%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#D96035]" /> Food (28%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#EAA182]" /> Decor (18%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#C8B8AE]" /> Photography (10%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#9B8E88]" /> Entertainment (7%)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#60524C]" /> Contingency (5%)</span>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#EDE2D8] text-[11px] font-mono uppercase tracking-wider text-[#A89B95]">
                      <th className="pb-3 font-semibold">Service Category</th>
                      <th className="pb-3 font-semibold">Allocation %</th>
                      <th className="pb-3 font-semibold text-right">Projected Spend</th>
                      <th className="pb-3 font-semibold pl-6">Scope Covered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2EAE2]">
                    <tr>
                      <td className="py-4 font-medium text-[#261F1D]">Venue & Infrastructure</td>
                      <td className="py-4 text-[#6E615B] font-mono">32%</td>
                      <td className="py-4 text-right font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.venue)}</td>
                      <td className="py-4 pl-6 text-xs text-[#6E615B]">Estate fee, bridal suites, basic power backup, parking</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-[#261F1D]">Food & Catering</td>
                      <td className="py-4 text-[#6E615B] font-mono">28%</td>
                      <td className="py-4 text-right font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.food)}</td>
                      <td className="py-4 pl-6 text-xs text-[#6E615B]">Plated multi-course or artisanal buffet, mocktail bar, servers</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-[#261F1D]">Decoration & Floral Styling</td>
                      <td className="py-4 text-[#6E615B] font-mono">18%</td>
                      <td className="py-4 text-right font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.decoration)}</td>
                      <td className="py-4 pl-6 text-xs text-[#6E615B]">Peach garden roses, warm candle tapers, stage, ambient lighting</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-[#261F1D]">Photography & Film</td>
                      <td className="py-4 text-[#6E615B] font-mono">10%</td>
                      <td className="py-4 text-right font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.photography)}</td>
                      <td className="py-4 pl-6 text-xs text-[#6E615B]">Lead + candid photographers, 4K reel, heirloom linen photo book</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-[#261F1D]">Entertainment & Audio Engineering</td>
                      <td className="py-4 text-[#6E615B] font-mono">7%</td>
                      <td className="py-4 text-right font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.entertainment)}</td>
                      <td className="py-4 pl-6 text-xs text-[#6E615B]">String quartet / ensemble, pro PA sound system, mic riders</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-[#261F1D]">Other, Permits & Contingency</td>
                      <td className="py-4 text-[#6E615B] font-mono">5%</td>
                      <td className="py-4 text-right font-serif font-bold text-[#261F1D] tabular-nums">{formatINR(alloc.other)}</td>
                      <td className="py-4 pl-6 text-xs text-[#6E615B]">Municipal permissions, emergency medical kit, guest shuttles</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-[#D96035]/30">
                      <td className="pt-4 font-serif font-bold text-base text-[#261F1D]">Total Budget Allocation</td>
                      <td className="pt-4 font-mono font-bold text-[#261F1D]">100%</td>
                      <td className="pt-4 text-right font-serif text-xl font-bold text-[#D96035] tabular-nums">
                        {formatINR(generatedPlan.totalBudget)}
                      </td>
                      <td className="pt-4 pl-6 text-xs text-[#6E615B]">Fully mapped & allocated</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SUGGESTED VENDORS */}
          {activeTab === 'vendors' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-3xl font-bold text-[#261F1D]">
                    Suggested Vetted Vendors
                  </h3>
                  <p className="text-sm text-[#695B54]">
                    Hand-selected partners matching your {generatedPlan.preferences.venueType.toLowerCase()} and {generatedPlan.preferences.foodStyle.toLowerCase()} preferences.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('vendors')}
                  className="text-xs font-semibold text-[#D96035] hover:underline cursor-pointer"
                >
                  Browse Complete Vendor Directory →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedPlan.suggestedVendors.map((vendor) => {
                  const isShortlisted = shortlistedVendorIds.includes(vendor.id);
                  return (
                    <div
                      key={vendor.id}
                      className="bg-white rounded-2xl border border-[#EDE2D8] overflow-hidden shadow-xs hover:border-[#DFC8B9] hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-44 relative bg-[#FAF3ED] overflow-hidden">
                          <EventImage
                            src={vendor.imageUrl}
                            alt={vendor.name}
                            aspectRatio="16/9"
                            className="w-full h-full object-cover"
                            fallbackText={vendor.name}
                          />
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-mono uppercase text-[#261F1D]">
                            {vendor.category}
                          </div>
                          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2 py-1 rounded-md text-xs font-semibold text-[#261F1D] flex items-center gap-1 shadow-2xs">
                            <Star className="w-3 h-3 text-[#D96035] fill-[#D96035]" />
                            <span className="tabular-nums">{vendor.rating}</span>
                          </div>
                        </div>

                        <div className="p-5 space-y-2">
                          <h4 className="font-serif text-xl font-bold text-[#261F1D]">
                            {vendor.name}
                          </h4>
                          <p className="text-xs text-[#7A6B63] flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#D96035]" />
                            <span>{vendor.location}</span>
                          </p>
                          <p className="text-xs text-[#5D504A] line-clamp-2 pt-1 leading-relaxed">
                            {vendor.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 border-t border-[#F5ECE5] mt-4 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-[#A89B95] uppercase block">Benchmark</span>
                          <span className="font-semibold text-[#261F1D]">{vendor.startingPrice}</span>
                        </div>
                        <button
                          onClick={() => toggleVendorShortlist(vendor.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                            isShortlisted
                              ? 'bg-[#FDEEE7] text-[#D96035] border border-[#F3C5AE]'
                              : 'bg-[#F5ECE5] text-[#5A4D46] hover:bg-[#EAE0D6]'
                          }`}
                        >
                          {isShortlisted ? '✓ Shortlisted' : '+ Shortlist'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="bg-white p-8 rounded-3xl border border-[#EDE2D8] space-y-8">
              <div>
                <h3 className="font-serif text-3xl font-bold text-[#261F1D]">
                  Event Execution Timeline
                </h3>
                <p className="text-sm text-[#695B54] mt-1">
                  Chronological phases to keep your planning calm, structured and on schedule.
                </p>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-[2px] before:bg-[#EFE5DB]">
                {generatedPlan.timelineMilestones.map((m, idx) => (
                  <div key={idx} className="relative pl-10 space-y-2">
                    <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-[#D96035] border-4 border-white shadow-2xs" />
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D96035]">
                        {m.timeframe}
                      </span>
                      <span className="text-sm font-serif font-bold text-[#261F1D]">
                        · {m.phase}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {m.tasks.map((task, tIdx) => (
                        <div
                          key={tIdx}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#F0E6DD] text-xs text-[#52453F]"
                        >
                          <Clock className="w-3.5 h-3.5 text-[#B8AAA2] shrink-0" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="bg-white p-8 rounded-3xl border border-[#EDE2D8] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-3xl font-bold text-[#261F1D]">
                    Master Event Checklist
                  </h3>
                  <p className="text-sm text-[#695B54]">
                    Mark tasks complete as you progress. Your MOMENTA coordinator reviews this status weekly.
                  </p>
                </div>
                <div className="text-xs font-mono font-semibold text-[#D96035] bg-[#FDEEE7] px-3 py-1.5 rounded-full w-fit">
                  {completedTasksCount} of {checklist.length} Completed
                </div>
              </div>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                      item.completed
                        ? 'bg-[#FAF7F2] border-[#E8DDD3] opacity-75'
                        : 'bg-white border-[#EDE2D8] hover:border-[#DFC8B9] hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          item.completed
                            ? 'bg-[#D96035] border-[#D96035] text-white'
                            : 'border-[#C8B8AE] bg-white'
                        }`}
                      >
                        {item.completed && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span
                          className={`text-sm font-medium ${
                            item.completed ? 'line-through text-[#8F7E75]' : 'text-[#261F1D]'
                          }`}
                        >
                          {item.title}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-[#A89B95] mt-0.5">
                          <span>{item.category}</span>
                          <span>·</span>
                          <span>{item.timeframe}</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-[#8C7B73] shrink-0">
                      {item.completed ? 'Done' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Direct CTA */}
          <div className="p-8 rounded-3xl bg-[#261E1B] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-serif text-2xl font-bold text-[#FAF7F2]">
                Love this blueprint? Let's take the first step.
              </h3>
              <p className="text-sm text-[#C8BCB4]">
                Send this tailored plan directly to our planning concierge. We'll verify venue dates and arrange tastings.
              </p>
            </div>
            <button
              onClick={() => onEnquireWithPlan(generatedPlan)}
              className="shrink-0 px-8 py-3.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-sm"
            >
              Enquire With This Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: MULTI-STEP WIZARD FORM (Steps 1, 2, 3)
  // -------------------------------------------------------------
  return (
    <div className="py-12 lg:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D96035]">
            Interactive Planner
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#261F1D] text-balance">
            Plan Your Event
          </h1>
          <p className="text-base text-[#6E615B] max-w-xl mx-auto">
            Answer a few thoughtful questions and MOMENTA will generate an itemized blueprint with estimated category allocations and matched vendors.
          </p>
        </div>

        {/* Featured AI Quick Entry Callout */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#FAF0E8] via-[#FFF6F0] to-[#FAF0E8] border border-[#F2DDD0] space-y-5 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FDEEE7] text-[#D96035] flex items-center justify-center shrink-0 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#261F1D] flex items-center gap-2">
                <span>Personalize Your Event</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#FDEEE7] text-[#D96035]">AI Powered</span>
              </p>
              <p className="text-xs text-[#7A6B63] mt-0.5">
                Tell us your vision, and let MOMENTA create a personalized event experience for you.
              </p>
            </div>
          </div>

          {/* Knowledge Base Upload Area ABOVE the button */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#EDE2D8] space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D96035]" />
              <h4 className="font-serif font-bold text-sm text-[#261F1D]">
                Build Your Knowledge Base
              </h4>
            </div>
            <p className="text-xs text-[#6E615B] leading-relaxed">
              Upload event-planning knowledge to help MOMENTA personalize recommendations using your own information.
            </p>
            <KnowledgeBaseUploadArea />
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <p className="text-xs text-[#7A6B63] italic">
              Ready to generate your custom event blueprint?
            </p>
            <button
              type="button"
              onClick={() => setIsAIModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>✨ Personalize Your Event</span>
            </button>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="flex items-center justify-between relative px-2 sm:px-6">
          <div className="absolute top-5 left-8 right-8 h-[2px] bg-[#E5D7CB] -z-0" />
          
          {[
            { num: 1, label: 'Event Details' },
            { num: 2, label: 'Preferences' },
            { num: 3, label: 'Budget Allocation' }
          ].map((st) => {
            const isCompleted = typeof currentStep === 'number' && currentStep > st.num;
            const isCurrent = currentStep === st.num;

            return (
              <div key={st.num} className="relative z-10 flex flex-col items-center space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof currentStep === 'number' && st.num < currentStep) {
                      setCurrentStep(st.num);
                    }
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#D96035] text-white ring-4 ring-[#FDEEE7] shadow-sm'
                      : isCompleted
                      ? 'bg-[#8F3416] text-white cursor-pointer'
                      : 'bg-white text-[#9B8E88] border border-[#DDD0C5]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : `0${st.num}`}
                </button>
                <span
                  className={`text-xs tracking-wide font-medium ${
                    isCurrent ? 'text-[#261F1D] font-semibold' : 'text-[#8C7B73]'
                  }`}
                >
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Container Card */}
        <div className="bg-white rounded-3xl border border-[#EDE2D8] p-6 sm:p-10 shadow-xs space-y-8">
          
          {/* STEP 1: EVENT DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#261F1D]">
                  Step 1 — Event Details
                </h2>
                <p className="text-sm text-[#73645D] mt-1">
                  Tell us what kind of celebration you are envisioning.
                </p>
              </div>

              {/* Event Type Grid */}
              <div className="space-y-3">
                <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                  Event Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {EVENT_TYPES.map((type) => {
                    const isSelected = details.eventType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setDetails({ ...details, eventType: type })}
                        className={`p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#FDEEE7] border-[#D96035] text-[#8F3416] font-semibold shadow-2xs'
                            : 'bg-[#FAF7F2] border-[#EDE2D8] text-[#52453F] hover:bg-[#F5EFEB]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                    Event Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={details.date}
                      onChange={(e) => setDetails({ ...details, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035] focus:ring-1 focus:ring-[#D96035]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                    Location / Destination City
                  </label>
                  <input
                    type="text"
                    value={details.location}
                    onChange={(e) => setDetails({ ...details, location: e.target.value })}
                    placeholder="e.g. Hyderabad, Bangalore, Goa, Udaipur"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035] focus:ring-1 focus:ring-[#D96035]"
                  />
                </div>
              </div>

              {/* Number of Guests Slider & Input */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                    Estimated Number of Guests
                  </label>
                  <div className="flex items-center gap-1 font-serif text-xl font-bold text-[#D96035]">
                    <span className="tabular-nums">{details.guestCount}</span>
                    <span className="text-xs font-sans text-[#8C7B73] font-normal">Guests</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={details.guestCount}
                  onChange={(e) => setDetails({ ...details, guestCount: Number(e.target.value) })}
                  className="w-full h-2 bg-[#EFE5DB] rounded-lg appearance-none cursor-pointer accent-[#D96035]"
                />

                <div className="flex justify-between text-[11px] text-[#A89B95] font-mono">
                  <span>20 Intimate</span>
                  <span>150 Medium</span>
                  <span>400 Grand</span>
                  <span>1000+ Royal</span>
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-6 border-t border-[#F2EAE2] flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  <span>Continue to Preferences</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PREFERENCES */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#261F1D]">
                  Step 2 — Personal Preferences
                </h2>
                <p className="text-sm text-[#73645D] mt-1">
                  Choose your venue style, culinary preferences, aesthetic, and soundscape.
                </p>
              </div>

              {/* Venue Preference */}
              <div className="space-y-3">
                <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                  Venue Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VENUE_PREFERENCES.map((venue) => {
                    const isSelected = preferences.venueType === venue;
                    return (
                      <button
                        key={venue}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, venueType: venue })}
                        className={`p-3.5 rounded-xl text-left text-xs font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#FDEEE7] border-[#D96035] text-[#8F3416] font-semibold shadow-2xs'
                            : 'bg-[#FAF7F2] border-[#EDE2D8] text-[#52453F] hover:bg-[#F5EFEB]'
                        }`}
                      >
                        {venue}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Food & Catering */}
              <div className="space-y-3">
                <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                  Food & Catering Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FOOD_PREFERENCES.map((food) => {
                    const isSelected = preferences.foodStyle === food;
                    return (
                      <button
                        key={food}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, foodStyle: food })}
                        className={`p-3.5 rounded-xl text-left text-xs font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#FDEEE7] border-[#D96035] text-[#8F3416] font-semibold shadow-2xs'
                            : 'bg-[#FAF7F2] border-[#EDE2D8] text-[#52453F] hover:bg-[#F5EFEB]'
                        }`}
                      >
                        {food}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Decoration Aesthetics */}
              <div className="space-y-3">
                <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                  Decoration & Floral Aesthetic
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DECOR_PREFERENCES.map((decor) => {
                    const isSelected = preferences.decorAesthetic === decor;
                    return (
                      <button
                        key={decor}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, decorAesthetic: decor })}
                        className={`p-3.5 rounded-xl text-left text-xs font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#FDEEE7] border-[#D96035] text-[#8F3416] font-semibold shadow-2xs'
                            : 'bg-[#FAF7F2] border-[#EDE2D8] text-[#52453F] hover:bg-[#F5EFEB]'
                        }`}
                      >
                        {decor}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photography Style */}
              <div className="space-y-3">
                <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                  Photography & Videography Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PHOTO_PREFERENCES.map((photo) => {
                    const isSelected = preferences.photographyStyle === photo;
                    return (
                      <button
                        key={photo}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, photographyStyle: photo })}
                        className={`p-3.5 rounded-xl text-left text-xs font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#FDEEE7] border-[#D96035] text-[#8F3416] font-semibold shadow-2xs'
                            : 'bg-[#FAF7F2] border-[#EDE2D8] text-[#52453F] hover:bg-[#F5EFEB]'
                        }`}
                      >
                        {photo}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Entertainment */}
              <div className="space-y-3">
                <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                  Entertainment Requirements
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ENTERTAINMENT_PREFERENCES.map((ent) => {
                    const isSelected = preferences.entertainmentType === ent;
                    return (
                      <button
                        key={ent}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, entertainmentType: ent })}
                        className={`p-3.5 rounded-xl text-left text-xs font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#FDEEE7] border-[#D96035] text-[#8F3416] font-semibold shadow-2xs'
                            : 'bg-[#FAF7F2] border-[#EDE2D8] text-[#52453F] hover:bg-[#F5EFEB]'
                        }`}
                      >
                        {ent}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                  Other Requirements & Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={preferences.specialRequests}
                  onChange={(e) => setPreferences({ ...preferences, specialRequests: e.target.value })}
                  placeholder="Tell us any specific dietary rules, themes, elder assistance, or personal moments you want curated..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035] focus:ring-1 focus:ring-[#D96035]"
                />
              </div>

              {/* Nav Buttons */}
              <div className="pt-6 border-t border-[#F2EAE2] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#5A4D46] hover:bg-[#F2E8DE] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  <span>Continue to Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BUDGET */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#261F1D]">
                  Step 3 — Budget & Category Allocation
                </h2>
                <p className="text-sm text-[#73645D] mt-1">
                  Enter your total estimated budget. MOMENTA automatically allocates estimated funds across key requirements.
                </p>
              </div>

              {/* Budget Quick Tiers */}
              <div className="space-y-3">
                <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                  Total Estimated Budget
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: '₹8 Lakhs', val: 800000 },
                    { label: '₹15 Lakhs', val: 1500000 },
                    { label: '₹25 Lakhs', val: 2500000 },
                    { label: '₹40 Lakhs', val: 4000000 },
                    { label: '₹65 Lakhs', val: 6500000 }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setTotalBudget(preset.val)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer ${
                        totalBudget === preset.val
                          ? 'bg-[#D96035] text-white shadow-2xs'
                          : 'bg-[#FAF7F2] border border-[#EDE2D8] text-[#5A4D46] hover:bg-[#F2E8DE]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 relative">
                  <div className="text-xs text-[#8C7B73] mb-1">Custom Amount (INR):</div>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-base font-serif font-bold text-[#A89B95]">₹</span>
                    <input
                      type="number"
                      min="100000"
                      step="50000"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(Number(e.target.value))}
                      className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE2D8] text-base font-serif font-bold text-[#261F1D] focus:outline-hidden focus:border-[#D96035]"
                    />
                  </div>
                </div>
              </div>

              {/* Category Breakdown Sliders */}
              <div className="space-y-4 pt-4 border-t border-[#F2EAE2]">
                <h3 className="font-serif text-lg font-bold text-[#261F1D]">
                  Estimated Category Breakdown
                </h3>
                <p className="text-xs text-[#7A6B63]">
                  Adjust the sliders if you wish to allocate more to food or floral styling:
                </p>

                <div className="space-y-4">
                  {[
                    { key: 'venue' as const, label: 'Venue', pct: ratios.venue },
                    { key: 'food' as const, label: 'Food & Catering', pct: ratios.food },
                    { key: 'decoration' as const, label: 'Decoration & Themes', pct: ratios.decoration },
                    { key: 'photography' as const, label: 'Photography & Videography', pct: ratios.photography },
                    { key: 'entertainment' as const, label: 'Entertainment', pct: ratios.entertainment },
                    { key: 'other' as const, label: 'Other & Contingency', pct: ratios.other }
                  ].map((cat) => {
                    const allocatedAmount = Math.round(totalBudget * cat.pct);
                    return (
                      <div key={cat.key} className="space-y-1.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#F0E6DD]">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="font-semibold text-[#261F1D]">{cat.label}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[#8C7B73] font-mono">{(cat.pct * 100).toFixed(0)}%</span>
                            <span className="font-serif font-bold text-[#D96035] tabular-nums">
                              {formatINR(allocatedAmount)}
                            </span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0.05"
                          max="0.50"
                          step="0.01"
                          value={cat.pct}
                          onChange={(e) => handleRatioChange(cat.key, parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-[#EAE0D6] rounded-lg appearance-none cursor-pointer accent-[#D96035]"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Nav & Generate Plan Button */}
              <div className="pt-6 border-t border-[#F2EAE2] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#5A4D46] hover:bg-[#F2E8DE] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-colors cursor-pointer shadow-md disabled:opacity-75"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Synthesizing Plan...</span>
                    </>
                  ) : (
                    <>
                      <span>Create My MOMENTA Plan</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* AI Personalization Modal Interface */}
      <PersonalizeEventModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onApplyPlan={(visionSummary) => {
          setPreferences((prev) => ({
            ...prev,
            specialRequests: visionSummary
          }));
        }}
        onEnquireWithPlan={onEnquireWithPlan}
      />
    </div>
  );
};
