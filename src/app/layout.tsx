import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
});

export const viewport: Viewport = {
  themeColor: '#090d16',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://saachi-tours.vercel.app'),
  title: {
    default: 'Saachi Tour & Travel | Domestic, Pilgrimage & Customized Tour Packages',
    template: '%s | Saachi Tour & Travel',
  },
  description: 'Book customized tour packages, pilgrimage tours (Char Dham, Ashtavinayak), flight, train & hotel bookings, family holidays, and corporate travel solutions with Saachi Tour & Travel. Where every journey begins with care.',
  keywords: ['travel agency', 'tour packages', 'Saachi Tour and Travel', 'Sachi Tours & Travels', 'pilgrimage tours', 'Ashtavinayak tour', 'Char Dham yatra', 'customized holidays', 'flight bookings Pune', 'train bookings Pune', 'family tours', 'honeymoon packages', 'corporate travel Pune'],
  authors: [{ name: 'Saachi Tour and Travel' }],
  creator: 'Saachi Tour and Travel',
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
    url: 'https://saachi-tours.vercel.app',
    title: 'Saachi Tour & Travel | Domestic, Pilgrimage & Customized Tour Packages',
    description: 'Book customized tour packages, pilgrimage tours (Char Dham, Ashtavinayak), hotel bookings, and corporate travel solutions with Saachi Tour & Travel.',
    siteName: 'Saachi Tour & Travel',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saachi Tour & Travel - Where Every Journey Begins with Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saachi Tour & Travel | Domestic, Pilgrimage & Customized Tour Packages',
    description: 'Book customized tour packages, pilgrimage tours (Char Dham, Ashtavinayak), hotel bookings, and corporate travel solutions with Saachi Tour & Travel.',
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
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-grow pt-20 lg:pt-24">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
