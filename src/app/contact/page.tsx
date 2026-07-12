'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import InquiryForm from '@/components/common/InquiryForm';

export default function ContactPage() {
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 92702 67390';
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'saachituourandtravel@gmail.com';
  const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Chandrabhaga corner, Mukai chouk Ravet, Pune, Maharashtra 412101';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919270267390';
  const mapsEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.2223846618585!2d73.7431326!3d18.6540679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e69c79fa69%3A0xc3fa5ee2366718!2sMukai%20Chowk%2C%20Ravet%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718464000000!5m2!1sen!2sin';

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wider uppercase inline-block">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
          Plan Your Dream Vacation
        </h1>
        <p className="text-slate-400 font-light leading-relaxed">
          Fill out our detailed travel inquiry form below. Our holiday specialists will customize the itinerary, hotels, and transfers to suit your budget and style.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Contact Information & Maps */}
        
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-slate-900 border border-slate-800/60 rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white font-display">Office Information</h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold">Address</span>
                  <span className="text-slate-200 text-sm leading-relaxed">{contactAddress}</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold">Phone Number</span>
                  <a
                    href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                    className="text-teal-400 hover:text-teal-300 font-medium text-sm transition-colors"
                  >
                    {contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold">Email Address</span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-teal-400 hover:text-teal-300 font-medium text-sm transition-colors"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold">Business Hours</span>
                  <span className="text-slate-200 text-sm block">Mon - Sun: 10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
            
            {/* Direct WhatsApp Call to Action */}
            <div className="pt-6 border-t border-slate-800/80">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi%20Saachi%20Tours%20%26%20Travels,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center space-x-2 text-sm shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Maps Embed */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-900 shadow-md bg-slate-950">
            <iframe
              src={mapsEmbedUrl}
              className="absolute inset-0 w-full h-full border-0 grayscale invert opacity-70"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Saachi Tours & Travels Office Map"
            />
          </div>
        </div>

        {/* Right Side: Travel Inquiry Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800/60 rounded-3xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-white font-display mb-6">Plan a Custom Package</h2>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
