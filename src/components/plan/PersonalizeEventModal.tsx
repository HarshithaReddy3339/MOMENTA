import React, { useState } from 'react';
import { 
  Sparkles, X, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, 
  MapPin, Utensils, Music, Camera, Users, Wallet, Calendar, 
  HelpCircle, Lightbulb, ChevronRight, Send, Check
} from 'lucide-react';
import { 
  generatePersonalizedPlan, 
  PersonalizedEventPlanResult 
} from '../../services/aiPersonalizationService';
import { EventPlan } from '../../types';

interface PersonalizeEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPlan?: (planSummary: string) => void;
  onEnquireWithPlan?: (plan: EventPlan) => void;
}

const SAMPLE_PROMPTS = [
  "I want to plan a traditional Telugu engagement for around 150 guests with elegant floral decoration, vegetarian food, a photography team, and a budget of ₹3 lakhs.",
  "Plan a small corporate event for 80 people with a modern theme, stage decoration, catering, music, and a budget of ₹2 lakhs.",
  "An intimate anniversary celebration for 50 guests with warm candlelit dining, string quartet, and botanical floral installations in Hyderabad."
];

export const PersonalizeEventModal: React.FC<PersonalizeEventModalProps> = ({
  isOpen,
  onClose,
  onApplyPlan,
  onEnquireWithPlan
}) => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'failure'>('idle');
  const [result, setResult] = useState<PersonalizedEventPlanResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || status === 'processing') return;

    setStatus('processing');
    setErrorMessage(null);

    try {
      const generated = await generatePersonalizedPlan({ prompt });
      setResult(generated);
      setStatus('success');
    } catch (err: any) {
      console.error('[MOMENTA AI Personalization Error]', err);
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('failure');
    }
  };

  const handleUsePrompt = (sample: string) => {
    setPrompt(sample);
  };

  const handleReset = () => {
    setStatus('idle');
    setResult(null);
    setErrorMessage(null);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `MOMENTA PERSONALIZED BLUEPRINT: ${result.title}
Concept: ${result.concept}
Theme & Style: ${result.themeAndStyle}
Estimated Budget: ${result.estimatedBudget}
Venues: ${result.venueSuggestions.join(', ')}
Catering: ${result.foodAndCatering}
Decoration: ${result.decoration}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-4xl w-full border border-[#EAE0D6] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#EAE0D6] bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FDEEE7] text-[#D96035] flex items-center justify-center shadow-2xs">
              <Sparkles className="w-5 h-5 text-[#D96035]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#261F1D] block leading-tight">
                Personalize Your Event
              </span>
              <p className="text-xs text-[#7A6B63]">
                Tell us your vision, and let MOMENTA create a personalized event experience for you.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#564A45] hover:text-[#261F1D] border border-[#E8DDD3] shadow-2xs transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {status === 'success' && result ? (
            /* ======================================================= */
            /* SUCCESS VIEW: ATTRACTIVE MOMENTA-STYLE RESULT AREA     */
            /* ======================================================= */
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Result Title & Header Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EDE2D8] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5ECE5]">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D96035] flex items-center gap-1.5 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI-Synthesized Blueprint</span>
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-[#261F1D] mt-1">
                      {result.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#5A4D46] hover:bg-[#FAF7F2] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : null}
                      <span>{copied ? 'Copied' : 'Copy Blueprint'}</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#5A4D46] hover:bg-[#FAF7F2] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refine Vision</span>
                    </button>
                  </div>
                </div>

                {/* 1. Event Concept */}
                <div className="space-y-1">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-[#A89B95] block">
                    Event Concept
                  </span>
                  <p className="text-sm text-[#4E413B] leading-relaxed">
                    {result.concept}
                  </p>
                </div>

                {/* 2. Theme & Style */}
                <div className="space-y-1 pt-2">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-[#A89B95] block">
                    Theme & Style
                  </span>
                  <p className="text-sm text-[#4E413B] leading-relaxed">
                    {result.themeAndStyle}
                  </p>
                </div>

                {/* Estimated Budget pill */}
                <div className="pt-2 flex items-center gap-2 text-xs">
                  <span className="text-[#8C7B73] font-mono uppercase">Estimated Budget:</span>
                  <span className="font-serif font-bold text-base text-[#D96035]">
                    {result.estimatedBudget}
                  </span>
                </div>
              </div>

              {/* Grid: Venue, Decoration, Food & Entertainment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* 3. Venue Suggestions */}
                <div className="bg-white p-6 rounded-3xl border border-[#EDE2D8] space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D96035]">
                    <MapPin className="w-4 h-4" />
                    <span>Venue Suggestions</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#52453F]">
                    {result.venueSuggestions.map((venue, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#D96035] font-bold">•</span>
                        <span>{venue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Decoration */}
                <div className="bg-white p-6 rounded-3xl border border-[#EDE2D8] space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D96035]">
                    <Sparkles className="w-4 h-4" />
                    <span>Decoration & Aesthetics</span>
                  </div>
                  <p className="text-xs text-[#52453F] leading-relaxed">
                    {result.decoration}
                  </p>
                </div>

                {/* 5. Food & Catering */}
                <div className="bg-white p-6 rounded-3xl border border-[#EDE2D8] space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D96035]">
                    <Utensils className="w-4 h-4" />
                    <span>Food & Catering</span>
                  </div>
                  <p className="text-xs text-[#52453F] leading-relaxed">
                    {result.foodAndCatering}
                  </p>
                </div>

                {/* 6. Entertainment & Music */}
                <div className="bg-white p-6 rounded-3xl border border-[#EDE2D8] space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D96035]">
                    <Music className="w-4 h-4" />
                    <span>Entertainment</span>
                  </div>
                  <p className="text-xs text-[#52453F] leading-relaxed">
                    {result.entertainment}
                  </p>
                </div>

                {/* 7. Photography */}
                <div className="bg-white p-6 rounded-3xl border border-[#EDE2D8] space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D96035]">
                    <Camera className="w-4 h-4" />
                    <span>Photography & Film</span>
                  </div>
                  <p className="text-xs text-[#52453F] leading-relaxed">
                    {result.photography}
                  </p>
                </div>

                {/* 8. Guest Experience */}
                <div className="bg-white p-6 rounded-3xl border border-[#EDE2D8] space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D96035]">
                    <Users className="w-4 h-4" />
                    <span>Guest Experience</span>
                  </div>
                  <p className="text-xs text-[#52453F] leading-relaxed">
                    {result.guestExperience}
                  </p>
                </div>
              </div>

              {/* 9. Recommended Vendors */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE2D8] space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-[#261F1D]">
                    Recommended Vendors
                  </h3>
                  <span className="text-xs font-mono text-[#D96035]">Curated Selection</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.recommendedVendors.map((vendor, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0E6DC] space-y-1">
                      <span className="text-[10px] uppercase font-mono text-[#9C8C84] block font-semibold">
                        {vendor.category}
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#261F1D]">
                        {vendor.name}
                      </h4>
                      <p className="text-xs text-[#6B5C55]">
                        {vendor.highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 10. Timeline */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE2D8] space-y-5 shadow-xs">
                <h3 className="font-serif text-2xl font-bold text-[#261F1D]">
                  Event Timeline Flow
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.timeline.map((phase, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0E6DC] space-y-2">
                      <div className="flex items-baseline justify-between">
                        <h4 className="font-serif font-bold text-base text-[#261F1D]">
                          {phase.phase}
                        </h4>
                        <span className="text-[11px] font-mono text-[#D96035] font-semibold">
                          {phase.timeframe}
                        </span>
                      </div>
                      <ul className="space-y-1 text-xs text-[#63544D]">
                        {phase.milestones.map((ms, mIdx) => (
                          <li key={mIdx} className="flex items-center gap-1.5">
                            <span className="text-[#D96035]">✓</span>
                            <span>{ms}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 11. Additional Ideas */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE2D8] space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#D96035]">
                  <Lightbulb className="w-4 h-4" />
                  <span>Additional Distinctive Ideas</span>
                </div>
                <ul className="space-y-2 text-xs text-[#52453F]">
                  {result.additionalIdeas.map((idea, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-[#FAF7F2] border border-[#F0E6DD]">
                      <span className="text-[#D96035] font-bold">✨</span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-6 rounded-3xl bg-[#261E1B] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="font-serif font-bold text-lg text-[#FAF7F2]">
                    Ready to turn this plan into reality?
                  </h4>
                  <p className="text-xs text-[#C8BCB4]">
                    Our planning directors can reserve dates and match verified local artisans.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (onApplyPlan) onApplyPlan(result.concept);
                      onClose();
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-white text-[#261E1B] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Apply To Planner
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ======================================================= */
            /* PROMPT INPUT VIEW                                      */
            /* ======================================================= */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Failure Alert Banner */}
              {status === 'failure' && errorMessage && (
                <div className="p-4 rounded-xl bg-[#FFF5F5] border border-[#FED7D7] text-xs text-[#C53030] flex items-center gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#E53E3E]" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Prompt Textarea */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-mono tracking-wider text-[#695B54]">
                  Describe Your Dream Event Vision
                </label>
                <div className="relative">
                  <textarea
                    rows={5}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={status === 'processing'}
                    placeholder="Tell MOMENTA what you have in mind — event type, theme, guests, budget, food, decoration, venue, entertainment, and anything else you want."
                    className="w-full p-4 rounded-2xl bg-white border border-[#EDE2D8] text-sm text-[#261F1D] focus:outline-hidden focus:border-[#D96035] shadow-2xs leading-relaxed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Example Suggestions Chips */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] uppercase font-mono text-[#9B8E88] block font-semibold">
                  Or click an example vision prompt:
                </span>
                <div className="space-y-2">
                  {SAMPLE_PROMPTS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={status === 'processing'}
                      onClick={() => handleUsePrompt(sample)}
                      className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#FAF0E8] border border-[#EDE2D8] text-xs text-[#52453F] transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <span className="line-clamp-2 italic font-serif">"{sample}"</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#B8AAA2] group-hover:text-[#D96035] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA with the exact requested Button States */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EDE2D8]">
                <p className="text-xs text-[#7A6B63] text-center sm:text-left">
                  Instant synthesis for decor, venue ideas, catering, and budget breakdown.
                </p>

                <button
                  type="submit"
                  disabled={!prompt.trim() || status === 'processing'}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D96035] hover:bg-[#C94E25] text-white text-xs uppercase font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'processing' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating your personalized plan...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Personalize with AI</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
