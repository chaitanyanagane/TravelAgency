'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { trackPageView } from '@/lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (!gtmId) return;

    // Track page views on route changes
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Defer slightly to allow the document title to update
    const timer = setTimeout(() => {
      trackPageView(url);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, gtmId]);

  if (!gtmId) return null;

  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      onLoad={() => {
        if (isDev) {
          console.log('[Analytics] Google Tag Manager Loaded');
          console.log('[Analytics] Google Analytics Initialized');
        }
      }}
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `,
      }}
    />
  );
}
