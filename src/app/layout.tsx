import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';
import AnalyticsTracker from '../components/common/AnalyticsTracker';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const viewport: Viewport = {
  themeColor: '#090d16',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://saachitours.in'),
  title: {
    default: 'Saachi Tours & Travels | Domestic, Pilgrimage & Customized Tour Packages',
    template: '%s | Saachi Tours & Travels',
  },
  description: 'Book customized tour packages, pilgrimage tours (Char Dham, Ashtavinayak), flight, train & hotel bookings, family holidays, and corporate travel solutions with Saachi Tours & Travels. Where every journey begins with care.',
  keywords: ['travel agency', 'tour packages', 'Saachi Tours & Travels', 'pilgrimage tours', 'Ashtavinayak tour', 'Char Dham yatra', 'customized holidays', 'flight bookings Pune', 'train bookings Pune', 'family tours', 'honeymoon packages', 'corporate travel Pune'],
  authors: [{ name: 'Saachi Tours & Travels' }],
  creator: 'Saachi Tours & Travels',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saachitours.in',
    title: 'Saachi Tours & Travels | Domestic, Pilgrimage & Customized Tour Packages',
    description: 'Book customized tour packages, pilgrimage tours (Char Dham, Ashtavinayak), hotel bookings, and corporate travel solutions with Saachi Tours & Travels.',
    siteName: 'Saachi Tours & Travels',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saachi Tours & Travels - Where Every Journey Begins with Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saachi Tours & Travels | Domestic, Pilgrimage & Customized Tour Packages',
    description: 'Book customized tour packages, pilgrimage tours (Char Dham, Ashtavinayak), hotel bookings, and corporate travel solutions with Saachi Tours & Travels.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="brand-font-modern">
      <head>
        {/* Google tag (gtag.js) */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TG8ZGGX4PY" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TG8ZGGX4PY');
            `,
          }}
        />
        {/* Google Tag Manager */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MNLHPC3W');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MNLHPC3W"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main className="flex-grow pt-20 lg:pt-24">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
