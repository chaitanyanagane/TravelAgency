'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ShieldCheck, Map, Clock, ArrowRight, Star, MessageCircle, Phone, Users, Briefcase, Heart, Plane, Sparkles } from 'lucide-react';
import { packages } from '../data/packages';
import { destinations } from '../data/destinations';
import { testimonials } from '../data/testimonials';
import { blogs } from '../data/blogs';
import { galleryItems } from '../data/gallery';
import PackageCard from '../components/packages/PackageCard';
import JSONLD from '../components/common/JSONLD';

export default function HomePage() {
  const featuredPackages = packages.filter((p) => p.popular).slice(0, 3);
  const featuredDestinations = destinations.slice(0, 4);
  const featuredBlogs = blogs.slice(0, 3);
  const previewImages = galleryItems.slice(0, 6);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919823997276';
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 98239 97276';

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Structured Data for SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    'name': 'Saachi Tour and Travel',
    'url': 'https://saachi-tours.vercel.app',
    'logo': 'https://saachi-tours.vercel.app/images/logo.png',
    'image': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'description': 'Domestic, pilgrimage, and customized tour packages, flight/rail bookings, and vacation planning by Saachi Tour and Travel.',
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

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-slate-950 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
            alt="Pristine Travel Beach Background"
            fill
            priority
            fetchPriority="high"
            className="object-cover opacity-50"
          />
          {/* Dark overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight md:leading-none font-display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Where Every Journey Begins with <span className="text-teal-400">Care</span>.
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            With Saachi Tours & Travels, we believe that travel is more than just visiting destinations—it&apos;s about creating lifelong memories, discovering new cultures, and enjoying every moment of the journey.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href="/packages"
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-teal-900/30 hover:shadow-teal-900/40 transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Packages</span>
              <Compass className="w-5 h-5 animate-spin-slow" />
            </Link>
            
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:text-white px-8 py-4 rounded-full transition-all flex items-center justify-center space-x-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%20Saachi%20Tours%20and%20Travels,%20I%20want%20to%20plan%20a%20holiday.%20Please%20share%20details.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-emerald-950/20 hover:shadow-emerald-950/30 transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Inquiry</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-20 -mt-16 max-w-6xl mx-auto px-4">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Established', value: '19 March 2025' },
            { label: 'Travelers Served', value: '1,000+' },
            { label: 'Destinations Covered', value: '50+' },
            { label: 'Rating', value: '4.9/5' },
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="block text-3xl sm:text-4xl font-extrabold text-teal-400">
                {stat.value}
              </span>
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <span className="text-teal-500 font-semibold tracking-wider uppercase text-xs">
              Where to go?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Popular Destinations
            </h2>
            <p className="text-slate-400 max-w-xl font-light">
              Explore handpicked getaways from mist-covered valleys to historic forts and sandy shores.
            </p>
          </div>
          <Link
            href="/destinations"
            className="flex items-center space-x-1.5 text-teal-400 hover:text-teal-300 font-semibold text-sm mt-4 md:mt-0 group"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer border border-slate-900 hover:border-slate-800 transition-colors shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block bg-teal-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 uppercase tracking-wide">
                  {dest.packageCount} Packages
                </span>
                <h3 className="text-xl font-bold text-white mb-1">{dest.name}</h3>
                <p className="text-slate-300 text-xs line-clamp-2 font-light mb-4">
                  {dest.description}
                </p>
                <Link
                  href={`/packages?destination=${encodeURIComponent(dest.name)}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-400 hover:text-white"
                >
                  <span>Explore Tours</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Tour Packages */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-3">
              <span className="text-teal-500 font-semibold tracking-wider uppercase text-xs">
                Featured Vacations
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                Trending Tour Packages
              </h2>
              <p className="text-slate-400 max-w-xl font-light">
                Our best-selling, top-rated itineraries crafted specifically for couples, families, and friends.
              </p>
            </div>
            <Link
              href="/packages"
              className="flex items-center space-x-1.5 text-teal-400 hover:text-teal-300 font-semibold text-sm mt-4 md:mt-0 group"
            >
              <span>See All Packages</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((tour) => (
              <PackageCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-24 bg-slate-900/10 border-t border-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-teal-400 font-semibold tracking-wider uppercase text-xs">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Our Premium Services
            </h2>
            <p className="text-slate-400 font-light leading-relaxed">
              From ticketing to complete holiday management, we coordinate every travel detail with care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Map,
                title: 'Domestic & Customized Tour Packages',
                desc: 'Tailor-made itineraries across India, from beach resorts to mountain retreats, built around your style.',
              },
              {
                icon: Compass,
                title: 'Pilgrimage Tours',
                desc: 'Hassle-free bookings for Ashtavinayak, Char Dham, and other custom spiritual journeys with complete care.',
              },
              {
                icon: Plane,
                title: 'Flight, Train & Hotel Bookings',
                desc: 'End-to-end booking coordination. We find the most convenient timings and verified premium stays.',
              },
              {
                icon: Users,
                title: 'Group & Family Tours',
                desc: 'Shared travel experiences made easy. We handle bulk bookings, private transfers, and group sightseeings.',
              },
              {
                icon: Heart,
                title: 'Honeymoon Packages',
                desc: 'Create romantic memories with special add-ons, pool villas, candlelight dinners, and scenic locations.',
              },
              {
                icon: Briefcase,
                title: 'Corporate Travel Solutions',
                desc: 'Seamless travel coordination for business meetings, conferences, employee outings, and bookings.',
              },
              {
                icon: Sparkles,
                title: 'Holiday Planning & Travel Assistance',
                desc: '24/7 travel advice, planning guidance, and emergency support during your journey.',
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                className={`bg-slate-900 border border-slate-800/60 rounded-2xl p-8 hover:border-slate-800 hover:bg-slate-900/80 transition-all duration-300 shadow-md ${
                  idx === 6 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-teal-500 font-semibold tracking-wider uppercase text-xs">
            Why Saachi Tours?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Making Every Trip Comfortable
          </h2>
          <p className="text-slate-400 font-light">
            We are dedicated to providing hassle-free planning, top-tier accommodations, and premium sightseeing support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: '100% Trustworthy',
              desc: 'Secure tour operators, verified luxury hotels, transparent prices with no hidden charges.',
            },
            {
              icon: Map,
              title: 'Tailor-made Itineraries',
              desc: 'Modify sightseeings, customize pricing packages, and adjust travel dates to your comfort.',
            },
            {
              icon: Users,
              title: 'Expert Private Drivers',
              desc: 'Friendly, experienced local drivers with comfortable AC vehicles for private transfers.',
            },
            {
              icon: Clock,
              title: '24/7 Hotline Support',
              desc: 'A dedicated tour executive remains active throughout your travel lifecycle to resolve any issue.',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-900/50 border border-slate-800/40 rounded-2xl p-6 text-center space-y-4 hover:border-slate-800 hover:bg-slate-900 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center mx-auto">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials Carousel */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-900/50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <span className="text-teal-500 font-semibold tracking-wider uppercase text-xs block mb-3">
            What Customers Say
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-12">
            Trusted by Thousands of Travelers
          </h2>

          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex justify-center space-x-1 text-amber-400">
                  {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <p className="text-lg sm:text-xl text-slate-300 italic font-light leading-relaxed max-w-2xl mx-auto">
                  &ldquo;{testimonials[activeTestimonial].reviewText}&rdquo;
                </p>
                <div className="flex items-center justify-center space-x-3 pt-4">
                  {testimonials[activeTestimonial].avatarUrl && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-teal-500/30">
                      <Image
                        src={testimonials[activeTestimonial].avatarUrl}
                        alt={testimonials[activeTestimonial].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <span className="block text-white font-bold text-sm">
                      {testimonials[activeTestimonial].name}
                    </span>
                    <span className="block text-teal-400 text-xs font-medium">
                      Visited: {testimonials[activeTestimonial].destinationVisited}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center transition-colors"
              aria-label="Previous review"
            >
              &larr;
            </button>
            <span className="text-slate-500 text-xs">
              {activeTestimonial + 1} / {testimonials.length}
            </span>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center transition-colors"
              aria-label="Next review"
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <span className="text-teal-500 font-semibold tracking-wider uppercase text-xs">
              Moments Captured
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Browse Tour Gallery
            </h2>
            <p className="text-slate-400 max-w-xl font-light">
              Real snaps from our family trips, adventurous bike tracks, and luxury honeymoon setups.
            </p>
          </div>
          <Link
            href="/gallery"
            className="flex items-center space-x-1.5 text-teal-400 hover:text-teal-300 font-semibold text-sm mt-4 md:mt-0 group"
          >
            <span>Explore Photo Gallery</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewImages.map((img, index) => (
            <motion.div
              key={img.id}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Image
                src={img.url}
                alt={img.caption}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-semibold tracking-wide truncate block w-full">
                  {img.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-3">
              <span className="text-teal-500 font-semibold tracking-wider uppercase text-xs">
                Travel Inspiration
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                Latest from Travel Blog
              </h2>
              <p className="text-slate-400 max-w-xl font-light">
                Handy packing checklists, weather updates, and weekend trip guides written by travel specialists.
              </p>
            </div>
            <Link
              href="/blog"
              className="flex items-center space-x-1.5 text-teal-400 hover:text-teal-300 font-semibold text-sm mt-4 md:mt-0 group"
            >
              <span>View All Blogs</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogs.map((post) => (
              <motion.article
                key={post.id}
                className="bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden flex flex-col h-full hover:border-slate-800 shadow-md group"
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 z-10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-slate-950/80 backdrop-blur-md rounded-full text-teal-400 border border-slate-800">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-3 text-xs text-slate-500 mb-3">
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-teal-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-light line-clamp-2 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto inline-flex items-center space-x-1 text-xs font-bold text-teal-400 hover:text-teal-300"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 max-w-6xl mx-auto px-4">
        <div className="relative bg-teal-950/20 border border-teal-900/30 rounded-3xl p-12 overflow-hidden shadow-xl text-center space-y-6">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/10 via-transparent to-teal-900/10 -z-10" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Ready to Plan Your Dream Vacation?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Get in touch with our travel specialists today. We will customize the itinerary, choose premium stays, and configure transfers to match your requirements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-teal-950/40 hover:shadow-teal-950/60 transition-all flex items-center justify-center space-x-2 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Our Specialists</span>
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi,%20I%20want%20to%20customize%20a%20tour%20package.%20Please%20contact%20me.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-emerald-950/30 hover:shadow-emerald-950/40 transition-all flex items-center justify-center space-x-2 text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat with Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
