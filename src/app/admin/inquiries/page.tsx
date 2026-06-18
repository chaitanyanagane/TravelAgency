'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MapPin, 
  Calendar, 
  Users, 
  Wallet, 
  Trash2, 
  Loader2, 
  AlertCircle, 
  Phone, 
  ChevronDown,
  User,
  MessageSquare
} from 'lucide-react';

interface Inquiry {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  destination: string;
  travelDate: string;
  travelers: number;
  budgetRange: string;
  message: string | null;
  status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'CANCELLED';
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch inquiries.');
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Could not load inquiries.';
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch inquiries on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInquiries();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as Inquiry['status'] } : inq))
        );
      } else {
        throw new Error(data.error || 'Failed to update status.');
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Error updating status.';
      alert(errMsg);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry? This action is permanent.')) return;

    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      } else {
        throw new Error(data.error || 'Failed to delete inquiry.');
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Error deleting inquiry.';
      alert(errMsg);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
        <span className="text-sm font-light">Loading inquiries inbox...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
          Inquiries Inbox
        </h1>
        <p className="text-slate-400 text-xs font-light mt-1">
          Review customized tour package requests and manage lead conversions.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4 flex items-start space-x-3 text-rose-450">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm font-light leading-relaxed">{error}</div>
        </div>
      )}

      {/* Inquiries List */}
      {inquiries.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-850 rounded-3xl space-y-4">
          <Mail className="w-12 h-12 text-slate-700 mx-auto" />
          <div className="space-y-1">
            <span className="block text-slate-500 text-sm font-light">Inbox is empty.</span>
            <p className="text-slate-600 text-xs font-light">New contacts from the web form will align here.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inquiry) => (
            <div 
              key={inquiry.id}
              className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 hover:border-slate-800 transition-colors flex flex-col lg:flex-row justify-between lg:items-start gap-6"
            >
              {/* Left Column: Client & Inquiry Details */}
              <div className="flex-1 space-y-4">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                    <User className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{inquiry.fullName}</span>
                  </span>
                  <span className="hidden sm:inline text-slate-700">•</span>
                  <a href={`tel:${inquiry.phoneNumber}`} className="text-sm text-teal-400 hover:underline flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>{inquiry.phoneNumber}</span>
                  </a>
                  <span className="hidden sm:inline text-slate-700">•</span>
                  <span className="text-sm text-slate-400">{inquiry.email}</span>
                </div>

                {/* Meta details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950/40 border border-slate-850 rounded-2xl p-4">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Destination</span>
                    <span className="text-xs font-bold text-slate-200 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{inquiry.destination}</span>
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Date of Travel</span>
                    <span className="text-xs font-bold text-slate-200 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{inquiry.travelDate}</span>
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Travelers</span>
                    <span className="text-xs font-bold text-slate-200 flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{inquiry.travelers} Pax</span>
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Budget Per Person</span>
                    <span className="text-xs font-bold text-slate-200 flex items-center space-x-1">
                      <Wallet className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{inquiry.budgetRange}</span>
                    </span>
                  </div>
                </div>

                {/* Additional requirements message */}
                {inquiry.message && (
                  <div className="bg-slate-950/20 border border-slate-850 p-4 rounded-2xl space-y-1.5">
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold flex items-center space-x-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-teal-500" />
                      <span>Special Requirements</span>
                    </span>
                    <p className="text-xs text-slate-350 font-light leading-relaxed">
                      {inquiry.message}
                    </p>
                  </div>
                )}

                <div className="text-[10px] text-slate-500 font-light">
                  Submitted: {new Date(inquiry.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Right Column: Admin Actions */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 border-t lg:border-t-0 border-slate-850 pt-4 lg:pt-0">
                <div className="space-y-1.5">
                  <span className="block lg:text-right text-[9px] uppercase tracking-wider text-slate-550 font-bold">Status Action</span>
                  <div className="relative">
                    <select
                      value={inquiry.status}
                      disabled={updatingId === inquiry.id}
                      onChange={(e) => handleUpdateStatus(inquiry.id, e.target.value)}
                      className={`text-xs font-bold tracking-wide uppercase px-4 py-2.5 rounded-xl border appearance-none pr-10 focus:outline-none transition-colors cursor-pointer ${
                        inquiry.status === 'NEW'
                          ? 'bg-amber-950/20 border-amber-500/20 text-amber-400 focus:border-amber-400'
                          : inquiry.status === 'CONTACTED'
                          ? 'bg-sky-950/20 border-sky-500/20 text-sky-400 focus:border-sky-400'
                          : inquiry.status === 'CONVERTED'
                          ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400 focus:border-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 focus:border-slate-500'
                      }`}
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="CONVERTED">Converted</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-450 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="bg-rose-950/10 hover:bg-rose-950/35 border border-rose-950/25 hover:border-rose-950/50 text-rose-400 p-3 rounded-xl transition-colors shrink-0 cursor-pointer lg:mt-6"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
