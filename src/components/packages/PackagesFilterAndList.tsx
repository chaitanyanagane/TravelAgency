'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Compass } from 'lucide-react';
import PackageCard from '@/components/packages/PackageCard';
import { Package } from '@/types';

type TourTypeFilter = 'all' | 'Honeymoon' | 'Adventure' | 'Family' | 'Weekend Getaway' | 'Nature' | 'Pilgrimage' | 'Customized';
type DurationFilter = 'all' | 'short' | 'medium' | 'long';
type BudgetFilter = 'all' | 'under-15k' | 'under-25k' | 'over-25k';
type SortOption = 'popularity' | 'price-low' | 'price-high' | 'duration';

interface PackagesFilterAndListProps {
  initialPackages: Package[];
}

export default function PackagesFilterAndList({ initialPackages }: PackagesFilterAndListProps) {
  const searchParams = useSearchParams();
  const destParam = searchParams.get('destination');

  // Filter States
  const [selectedDestination, setSelectedDestination] = useState<string>(destParam || 'all');
  const [selectedTourType, setSelectedTourType] = useState<TourTypeFilter>('all');
  const [selectedDuration, setSelectedDuration] = useState<DurationFilter>('all');
  const [selectedBudget, setSelectedBudget] = useState<BudgetFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  // Adjust state when query parameters change during render
  const [prevDestParam, setPrevDestParam] = useState<string | null>(destParam);
  if (destParam !== prevDestParam) {
    setPrevDestParam(destParam);
    setSelectedDestination(destParam || 'all');
  }

  // Extract unique destinations from our dataset
  const uniqueDestinations = ['all', ...Array.from(new Set(initialPackages.map((p) => p.destination)))];

  // Filtering Logic
  const filteredPackages = initialPackages.filter((tour) => {
    // 1. Destination
    const matchesDest = selectedDestination === 'all' || tour.destination === selectedDestination;
    
    // 2. Tour Type
    const matchesType = selectedTourType === 'all' || tour.tourType === selectedTourType;
    
    // 3. Duration
    let matchesDuration = true;
    if (selectedDuration === 'short') {
      matchesDuration = tour.durationDays <= 4;
    } else if (selectedDuration === 'medium') {
      matchesDuration = tour.durationDays === 5 || tour.durationDays === 6;
    } else if (selectedDuration === 'long') {
      matchesDuration = tour.durationDays >= 7;
    }

    // 4. Budget
    let matchesBudget = true;
    if (selectedBudget === 'under-15k') {
      matchesBudget = tour.price <= 15000;
    } else if (selectedBudget === 'under-25k') {
      matchesBudget = tour.price <= 25000;
    } else if (selectedBudget === 'over-25k') {
      matchesBudget = tour.price > 25000;
    }

    return matchesDest && matchesType && matchesDuration && matchesBudget;
  });

  // Sorting Logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'duration') {
      return a.durationDays - b.durationDays;
    } else {
      // Popularity (Rating)
      return b.rating - a.rating;
    }
  });

  return (
    <div className="space-y-12">
      {/* Filters Bar card */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-md">
        <div className="flex items-center space-x-2 text-white font-bold mb-6">
          <SlidersHorizontal className="w-5 h-5 text-teal-400" />
          <h2 className="text-lg font-display">Filter & Sort Tours</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
          {/* Destination */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Destination</label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-305 font-medium transition-colors cursor-pointer"
            >
              <option value="all">All Destinations</option>
              {uniqueDestinations.filter(d => d !== 'all').map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Tour Type */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Tour Type</label>
            <select
              value={selectedTourType}
              onChange={(e) => setSelectedTourType(e.target.value as TourTypeFilter)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-305 font-medium transition-colors cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="Family">Family</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Adventure">Adventure</option>
              <option value="Weekend Getaway">Weekend Getaway</option>
              <option value="Nature">Nature</option>
              <option value="Pilgrimage">Pilgrimage</option>
              <option value="Customized">Customized</option>
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Duration</label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value as DurationFilter)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-305 font-medium transition-colors cursor-pointer"
            >
              <option value="all">All Durations</option>
              <option value="short">Short (3-4 Days)</option>
              <option value="medium">Medium (5-6 Days)</option>
              <option value="long">Long (7+ Days)</option>
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Max Budget</label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value as BudgetFilter)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-305 font-medium transition-colors cursor-pointer"
            >
              <option value="all">All Budgets</option>
              <option value="under-15k">Up to ₹15,000</option>
              <option value="under-25k">Up to ₹25,000</option>
              <option value="over-25k">Over ₹25,000</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Sort Results By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-305 font-medium transition-colors cursor-pointer"
            >
              <option value="popularity">Popularity (Rating)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration (Days)</option>
            </select>
          </div>
        </div>

        {/* Clear Filters indicator */}
        {(selectedDestination !== 'all' || selectedTourType !== 'all' || selectedDuration !== 'all' || selectedBudget !== 'all') && (
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-light">
              Showing {sortedPackages.length} filtered results
            </span>
            <button
              onClick={() => {
                setSelectedDestination('all');
                setSelectedTourType('all');
                setSelectedDuration('all');
                setSelectedBudget('all');
                setSortBy('popularity');
              }}
              className="text-xs text-teal-400 hover:text-teal-300 font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Grid of Results */}
      {sortedPackages.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {sortedPackages.map((tour) => (
              <PackageCard key={tour.id} tour={tour} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 space-y-4 max-w-sm mx-auto"
        >
          <div className="w-12 h-12 bg-slate-900 border border-slate-800 text-slate-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-display">No packages match</h3>
            <p className="text-slate-500 text-xs font-light">
              Try modifying your filter settings or resetting filters to see all travel packages.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedDestination('all');
              setSelectedTourType('all');
              setSelectedDuration('all');
              setSelectedBudget('all');
            }}
            className="text-teal-400 text-xs font-semibold hover:text-teal-300 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
