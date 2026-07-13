'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (isDev) {
      console.log('[Analytics] Google Tag Manager Loaded');
      console.log('[Analytics] Google Analytics Initialized');
    }
  }, [isDev]);

  useEffect(() => {
    // Track page views on route changes
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Defer slightly to allow the document title to update
    const timer = setTimeout(() => {
      trackPageView(url);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
