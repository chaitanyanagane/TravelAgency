import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for Saachi Tour and Travel. Read our rules, policies, and booking terms.',
};

export default function TermsAndConditionsPage() {
  const terms = [
    'All bookings are subject to availability.',
    'A booking is confirmed only after the required advance payment is received.',
    'Customers must provide accurate personal and travel documents.',
    "Passport, visa, and other travel documents are the customer's responsibility unless specifically included in the package.",
    'Tour prices may change due to airline fares, taxes, fuel surcharges, currency fluctuations, or government regulations before full payment.',
    'Hotels, flights, transport, and sightseeing are subject to the policies of the respective service providers.',
    'Check-in and check-out timings are governed by hotel rules.',
    'The company is not responsible for delays, cancellations, natural disasters, strikes, pandemics, political unrest, or other events beyond its control.',
    'No refund will be provided for unused services such as meals, hotel stays, sightseeing, or transport after the tour has commenced.',
    'Customers must follow local laws and behave respectfully throughout the tour.',
    'The company reserves the right to modify the itinerary if required for safety or operational reasons.',
    'Any disputes shall be subject to the jurisdiction of the courts in Pune, Maharashtra.'
  ];

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>

      <div className="bg-slate-900 border border-slate-800/60 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl space-y-8">
        {/* Heading */}
        <div className="flex items-center space-x-4 border-b border-slate-800/80 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-semibold uppercase tracking-wider">
              Legal
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display mt-1">
              Saachi Tour and Travel – Terms & Conditions
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <ol className="space-y-4 list-none pl-1">
            {terms.map((term, index) => (
              <li key={index} className="text-slate-350 font-light text-sm sm:text-base flex items-start space-x-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-teal-500/10 text-teal-400 font-semibold text-xs shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{term}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
