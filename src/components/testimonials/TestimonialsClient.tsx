'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialsClientProps {
  testimonials: Testimonial[];
}

export default function TestimonialsClient({ testimonials }: TestimonialsClientProps) {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wider uppercase inline-block">
          Traveler Logs
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
          What Our Travelers Say
        </h1>
        <p className="text-slate-400 font-light leading-relaxed">
          Read genuine experiences and reviews shared by our wonderful clients who explored hills, forests, beaches, and historical forts with us.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((test, index) => {
          // Extract initials for placeholder avatar
          const initials = test.name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('');

          return (
            <motion.div
              key={test.id}
              className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-800 transition-all duration-300 shadow-md relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              {/* Quote icon watermark */}
              <MessageSquare className="absolute right-6 top-6 w-12 h-12 text-slate-800/20 pointer-events-none group-hover:text-teal-500/5 transition-colors" />

              <div className="space-y-4 relative z-10">
                {/* Stars */}
                <div className="flex space-x-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < test.rating ? 'fill-current' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm leading-relaxed italic font-light">
                  &ldquo;{test.reviewText}&rdquo;
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-slate-800/80 relative z-10">
                {test.avatarUrl ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-teal-500/20">
                    <Image
                      src={test.avatarUrl}
                      alt={test.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-teal-800/30 border border-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-sm uppercase">
                    {initials}
                  </div>
                )}
                <div>
                  <h3 className="text-white font-bold text-sm leading-snug">
                    {test.name}
                  </h3>
                  <span className="text-teal-400 text-xs font-semibold block">
                    {test.destinationVisited}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
