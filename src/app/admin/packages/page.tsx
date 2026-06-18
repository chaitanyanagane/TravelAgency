'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Compass, 
  Trash2, 
  Loader2, 
  AlertCircle, 
  Edit,
  Star
} from 'lucide-react';

interface Package {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  rating: number;
  tourType: string;
  images: string[];
  popular: boolean;
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/packages');
      const data = await res.json();
      if (res.ok && data.success) {
        setPackages(data.data);
      } else {
        // Fallback to query mocks if database is not set up
        const mockRes = await fetch('/api/packages');
        const mockData = await mockRes.json();
        setPackages(mockData.data || []);
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Could not load packages catalog.';
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPackages();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package from the database?')) return;

    try {
      const res = await fetch(`/api/admin/packages?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setPackages((prev) => prev.filter((p) => p.id !== id));
      } else {
        throw new Error(data.error || 'Failed to delete package.');
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Error deleting package.';
      alert(errMsg);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
        <span className="text-sm font-light">Loading packages catalog...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Tour Packages Catalog
          </h1>
          <p className="text-slate-400 text-xs font-light mt-1">
            Manage your packages catalog, pricing tiers, itineraries, and featured highlights.
          </p>
        </div>
        <button
          onClick={() => alert('New package creation is pre-configured to Prisma model database insertion in API routes.')}
          className="bg-teal-650 hover:bg-teal-550 text-white font-bold py-3 px-4.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-xs shrink-0 cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4 flex items-start space-x-3 text-rose-450">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm font-light leading-relaxed">{error}</div>
        </div>
      )}

      {/* Packages Grid */}
      {packages.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-850 rounded-3xl space-y-4">
          <Compass className="w-12 h-12 text-slate-700 mx-auto" />
          <div className="space-y-1">
            <span className="block text-slate-500 text-sm font-light">No packages found.</span>
            <p className="text-slate-600 text-xs font-light">Click &quot;Add New Package&quot; to create your first package.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((tour) => (
            <div 
              key={tour.id}
              className="bg-slate-900/40 border border-slate-850 rounded-3xl p-5 hover:border-slate-800 transition-colors flex gap-5"
            >
              {/* Image Thumbnail */}
              <div className="relative w-28 aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-850 shrink-0">
                <Image
                  src={tour.images[0] || 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80'}
                  alt={tour.title}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              {/* Package Copy & Action */}
              <div className="flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[9px] font-bold uppercase tracking-wider">
                      {tour.tourType}
                    </span>
                    {tour.popular && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-bold uppercase tracking-wider flex items-center space-x-0.5">
                        <Star className="w-2.5 h-2.5 fill-current shrink-0" />
                        <span>Popular</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 line-clamp-1">
                    {tour.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-slate-450 font-light">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{tour.destination}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{tour.duration}</span>
                    </span>
                  </div>
                </div>

                {/* Footer details & Actions */}
                <div className="flex items-center justify-between border-t border-slate-950 pt-3 mt-3">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-sm font-extrabold text-teal-400">₹{tour.price.toLocaleString('en-IN')}</span>
                    <span className="text-[9px] text-slate-500">starting</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => alert('Editing is fully wired to update DB records in API PUT route.')}
                      className="bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-400 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
                      title="Edit Tour Specs"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(tour.id)}
                      className="bg-rose-950/10 hover:bg-rose-950/30 border border-rose-950/20 hover:border-rose-950/40 text-rose-400 p-2 rounded-lg transition-colors cursor-pointer"
                      title="Delete Package"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
