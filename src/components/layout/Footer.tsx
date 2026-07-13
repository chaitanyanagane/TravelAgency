'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { trackWhatsAppClick, trackPhoneCall } from '@/lib/analytics';

export default function Footer() {
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 92702 67390';
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'saachituourandtravel@gmail.com';
  const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Chandrabhaga corner, Mukai chouk Ravet, Pune, Maharashtra 412101';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919270267390';

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3.5 group">
              <div className="relative w-[84px] h-[56px] bg-white/95 rounded-2xl overflow-hidden flex items-center justify-center border border-white/40 shadow-md group-hover:border-teal-500/40 group-hover:shadow-lg group-hover:shadow-teal-500/10 transition-all duration-300 shrink-0">
                <div className="relative w-full h-full scale-[1.6] group-hover:scale-[1.7] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <Image
                    src="/images/logo.png"
                    alt="Saachi Tours & Travels"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-brand-name text-xl text-white group-hover:text-teal-400 transition-colors leading-none">
                  Saachi
                </span>
                <span className="font-brand-sub text-[8px] text-teal-400 uppercase tracking-widest mt-1">
                  Tours & Travels
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">
              Where every journey begins with care. We specialize in domestic & customized tour packages, pilgrimage tours (Ashtavinayak, Char Dham), flight, train & hotel bookings, family holidays, and honeymoon escapes.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.facebook.com/share/1BB7ffEnhg/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-teal-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/saachi_tours/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-teal-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    trackWhatsAppClick(window.location.pathname, 'footer_social');
                  }
                }}
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-teal-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.632 1.971 14.16 1.97 11.53 1.97 6.137 1.97 1.71 6.34 1.706 11.769c-.001 1.705.452 3.37 1.31 4.862l-.997 3.642 3.734-.979zm11.378-4.708c-.305-.153-1.802-.889-2.083-.99-.281-.101-.485-.153-.688.152-.204.304-.787.99-.965 1.191-.177.203-.355.228-.66.076-.305-.152-1.288-.475-2.454-1.514-.908-.81-1.52-1.81-1.698-2.115-.178-.305-.019-.47.133-.621.137-.136.305-.355.457-.533.153-.177.204-.304.305-.507.102-.203.051-.38-.025-.533-.076-.152-.688-1.659-.942-2.268-.247-.594-.5-.514-.688-.524-.178-.009-.38-.01-.584-.01-.203 0-.534.076-.814.38-.28.305-1.068 1.039-1.068 2.535s1.093 2.942 1.246 3.145c.153.203 2.152 3.284 5.216 4.602.729.314 1.298.5 1.743.64.732.233 1.398.2 1.925.122.587-.087 1.802-.736 2.057-1.448.254-.71.254-1.32.178-1.448-.076-.127-.28-.203-.585-.355z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-teal-400 transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-teal-400 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-teal-400 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-teal-400 transition-colors">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4 text-sm">
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Contact Details
            </h3>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <span>{contactAddress}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-teal-400 shrink-0" />
              <a 
                href={`tel:${contactPhone.replace(/\s+/g, '')}`} 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    trackPhoneCall(window.location.pathname);
                  }
                }}
                className="hover:text-white transition-colors"
              >
                {contactPhone}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                {contactEmail}
              </a>
            </div>
            <div className="flex items-start space-x-3 border-t border-slate-900 pt-4 mt-4">
              <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
              <div>
                <span className="block text-white font-medium">Business Hours:</span>
                <span className="block text-slate-500 text-xs">Mon - Sun: 10:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-600">
          <p>&copy; {currentYear} Saachi Tours & Travels. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 md:mt-0 justify-center md:justify-end">
            <Link href="/privacy-policy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-400">Terms & Conditions</Link>
            <Link href="/refund-policy" className="hover:text-slate-400">Refund Policy</Link>
            <Link href="/disclaimer" className="hover:text-slate-400">Disclaimer</Link>
            <Link href="/sitemap" className="hover:text-slate-400">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
