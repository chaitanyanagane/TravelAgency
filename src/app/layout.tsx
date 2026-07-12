import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';

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
