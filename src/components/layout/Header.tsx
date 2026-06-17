'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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



  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-900/50 py-3 shadow-lg'
            : 'bg-gradient-to-b from-black/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 bg-white rounded-xl overflow-hidden flex items-center justify-center p-1 border border-slate-800 shadow-inner group-hover:border-teal-500/50 transition-colors">
                <Image
                  src="/images/logo.png"
                  alt="Saachi Tour and Travel"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-wide leading-none group-hover:text-teal-400 transition-colors">
                  Saachi
                </span>
                <span className="text-[9px] text-teal-400 font-semibold tracking-widest uppercase mt-0.5">
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
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors text-sm font-medium"
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
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-3">
                  <div className="relative w-10 h-10 bg-white rounded-xl overflow-hidden flex items-center justify-center p-1 border border-slate-800 shadow-inner">
                    <Image
                      src="/images/logo.png"
                      alt="Saachi Tour and Travel"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-white tracking-wide leading-none">
                      Saachi
                    </span>
                    <span className="text-[9px] text-teal-400 font-semibold tracking-widest uppercase mt-0.5">
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
    </>
  );
}
