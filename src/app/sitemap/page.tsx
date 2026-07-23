import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Compass, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Phone, 
  Map,
  Mail,
  Clock,
  ArrowRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { getAllPackages, getAllDestinations, getAllBlogs } from '@/sanity/lib/queries';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Browse every page, destination, travel package, blog article, and legal page available on the Saachi Tours & Travels website.',
  alternates: {
    canonical: '/sitemap',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saachitours.in/sitemap',
    title: 'Sitemap | Saachi Tours & Travels',
    description: 'Browse every page, destination, travel package, blog article, and legal page available on the Saachi Tours & Travels website.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sitemap | Saachi Tours & Travels',
    description: 'Browse every page, destination, travel package, blog article, and legal page available on the Saachi Tours & Travels website.',
  }
};

export default async function SitemapPage() {
  // Parallel dynamic queries from Sanity CMS
  const [packages, destinations, blogs] = await Promise.all([
    getAllPackages(),
    getAllDestinations(),
    getAllBlogs(),
  ]);

  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 92702 67390';
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'saachituourandtravel@gmail.com';
  const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Chandrabhaga corner, Mukai chouk Ravet, Pune, Maharashtra 412101';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919270267390';

  const mainPages = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Tour Packages', href: '/packages' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Photo Gallery', href: '/gallery' },
    { name: 'Travel Blog', href: '/blog' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const legalPages = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
    { name: 'Refund & Cancellation Policy', href: '/refund-policy' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wider uppercase inline-block">
          Directory
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
          Website Sitemap
        </h1>
        <p className="text-slate-400 font-light leading-relaxed">
          Browse every page, destination, dynamic travel package, blog article, and official legal guideline available on Saachi Tours & Travels.
        </p>
      </div>

      {/* Grid: 2 columns on desktop/tablet, 1 column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Card 1: Main Pages */}
        <section className="bg-slate-900 border border-slate-800/60 rounded-3xl p-6 sm:p-8 space-y-6 hover:border-slate-800 transition-all duration-300 shadow-md group">
          <div className="flex items-center space-x-3.5 border-b border-slate-800/80 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">
              Main Pages
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mainPages.map((page) => (
              <li key={page.name}>
                <Link
                  href={page.href}
                  className="flex items-center space-x-2 text-slate-355 hover:text-teal-400 transition-colors text-sm sm:text-base font-light focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded-lg p-1.5 hover:bg-slate-950/20"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span>{page.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Card 2: Legal & Security */}
        <section className="bg-slate-900 border border-slate-800/60 rounded-3xl p-6 sm:p-8 space-y-6 hover:border-slate-800 transition-all duration-300 shadow-md group">
          <div className="flex items-center space-x-3.5 border-b border-slate-800/80 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">
              Legal & Security
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {legalPages.map((page) => (
              <li key={page.name}>
                <Link
                  href={page.href}
                  className="flex items-center space-x-2 text-slate-355 hover:text-teal-400 transition-colors text-sm sm:text-base font-light focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded-lg p-1.5 hover:bg-slate-950/20"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span>{page.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Card 3: Dynamic Tour Packages */}
        <section className="bg-slate-900 border border-slate-800/60 rounded-3xl p-6 sm:p-8 space-y-6 hover:border-slate-800 transition-all duration-300 shadow-md group">
          <div className="flex items-center space-x-3.5 border-b border-slate-800/80 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0">
              <Map className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">
              Tour Packages
            </h2>
          </div>
          {!packages || packages.length === 0 ? (
            <p className="text-slate-500 text-sm font-light">No packages available.</p>
          ) : (
            <ul className="space-y-3.5 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
              {(packages ?? []).map((pkg) => (
                <li key={pkg.id}>
                  <Link
                    href={`/packages/${pkg.slug || ''}`}
                    className="flex items-center justify-between text-slate-355 hover:text-teal-400 transition-colors text-sm sm:text-base font-light focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded-lg p-2 hover:bg-slate-950/20 group/link"
                  >
                    <span className="truncate pr-4">{pkg.title || 'Bespoke Tour'}</span>
                    <span className="text-xs text-slate-500 shrink-0 font-medium group-hover/link:text-teal-500/80 transition-colors">
                      {pkg.duration || 'On Request'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Card 4: Dynamic Destinations */}
        <section className="bg-slate-900 border border-slate-800/60 rounded-3xl p-6 sm:p-8 space-y-6 hover:border-slate-800 transition-all duration-300 shadow-md group">
          <div className="flex items-center space-x-3.5 border-b border-slate-800/80 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">
              Destinations
            </h2>
          </div>
          {!destinations || destinations.length === 0 ? (
            <p className="text-slate-500 text-sm font-light">No destinations available.</p>
          ) : (
            <ul className="space-y-3.5 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
              {(destinations ?? []).map((dest) => (
                <li key={dest.id}>
                  <Link
                    href={`/packages?destination=${encodeURIComponent(dest.name || '')}`}
                    className="flex items-center justify-between text-slate-355 hover:text-teal-400 transition-colors text-sm sm:text-base font-light focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded-lg p-2 hover:bg-slate-950/20 group/link"
                  >
                    <span>{dest.name || ''}</span>
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider group-hover/link:text-teal-500/80 transition-colors">
                      {dest.packageCount || 0} tours
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Card 5: Dynamic Travel Blogs */}
        <section className="bg-slate-900 border border-slate-800/60 rounded-3xl p-6 sm:p-8 space-y-6 hover:border-slate-800 transition-all duration-300 shadow-md group">
          <div className="flex items-center space-x-3.5 border-b border-slate-800/80 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">
              Travel Blog
            </h2>
          </div>
          {!blogs || blogs.length === 0 ? (
            <p className="text-slate-500 text-sm font-light">No blog posts published yet.</p>
          ) : (
            <ul className="space-y-3.5 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
              {(blogs ?? []).map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug || ''}`}
                    className="flex items-center justify-between text-slate-355 hover:text-teal-400 transition-colors text-sm sm:text-base font-light focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded-lg p-2 hover:bg-slate-950/20 group/link"
                  >
                    <span className="truncate pr-4">{post.title || 'Blog Post'}</span>
                    <span className="text-xs text-slate-500 shrink-0 group-hover/link:text-teal-500/80 transition-colors">
                      {post.readTime || '5 min read'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Card 6: Business Contact Center */}
        <section className="bg-slate-900 border border-slate-800/60 rounded-3xl p-6 sm:p-8 space-y-6 hover:border-slate-800 transition-all duration-300 shadow-md group">
          <div className="flex items-center space-x-3.5 border-b border-slate-800/80 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">
              Contact Center
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 text-sm sm:text-base">
              <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <span className="text-slate-355 font-light leading-relaxed">{contactAddress}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-sm sm:text-base">
              <Phone className="w-4 h-4 text-teal-400 shrink-0" />
              <a 
                href={`tel:${contactPhone.replace(/\s+/g, '')}`} 
                className="text-slate-355 hover:text-teal-400 font-light transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded px-1"
              >
                {contactPhone}
              </a>
            </div>

            <div className="flex items-center space-x-3 text-sm sm:text-base">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              <a 
                href={`mailto:${contactEmail}`} 
                className="text-slate-355 hover:text-teal-400 font-light transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded px-1"
              >
                {contactEmail}
              </a>
            </div>

            <div className="flex items-start space-x-3 text-sm sm:text-base">
              <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
              <div>
                <span className="block text-slate-200 font-medium text-xs sm:text-sm">Business Hours:</span>
                <span className="block text-slate-500 text-xs mt-0.5">Mon - Sun: 10:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%20Saachi%20Tours%20%26%20Travels,%20I%20have%20an%20inquiry%20from%20the%20sitemap.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-505 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
