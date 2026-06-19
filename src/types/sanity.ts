export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface SanityDestination {
  _id: string;
  _type: 'destination';
  name: string;
  slug: { current: string; _type: 'slug' };
  image: SanityImage;
  description?: string;
  packageCount: number;
}

export interface SanityItineraryItem {
  _key: string;
  day: number;
  title: string;
  description: string;
}

export interface SanityPricingTier {
  couple?: number;
  family?: number;
  group?: number;
}

export interface SanityPackage {
  _id: string;
  _type: 'package';
  title: string;
  slug: { current: string; _type: 'slug' };
  destination: { _ref: string; _type: 'reference' };
  duration: string;
  durationDays: number;
  price: number;
  rating: number;
  tourType: 'Honeymoon' | 'Adventure' | 'Family' | 'Weekend Getaway' | 'Nature' | 'Pilgrimage' | 'Customized';
  featuredImage: SanityImage;
  galleryImages?: SanityImage[];
  overview: string;
  itinerary?: SanityItineraryItem[];
  inclusions?: string[];
  exclusions?: string[];
  pricing?: SanityPricingTier;
  featuredPackage?: boolean;
}

export interface SanityTestimonial {
  _id: string;
  _type: 'testimonial';
  name: string;
  destinationVisited: string;
  rating: number;
  reviewText: string;
  avatar?: SanityImage;
}

export interface SanityBlog {
  _id: string;
  _type: 'blog';
  title: string;
  slug: { current: string; _type: 'slug' };
  excerpt: string;
  content: string;
  category: 'Travel Tips' | 'Weekend Getaways' | 'Monsoon Destinations' | 'Family Travel' | 'Adventure Guides';
  author: string;
  date: string;
  image: SanityImage;
  readTime?: string;
}
