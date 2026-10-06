export type NavigationPage = 
  | 'home' 
  | 'services' 
  | 'how-it-works' 
  | 'plan' 
  | 'vendors' 
  | 'about' 
  | 'contact'
  | 'login'
  | 'signup'
  | 'dashboard';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phoneNumber?: string;
  profilePhoto?: string;
  createdAt: string;
  lastLoginAt: string;
  authProvider: 'google' | 'password' | 'google+password';
}

export type EventType = 
  | 'Wedding Celebration'
  | 'Anniversary Gala'
  | 'Milestone Birthday'
  | 'Corporate Soirée'
  | 'Private Intimate Dinner'
  | 'Cultural Festivity'
  | 'Cocktail Reception';

export interface EventDetailsForm {
  eventType: EventType;
  date: string;
  location: string;
  guestCount: number;
}

export interface EventPreferencesForm {
  venueType: string;
  foodStyle: string;
  decorAesthetic: string;
  photographyStyle: string;
  entertainmentType: string;
  specialRequests: string;
}

export interface BudgetAllocation {
  venue: number;
  food: number;
  decoration: number;
  photography: number;
  entertainment: number;
  other: number;
}

export interface EventPlan {
  id: string;
  createdAt: string;
  details: EventDetailsForm;
  preferences: EventPreferencesForm;
  totalBudget: number;
  currency: string;
  allocation: BudgetAllocation;
  recommendedServices: string[];
  suggestedVendors: Vendor[];
  checklist: ChecklistItem[];
  timelineMilestones: TimelineMilestone[];
}

export interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  timeframe: string;
  completed: boolean;
}

export interface TimelineMilestone {
  timeframe: string;
  phase: string;
  tasks: string[];
}

export interface Vendor {
  id: string;
  name: string;
  category: 'Venues' | 'Caterers' | 'Decorators' | 'Photographers' | 'DJs & Entertainment' | 'Florists' | 'Event Staff';
  location: string;
  startingPrice: string;
  numericStartingPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  specialties: string[];
  imageUrl: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  imageUrl: string;
  deliverables: string[];
  startingPriceEstimate: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  message: string;
}
