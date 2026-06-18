'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Mail, 
  Map, 
  LogOut, 
  Menu, 
  X,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarContentProps {
  pathname: string;
  onCloseMobile: () => void;
  handleLogout: () => void;
}

function SidebarContent({ pathname, onCloseMobile, handleLogout }: SidebarContentProps) {
  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Inquiries', href: '/admin/inquiries', icon: Mail },
    { name: 'Packages', href: '/admin/packages', icon: Map },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800/80 p-5 text-slate-400">
      {/* Branding Info */}
      <div className="flex items-center space-x-3 pb-6 border-b border-slate-800/80 mb-6 shrink-0">
        <div className="relative w-10 h-10 bg-white rounded-xl overflow-hidden flex items-center justify-center p-1 border border-slate-800">
          <div className="relative w-full h-full">
            <Image
              src="/images/logo.png"
              alt="Saachi Travels"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-brand-name text-base font-bold text-white leading-none">Saachi</span>
          <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold mt-1">Admin Panel</span>
        </div>
      </div>

      {/* Menu Links */}
      <nav className="space-y-1.5 flex-1 overflow-y-auto pr-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-teal-950/40 text-teal-400 border border-teal-500/20'
                  : 'border border-transparent text-slate-400 hover:bg-slate-950 hover:text-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide border border-transparent text-slate-400 hover:bg-slate-950 hover:text-slate-100"
        >
          <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
          <span>View Site</span>
        </a>
      </nav>

      {/* Logout Action */}
      <div className="pt-6 border-t border-slate-800/80 mt-auto shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide text-rose-400 hover:bg-rose-950/15 border border-transparent hover:border-rose-950/25 transition-all focus:outline-none cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0 text-rose-500" />
          <span>Logout Session</span>
        </button>
      </div>
    </div>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // If on the login screen, don't show the dashboard layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row relative">
      
      {/* Mobile top bar header */}
      <header className="lg:hidden bg-slate-900 border-b border-slate-850 px-4 py-4 flex items-center justify-between z-30 sticky top-0 shrink-0">
        <Link href="/admin" className="flex items-center space-x-3">
          <div className="relative w-8 h-8 bg-white rounded-lg p-0.5 border border-slate-800">
            <div className="relative w-full h-full">
              <Image
                src="/images/logo.png"
                alt="Saachi Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <span className="font-bold text-white text-sm">Saachi Admin</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-slate-400 hover:text-white p-1"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Desktop Sidebar drawer (lg-only static layout) */}
      <aside className="hidden lg:block lg:w-64 lg:fixed lg:top-0 lg:bottom-0 lg:left-0 z-20 shrink-0">
        <SidebarContent 
          pathname={pathname} 
          onCloseMobile={() => setIsMobileOpen(false)} 
          handleLogout={handleLogout} 
        />
      </aside>

      {/* Mobile Slide-out drawer menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-slate-950 z-30 lg:hidden shadow-2xl"
            >
              <SidebarContent 
                pathname={pathname} 
                onCloseMobile={() => setIsMobileOpen(false)} 
                handleLogout={handleLogout} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 overflow-y-auto min-h-screen">
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
