'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { KeyRound, Mail, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error || 'Incorrect email or password.');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo Badging */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16 bg-white rounded-2xl p-1.5 border border-slate-800 shadow-xl flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/images/logo.png"
                alt="Saachi Travels Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-white font-display">
          Admin Portal Login
        </h2>
        <p className="mt-2 text-center text-xs text-slate-500 font-light">
          Sign in to manage packages, destinations, blogs, and view inquiries.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800/80 py-8 px-6 shadow-2xl rounded-3xl sm:px-10 space-y-6">
          
          {/* Error display */}
          {error && (
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 flex items-start space-x-3 text-rose-400">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-xs font-medium leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-teal-500" />
                <span>Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="admin@saachitours.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/25 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-650 transition-colors"
              />
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1.5">
                <KeyRound className="w-3.5 h-3.5 text-teal-500" />
                <span>Password</span>
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/25 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-650 transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-650 hover:bg-teal-550 disabled:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Log In to Dashboard</span>
                )}
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-teal-400 hover:text-teal-300 font-medium">
              &larr; Back to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
