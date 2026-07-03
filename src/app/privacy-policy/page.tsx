import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Saachi Tour and Travel. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
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
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-semibold uppercase tracking-wider">
              Legal
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display mt-1">
              Saachi Tour and Travel – Privacy Policy
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-slate-350 font-light leading-relaxed text-sm sm:text-base">
            At Saachi Tour and Travel, we value your privacy and are committed to protecting your personal information.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Information We Collect
            </h2>
            <p className="text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              We may collect:
            </p>
            <ul className="space-y-2 pl-1">
              {[
                'Full name',
                'Mobile number',
                'Email address',
                'Postal address',
                'Government ID details (when required)',
                'Passport and visa details (for international tours)',
                'Payment details (processed through secure payment providers)'
              ].map((item, idx) => (
                <li key={idx} className="text-slate-350 font-light text-sm sm:text-base flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              How We Use Your Information
            </h2>
            <p className="text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              Your information is used to:
            </p>
            <ul className="space-y-2 pl-1">
              {[
                'Process tour bookings',
                'Arrange hotels, transport, flights, and other travel services',
                'Contact you regarding your booking',
                'Send booking confirmations and travel updates',
                'Improve our services',
                'Comply with legal obligations'
              ].map((item, idx) => (
                <li key={idx} className="text-slate-350 font-light text-sm sm:text-base flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Information Sharing
            </h2>
            <p className="text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              We may share your information only with:
            </p>
            <ul className="space-y-2 pl-1">
              {[
                'Airlines',
                'Hotels',
                'Transport providers',
                'Visa processing partners',
                'Government authorities when legally required'
              ].map((item, idx) => (
                <li key={idx} className="text-slate-350 font-light text-sm sm:text-base flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-350 font-light leading-relaxed text-sm sm:text-base pt-2">
              We never sell your personal information to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Data Security
            </h2>
            <p className="text-slate-350 font-light leading-relaxed text-sm sm:text-base">
              We use reasonable security measures to protect your information. However, no online system is completely secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Cookies
            </h2>
            <p className="text-slate-350 font-light leading-relaxed text-sm sm:text-base">
              Our website may use cookies to improve user experience and website performance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Your Rights
            </h2>
            <p className="text-slate-350 font-light leading-relaxed text-sm sm:text-base">
              You may request access, correction, or deletion of your personal information, subject to applicable laws.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-800/80 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">
              Contact
            </h2>
            <p className="text-slate-350 font-medium text-sm sm:text-base">
              Saachi Tour and Travel
            </p>
            <p className="text-slate-400 font-light leading-relaxed text-sm sm:text-base">
              For any privacy-related questions, please contact us using our official phone number or email address.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
