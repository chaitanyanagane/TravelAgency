'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Shield, CheckCircle2, AlertTriangle, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { Package } from '../../types';

interface PackageDetailClientProps {
  tour: Package;
}

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  travelers: number;
  requirements: string;
}

export default function PackageDetailClient({ tour }: PackageDetailClientProps) {
  const { title, destination, duration, price, rating, tourType, images, overview, itinerary, inclusions, exclusions, pricing } = tour;
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormData>();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919823997276';
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'varshaagaikwad563@gmail.com';

  const onSubmit = (data: InquiryFormData) => {
    setFormData(data);
    setIsSubmitted(true);
  };

  const triggerWhatsAppSubmit = () => {
    if (!formData) return;
    const text = `*New Package Inquiry*\n\n` +
                 `*Package:* ${title}\n` +
                 `*Destination:* ${destination}\n` +
                 `*Name:* ${formData.name}\n` +
                 `*Email:* ${formData.email}\n` +
                 `*Phone:* ${formData.phone}\n` +
                 `*Date of Travel:* ${formData.travelDate}\n` +
                 `*No. of Travelers:* ${formData.travelers}\n` +
                 `*Special Requests:* ${formData.requirements || 'None'}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    handleReset();
  };

  const triggerEmailSubmit = () => {
    if (!formData) return;
    const subject = `Saachi Tour & Travel Package Inquiry - ${title}`;
    const body = `Package: ${title}\n` +
                 `Destination: ${destination}\n` +
                 `Name: ${formData.name}\n` +
                 `Email: ${formData.email}\n` +
                 `Phone: ${formData.phone}\n` +
                 `Travel Date: ${formData.travelDate}\n` +
                 `Travelers: ${formData.travelers}\n` +
                 `Special Requirements: ${formData.requirements || 'None'}`;
    const url = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_self');
    handleReset();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData(null);
    reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
      {/* Left Column: Details */}
      <div className="lg:col-span-2 space-y-10">
        
        {/* Gallery Section */}
        <div className="space-y-3">
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-900 shadow-md">
            <Image
              src={images[activeImageIndex] || images[0]}
              alt={`${title} - Photo ${activeImageIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
              priority
              fetchPriority="high"
            />
          </div>
          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-teal-500 scale-95 shadow-md' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${title} thumbnail ${idx + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Overview Details cards */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider">
              {tourType}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
              ★ {rating.toFixed(1)} / 5.0
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            {title}
          </h1>

          <div className="grid grid-cols-3 gap-4 bg-slate-900/60 border border-slate-850 rounded-2xl p-4 text-center">
            <div>
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Destination</span>
              <span className="text-sm font-bold text-white flex items-center justify-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{destination}</span>
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Duration</span>
              <span className="text-sm font-bold text-white flex items-center justify-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{duration}</span>
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Group Type</span>
              <span className="text-sm font-bold text-white flex items-center justify-center space-x-1">
                <Users className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Custom Private</span>
              </span>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white font-display">Tour Overview</h2>
          <p className="text-slate-300 font-light leading-relaxed text-sm sm:text-base">
            {overview}
          </p>
        </div>

        {/* Itinerary Accordions using details disclosure */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white font-display">Day-wise Itinerary</h2>
          
          <div className="space-y-4">
            {itinerary.map((item, idx) => (
              <details
                key={item.day}
                name="itinerary-accordion"
                className="disclosure group border border-slate-850 hover:border-slate-800 bg-slate-900/40 rounded-2xl overflow-hidden transition-all duration-300"
                open={idx === 0}
              >
                <summary className="flex items-center justify-between p-5 select-none focus:outline-none">
                  <div className="flex items-center space-x-4">
                    <span className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 font-bold flex items-center justify-center shrink-0 text-sm">
                      D{item.day}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-teal-400 transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-slate-500 group-open:rotate-180 transition-transform duration-300 font-bold text-lg select-none">
                    &darr;
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-1 border-t border-slate-900 text-xs sm:text-sm text-slate-400 font-light leading-relaxed pl-16">
                  {item.description}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Inclusions */}
          <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-teal-400 font-bold">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <h3 className="text-lg font-display">Tour Inclusions</h3>
            </div>
            <ul className="space-y-2.5">
              {inclusions.map((inc, i) => (
                <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300 font-light">
                  <span className="text-teal-500 shrink-0 font-bold mt-0.5">•</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-2 text-amber-500 font-bold">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="text-lg font-display">Tour Exclusions</h3>
            </div>
            <ul className="space-y-2.5">
              {exclusions.map((exc, i) => (
                <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300 font-light">
                  <span className="text-amber-500 shrink-0 font-bold mt-0.5">•</span>
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing Categories */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white font-display">Custom Private Pricing</h2>
          <p className="text-slate-500 text-xs font-light">
            *Pricing details are calculated per-person depending on selected occupancy/vehicle sharing. High season rates may apply.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: 'Couple Sharing', priceVal: pricing.couple, label: 'Perfect for Honeymooners' },
              { type: 'Family Package', priceVal: pricing.family, label: 'Per person (assuming 4 pax)' },
              { type: 'Group Rate', priceVal: pricing.group, label: 'Per person (assuming 6+ pax)' },
            ].map((tier, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800/80 hover:border-slate-800 rounded-2xl p-5 text-center space-y-2 transition-colors shadow-sm"
              >
                <span className="block text-xs text-slate-500 font-semibold uppercase tracking-wider">{tier.type}</span>
                <span className="block text-2xl font-extrabold text-teal-400">
                  ₹{tier.priceVal.toLocaleString('en-IN')}
                </span>
                <span className="block text-[10px] text-slate-400 font-light">{tier.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Inquiry Form Card */}
      <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
        {/* Sticky inquiry card */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-lg space-y-6">
          <div className="space-y-2">
            <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">Package Pricing</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-teal-400">
                ₹{price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500">/ person starting</span>
            </div>
            <span className="block text-xs text-slate-400 font-light border-b border-slate-800 pb-3">
              Includes hotel stay, AC private transfers, and sightseeings.
            </span>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">Inquire About This Tour</h3>

              {/* Name */}
              <div className="space-y-1">
                <label htmlFor="name" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 transition-colors"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className="text-red-400 text-[10px] block font-medium">{errors.name.message}</span>}
              </div>

              {/* Mobile */}
              <div className="space-y-1">
                <label htmlFor="phone" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Mobile Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter mobile number"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 transition-colors"
                  {...register('phone', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^[0-9+-\s]{10,15}$/,
                      message: 'Invalid phone number',
                    },
                  })}
                />
                {errors.phone && <span className="text-red-400 text-[10px] block font-medium">{errors.phone.message}</span>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 transition-colors"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && <span className="text-red-400 text-[10px] block font-medium">{errors.email.message}</span>}
              </div>

              {/* Travel Date */}
              <div className="space-y-1">
                <label htmlFor="travelDate" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Preferred Travel Date</label>
                <input
                  id="travelDate"
                  type="date"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-medium transition-colors"
                  {...register('travelDate', { required: 'Date is required' })}
                />
                {errors.travelDate && <span className="text-red-400 text-[10px] block font-medium">{errors.travelDate.message}</span>}
              </div>

              {/* Travelers */}
              <div className="space-y-1">
                <label htmlFor="travelers" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Number of Travelers</label>
                <input
                  id="travelers"
                  type="number"
                  min={1}
                  max={99}
                  defaultValue={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 transition-colors"
                  {...register('travelers', {
                    required: 'Required',
                    valueAsNumber: true,
                    min: { value: 1, message: 'Minimum 1 traveler' },
                  })}
                />
                {errors.travelers && <span className="text-red-400 text-[10px] block font-medium">{errors.travelers.message}</span>}
              </div>

              {/* Special Requirements */}
              <div className="space-y-1">
                <label htmlFor="requirements" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Special Requests</label>
                <textarea
                  id="requirements"
                  rows={2}
                  placeholder="E.g., child seat, extra room, specific meal preferences..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 transition-colors resize-none"
                  {...register('requirements')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 text-xs shadow-md"
              >
                <span>{isSubmitting ? 'Verifying...' : 'Validate Inquiry'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="w-12 h-12 bg-teal-950/40 text-teal-400 border border-teal-500/20 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-display">Inquiry Validated!</h4>
                <p className="text-[10px] text-slate-500 font-light">
                  Submit details to our tour manager via WhatsApp or Email client.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={triggerWhatsAppSubmit}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 text-xs shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Submit via WhatsApp</span>
                </button>
                <button
                  onClick={triggerEmailSubmit}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 text-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>Submit via Email Client</span>
                </button>
                <button
                  onClick={handleReset}
                  className="w-full text-slate-500 hover:text-slate-400 text-[10px] font-semibold pt-1"
                >
                  Edit details
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Small Trust Seal info */}
        <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-5 space-y-3">
          <span className="block text-xs font-bold text-white font-display flex items-center space-x-1.5">
            <Shield className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Booking Information</span>
          </span>
          <p className="text-slate-400 text-[11px] font-light leading-relaxed">
            All vacations are fully private. We coordinate clean SUVs and premium room check-ins. No payments are collected on this website. Our team will verify room availability before issuing invoice options.
          </p>
        </div>
      </div>
    </div>
  );
}
