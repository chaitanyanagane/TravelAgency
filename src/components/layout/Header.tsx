'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackPhoneCall, trackContactClick } from '@/lib/analytics';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Packages', href: '/packages' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

type BrandPreset = 'modern' | 'luxury' | 'professional';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [brandFont, setBrandFont] = useState<BrandPreset>('modern');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  
  const pathname = usePathname();
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 9270267390';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronize localStorage and HTML classes
  useEffect(() => {
    const savedPreset = (localStorage.getItem('saachi-brand-font') as BrandPreset) || 'modern';
    
    const root = document.documentElement;
    root.classList.remove('brand-font-modern', 'brand-font-luxury', 'brand-font-professional');
    root.classList.add(`brand-font-${savedPreset}`);

    // Defer state update to avoid synchronous cascading renders warning
    const timer = setTimeout(() => {
      setBrandFont(savedPreset);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handlePresetChange = (preset: BrandPreset) => {
    setBrandFont(preset);
    localStorage.setItem('saachi-brand-font', preset);
    
    const root = document.documentElement;
    root.classList.remove('brand-font-modern', 'brand-font-luxury', 'brand-font-professional');
    root.classList.add(`brand-font-${preset}`);
  };

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out mt-4 sm:mt-6 px-4"
      >
        <div
          className={`mx-auto max-w-7xl rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border ${
            isScrolled
              ? 'bg-slate-950/75 backdrop-blur-xl border-slate-800/80 py-2 px-5 sm:px-6 shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
              : 'bg-slate-950/35 backdrop-blur-md border-slate-900/40 py-3 sm:py-3.5 px-5 sm:px-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]'
          }`}
        >
          <div className="flex items-center justify-between">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
              {/* Responsive Logo Container - 3:2 landscape glassmorphism */}
              <div 
                className={`relative bg-white/95 border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.15)] group-hover:border-teal-500/40 group-hover:shadow-lg group-hover:shadow-teal-500/10 transition-all duration-500 ease-in-out shrink-0 rounded-xl overflow-hidden flex items-center justify-center ${
                  isScrolled ? 'w-[54px] h-[36px]' : 'w-[69px] h-[46px]'
                }`}
              >
                <div className="relative w-full h-full scale-[1.6] group-hover:scale-[1.7] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <Image
                    src="/images/logo.png"
                    alt="Saachi Tours & Travels"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Dynamic Text Sizing */}
              <div className="flex flex-col justify-center">
                <span 
                  className={`font-brand-name text-white group-hover:text-teal-400 leading-none transition-all duration-500 ease-in-out ${
                    isScrolled ? 'text-sm lg:text-base' : 'text-base lg:text-lg'
                  }`}
                >
                  Saachi
                </span>
                <span 
                  className={`font-brand-sub text-teal-400 font-semibold tracking-widest uppercase transition-all duration-500 ease-in-out ${
                    isScrolled ? 'text-[7px] lg:text-[7.5px] mt-0.5' : 'text-[8.5px] lg:text-[9.5px] mt-0.5 lg:mt-1'
                  }`}
                >
                  Tours & Travels
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[11px] xl:text-xs font-semibold tracking-wider uppercase transition-all duration-300 relative py-1.5 px-3 rounded-full hover:bg-white/5 ${
                      isActive 
                        ? 'text-teal-400 bg-teal-950/40 border border-teal-900/40 shadow-[inset_0_1px_1px_rgba(20,184,166,0.15)]' 
                        : 'text-slate-300 hover:text-white border border-transparent'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Responsive Phone Link */}
              <a
                href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    trackPhoneCall(window.location.pathname);
                  }
                }}
                className="flex items-center justify-center rounded-full bg-slate-900/40 border border-slate-800/80 hover:bg-slate-900/85 hover:border-slate-700 transition-colors text-xs text-slate-300 hover:text-white font-medium p-2.5 xl:px-4 xl:py-2"
                title={`Call ${contactPhone}`}
              >
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="hidden xl:inline ml-2">{contactPhone}</span>
              </a>
              <Link
                href="/contact"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    trackContactClick(window.location.pathname);
                  }
                }}
                className="bg-teal-600 text-white hover:bg-teal-550 pl-4.5 pr-2 py-2 rounded-full text-xs xl:text-sm font-semibold tracking-wide shadow-md shadow-teal-900/20 hover:shadow-lg transition-all active:scale-95 flex items-center space-x-2.5 group/btn"
              >
                <span>Inquire Now</span>
                <span className="w-6.5 h-6.5 rounded-full bg-white/15 flex items-center justify-center text-[10px] text-white shrink-0 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300 ease-out">
                  ↗
                </span>
              </Link>
            </div>

            {/* Hamburger button with morph-X transition */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex flex-col items-center justify-center text-white hover:text-teal-400 focus:outline-none p-2 rounded-full hover:bg-white/5 transition-colors z-50"
                aria-label={isOpen ? "Close main navigation menu" : "Open main navigation menu"}
              >
                <div className="w-5 h-4 flex flex-col justify-between relative">
                  <span
                    className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-350 ease-out ${
                      isOpen ? 'rotate-45 translate-y-[7px]' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-250 ease-out ${
                      isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-350 ease-out ${
                      isOpen ? '-rotate-45 -translate-y-[7px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45 lg:hidden"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', stiffness: 350, damping: 33 }}
              className="fixed top-0 bottom-0 right-0 w-80 max-w-[85vw] bg-slate-950/90 backdrop-blur-2xl border-l border-slate-900/60 z-50 flex flex-col p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-900 pb-5 mb-6">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 group">
                  <div className="relative w-[60px] h-[40px] bg-white/95 rounded-xl overflow-hidden flex items-center justify-center border border-white/40 shadow-md shrink-0">
                    <div className="relative w-full h-full scale-[1.6] group-hover:scale-[1.7] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <Image
                        src="/images/logo.png"
                        alt="Saachi Tours & Travels"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-brand-name text-base text-white group-hover:text-teal-400 transition-colors leading-none font-bold">
                      Saachi
                    </span>
                    <span className="font-brand-sub text-[7px] text-teal-400 uppercase tracking-widest mt-1 font-semibold">
                      Tours & Travels
                    </span>
                  </div>
                </Link>
                {/* Space for the absolute hamburger button that sits natively in alignment */}
                <div className="w-10 h-10 shrink-0" />
              </div>

              {/* Navigation list */}
              <nav className="flex flex-col space-y-3 mb-auto">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-semibold py-2.5 px-4 rounded-xl transition-all ${
                        isActive
                          ? 'text-teal-400 bg-teal-950/20 border border-teal-900/30'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900/20 border border-transparent'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Contact info in drawer */}
              <div className="border-t border-slate-900 pt-6 space-y-4">
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      trackPhoneCall(window.location.pathname);
                    }
                  }}
                  className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors py-1 px-2 hover:bg-white/5 rounded-xl"
                >
                  <Phone className="w-5 h-5 text-teal-400" />
                  <span className="font-medium text-sm">{contactPhone}</span>
                </a>
                <Link
                  href="/contact"
                  onClick={() => {
                    setIsOpen(false);
                    if (typeof window !== 'undefined') {
                      trackContactClick(window.location.pathname);
                    }
                  }}
                  className="block w-full text-center bg-teal-600 text-white hover:bg-teal-550 py-3.5 rounded-xl font-bold tracking-wide shadow-md shadow-teal-900/20 transition-all"
                >
                  Inquire Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Branding Customizer Widget */}
      <div className="fixed bottom-6 left-6 z-55">
        <button
          onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
          className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-850 text-slate-400 hover:text-teal-400 p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none cursor-pointer"
          aria-label="Toggle branding controls customizer"
          title="Branding Control Widget"
        >
          <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>

        <AnimatePresence>
          {isCustomizerOpen && (
            <>
              {/* Close click-catcher */}
              <div className="fixed inset-0 z-[-1]" onClick={() => setIsCustomizerOpen(false)} />
              
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-16 left-0 w-64 bg-slate-950/95 border border-slate-800/80 p-4.5 rounded-2xl shadow-2xl space-y-3.5 backdrop-blur-md"
              >
                <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold flex items-center space-x-1.5">
                    <Palette className="w-3.5 h-3.5 text-teal-400" />
                    <span>Brand Preset Tool</span>
                  </span>
                  <button 
                    onClick={() => setIsCustomizerOpen(false)} 
                    className="text-slate-500 hover:text-slate-300 text-[10px] uppercase font-bold"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'modern', name: 'Modern Style', font: 'Outfit', subtitle: 'Bold, geometric sans' },
                    { id: 'luxury', name: 'Luxury Style', font: 'Playfair', subtitle: 'Elegant, high-end serif' },
                    { id: 'professional', name: 'Professional Style', font: 'Jakarta', subtitle: 'Clean, corporate sans' },
                  ].map((preset) => {
                    const isSelected = brandFont === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handlePresetChange(preset.id as BrandPreset)}
                        aria-label={`Select ${preset.name} brand typography preset`}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                          isSelected
                            ? 'bg-teal-950/35 border-teal-600/80 shadow-md shadow-teal-950/10'
                            : 'bg-slate-950 border-slate-850 hover:border-slate-800 hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className={`block text-xs font-bold ${isSelected ? 'text-teal-400' : 'text-slate-200'}`}>
                            {preset.name}
                          </span>
                          <span className="block text-[9px] text-slate-500 font-light">
                            {preset.font} — {preset.subtitle}
                          </span>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-teal-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[8.5px] text-slate-600 font-light leading-relaxed text-center px-1">
                  Adjusts brand name font-family, letter-spacing, and casing styles site-wide.
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
