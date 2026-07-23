'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, ArrowRight } from 'lucide-react';
import { Package } from '../../types';

interface PackageCardProps {
  tour: Package;
}

export default function PackageCard({ tour }: PackageCardProps) {
  const { 
    title = '', 
    slug = '', 
    destination = '', 
    duration = '', 
    price = 0, 
    rating = 0, 
    tourType = 'Customized', 
    images = [] 
  } = tour || {};

  const displayImage = images && images.length > 0 
    ? images[0] 
    : 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80';

  // Tag color mapping
  const tagColors = {
    Honeymoon: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    Adventure: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Family: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    'Weekend Getaway': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Nature: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Pilgrimage: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    Customized: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <motion.div
      className="group bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden flex flex-col h-full hover:border-slate-700/80 shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <Image
          src={displayImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category tag */}
        <span className={`absolute top-4 left-4 z-10 px-3 py-1 text-xs font-semibold rounded-full border ${tagColors[tourType] || 'bg-slate-500/10 text-slate-300'}`}>
          {tourType}
        </span>
        
        {/* Rating tag */}
        <div className="absolute top-4 right-4 z-10 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center space-x-1 text-xs font-bold text-amber-400 border border-slate-800">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{(rating ?? 0).toFixed(1)}</span>
        </div>
        
        {/* Bottom soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Destination & Duration */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-medium">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
            <span>{destination || ''}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-teal-500 shrink-0" />
            <span>{duration || ''}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 tracking-wide leading-snug group-hover:text-teal-400 transition-colors line-clamp-2 min-h-[56px] flex items-center">
          {title || ''}
        </h3>

        {/* Short info/Price */}
        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Starting from
            </span>
            <span className="text-xl font-extrabold text-teal-400">
              ₹{price ? price.toLocaleString('en-IN') : 'On Request'}
            </span>
            <span className="text-[10px] text-slate-500 ml-1">/ person</span>
          </div>
          
          <Link
            href={`/packages/${slug}`}
            className="flex items-center space-x-1.5 bg-slate-800 text-slate-200 group-hover:bg-teal-600 group-hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
