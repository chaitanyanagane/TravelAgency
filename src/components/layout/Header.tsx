'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Packages', href: '/packages' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

type BrandPreset = 'modern' | 'luxury' | 'professional';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [brandFont, setBrandFont] = useState<BrandPreset>('modern');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  
  const pathname = usePathname();
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 9823997276';

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-900/50 py-2.5 shadow-lg'
            : 'bg-gradient-to-b from-black/70 to-transparent py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-3.5 group">
              {/* Responsive Logo Container - 3:2 landscape glassmorphism */}
              <div 
                className={`relative bg-white/95 border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.15)] group-hover:border-teal-500/40 group-hover:shadow-lg group-hover:shadow-teal-500/10 transition-all duration-500 ease-in-out shrink-0 rounded-2xl overflow-hidden flex items-center justify-center ${
                  isScrolled ? 'w-[66px] h-[44px]' : 'w-[84px] h-[56px]'
                }`}
              >
                <div className="relative w-full h-full scale-[1.6] group-hover:scale-[1.7] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <Image
                    src="/images/logo.png"
                    alt="Saachi Tour and Travel"
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
                    isScrolled ? 'text-lg' : 'text-2xl'
                  }`}
                >
                  Saachi
                </span>
                <span 
                  className={`font-brand-sub text-teal-400 font-semibold tracking-widest uppercase transition-all duration-500 ease-in-out ${
                    isScrolled ? 'text-[8px] mt-0.5' : 'text-[10px] mt-1'
                  }`}
                >
                  Tours & Travels
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                      isActive ? 'text-teal-400' : 'text-slate-100 hover:text-teal-300'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-2 text-slate-350 hover:text-white transition-colors text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>{contactPhone}</span>
              </a>
              <Link
                href="/contact"
                className="bg-teal-600 text-white hover:bg-teal-500 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-md shadow-teal-900/20 hover:shadow-lg transition-all"
              >
                Inquire Now
              </Link>
            </div>

            {/* Hamburger button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-teal-400 focus:outline-none p-1.5"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 bottom-0 right-0 w-80 max-w-full bg-slate-950 border-l border-slate-900 z-50 flex flex-col p-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-900 pb-5 mb-6">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3.5 group">
                  <div className="relative w-[72px] h-[48px] bg-white/95 rounded-xl overflow-hidden flex items-center justify-center border border-white/40 shadow-md shrink-0">
                    <div className="relative w-full h-full scale-[1.6] group-hover:scale-[1.7] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <Image
                        src="/images/logo.png"
                        alt="Saachi Tour and Travel"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-brand-name text-lg text-white group-hover:text-teal-400 transition-colors leading-none">
                      Saachi
                    </span>
                    <span className="font-brand-sub text-[8px] text-teal-400 uppercase tracking-widest mt-1">
                      Tours & Travels
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation list */}
              <nav className="flex flex-col space-y-4 mb-auto">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? 'text-teal-400 bg-slate-900/50'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900/20'
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
                  className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-teal-400" />
                  <span className="font-medium">{contactPhone}</span>
                </a>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-teal-600 text-white hover:bg-teal-500 py-3 rounded-xl font-semibold tracking-wide shadow-md shadow-teal-900/20 transition-all"
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
