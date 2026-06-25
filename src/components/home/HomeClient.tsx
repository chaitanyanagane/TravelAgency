'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ShieldCheck, Map, Clock, ArrowRight, MessageCircle, Phone, Users, Heart, Plane, Sparkles } from 'lucide-react';
import { galleryItems } from '@/data/gallery';
import PackageCard from '@/components/packages/PackageCard';
import JSONLD from '@/components/common/JSONLD';
import { Package, Destination, Testimonial, Blog } from '@/types';

interface HomeClientProps {
  featuredPackages: Package[];
  featuredDestinations: Destination[];
  testimonials: Testimonial[];
  featuredBlogs: Blog[];
}

export default function HomeClient({
  featuredPackages,
  featuredDestinations,
  testimonials,
  featuredBlogs,
}: HomeClientProps) {
  const previewImages = galleryItems.slice(0, 6);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919823997276';
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 98239 97276';

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Structured Data for SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'Saachi Tours & Travels',
    'url': 'https://saachi-tours.vercel.app',
    'logo': 'https://saachi-tours.vercel.app/images/logo.png',
    'image': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'description': 'Domestic, pilgrimage, and customized tour packages, flight/rail bookings, and vacation planning by Saachi Tours & Travels.',
    'telephone': contactPhone,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Chandrabhaga Corner, Mukai Chowk, Ravet',
      'addressLocality': 'Pune',
      'addressRegion': 'Maharashtra',
      'postalCode': '412101',
      'addressCountry': 'IN'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': contactPhone,
      'contactType': 'customer service',
      'areaServed': 'IN',
      'availableLanguage': ['English', 'Hindi', 'Marathi']
    }
  };

  return (
    <div className="relative">
      <JSONLD data={organizationSchema} />

      {/* Decorative background glows contained locally to prevent horizontal body overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-[80vh] right-10 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-[140px]" />
        <div className="absolute top-[200vh] left-10 w-[500px] h-[500px] bg-teal-500/3 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90dvh] flex items-center pt-8 pb-16 lg:py-24 overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 bg-slate-950 -z-20">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
            alt="Pristine Travel Beach Background"
            fill
            priority
            fetchPriority="high"
            className="object-cover opacity-[0.25]"
          />
          {/* Subtle radial overlay for clean readable layout */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,13,22,0.4),rgba(9,13,22,1))]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Text content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-350 uppercase">
                  Exquisite Bespoke Travel
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white tracking-tight leading-[1.05] font-luxury font-serif"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                Where every journey begins with <span className="text-teal-400 font-sans italic font-normal">care.</span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-slate-350 max-w-xl font-light leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                Discover the art of tailored exploration with Saachi Tours & Travels. We curate unique domestic and spiritual pathways designed around your peace of mind.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
              >
                {/* Button-in-Button Traing Icon primary CTA */}
                <Link
                  href="/packages"
                  className="group relative inline-flex items-center justify-between bg-teal-600 hover:bg-teal-500 text-white font-bold pl-5 pr-3 sm:pl-7 sm:pr-3 py-2.5 sm:py-3 rounded-full shadow-lg shadow-teal-950/30 hover:shadow-teal-950/40 transition-all duration-300 active:scale-[0.98] text-xs sm:text-sm overflow-hidden w-full sm:w-auto"
                >
                  <span className="mr-4 sm:mr-6">Explore Packages</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center bg-white/[0.04] border border-white/10 hover:border-white/20 text-slate-200 hover:text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full transition-all duration-300 active:scale-[0.98] text-xs sm:text-sm w-full sm:w-auto"
                >
                  <span>Plan Your Journey</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2 sm:ml-2.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi%20Saachi%20Tours%20%26%20Travels,%20I%20want%20to%20plan%20a%20holiday.%20Please%20share%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 sm:px-6 py-3 sm:py-4 rounded-full transition-all duration-300 active:scale-[0.98] text-xs sm:text-sm w-full sm:w-auto"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current mr-1.5 sm:mr-2" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </motion.div>
            </div>

            {/* Hero Right Visual Column - Double-Bezel Card */}
            <div className="lg:col-span-5 hidden lg:block relative py-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative mx-auto max-w-[360px]"
              >
                {/* Outer Shell Bezel */}
                <div className="p-2.5 bg-white/[0.02] border border-white/10 rounded-[2rem] shadow-2xl backdrop-blur-md rotate-[1.5deg] hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group">
                  {/* Inner Core Content */}
                  <div className="relative aspect-[3/4] w-full rounded-[calc(2rem-0.625rem)] overflow-hidden bg-slate-900">
                    <Image
                      src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"
                      alt="Luxury Scenic Getaway"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-left">
                      <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-bold">
                        Featured Destination
                      </span>
                      <h4 className="text-xl font-bold text-white mt-1">Scenic Coorg Valleys</h4>
                    </div>
                  </div>
                </div>
                {/* Visual shadow glow */}
                <div className="absolute -inset-4 bg-teal-500/10 rounded-[2.5rem] filter blur-xl -z-10 opacity-70" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-10 py-12 border-t border-b border-white/5 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 text-center">
            {[
              { label: 'Established', value: '19 March 2025' },
              { label: 'Travelers Served', value: '1,000+' },
              { label: 'Destinations Covered', value: '50+' },
              { label: 'Rating', value: '4.9/5' },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2 p-5 bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-sm">
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-teal-400 tracking-tight">
                  {stat.value}
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-405 font-semibold font-mono">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-luxury font-serif">
              Cultivated Destinations
            </h2>
            <p className="text-slate-400 max-w-xl font-light">
              Explore our handpicked getaways from mist-covered valleys to historic forts and sandy shores.
            </p>
          </div>
          <Link
            href="/destinations"
            className="flex items-center space-x-1.5 text-teal-400 hover:text-teal-300 font-semibold text-sm mt-4 md:mt-0 group"
          >
            <span>View All Pathways</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {featuredDestinations.map((dest, index) => {
            // Asymmetric sizing classes for a gorgeous rhythm
            const gridClasses = [
              'lg:col-span-7 h-80 sm:h-96', // Row 1 Left - Large
              'lg:col-span-5 h-80 sm:h-96', // Row 1 Right - Medium
              'lg:col-span-5 h-80 sm:h-[360px]', // Row 2 Left - Medium
              'lg:col-span-7 h-80 sm:h-[360px]'  // Row 2 Right - Large
            ][index] || 'lg:col-span-4 h-80';

            return (
              <motion.div
                key={dest.id}
                className={`${gridClasses} relative rounded-[2rem] overflow-hidden group border border-white/5 bg-slate-900/40 p-2`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Inner double-bezel content */}
                <div className="relative w-full h-full rounded-[calc(2rem-0.5rem)] overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block bg-teal-900/60 backdrop-blur-md text-teal-350 text-[9px] font-bold font-mono px-3 py-1 rounded-full mb-3 uppercase tracking-wider border border-teal-500/10">
                      {dest.packageCount} Pathways
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2 font-luxury font-serif">{dest.name}</h3>
                    <p className="text-slate-350 text-sm line-clamp-2 font-light mb-5 max-w-md leading-relaxed">
                      {dest.description}
                    </p>
                    <Link
                      href={`/packages?destination=${encodeURIComponent(dest.name)}`}
                      className="inline-flex items-center space-x-2 text-xs font-bold text-teal-400 hover:text-white transition-colors group/link"
                    >
                      <span>Explore Tours</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Tour Packages */}
      <section className="py-32 bg-slate-900/[0.15] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Side: Brand Narrative */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-luxury font-serif leading-tight">
                Trending Tour Packages
              </h2>
              <p className="text-slate-400 font-light leading-relaxed">
                We craft tailor-made, boutique excursions designed to let you unwind completely. Every detail is taken care of by our dedicated team.
              </p>
              <div className="pt-4">
                <Link
                  href="/packages"
                  className="group inline-flex items-center justify-center bg-white/[0.04] border border-white/10 hover:border-white/20 text-slate-200 hover:text-white pl-6 pr-3 py-2.5 rounded-full transition-all duration-300 active:scale-[0.98] text-sm"
                >
                  <span className="mr-4">See All Vacations</span>
                  <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Side: Staggered Packages Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {featuredPackages.map((tour, index) => {
                // Apply translate-y to the second card at desktop to break grid symmetry
                const staggerClass = index === 1 ? 'lg:translate-y-12' : '';
                return (
                  <div key={tour.id} className={`${staggerClass} transition-transform duration-500`}>
                    <PackageCard tour={tour} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-32 border-b border-white/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left side title */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-3.5 py-1"
                >
                  <span className="text-[10px] font-semibold tracking-widest text-teal-400 uppercase font-mono">
                    Bespoke Offerings
                  </span>
                </motion.div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-luxury font-serif">
                Bespoke Travel Services
              </h2>
              <p className="text-slate-400 font-light leading-relaxed max-w-md">
                From complete ticketing coordinates to bespoke private transfers, we organize every travel detail with meticulous care.
              </p>
            </div>

            {/* Right side list */}
            <div className="lg:col-span-7 divide-y divide-white/5 border-t border-b border-white/5">
              {[
                {
                  icon: Map,
                  title: 'Domestic & Custom Packages',
                  desc: 'Tailor-made itineraries across India, from beachfront resorts to serene mountain escapes.',
                },
                {
                  icon: Compass,
                  title: 'Pilgrimage Tours Coordination',
                  desc: 'Hassle-free, premium coordination for Char Dham, Ashtavinayak, and local spiritual journeys.',
                },
                {
                  icon: Plane,
                  title: 'Flight, Train & Hotel Booking',
                  desc: 'Seamless reservations with curated 4-star and 5-star properties for extreme comfort.',
                },
                {
                  icon: Heart,
                  title: 'Romantic & Honeymoon Escapes',
                  desc: 'Scenic locations, pool villas, and curated romantic add-ons for beautiful memories.',
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="group py-8 flex items-start justify-between gap-6 hover:bg-white/[0.01] px-4 transition-all duration-300 cursor-default"
                >
                  <div className="flex gap-6">
                    <span className="text-xs font-mono text-slate-500 mt-1">0{idx + 1}</span>
                    <div className="space-y-2 text-left">
                      <h3 className="text-xl font-semibold text-white tracking-wide group-hover:text-teal-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-light max-w-xl">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white/20 transition-all duration-300 shrink-0">
                    <service.icon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-luxury font-serif">
            Making Every Trip Comfortable
          </h2>
          <p className="text-slate-400 font-light">
            We are dedicated to providing hassle-free planning, top-tier accommodations, and premium support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 divide-y md:divide-y-0 lg:divide-x divide-white/5 text-left">
          {[
            {
              icon: ShieldCheck,
              title: '100% Trustworthy',
              desc: 'Secure tour operators, verified premium hotels, and transparent pricing structures.',
            },
            {
              icon: Map,
              title: 'Tailor-made Itineraries',
              desc: 'Modify sightseeings, customize stays, and configure travel dates to your comfort.',
            },
            {
              icon: Users,
              title: 'Expert Private Drivers',
              desc: 'Friendly, local, experienced drivers with comfortable AC vehicles for private tours.',
            },
            {
              icon: Clock,
              title: '24/7 Hotline Support',
              desc: 'A dedicated tour executive remains active throughout your travel lifecycle to resolve issues.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`space-y-4 ${idx > 0 ? 'pt-8 lg:pt-0' : ''} ${idx % 2 === 1 ? 'md:pl-6 lg:pl-8' : ''} ${idx >= 2 ? 'md:pt-8 lg:pt-0' : ''}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-950/30 text-teal-400 border border-teal-500/10 flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">{item.title}</h3>
              <p className="text-slate-405 text-sm leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials Carousel */}
      {testimonials.length > 0 && (
        <section className="py-32 bg-slate-900/[0.15] border-y border-white/5 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center relative">
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-3.5 py-1"
              >
                <span className="text-[10px] font-semibold tracking-widest text-teal-400 uppercase font-mono">
                  Guest Memoirs
                </span>
              </motion.div>
            </div>

            {/* Testimonial Core */}
            <div className="relative min-h-[260px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="space-y-8"
                >
                  {/* Large quote marks */}
                  <span className="block text-[6.5rem] font-serif font-luxury leading-[0.1] text-teal-500/25 h-6">
                    “
                  </span>
                  <p className="text-xl sm:text-2xl text-slate-200 italic font-light leading-relaxed max-w-3xl mx-auto font-luxury font-serif">
                    {testimonials[activeTestimonial].reviewText}
                  </p>
                  <div className="flex items-center justify-center space-x-4 pt-4">
                    {testimonials[activeTestimonial].avatarUrl && (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 p-0.5 bg-slate-900 shadow-md">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={testimonials[activeTestimonial].avatarUrl}
                            alt={testimonials[activeTestimonial].name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="text-left">
                      <span className="block text-white font-bold text-sm tracking-wide">
                        {testimonials[activeTestimonial].name}
                      </span>
                      <span className="block text-teal-400 text-xs font-mono uppercase tracking-wider mt-0.5">
                        Visited: {testimonials[activeTestimonial].destinationVisited}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Arrows */}
            <div className="flex items-center justify-center space-x-6 mt-12">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 text-slate-350 hover:text-white hover:border-white/15 flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Previous review"
              >
                &larr;
              </button>
              <span className="text-slate-500 text-xs font-mono">
                {activeTestimonial + 1} / {testimonials.length}
              </span>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 text-slate-350 hover:text-white hover:border-white/15 flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Next review"
              >
                &rarr;
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-luxury font-serif">
              Moments Captured
            </h2>
            <p className="text-slate-400 max-w-xl font-light">
              Real snaps from our family trips, adventurous bike tracks, and boutique honeymoon setups.
            </p>
          </div>
          <Link
            href="/gallery"
            className="flex items-center space-x-1.5 text-teal-400 hover:text-teal-355 font-semibold text-sm mt-4 md:mt-0 group"
          >
            <span>Explore Photo Gallery</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewImages.map((img, index) => {
            // Apply y-axis stagger offset to columns
            const offsetClass = index === 1 || index === 4 ? 'lg:-translate-y-6' : '';
            const aspectClass = index === 1 || index === 4 ? 'aspect-[3/4]' : 'aspect-[4/3]';

            return (
              <motion.div
                key={img.id}
                className={`${offsetClass} relative ${aspectClass} rounded-[2rem] overflow-hidden group shadow-lg border border-white/5 p-2 bg-slate-900/40`}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <div className="relative w-full h-full rounded-[calc(2rem-0.5rem)] overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-sm font-semibold tracking-wide truncate block w-full">
                      {img.caption}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-32 bg-slate-900/[0.15] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="space-y-3">
              <div className="flex">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-3.5 py-1"
                >
                  <span className="text-[10px] font-semibold tracking-widest text-teal-400 uppercase font-mono">
                    Travel Journal
                  </span>
                </motion.div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-luxury font-serif">
                Latest from Travel Blog
              </h2>
              <p className="text-slate-400 max-w-xl font-light">
                Handy packing checklists, weather updates, and weekend trip guides written by our specialists.
              </p>
            </div>
            <Link
              href="/blog"
              className="flex items-center space-x-1.5 text-teal-400 hover:text-teal-305 font-semibold text-sm mt-4 md:mt-0 group"
            >
              <span>View All Musings</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Featured Blog - Left (2/3 width) */}
            <div className="lg:col-span-8">
              {featuredBlogs.slice(0, 1).map((post) => (
                <motion.article
                  key={post.id}
                  className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-2 flex flex-col h-full group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[calc(2rem-0.5rem)] bg-slate-950">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 z-10 px-3.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-slate-950/80 backdrop-blur-md rounded-full text-teal-450 border border-white/5 font-mono">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow text-left">
                    <div className="flex items-center space-x-3 text-xs text-slate-500 mb-4 font-mono">
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-wide leading-snug group-hover:text-teal-400 transition-colors font-luxury font-serif">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-light leading-relaxed mb-6 max-w-2xl">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center space-x-2 text-xs font-bold text-teal-400 hover:text-white transition-colors group/link"
                    >
                      <span>Read Full Entry</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Sidebar Blogs - Right (1/3 width) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {featuredBlogs.slice(1, 3).map((post) => (
                <motion.article
                  key={post.id}
                  className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-2 flex flex-col h-full group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-[calc(2rem-0.5rem)] bg-slate-950">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-slate-950/80 backdrop-blur-md rounded-full text-teal-405 border border-white/5 font-mono">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-grow text-left">
                    <div className="flex items-center space-x-3 text-[10px] text-slate-500 mb-2 font-mono">
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-teal-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-auto inline-flex items-center space-x-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      <span>Read Entry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 max-w-6xl mx-auto px-4">
        <div className="relative bg-teal-950/10 border border-teal-500/10 rounded-[2.5rem] p-6 sm:p-12 md:p-16 overflow-hidden shadow-2xl text-center space-y-8 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/5 via-transparent to-teal-900/5 -z-10" />
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-luxury font-serif">
            Ready to Plan Your Dream Vacation?
          </h2>
          <p className="text-slate-350 max-w-xl mx-auto font-light leading-relaxed">
            Get in touch with our travel specialists today. We will customize your itinerary, choose premium stays, and configure private transfers to match your requirements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-between bg-teal-600 hover:bg-teal-500 text-white font-bold pl-5 pr-3 sm:pl-7 sm:pr-3 py-2.5 sm:py-3 rounded-full shadow-lg shadow-teal-950/40 hover:shadow-teal-950/60 transition-all duration-300 active:scale-[0.98] text-xs sm:text-sm overflow-hidden w-full sm:w-auto"
            >
              <span className="mr-4 sm:mr-6">Contact Our Specialists</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </span>
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi,%20I%20want%20to%20customize%20a%20tour%20package.%20Please%20contact%20me.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 sm:px-7 py-3.5 sm:py-4.5 rounded-full shadow-lg shadow-emerald-950/25 hover:shadow-emerald-950/35 transition-all duration-300 active:scale-[0.98] text-xs sm:text-sm w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-4 h-4 fill-current mr-1.5 sm:mr-2" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
