import { ServiceItem, Vendor, ChecklistItem, TimelineMilestone } from '../types';

export const EVENT_TYPES = [
  'Wedding Celebration',
  'Anniversary Gala',
  'Milestone Birthday',
  'Corporate Soirée',
  'Private Intimate Dinner',
  'Cultural Festivity',
  'Cocktail Reception'
] as const;

export const VENUE_PREFERENCES = [
  'Heritage Courtyard & Haveli',
  'Lush Open-Air Garden Estate',
  'Boutique Luxury Ballroom',
  'Contemporary Skyline Rooftop',
  'Waterfront Villa / Lakehouse',
  'Private Architectural Residence'
];

export const FOOD_PREFERENCES = [
  'Curated Multi-Course Plated Fine Dining',
  'Artisanal Live Stations & Regional Gourmet',
  'Passed Gourmet Canapés & Signature Bar',
  'Royal Traditional Feasts (Grand Thali)',
  'Modern Plant-Forward Organic Menu'
];

export const DECOR_PREFERENCES = [
  'Warm Candlelit & Timeless Peach Florals',
  'Minimalist Contemporary Cream & Earth Tones',
  'Grand Royal Heritage with Marigold & Terracotta',
  'Botanical Garden Luxury with Fairy Lights',
  'Modern Monochromatic Architectural Aesthetics'
];

export const PHOTO_PREFERENCES = [
  'Editorial Documentary & Cinematic 4K Film',
  'Classic Fine Art Portraiture & Heirloom Albums',
  'Candid Emotion-Driven Storytelling',
  'Drone Aerial Cinematography & Same-Day Edits'
];

export const ENTERTAINMENT_PREFERENCES = [
  'Acoustic Strings & Chamber Quartet',
  'Live Modern Jazz & Soul Ensemble',
  'Curated International & Bollywood DJ',
  'Sitar & Classical Santoor Fusion',
  'Thematic Cultural Performers & Ambient Artists'
];

