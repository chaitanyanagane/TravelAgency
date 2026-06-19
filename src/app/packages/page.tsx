import React, { Suspense } from 'react';
import PackagesFilterAndList from '@/components/packages/PackagesFilterAndList';
import { getAllPackages } from '@/sanity/lib/queries';

// Cache revalidation time of 60 seconds
export const revalidate = 60;

export default async function PackagesPage() {
  const allPackages = await getAllPackages();

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 text-left sm:text-center">
        <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wider uppercase inline-block">
          Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
          Tour Packages Catalog
        </h1>
        <p className="text-slate-405 font-light leading-relaxed">
          Discover our curated packages containing handpicked hotels, experienced local guides, and comfortable private cars. Sort and filter to match your style.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading catalog...</div>}>
        <PackagesFilterAndList initialPackages={allPackages} />
      </Suspense>
    </div>
  );
}
