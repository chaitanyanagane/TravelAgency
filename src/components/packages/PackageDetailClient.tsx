'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  Star, 
  Clock, 
  Coffee, 
  Car, 
  ChevronDown, 
  HelpCircle,
  Building,
  Check,
  X
} from 'lucide-react';
import { Package } from '../../types';
import InquiryForm from '@/components/common/InquiryForm';
import { getAccommodationsForPackage, getFaqsForPackage } from '@/data/packageExtras';

interface PackageDetailClientProps {
  tour: Package;
}

export default function PackageDetailClient({ tour }: PackageDetailClientProps) {
  const { title, destination, duration, price, rating, tourType, images, overview, itinerary, inclusions, exclusions } = tour;
  const pricing = tour.pricing || { couple: null, family: null, group: null };
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true });
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeHotelTier, setActiveHotelTier] = useState<'standard' | 'premium' | 'luxury'>('premium');

  const accommodations = getAccommodationsForPackage(tour.slug, tour.destination);
  const faqs = getFaqsForPackage(tour.slug, tour.destination);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919270267390';

  const toggleDay = (day: number) => {
    setExpandedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Pre-filled WhatsApp message URL builder
  const getWhatsAppLink = () => {
    const text = `*Inquiry for ${title}*\n\n` +
                 `Hello Saachi Tour & Travel, I am looking to inquire about the *${title}* (${duration}) package starting from ₹${price?.toLocaleString('en-IN') || 'On Request'}/person. Please share details.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const scrollToInquiry = () => {
    const element = document.getElementById('inquiry-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 pb-24 lg:pb-0">
      {/* 1. HERO SECTION & GALLERY GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Package Headings & Badges */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="flex flex-wrap gap-2.5">
            <span className="px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider">
              {tourType}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
              <span>{rating.toFixed(1)} / 5.0 Rating</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display leading-tight">
            {title}
          </h1>

          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Experience the ultimate vacation curated by our tour design specialists. Includes private transport, premium accommodation choices, daily breakfast, and guided sightseeing.
          </p>

          <div className="grid grid-cols-3 gap-4 border-t border-b border-slate-800/80 py-5">
            <div className="text-center lg:text-left">
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Destination</span>
              <span className="text-sm font-bold text-white flex items-center justify-center lg:justify-start space-x-1">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{destination}</span>
              </span>
            </div>
            <div className="text-center lg:text-left border-l border-r border-slate-850 px-2">
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Duration</span>
              <span className="text-sm font-bold text-white flex items-center justify-center lg:justify-start space-x-1">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{duration}</span>
              </span>
            </div>
            <div className="text-center lg:text-left">
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Tour Scheme</span>
              <span className="text-sm font-bold text-white flex items-center justify-center lg:justify-start space-x-1">
                <Users className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Private / Custom</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <span className="block text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Starting Price</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-400">
                ₹{price?.toLocaleString('en-IN') || 'On Request'}
              </span>
              <span className="text-xs text-slate-400 font-light"> / adult</span>
            </div>
            <div className="flex-1">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm text-center"
              >
                {/* Custom WhatsApp SVG */}
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.455 4.75 1.458 5.41.002 9.813-4.394 9.815-9.81.002-2.624-1.013-5.093-2.857-6.937C16.452 1.99 13.985.992 11.99.992c-5.41 0-9.813 4.402-9.815 9.811-.002 1.702.463 3.364 1.34 4.8l-.995 3.634 3.737-.98zM17.65 14.5c-.296-.148-1.748-.863-2.018-.962-.27-.099-.467-.148-.662.149-.195.297-.757.962-.927 1.16-.17.199-.34.223-.636.075-.296-.148-1.252-.462-2.385-1.474-.88-.784-1.474-1.752-1.647-2.05-.173-.296-.018-.457.13-.605.134-.133.296-.347.444-.52.149-.173.197-.297.296-.495.099-.198.05-.371-.025-.52-.075-.148-.662-1.597-.907-2.19-.239-.575-.48-.497-.661-.506-.171-.007-.367-.009-.563-.009-.195 0-.514.074-.783.371-.269.297-1.026 1.003-1.026 2.447 0 1.444 1.05 2.838 1.197 3.037.147.197 2.067 3.156 5.007 4.428.699.303 1.246.484 1.671.619.704.223 1.345.191 1.852.115.565-.084 1.748-.715 1.992-1.402.244-.687.244-1.277.171-1.402-.072-.124-.268-.198-.564-.347z"/>
                </svg>
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Premium Gallery Component */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-900/80 shadow-2xl">
            <Image
              src={images[activeImageIndex] || images[0]}
              alt={`${title} main view`}
              fill
              className="object-cover transition-all duration-500 ease-in-out"
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
            />
            
            {/* Slide indicators overlays */}
            <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800 text-[11px] text-slate-300 font-semibold tracking-wider uppercase">
              Image {activeImageIndex + 1} of {images.length}
            </div>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto py-1 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-teal-500 scale-95 shadow-md shadow-teal-900/20' : 'border-slate-850 hover:border-slate-700'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${title} thumbnail ${idx + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  {activeImageIndex !== idx && (
                    <div className="absolute inset-0 bg-slate-950/30 hover:bg-transparent transition-colors" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. SPLIT LAYOUT (MAIN CONTENT vs STICKY SIDEBAR) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN - TOUR DETAILS (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* PACKAGE OVERVIEW */}
          <section className="bg-slate-900/30 border border-slate-850 rounded-3xl p-5 sm:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white font-display flex items-center space-x-2.5">
              <span className="w-1.5 h-6 bg-teal-500 rounded-full inline-block"></span>
              <span>Tour Overview</span>
            </h2>
            <p className="text-slate-350 text-sm sm:text-base font-light leading-relaxed">
              {overview}
            </p>

            {/* Quick Amenities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-slate-850">
              <div className="bg-slate-950/50 border border-slate-850 rounded-2xl p-3 sm:p-4 flex items-center space-x-2.5 sm:space-x-3">
                <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 shrink-0" />
                <div>
                  <span className="block text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Meals</span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-200">Daily Breakfast</span>
                </div>
              </div>
              <div className="bg-slate-950/50 border border-slate-850 rounded-2xl p-3 sm:p-4 flex items-center space-x-2.5 sm:space-x-3">
                <Car className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 shrink-0" />
                <div>
                  <span className="block text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Transfers</span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-200">Private AC Cab</span>
                </div>
              </div>
              <div className="bg-slate-950/50 border border-slate-850 rounded-2xl p-3 sm:p-4 flex items-center space-x-2.5 sm:space-x-3">
                <Building className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 shrink-0" />
                <div>
                  <span className="block text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Stay Standard</span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-200">Premium / Custom</span>
                </div>
              </div>
              <div className="bg-slate-950/50 border border-slate-850 rounded-2xl p-3 sm:p-4 flex items-center space-x-2.5 sm:space-x-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 shrink-0" />
                <div>
                  <span className="block text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Security</span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-200">24/7 Assistance</span>
                </div>
              </div>
            </div>
          </section>

          {/* DAY-WISE ITINERARY (TIMELINE VIEW) */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white font-display flex items-center space-x-2.5">
              <span className="w-1.5 h-6 bg-teal-500 rounded-full inline-block"></span>
              <span>Day-wise Itinerary</span>
            </h2>

            <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-6 ml-4">
              {itinerary.map((item) => {
                const isExpanded = expandedDays[item.day] ?? false;
                return (
                  <div key={item.day} className="relative">
                    {/* Stepper Dot */}
                    <button
                      onClick={() => toggleDay(item.day)}
                      className={`absolute -left-[39px] sm:-left-[47px] top-1 w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none ${
                        isExpanded
                          ? 'bg-teal-500 border-teal-400 text-slate-950 shadow-md shadow-teal-500/20'
                          : 'bg-slate-900 border-slate-850 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold">{item.day}</span>
                    </button>

                    {/* Timeline Card */}
                    <div className="bg-slate-900/40 border border-slate-850 rounded-2xl hover:border-slate-800 overflow-hidden transition-all duration-300">
                      <summary 
                        onClick={() => toggleDay(item.day)}
                        className="flex items-center justify-between p-5 select-none cursor-pointer focus:outline-none"
                      >
                        <h3 className="text-sm sm:text-base font-bold text-white hover:text-teal-400 transition-colors pr-4">
                          Day {item.day}: {item.title}
                        </h3>
                        <ChevronDown 
                          className={`w-4 h-4 text-slate-500 transition-transform duration-300 shrink-0 ${
                            isExpanded ? 'rotate-180 text-teal-400' : ''
                          }`} 
                        />
                      </summary>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-slate-900 text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                              {item.description}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* HOTELS & ACCOMMODATION RECOMMENDATIONS */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-white font-display flex items-center space-x-2.5">
                <span className="w-1.5 h-6 bg-teal-500 rounded-full inline-block"></span>
                <span>Recommended Accommodation</span>
              </h2>

              {/* Tier Selector Tabs */}
              <div className="bg-slate-950 border border-slate-850 p-1 rounded-xl flex space-x-1 self-start sm:self-center shrink-0">
                {(['standard', 'premium', 'luxury'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setActiveHotelTier(tier)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none ${
                      activeHotelTier === tier
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel Cards Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accommodations.map((hotel) => {
                const isSelected = activeHotelTier === hotel.tier;
                return (
                  <div
                    key={hotel.tier}
                    onClick={() => setActiveHotelTier(hotel.tier)}
                    className={`bg-slate-900 border rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 group flex flex-col justify-between ${
                      isSelected
                        ? 'border-teal-500 ring-2 ring-teal-500/20 shadow-xl scale-[1.01]'
                        : 'border-slate-850/60 hover:border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div>
                      {/* Hotel Photo */}
                      <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] uppercase font-bold tracking-wider text-teal-400">
                          {hotel.tier}
                        </div>
                      </div>

                      {/* Hotel Copy */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-amber-400 flex items-center">
                            {Array.from({ length: hotel.stars }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current shrink-0" />
                            ))}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                            {hotel.stars} Star Property
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-teal-400 transition-colors">
                          {hotel.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{hotel.location}</span>
                        </p>
                        <div className="border-t border-slate-950 pt-3 space-y-1">
                          <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold">Room Category</span>
                          <span className="text-xs font-semibold text-slate-300">{hotel.roomType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Amenities Checklist */}
                    <div className="px-5 pb-5 pt-0">
                      <div className="bg-slate-950/60 border border-slate-850/60 rounded-xl p-3.5 space-y-2">
                        <span className="block text-[8px] uppercase tracking-wider text-slate-500 font-bold">Inclusions</span>
                        <ul className="space-y-1.5">
                          {hotel.amenities.map((item, i) => (
                            <li key={i} className="flex items-start space-x-1.5 text-[10px] text-slate-400 font-light">
                              <Check className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* INCLUSIONS & EXCLUSIONS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Inclusions Card */}
            <div className="bg-slate-900/30 border border-slate-850 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center space-x-2.5 text-teal-400 font-bold">
                <div className="w-8 h-8 rounded-lg bg-teal-950/50 flex items-center justify-center border border-teal-500/20">
                  <Check className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">Inclusions</h3>
              </div>
              <ul className="space-y-3">
                {inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-350 font-light">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions Card */}
            <div className="bg-slate-900/30 border border-slate-850 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center space-x-2.5 text-amber-500 font-bold">
                <div className="w-8 h-8 rounded-lg bg-amber-950/50 flex items-center justify-center border border-amber-500/20">
                  <X className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">Exclusions</h3>
              </div>
              <ul className="space-y-3">
                {exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-350 font-light">
                    <AlertTriangle className="w-4 h-4 text-amber-550 shrink-0 mt-0.5" />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* DETAILED PRICING BREAKDOWN */}
          <section className="bg-slate-900/30 border border-slate-850 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white font-display flex items-center space-x-2.5">
              <span className="w-1.5 h-6 bg-teal-500 rounded-full inline-block"></span>
              <span>Pricing Packages</span>
            </h2>
            <p className="text-xs text-slate-500 font-light">
              *All prices are in Indian Rupees (INR) and calculated per person. Stated rates are valid for non-holiday dates. Rates may fluctuate based on room availability and seasonal flight/hotel surcharges.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { type: 'Couple Occupancy', priceVal: pricing?.couple, desc: 'Assuming 2 persons sharing one room with private cab transfers.' },
                { type: 'Family Plan', priceVal: pricing?.family, desc: 'Per person assuming 4 adults traveling together, sharing two rooms.' },
                { type: 'Group Occupancy', priceVal: pricing?.group, desc: 'Per person assuming 6+ adults traveling together, sharing three rooms.' },
              ].map((tier, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 border border-slate-850 hover:border-slate-800 rounded-2xl p-5 text-center flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
                >
                  <div className="space-y-1">
                    <span className="block text-xs text-slate-500 font-semibold uppercase tracking-wider">{tier.type}</span>
                    <p className="text-[10px] text-slate-400 font-light leading-relaxed px-1">
                      {tier.desc}
                    </p>
                  </div>
                  <div className="space-y-1 border-t border-slate-900 pt-3">
                    <span className="block text-2xl font-extrabold text-teal-400">
                      {tier.priceVal ? `₹${tier.priceVal.toLocaleString('en-IN')}` : 'On Request'}
                    </span>
                    <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                      {tier.priceVal ? 'Per Person Starting' : 'Contact Us'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ ACCORDION SECTION */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white font-display flex items-center space-x-2.5">
              <span className="w-1.5 h-6 bg-teal-500 rounded-full inline-block"></span>
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="bg-slate-900/40 border border-slate-850 hover:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-5 select-none focus:outline-none text-left"
                    >
                      <div className="flex items-center space-x-3.5 pr-4">
                        <HelpCircle className="w-4 h-4 text-teal-500 shrink-0" />
                        <span className="text-sm font-bold text-white hover:text-teal-400 transition-colors">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown 
                        className={`w-4 h-4 text-slate-500 transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180 text-teal-400' : ''
                        }`} 
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-slate-900 text-xs sm:text-sm text-slate-400 font-light leading-relaxed pl-13">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN - STICKY BOOKING FORM SIDEBAR (lg:col-span-4) */}
        <aside id="inquiry-section" className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="space-y-1.5 border-b border-slate-850 pb-5">
              <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">Estimated Pricing</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold text-teal-400">
                  ₹{price?.toLocaleString('en-IN') || 'On Request'}
                </span>
                <span className="text-xs text-slate-400">/ person starting</span>
              </div>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed pt-1">
                Custom private travel package. Stays in handpicked resorts, AC transportation, and dedicated itinerary customization.
              </p>
            </div>

            {/* Direct WhatsApp Call-to-action button */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Quick Consultation</h3>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-emerald-950/20 flex items-center justify-center space-x-2 text-sm text-center"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.455 4.75 1.458 5.41.002 9.813-4.394 9.815-9.81.002-2.624-1.013-5.093-2.857-6.937C16.452 1.99 13.985.992 11.99.992c-5.41 0-9.813 4.402-9.815 9.811-.002 1.702.463 3.364 1.34 4.8l-.995 3.634 3.737-.98zM17.65 14.5c-.296-.148-1.748-.863-2.018-.962-.27-.099-.467-.148-.662.149-.195.297-.757.962-.927 1.16-.17.199-.34.223-.636.075-.296-.148-1.252-.462-2.385-1.474-.88-.784-1.474-1.752-1.647-2.05-.173-.296-.018-.457.13-.605.134-.133.296-.347.444-.52.149-.173.197-.297.296-.495.099-.198.05-.371-.025-.52-.075-.148-.662-1.597-.907-2.19-.239-.575-.48-.497-.661-.506-.171-.007-.367-.009-.563-.009-.195 0-.514.074-.783.371-.269.297-1.026 1.003-1.026 2.447 0 1.444 1.05 2.838 1.197 3.037.147.197 2.067 3.156 5.007 4.428.699.303 1.246.484 1.671.619.704.223 1.345.191 1.852.115.565-.084 1.748-.715 1.992-1.402.244-.687.244-1.277.171-1.402-.072-.124-.268-.198-.564-.347z"/>
                </svg>
                <span>Inquire via WhatsApp</span>
              </a>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-850"></div>
              <span className="flex-shrink mx-4 text-slate-600 text-[10px] font-bold uppercase tracking-wider">Or Submit Details</span>
              <div className="flex-grow border-t border-slate-850"></div>
            </div>

            {/* Mount our production-ready validation inquiry form */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-display">Plan Custom Trip</h3>
              <InquiryForm defaultDestination={title} />
            </div>
          </div>

          {/* Secure Guarantee Box */}
          <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-5 space-y-2.5">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5">
              <Shield className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Saachi Trust Guarantee</span>
            </span>
            <p className="text-slate-400 text-[11px] font-light leading-relaxed">
              No reservation fees are collected online. Our travel specialist coordinates hotel check-ins and private transportation availability before providing payment invoice options.
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-900/80 px-4 py-3 shadow-2xl flex items-center justify-between gap-2.5">
        <div className="flex flex-col justify-center text-left">
          <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Starting Price</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-base sm:text-lg font-extrabold text-teal-400">₹{price?.toLocaleString('en-IN') || 'On Request'}</span>
            <span className="text-[8px] sm:text-[9px] text-slate-405">/ adult</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition-all shadow-md flex items-center justify-center shrink-0"
            aria-label="Inquire via WhatsApp"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.16 1.455 4.75 1.458 5.41.002 9.813-4.394 9.815-9.81.002-2.624-1.013-5.093-2.857-6.937C16.452 1.99 13.985.992 11.99.992c-5.41 0-9.813 4.402-9.815 9.811-.002 1.702.463 3.364 1.34 4.8l-.995 3.634 3.737-.98zM17.65 14.5c-.296-.148-1.748-.863-2.018-.962-.27-.099-.467-.148-.662.149-.195.297-.757.962-.927 1.16-.17.199-.34.223-.636.075-.296-.148-1.252-.462-2.385-1.474-.88-.784-1.474-1.752-1.647-2.05-.173-.296-.018-.457.13-.605.134-.133.296-.347.444-.52.149-.173.197-.297.296-.495.099-.198.05-.371-.025-.52-.075-.148-.662-1.597-.907-2.19-.239-.575-.48-.497-.661-.506-.171-.007-.367-.009-.563-.009-.195 0-.514.074-.783.371-.269.297-1.026 1.003-1.026 2.447 0 1.444 1.05 2.838 1.197 3.037.147.197 2.067 3.156 5.007 4.428.699.303 1.246.484 1.671.619.704.223 1.345.191 1.852.115.565-.084 1.748-.715 1.992-1.402.244-.687.244-1.277.171-1.402-.072-.124-.268-.198-.564-.347z"/>
            </svg>
          </a>
          <button
            onClick={scrollToInquiry}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2.5 px-3 sm:px-5 rounded-xl text-[11px] sm:text-xs md:text-sm transition-all shadow-md shadow-teal-950/20 active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer shrink-0"
          >
            <span>Book / Plan Trip</span>
          </button>
        </div>
      </div>
    </div>
  );
}
