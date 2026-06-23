'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { galleryItems } from '../../data/gallery';

type CategoryFilter = 'all' | 'beaches' | 'mountains' | 'family' | 'adventure' | 'honeymoon';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = useCallback((id: string) => {
    const idx = filteredItems.findIndex((item) => item.id === id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  }, [filteredItems]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prevIdx) => (prevIdx !== null ? (prevIdx + 1) % filteredItems.length : null));
  }, [filteredItems.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prevIdx) => (prevIdx !== null ? (prevIdx - 1 + filteredItems.length) % filteredItems.length : null));
  }, [filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: 'All Snaps', value: 'all' },
    { label: 'Beaches', value: 'beaches' },
    { label: 'Mountains', value: 'mountains' },
    { label: 'Adventure', value: 'adventure' },
    { label: 'Honeymoon', value: 'honeymoon' },
    { label: 'Family Trips', value: 'family' },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wider uppercase inline-block">
          Travel Snaps
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
          Tour Photo Gallery
        </h1>
        <p className="text-slate-400 font-light leading-relaxed">
          Take a look at real traveler captures, romantic setups, bike expeditions, and family vacation moments.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <div className="flex items-center space-x-1.5 text-slate-500 mr-2 text-xs font-semibold uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setSelectedCategory(cat.value);
              setLightboxIndex(null); // Reset lightbox logic
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-300 ${
              selectedCategory === cat.value
                ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-900/20'
                : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid Layout using CSS Columns */}
      <motion.div
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-md border border-slate-900/30 hover:border-slate-800 transition-colors"
              onClick={() => openLightbox(item.id)}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <Image
                src={item.url}
                alt={item.caption}
                width={500}
                height={500}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-white text-xs font-bold leading-tight line-clamp-1">{item.caption}</span>
                <span className="text-teal-400 text-[10px] uppercase tracking-wider font-semibold mt-1">{item.category}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900/50 transition-colors focus:outline-none"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-3 rounded-full hover:bg-slate-900/50 transition-colors focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Content Display container */}
            <div
              className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-auto max-h-[75vh]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].caption}
                  className="rounded-xl object-contain max-h-[75vh] max-w-full shadow-2xl border border-slate-900"
                />
              </motion.div>
            </div>

            {/* Bottom Details block */}
            <div
              className="text-center mt-4 space-y-1"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white font-semibold text-sm max-w-xl truncate">
                {filteredItems[lightboxIndex].caption}
              </p>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                Category: <span className="text-teal-400">{filteredItems[lightboxIndex].category}</span> ({lightboxIndex + 1} / {filteredItems.length})
              </p>
            </div>

            {/* Right Nav */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-3 rounded-full hover:bg-slate-900/50 transition-colors focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
