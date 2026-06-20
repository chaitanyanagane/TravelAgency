'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Destination } from '@/types';

interface DestinationsClientProps {
  destinations: Destination[];
}

export default function DestinationsClient({ destinations }: DestinationsClientProps) {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wider uppercase inline-block">
          Travel Map
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
          Explore Our Destinations
        </h1>
        <p className="text-slate-400 font-light leading-relaxed">
          From tranquil mist-covered plantations to sunny shores and high altitude mountain lakes, discover our handpicked domestic and holiday destinations.
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest, index) => (
          <motion.div
            key={dest.id}
            className="group bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden flex flex-col h-full hover:border-slate-800 shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-85" />
              
              <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1 text-xs font-semibold text-teal-400 border border-slate-800">
                <MapPin className="w-3.5 h-3.5" />
                <span>{dest.name}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-teal-400 transition-colors">
                {dest.name} Tours
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light mb-6 flex-grow">
                {dest.description}
              </p>
              
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  {dest.packageCount} Available Packages
                </span>
                <Link
                  href={`/packages?destination=${encodeURIComponent(dest.name)}`}
                  className="flex items-center space-x-1.5 text-xs font-bold text-teal-400 hover:text-white group"
                >
                  <span>Explore Tours</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