export const DEFAULT_BUDGET_RATIOS = {
  venue: 0.32,
  food: 0.28,
  decoration: 0.18,
  photography: 0.10,
  entertainment: 0.07,
  other: 0.05
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'venue-selection',
    name: 'Venue Selection',
    category: 'Foundational',
    shortDescription: 'Find the right space for your event, based on your occasion, guest count and budget.',
    fullDescription: 'From historic courtyards to panoramic city rooftops, we curate, negotiate and secure spaces that align with your aesthetic, capacity needs, and acoustic parameters.',
    iconName: 'Building2',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Shortlist of vetted private estates, villas & ballrooms',
      'In-person site visits & acoustic/lighting checks',
      'Contract negotiation & permit clearances',
      'Floorplan layout & guest flow choreography'
    ],
    startingPriceEstimate: '₹75,000 coordination fee'
  },
  {
    id: 'food-catering',
    name: 'Food & Catering',
    category: 'Culinary',
    shortDescription: 'Explore catering options and create menus that match your preferences and budget.',
    fullDescription: 'Collaborate with executive chefs and boutique caterers to compose bespoke tasting menus, sommelier pairings, and immersive live culinary stations.',
    iconName: 'Utensils',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Private chef tastings & menu engineering',
      'Artisanal presentation & custom table ware',
      'Dietary management (vegan, allergen-safe, satvik)',
      'Mixology curation & bar service logistics'
    ],
    startingPriceEstimate: '₹1,800 per guest'
  },
  {
    id: 'decoration-themes',
    name: 'Decoration & Themes',
    category: 'Aesthetic',
    shortDescription: 'Choose themes, colors, flowers, lighting and décor that bring your vision to life.',
    fullDescription: 'Our design ateliers craft sensory environments using warm peach florals, ambient architectural illumination, bespoke linens, and spatial styling.',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      '3D moodboards & material palette swatches',
      'Custom floral installations & sustainably sourced botanicals',
      'Architectural lighting & candlelight arrangements',
      'Stage, photowall & entrance installations'
    ],
    startingPriceEstimate: '₹1,50,000 custom design'
  },
  {
    id: 'photography-videography',
    name: 'Photography & Entertainment',
    category: 'Memories',
    shortDescription: 'Plan photography, music, DJs, performers and other entertainment requirements.',
    fullDescription: 'Discreet documentary masters capture natural laughter, heirloom portraits, and emotional highlights, paired with 4K cinematic film cuts.',
    iconName: 'Camera',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Lead master photographer + associate candid shooters',
      'Same-day teaser reel & social-ready edits',
      'High-resolution colour-graded master gallery',
      'Handcrafted linen fine-art heirloom album'
    ],
    startingPriceEstimate: '₹90,000 / day'
  },
  {
    id: 'entertainment-artists',
    name: 'Curated Entertainment',
    category: 'Experience',
    shortDescription: 'Live acoustics, world-class ensembles, and sound design tailored to each moment.',
    fullDescription: 'From mellow sunset string quartets to high-energy after-party headliners, we curate artists who match your event tempo and guest demographic.',
    iconName: 'Music',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Artist discovery & direct booking rider management',
      'Acoustic sound check & sound engineer on site',
      'Custom walk-in and highlight playlist curation',
      'Stage backdrop & dynamic performance lighting'
    ],
    startingPriceEstimate: '₹60,000 / performance'
  },
  {
    id: 'budget-planning',
    name: 'Budget Planning',
    category: 'Advisory',
    shortDescription: 'Set your budget and receive an estimated allocation across different event requirements.',
    fullDescription: 'Eliminate surprises with transparent financial modeling, vendor milestone tracking, contingency safety cushions, and real-time expense oversight.',
    iconName: 'Coins',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Itemized cost breakdown across all 6 core categories',
      'Target vs actual variance tracking',
      'Vendor payment scheduling & receipt consolidation',
      'Tax & gratuity transparency modeling'
    ],
    startingPriceEstimate: 'Included in MOMENTA plan'
  },
  {
    id: 'vendor-coordination',
    name: 'Vendor Coordination',
    category: 'Management',
    shortDescription: 'Bring multiple event service providers together through one convenient platform.',
    fullDescription: 'One single point of contact orchestrating all contracted partners, vendor arrivals, load-in permits, deliveries, and synchronized cue sheets.',
    iconName: 'Users',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Comprehensive vendor run-sheet with minute-by-minute cues',
      'Pre-event vendor briefing & safety protocol checks',
      'Single channel coordination preventing client stress',
      'Post-event breakdown & inventory clearance'
    ],
    startingPriceEstimate: 'Included in MOMENTA plan'
  },
  {
    id: 'invitations-guests',
    name: 'Invitations & Guest Management',
    category: 'Concierge',
    shortDescription: 'Custom digital stationery, RSVP concierge, and seamless attendee communications.',
    fullDescription: 'Design bespoke stationery that sets the tone, paired with a private digital portal for RSVPs, dietary requirements, and itinerary broadcasts.',
    iconName: 'Mail',
    imageUrl: 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Bespoke digital invitations with peach foil aesthetic',
      'Real-time RSVP dashboard & dietary collection',
      'Automated WhatsApp/SMS itinerary reminders',
      'Check-in desk hostesses with tablet verification'
    ],
    startingPriceEstimate: '₹35,000 package'
  },
  {
    id: 'event-staffing',
    name: 'Event Staffing & Hospitality',
    category: 'Operations',
    shortDescription: 'Polished, impeccably trained hosts, attendants, and coordinators on ground.',
    fullDescription: 'Experienced hospitality professionals who handle guest reception, coat check, elder assistance, and behind-the-scenes floor rhythm.',
    iconName: 'Briefcase',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Uniformed hospitality hosts & guest ushers',
      'Dedicated bride/groom or VIP guest shadow',
      'Emergency kit & medical liaison on-site',
      'Backstage greenroom manager'
    ],
    startingPriceEstimate: '₹25,000 / day team'
  },
  {
    id: 'transportation',
    name: 'Transportation & Logistics',
    category: 'Logistics',
    shortDescription: 'Chauffeured luxury transit, airport welcomes, and valet management for guests.',
    fullDescription: 'Coordinated fleet logistics guaranteeing frictionless transit from arrival terminals to the venue gates, backed by professional valet teams.',
    iconName: 'Car',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    deliverables: [
      'Airport pick-up concierge & luxury sedan fleet',
      'Shuttle vans for inter-hotel guest movements',
      'Venue valet parking crew with insurance coverage',
      'Real-time transit updates for key delegates'
    ],
    startingPriceEstimate: '₹40,000 custom fleet'
  }
];

