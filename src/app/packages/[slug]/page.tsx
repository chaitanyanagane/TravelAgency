import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { packages } from '../../../data/packages';
import PackageDetailClient from '../../../components/packages/PackageDetailClient';
import JSONLD from '../../../components/common/JSONLD';

interface PackagePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Statically pre-render all packages
export async function generateStaticParams() {
  return packages.map((tour) => ({
    slug: tour.slug,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = packages.find((p) => p.slug === slug);
  if (!tour) return {};

  return {
    title: `${tour.title} (${tour.duration})`,
    description: tour.overview,
    alternates: {
      canonical: `/packages/${tour.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `https://saachi-tours.vercel.app/packages/${tour.slug}`,
      title: `${tour.title} | Saachi Tour & Travel`,
      description: tour.overview,
      images: tour.images.map((img) => ({ url: img })),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tour.title} | Saachi Tour & Travel`,
      description: tour.overview,
      images: [tour.images[0]],
    },
  };
}

export default async function PackageDetailPage({ params }: PackagePageProps) {
  const { slug } = await params;
  const tour = packages.find((p) => p.slug === slug);

  if (!tour) {
    notFound();
  }

  // Structured Data Schema for SEO
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': tour.title,
    'description': tour.overview,
    'image': tour.images,
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': tour.price,
      'priceValidUntil': '2027-12-31',
      'availability': 'https://schema.org/InStock',
      'url': `https://saachi-tours.vercel.app/packages/${tour.slug}`,
      'seller': {
        '@type': 'Organization',
        'name': 'Saachi Tour & Travel',
      },
    },
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <JSONLD data={productSchema} />

      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/packages"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-teal-400 hover:text-teal-300 group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Packages Catalog</span>
        </Link>
      </div>

      {/* Content wrapper */}
      <PackageDetailClient tour={tour} />
    </div>
  );
}
