export interface Destination {
  id: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  packageCount: number;
}

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface PricingTier {
  couple: number;
  family: number;
  group: number;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  destination: string; // Destination name
  duration: string; // Format: "X Days / Y Nights"
  durationDays: number; // For filtering/sorting by duration
  price: number; // Starting price
  rating: number;
  tourType: 'Honeymoon' | 'Adventure' | 'Family' | 'Weekend Getaway' | 'Nature' | 'Pilgrimage' | 'Customized';
  images: string[];
  overview: string;
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  pricing: PricingTier;
  popular: boolean;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Main HTML text content
  category: 'Travel Tips' | 'Weekend Getaways' | 'Monsoon Destinations' | 'Family Travel' | 'Adventure Guides';
  author: string;
  date: string;
  image: string;
  readTime: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'beaches' | 'mountains' | 'family' | 'adventure' | 'honeymoon';
}

export interface Testimonial {
  id: string;
  name: string;
  destinationVisited: string;
  rating: number;
  reviewText: string;
  avatarUrl?: string;
}
