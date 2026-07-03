import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description: 'Refund and Cancellation Policy for Saachi Tour and Travel. Read our policies regarding customer and company cancellations, refunds, and force majeure.',
};

export default function RefundPolicyPage() {
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
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-semibold uppercase tracking-wider">
              Legal
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display mt-1">
              Saachi Tour and Travel – Refund & Cancellation Policy
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Customer Cancellation
            </h2>
            <p className="text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              Cancellation charges are as follows:
            </p>
            <ul className="space-y-2 pl-1">
              {[
                'More than 30 days before departure: 10% of the package cost',
                '15–30 days before departure: 25% of the package cost',
                '7–14 days before departure: 50% of the package cost',
                'Less than 7 days before departure or No Show: 100% of the package cost'
              ].map((item, idx) => (
                <li key={idx} className="text-slate-355 font-light text-sm sm:text-base flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-355 font-light leading-relaxed text-sm sm:text-base pt-2">
              Air tickets, visa fees, travel insurance, and other non-refundable bookings will be charged as per the supplier&apos;s cancellation policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Company Cancellation
            </h2>
            <p className="text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              If Saachi Tour and Travel cancels a tour due to operational reasons, customers will be offered:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="text-slate-355 font-light text-sm sm:text-base flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5 shrink-0" />
                <span>A full refund (after deducting any non-refundable third-party charges, if applicable), or</span>
              </li>
              <li className="text-slate-355 font-light text-sm sm:text-base flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5 shrink-0" />
                <span>An alternative tour package, subject to customer approval.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Refund Process
            </h2>
            <ul className="space-y-2 pl-1">
              <li className="text-slate-355 font-light text-sm sm:text-base flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5 shrink-0" />
                <span>Approved refunds will be processed within 7–15 business days to the original payment method.</span>
              </li>
              <li className="text-slate-355 font-light text-sm sm:text-base flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5 shrink-0" />
                <span>Bank processing times may vary.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Force Majeure
            </h2>
            <p className="text-slate-355 font-light leading-relaxed text-sm sm:text-base">
              No refund shall be payable for cancellations or interruptions caused by events beyond the company&apos;s reasonable control, including natural disasters, government restrictions, war, pandemics, or other force majeure events. Any refund or credit, if offered, will depend on recoveries from airlines, hotels, and other suppliers.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-800/80 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Contact
            </h2>
            <p className="text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              For cancellation or refund requests, customers should contact Saachi Tour and Travel through the official contact details provided at the time of booking.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
