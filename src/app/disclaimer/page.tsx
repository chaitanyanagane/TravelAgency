import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer policy for Saachi Tour and Travel. Read our terms regarding information accuracy, bookings, and website usage.',
};

export default function DisclaimerPage() {
  const points = [
    {
      title: 'General Information',
      text: 'All information provided on this website is for general informational and travel planning purposes only. While we endeavor to keep the details accurate and up to date, Saachi Tour and Travel makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, packages, services, or related graphics contained on the website.',
    },
    {
      title: 'Booking and Availability',
      text: 'All bookings, tour itineraries, hotel accommodations, pricing, flight details, and transport options shown on this site are subject to change and availability. Dynamic prices (such as airline fares or seasonal hotel surcharges) may change prior to final confirmation and receipt of the advance payment.',
    },
    {
      title: 'Limitation of Liability',
      text: 'In no event will Saachi Tour and Travel be liable for any loss, injury, delay, or damage (including without limitation, indirect or consequential loss or damage) arising out of, or in connection with, the use of this website or the booking of travel packages, flights, hotels, or transport services facilitated through our platform.',
    },
    {
      title: 'Third-Party Services',
      text: 'Our travel services utilize third-party operators (including airlines, hotels, local guides, and transport providers). Saachi Tour and Travel acts solely as a booking facilitator and is not responsible for any service delays, service failures, cancellations, strikes, pandemics, weather conditions, or disputes between you and third-party providers.',
    },
    {
      title: 'Jurisdiction',
      text: 'Any disputes arising out of the services provided by Saachi Tour and Travel shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra, India.',
    }
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
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-semibold uppercase tracking-wider">
              Legal
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display mt-1">
              Saachi Tour and Travel – Disclaimer
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-slate-350 font-light leading-relaxed text-sm sm:text-base">
            Please read this disclaimer carefully before using our website or booking any services with us.
          </p>

          <ol className="space-y-6 list-none pl-1">
            {points.map((point, index) => (
              <li key={index} className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-teal-500/10 text-teal-400 font-semibold text-xs shrink-0">
                    {index + 1}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-white font-display">
                    {point.title}
                  </h2>
                </div>
                <p className="text-slate-355 font-light text-sm sm:text-base leading-relaxed pl-9">
                  {point.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
