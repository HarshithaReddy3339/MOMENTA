/**
 * AI Personalization Service Boundary
 * 
 * Prepares the clean interface and structured payload for future LLM API integration.
 * No LLM API keys are hardcoded or exposed here.
 */

export interface PersonalizationRequest {
  prompt: string;
  eventType?: string;
  guests?: string | number;
  budget?: string | number;
  preferences?: string;
  location?: string;
  additionalRequirements?: string;
}

export interface PersonalizedVendorRecommendation {
  category: string;
  name: string;
  highlight: string;
}

export interface PersonalizedTimelinePhase {
  phase: string;
  timeframe: string;
  milestones: string[];
}

export interface PersonalizedEventPlanResult {
  title: string;
  concept: string;
  themeAndStyle: string;
  venueSuggestions: string[];
  decoration: string;
  foodAndCatering: string;
  entertainment: string;
  photography: string;
  guestExperience: string;
  estimatedBudget: string;
  recommendedVendors: PersonalizedVendorRecommendation[];
  timeline: PersonalizedTimelinePhase[];
  additionalIdeas: string[];
}

/**
 * Service function boundary for Personalizing an Event.
 * In this phase, it safely synthesizes a structured event plan from the user's prompt
 * and prepares for backend LLM proxy execution.
 */
export async function generatePersonalizedPlan(
  request: PersonalizationRequest
): Promise<PersonalizedEventPlanResult> {
  const promptText = request.prompt.trim();

  if (!promptText) {
    throw new Error('Please enter a description of your event vision.');
  }

  // Realistic processing delay for the frontend states
  await new Promise((resolve) => setTimeout(resolve, 1400));

  // Determine contextual cues from prompt
  const lower = promptText.toLowerCase();
  
  let detectedType = 'Bespoke Celebration';
  if (lower.includes('wedding')) detectedType = 'Curated Wedding Celebration';
  else if (lower.includes('engagement')) detectedType = 'Traditional Engagement Ceremony';
  else if (lower.includes('corporate') || lower.includes('business')) detectedType = 'Executive Corporate Soirée';
  else if (lower.includes('birthday') || lower.includes('milestone')) detectedType = 'Milestone Jubilee';
  else if (lower.includes('anniversary')) detectedType = 'Anniversary Gala Dinner';
  else if (lower.includes('dinner') || lower.includes('soiree')) detectedType = 'Private Intimate Soirée';

  let detectedGuests = '100 – 150 Guests';
  const guestMatch = promptText.match(/(\d+)\s*(?:guests?|people|attendees|pax)/i);
  if (guestMatch) {
    detectedGuests = `Approx. ${guestMatch[1]} Guests`;
  }

  let detectedBudget = '₹5,00,000 – ₹10,00,000 Estimated';
  const budgetMatch = promptText.match(/(?:budget\s*(?:of|is|:)?\s*)?(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(lakhs?|l|k|crores?)/i);
  if (budgetMatch) {
    detectedBudget = `₹${budgetMatch[1]} ${budgetMatch[2].toUpperCase()} Target`;
  }

  return {
    title: `${detectedType} Blueprint`,
    concept: `A custom-tailored event vision crafted around your specific desires: "${promptText.length > 90 ? promptText.slice(0, 90) + '...' : promptText}". Blending timeless elegance with effortless hospitality.`,
    themeAndStyle: lower.includes('traditional') || lower.includes('telugu') || lower.includes('cultural')
      ? 'Regal Heritage & Modern Minimalism: Brass antique accents, fragrant tuberoses, terracotta earthenware, and warm amber candlelight.'
      : 'Contemporary Warm Botanical: Muted apricot linens, sculptural floral installations, organic wood textures, and ambient acoustic illumination.',
    venueSuggestions: [
      lower.includes('hyderabad') || lower.includes('telugu')
        ? 'The Glasshouse at Jubilee Hills, Hyderabad (Al fresco garden courtyard)'
        : 'The Grand Conservatory (Indoor-outdoor botanical estate)',
      'Heritage Courtyard Pavilion (Intimate stone colonnade with serene water body)',
      'Terrace Atrium (Panoramic skyline views with private culinary gallery)'
    ],
    decoration: lower.includes('floral') || lower.includes('flower')
      ? 'Cascading jasmine & marigold torans, architectural floral arches, warm suspended lanterns, and bespoke monogram stationery.'
      : 'Sculptural foliage, monochromatic linen draping, delicate floating votives, and tailored mood lighting design.',
    foodAndCatering: lower.includes('veg')
      ? 'Artisanal Sattvic & South Indian Royal Thali curated with heirloom spices, live dosai & appam counter, followed by signature saffron infused desserts.'
      : 'Progressive seasonal tasting menus featuring live woodfire grills, chef-attended grazing tables, and handcrafted botanical cocktails.',
    entertainment: lower.includes('music') || lower.includes('acoustic') || lower.includes('jazz')
      ? 'Live acoustic string quartet for guest arrival transitioning into a smooth ambient jazz ensemble for dinner.'
      : 'Curated world-ambient soundscapes, traditional nadaswaram / flute duet during ceremonies, and personalized background playlists.',
    photography: 'Editorial documentary coverage with two senior cinematographers, drone aerials, same-day highlight reel, and fine-art linen print album.',
    guestExperience: `Thoughtful hospitality touchpoints for ${detectedGuests}, including welcome botanical mocktails, calligraphy place cards, concierge baggage assistance, and keepsake departure gifts.`,
    estimatedBudget: detectedBudget,
    recommendedVendors: [
      {
        category: 'Venues',
        name: 'The Glasshouse Courtyard',
        highlight: 'Secluded heritage ambiance with manicured lawn & valet service'
      },
      {
        category: 'Caterers',
        name: 'Artisan Kitchen & Co.',
        highlight: 'Award-winning bespoke menus & silver-service waitstaff'
      },
      {
        category: 'Decorators',
        name: 'Blush & Botanics Atelier',
        highlight: 'Eco-conscious floral artistry & bespoke lighting installations'
      },
      {
        category: 'Photographers',
        name: 'Loom & Lens Visuals',
        highlight: 'Vogue-featured candid documentary & high-definition cinematography'
      }
    ],
    timeline: [
      {
        phase: 'Arrival & Welcome',
        timeframe: 'T - 60 Minutes',
        milestones: ['Guest valet reception', 'Chilled botanical refreshments', 'Ambient acoustic quartet begins']
      },
      {
        phase: 'Main Proceedings & Ceremony',
        timeframe: 'Prime Event Hours',
        milestones: ['Host welcome & traditional greetings', 'Feature ceremony / key speeches', 'Photographic portrait session']
      },
      {
        phase: 'Culinary Soirée & Fellowship',
        timeframe: 'Dining Hours',
        milestones: ['Gourmet tasting counters open', 'Slow dining & table conversations', 'Dessert service & celebratory toasts']
      },
      {
        phase: 'Farewell & Keepsakes',
        timeframe: 'Conclusion',
        milestones: ['Departure favors distribution', 'Night illumination send-off', 'Concierge departure coordination']
      }
    ],
    additionalIdeas: [
      'Personalized audio guestbook station where attendees record voice messages on a vintage telephone.',
      'Scent styling with signature bergamot & amber diffusers strategically placed around the welcome foyer.',
      'Customized digital invitation suite with private RSVP portal and dress code style guide.'
    ]
  };
}
