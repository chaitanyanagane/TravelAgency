export interface HotelOption {
  tier: 'standard' | 'premium' | 'luxury';
  name: string;
  stars: number;
  roomType: string;
  location: string;
  amenities: string[];
  image: string;
}

export interface PackageFaq {
  question: string;
  answer: string;
}

// Custom hotel mappings for popular destinations
const destinationHotels: Record<string, HotelOption[]> = {
  'Coorg': [
    {
      tier: 'standard',
      name: 'Ibbani Cadu Homestay / Cozy Nest',
      stars: 3,
      roomType: 'Standard Valley View Room',
      location: 'Madikeri, Coorg',
      amenities: ['Free Wi-Fi', 'Breakfast Included', 'Bonfire Area', 'Attached Balcony'],
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=400&q=80',
    },
    {
      tier: 'premium',
      name: 'The Windflower Resorts & Spa',
      stars: 4,
      roomType: 'Studio Villa',
      location: 'Suntikoppa, Coorg',
      amenities: ['Swimming Pool', 'Multi-cuisine Restaurant', 'Spa Services', 'Coffee Estate Walk'],
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80',
    },
    {
      tier: 'luxury',
      name: 'Coorg Wilderness Resort / Evolve Back',
      stars: 5,
      roomType: 'Grove View Suite with Plunge Pool',
      location: 'Virajpet, Coorg',
      amenities: ['Private Heated Pool', 'Fine Dining', 'Luxury Spa', 'Estate Trekking', 'AC & Bath Tub'],
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80',
    },
  ],
  'Kerala': [
    {
      tier: 'standard',
      name: 'Munnar Terrace Greens / Whispering Meadows',
      stars: 3,
      roomType: 'Deluxe Cottage',
      location: 'Chithirapuram, Munnar',
      amenities: ['Valley View', 'Restaurant', 'Free Wi-Fi', 'Travel Desk'],
      image: 'https://images.unsplash.com/photo-1593693411515-c202e974eb8f?auto=format&fit=crop&w=400&q=80',
    },
    {
      tier: 'premium',
      name: 'Spice Village CGH Earth',
      stars: 4,
      roomType: 'Garden Villa',
      location: 'Thekkady, Kerala',
      amenities: ['Eco Swimming Pool', 'Spice Plantation Walk', 'Traditional Dining', 'Ayurvedic Center'],
      image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=400&q=80',
    },
    {
      tier: 'luxury',
      name: 'Kumarakom Lake Resort / Scenic Elixir',
      stars: 5,
      roomType: 'Heritage Lake View Villa with Private Pool',
      location: 'Kumarakom Backwaters, Kerala',
      amenities: ['Private Pool', 'Sunset Cruise', 'Luxury Dining', 'Yoga & Meditation Center', 'Jacuzzi'],
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80',
    },
  ],
};

// General FAQ lists based on package characteristics
const generalFaqs = [
  {
    question: 'Are flight/train tickets included in the package price?',
    answer: 'No, the listed pricing is for land packages only. It includes hotel stays, private cabs, drivers, site entrance fees (as listed in inclusions), and breakfasts. We can assist you in booking flights or train tickets at actual charges if requested.',
  },
  {
    question: 'Can we customize the day-wise itinerary?',
    answer: 'Absolutely! All our tour packages are 100% customizable. You can add extra days, change standard hotels to luxury villas, change destinations, or customize sightseeing priorities. Contact our travel specialist on WhatsApp or submit the inquiry form to request custom modifications.',
  },
  {
    question: 'What type of vehicle is provided for transfers?',
    answer: 'For couples (2 pax), we provide an AC Sedan (e.g. Maruti Dzire or Toyota Etios). For families and small groups (4-6 pax), we provide an AC SUV (e.g. Toyota Innova or Ertiga). All vehicles are private, clean, and driven by experienced tour drivers.',
  },
  {
    question: 'What is the booking process and cancellation policy?',
    answer: 'To book, you pay a 30% advance deposit. The remaining 70% is due 7 days before departure. Cancellations made 30+ days prior to travel receive a 90% refund. Cancellations made 15-30 days prior receive a 50% refund. No refunds are available for cancellations within 14 days of travel.',
  },
  {
    question: 'Is room heater or breakfast included in hotels?',
    answer: 'Daily breakfast is included at all hotels. Dinner inclusion depends on the selected package tier. Room heaters are subject to availability and might be charged extra directly by hotels in high-altitude cold destinations.',
  },
];

const destinationSpecificFaqs: Record<string, PackageFaq[]> = {
  'Coorg': [
    ...generalFaqs.slice(0, 3),
    {
      question: 'Which is the best season to visit Coorg?',
      answer: 'Coorg is a year-round destination, but October to May is the most popular period for pleasant sightseeing. Monsoon (July to September) is spectacular if you love lush greenery, misty hills, and active waterfalls, though trekking might be restricted.',
    },
    {
      question: 'Is Mandalpatti Jeep Safari suitable for senior citizens or toddlers?',
      answer: 'The Mandalpatti Jeep Safari involves a bumpy, off-road ride in a open 4x4 vehicle. It may not be comfortable for pregnant women, infants under 2 years, or individuals with severe back problems. Gentle alternative valley view drives can be arranged instead.',
    },
    ...generalFaqs.slice(3),
  ],
  'Kerala': [
    ...generalFaqs.slice(0, 3),
    {
      question: 'What are the AC timings in the Alleppey Houseboat?',
      answer: 'For Standard and Premium houseboats, AC is operational in the bedrooms from 9:00 PM to 6:00 AM. For Luxury and Premium Glass houseboats, full-time 24-hour AC is operational throughout the lobby and bedrooms.',
    },
    {
      question: 'What type of food is served on the houseboat?',
      answer: 'Freshly prepared traditional Kerala cuisine is served on board (Lunch, Evening Tea/Snacks, Dinner, and Breakfast). Both vegetarian and non-vegetarian options (including local Karimeen fish fry) are prepared by the onboard chef based on your preferences.',
    },
    ...generalFaqs.slice(3),
  ],
};

/**
 * Returns accommodations options for a package.
 * Automatically generates fallback names if a specific destination map doesn't exist.
 */
export function getAccommodationsForPackage(slug: string, destination: string): HotelOption[] {
  const found = destinationHotels[destination];
  if (found) return found;

  // Generate clean fallback hotel information
  return [
    {
      tier: 'standard',
      name: `${destination} Inn & Retreat`,
      stars: 3,
      roomType: 'Deluxe Room',
      location: `${destination}, India`,
      amenities: ['AC Room', 'Breakfast Included', 'Free Wi-Fi', 'Room Service'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
    },
    {
      tier: 'premium',
      name: `${destination} Grand Resort & Spa`,
      stars: 4,
      roomType: 'Premium Cottage',
      location: `${destination}, India`,
      amenities: ['Swimming Pool', 'Multi-cuisine Restaurant', 'Spa Facility', 'Valley/Garden View'],
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80',
    },
    {
      tier: 'luxury',
      name: `${destination} Sanctuary & Villas`,
      stars: 5,
      roomType: 'Private Pool Villa',
      location: `${destination}, India`,
      amenities: ['Private Plunge Pool', 'Luxury Spa treatments', 'Personal Butler', 'Fine Dining', 'All Inclusive Perks'],
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80',
    },
  ];
}

/**
 * Returns FAQ items for a package.
 */
export function getFaqsForPackage(slug: string, destination: string): PackageFaq[] {
  return destinationSpecificFaqs[destination] || generalFaqs;
}
