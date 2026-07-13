'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2, User, Phone, Mail, MapPin, Calendar, Users, Wallet, MessageSquare } from 'lucide-react';
import { inquirySchema, InquiryInput } from '@/schemas/inquiry';
import Toast from '@/components/common/Toast';
import { trackInquiry } from '@/lib/analytics';

const getNext12Months = () => {
  const months: string[] = [];
  const date = new Date();
  for (let i = 0; i < 12; i++) {
    const m = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    months.push(m);
    date.setMonth(date.getMonth() + 1);
  }
  return months;
};

interface InquiryFormProps {
  defaultDestination?: string;
  onSuccess?: () => void;
}

export default function InquiryForm({ defaultDestination = '', onSuccess }: InquiryFormProps) {
  const [toastState, setToastState] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    isVisible: false,
    message: '',
    type: 'success',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      destination: defaultDestination,
      travelMonth: '',
      travelers: 1,
      budgetRange: '',
      message: '',
    },
  });

  const onSubmit = async (data: InquiryInput) => {
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong. Please try again.');
      }

      // Track lead generation custom analytics event (PII safe: no email, phone, or messages)
      trackInquiry({
        destination: data.destination,
        travelMonth: data.travelMonth,
        travelers: Number(data.travelers),
        budgetRange: data.budgetRange,
      });

      setToastState({
        isVisible: true,
        message: result.message || 'Inquiry submitted successfully!',
        type: 'success',
      });

      reset({
        fullName: '',
        phoneNumber: '',
        email: '',
        destination: defaultDestination,
        travelMonth: '',
        travelers: 1,
        budgetRange: '',
        message: '',
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Could not send inquiry. Please check your connection and try again.';
      setToastState({
        isVisible: true,
        message: errorMessage,
        type: 'error',
      });
    }
  };

  const closeToast = () => {
    setToastState((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      <Toast
        isVisible={toastState.isVisible}
        message={toastState.message}
        type={toastState.type}
        onClose={closeToast}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-teal-500" />
              <span>Full Name</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. Rahul Sharma"
              disabled={isSubmitting}
              className={`w-full bg-slate-950 border ${
                errors.fullName ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-teal-500'
              } rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:outline-none`}
              {...register('fullName')}
            />
            {errors.fullName && (
              <span className="text-rose-400 text-xs font-medium block">{errors.fullName.message}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-teal-500" />
              <span>Phone Number</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="e.g. 9270267390"
              disabled={isSubmitting}
              className={`w-full bg-slate-950 border ${
                errors.phoneNumber ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-teal-500'
              } rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:outline-none`}
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && (
              <span className="text-rose-400 text-xs font-medium block">{errors.phoneNumber.message}</span>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-teal-500" />
              <span>Email Address</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. rahul@example.com"
              disabled={isSubmitting}
              className={`w-full bg-slate-950 border ${
                errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-teal-500'
              } rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:outline-none`}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-rose-400 text-xs font-medium block">{errors.email.message}</span>
            )}
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <label htmlFor="destination" className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-500" />
              <span>Destination</span>
            </label>
            <input
              id="destination"
              type="text"
              placeholder="e.g. Kedarnath, Coorg, Goa"
              disabled={isSubmitting}
              className={`w-full bg-slate-950 border ${
                errors.destination ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-teal-500'
              } rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:outline-none`}
              {...register('destination')}
            />
            {errors.destination && (
              <span className="text-rose-400 text-xs font-medium block">{errors.destination.message}</span>
            )}
          </div>

          {/* Travel Month */}
          <div className="space-y-2">
            <label htmlFor="travelMonth" className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-500" />
              <span>Travel Month</span>
            </label>
            <div className="relative">
              <select
                id="travelMonth"
                disabled={isSubmitting}
                defaultValue=""
                className={`w-full bg-slate-950 border ${
                  errors.travelMonth ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-teal-500'
                } rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:outline-none cursor-pointer appearance-none bg-no-repeat bg-[right_1rem_center] pr-10`}
                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundSize: '1.25em' }}
                {...register('travelMonth')}
              >
                <option value="" disabled className="text-slate-600">Select Month</option>
                {getNext12Months().map((month) => (
                  <option key={month} value={month} className="bg-slate-950 text-slate-100">
                    {month}
                  </option>
                ))}
              </select>
            </div>
            {errors.travelMonth && (
              <span className="text-rose-400 text-xs font-medium block">{errors.travelMonth.message}</span>
            )}
          </div>

          {/* Number of Travelers */}
          <div className="space-y-2">
            <label htmlFor="travelers" className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-teal-500" />
              <span>Number of Travelers</span>
            </label>
            <input
              id="travelers"
              type="number"
              min="1"
              max="100"
              disabled={isSubmitting}
              className={`w-full bg-slate-950 border ${
                errors.travelers ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-teal-500'
              } rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 transition-colors focus:outline-none`}
              {...register('travelers', { valueAsNumber: true })}
            />
            {errors.travelers && (
              <span className="text-rose-400 text-xs font-medium block">{errors.travelers.message}</span>
            )}
          </div>

          {/* Budget Range */}
          <div className="space-y-2">
            <label htmlFor="budgetRange" className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
              <Wallet className="w-3.5 h-3.5 text-teal-500" />
              <span>Budget Per Person</span>
            </label>
            <select
              id="budgetRange"
              disabled={isSubmitting}
              className={`w-full bg-slate-950 border ${
                errors.budgetRange ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-teal-500'
              } rounded-xl px-4 py-3.5 text-sm text-slate-300 transition-colors focus:outline-none`}
              {...register('budgetRange')}
            >
              <option value="">Select a range</option>
              <option value="Under ₹15,000">Under ₹15,000</option>
              <option value="₹15,000 - ₹25,000">₹15,000 - ₹25,000</option>
              <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
              <option value="Over ₹50,000">Over ₹50,000</option>
            </select>
            {errors.budgetRange && (
              <span className="text-rose-400 text-xs font-medium block">{errors.budgetRange.message}</span>
            )}
          </div>

          {/* Message requirements */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-teal-500" />
              <span>Additional Requirements</span>
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Let us know about your preferred hotel standard, sightseeing style, dietary requirements, or flight preferences..."
              disabled={isSubmitting}
              className={`w-full bg-slate-950 border ${
                errors.message ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-teal-500'
              } rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 transition-colors resize-none focus:outline-none`}
              {...register('message')}
            />
            {errors.message && (
              <span className="text-rose-400 text-xs font-medium block">{errors.message.message}</span>
            )}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-teal-900/10 flex items-center justify-center space-x-2 text-sm focus:outline-none cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Travel Inquiry</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