export const VENDORS_DATA: Vendor[] = [
  {
    id: 'v-palazzo',
    name: 'The Tamara Heritage Courtyard',
    category: 'Venues',
    location: 'Jubilee Hills, Hyderabad',
    startingPrice: '₹3,50,000',
    numericStartingPrice: 350000,
    rating: 4.9,
    reviewCount: 78,
    description: 'A 1920s restored stone mansion with warm terracotta arches, sprawling frangipani lawns, and intimate ambient lighting.',
    specialties: ['Up to 450 guests', 'Heritage stone architecture', 'Bridal suites', 'Valet zone'],
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'v-glasshouse',
    name: 'Sylvan Glasshouse & Gardens',
    category: 'Venues',
    location: 'Gandipet Lake, Hyderabad',
    startingPrice: '₹4,20,000',
    numericStartingPrice: 420000,
    rating: 5.0,
    reviewCount: 64,
    description: 'European-style conservatory featuring floor-to-ceiling glass, lakefront views, and climate-controlled tropical foliage.',
    specialties: ['Lakefront sunset view', 'Up to 600 guests', 'Indoor glass atrium', 'Acoustic treatment'],
    imageUrl: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'v-artisancat',
    name: 'Saffron & Sage Fine Catering',
    category: 'Caterers',
    location: 'Banjara Hills, Hyderabad',
    startingPrice: '₹2,200 / plate',
    numericStartingPrice: 2200,
    rating: 4.9,
    reviewCount: 112,
    description: 'Michelin-trained culinary direction crafting Nizami heritage fusion, French patisserie, and artisanal live wood-fired counters.',
    specialties: ['Bespoke plated service', 'Nizami & Continental fusion', 'Zero-waste culinary focus'],
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'v-culinaryatelier',
    name: 'The Epicurean Guild',
    category: 'Caterers',
    location: 'Gachibowli, Hyderabad',
    startingPrice: '₹1,850 / plate',
    numericStartingPrice: 1850,
    rating: 4.8,
    reviewCount: 94,
    description: 'Specialists in interactive grazing tables, molecular canapés, and traditional pan-Indian royal banquets.',
    specialties: ['Artisanal grazing tables', 'Organic farm produce', 'Custom mocktail pairings'],
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'v-blushbotanics',
    name: 'Atelier Peach & Petals',
    category: 'Decorators',
    location: 'Jubilee Hills, Hyderabad',
    startingPrice: '₹2,50,000',
    numericStartingPrice: 250000,
    rating: 4.9,
    reviewCount: 86,
    description: 'Ethereal design house specializing in peach garden roses, brass taper candle installations, and quiet luxury aesthetic.',
    specialties: ['Custom floral canopies', 'Taper candle scapes', 'Linen sourcing', 'Stage architecture'],
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'v-warmstone',
    name: 'Vibe & Verve Spatial Design',
    category: 'Decorators',
    location: 'Kavuri Hills, Hyderabad',
    startingPrice: '₹1,90,000',
    numericStartingPrice: 190000,
    rating: 4.8,
    reviewCount: 53,
    description: 'Modern minimalist design studio bringing warm clay, wicker, woven textiles, and architectural mood lighting together.',
    specialties: ['Warm bohemian chic', 'Bespoke lounge furniture', 'Draping & ceiling installations'],
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'v-lumiere',
    name: 'Lumière Chronicle Studios',
    category: 'Photographers',
    location: 'Banjara Hills, Hyderabad',
    startingPrice: '₹1,20,000 / day',
    numericStartingPrice: 120000,
    rating: 5.0,
    reviewCount: 140,
    description: 'Documentary wedding and editorial event photographers. Known for intimate, timeless portraits with warm analog tones.',
    specialties: ['Editorial 35mm & medium format', '4K cinematic highlights', 'Hand-stitched leather albums'],
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: 'v-cinemastories',
    name: 'Aura Lens Visuals',
    category: 'Photographers',
    location: 'Hitec City, Hyderabad',
    startingPrice: '₹85,000 / day',
    numericStartingPrice: 85000,
    rating: 4.8,
    reviewCount: 71,
    description: 'Contemporary candid storytellers offering drone coverage, same-day highlight reels, and clean natural lighting captures.',
    specialties: ['Same-day social reels', 'Drone photography', 'Unobtrusive shooting style'],
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'v-acousticstrings',
    name: 'Symphony Strings & Jazz Ensemble',
    category: 'DJs & Entertainment',
    location: 'Somajiguda, Hyderabad',
    startingPrice: '₹75,000',
    numericStartingPrice: 75000,
    rating: 4.9,
    reviewCount: 62,
    description: 'Four-piece string quartet transitioning into sultry jazz and bossa nova sets for sundowners and cocktail celebrations.',
    specialties: ['Custom song arrangements', 'Chamber quartet', 'Wireless stage sound'],
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'v-djash',
    name: 'DJ Kabir & The Groove Collective',
    category: 'DJs & Entertainment',
    location: 'Madhapur, Hyderabad',
    startingPrice: '₹95,000',
    numericStartingPrice: 95000,
    rating: 4.9,
    reviewCount: 99,
    description: 'Premier event DJ pairing deep organic house, retro vinyl classics, and infectious modern club anthems.',
    specialties: ['Custom setlists', 'State-of-art audio rig', 'Percussionist accompaniment'],
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'v-petalfarm',
    name: 'Blooms of Ooty & Co.',
    category: 'Florists',
    location: 'Begumpet, Hyderabad',
    startingPrice: '₹80,000',
    numericStartingPrice: 80000,
    rating: 4.9,
    reviewCount: 45,
    description: 'Farm-direct Dutch and Nilgiri blossoms including David Austin roses, tuberoses, orchids, and dried pampas grasses.',
    specialties: ['Zero-plastic foam methods', 'Fragrant native botanicals', 'Tablescape floral runners'],
    imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'v-conciegecrew',
    name: 'Prestige Hostesses & Chaperones',
    category: 'Event Staff',
    location: 'Banjara Hills, Hyderabad',
    startingPrice: '₹45,000',
    numericStartingPrice: 45000,
    rating: 4.8,
    reviewCount: 56,
    description: 'Multilingual, polished hospitality crew experienced in royal protocol, international delegate management, and VIP escorting.',
    specialties: ['Multilingual team', 'Uniform options', 'Guest check-in technology'],
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 'c1', category: 'Venue', title: 'Confirm estate booking & deposit', timeframe: '6 Months Before', completed: true },
  { id: 'c2', category: 'Design', title: 'Finalize peach & cream floral moodboard', timeframe: '4 Months Before', completed: true },
  { id: 'c3', category: 'Catering', title: 'Chef tasting session & beverage pairing', timeframe: '3 Months Before', completed: false },
  { id: 'c4', category: 'Entertainment', title: 'Curate highlight track list with ensemble', timeframe: '2 Months Before', completed: false },
  { id: 'c5', category: 'Stationery', title: 'Dispatch digital invitations with RSVP link', timeframe: '6 Weeks Before', completed: false },
  { id: 'c6', category: 'Logistics', title: 'Finalize guest transportation & valet rosters', timeframe: '2 Weeks Before', completed: false },
  { id: 'c7', category: 'Execution', title: 'Run-through with lead event coordinator', timeframe: '3 Days Before', completed: false },
  { id: 'c8', category: 'Day Of', title: 'Coordinate vendor load-in and sound check', timeframe: 'Event Day', completed: false }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    timeframe: '6+ Months Prior',
    phase: 'Vision & Foundation',
    tasks: ['Lock in date & ideal city location', 'Establish overall budget envelope', 'Contract premier venue space', 'Design concept & color scheme']
  },
  {
    timeframe: '3-4 Months Prior',
    phase: 'Curation & Culinary',
    tasks: ['Select lead caterer & schedule tastings', 'Commission photographer & videographer', 'Audition acoustic musicians or DJ', 'Initiate invitation design']
  },
  {
    timeframe: '1-2 Months Prior',
    phase: 'Refinement & Details',
    tasks: ['Confirm RSVP counts & dietary limits', 'Finalize floral arch & lighting placement', 'Review vendor run-sheets & cue cards', 'Book guest transportation fleet']
  },
  {
    timeframe: 'Event Week & Day',
    phase: 'Flawless Execution',
    tasks: ['Site load-in inspection & acoustic calibration', 'Full hospitality team briefing', 'MOMENTA lead coordinator on ground', 'Live timeline monitoring so you celebrate stress-free']
  }
];

export const SAMPLE_DEFAULT_PLAN = {
  details: {
    eventType: 'Wedding Celebration' as const,
    date: '2026-11-20',
    location: 'Hyderabad, India',
    guestCount: 220
  },
  preferences: {
    venueType: 'Heritage Courtyard & Haveli',
    foodStyle: 'Curated Multi-Course Plated Fine Dining',
    decorAesthetic: 'Warm Candlelit & Timeless Peach Florals',
    photographyStyle: 'Editorial Documentary & Cinematic 4K Film',
    entertainmentType: 'Acoustic Strings & Chamber Quartet',
    specialRequests: 'Sunset ceremony with warm candlelight dinner under bistro arches.'
  },
  totalBudget: 1850000,
  currency: 'INR'
};
