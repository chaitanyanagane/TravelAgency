import React from 'react';
import HomeClient from '@/components/home/HomeClient';
import { getFeaturedPackages, getAllDestinations, getAllTestimonials, getAllBlogs } from '@/sanity/lib/queries';

// Live content revalidation (re-cache after 60 seconds)
export const revalidate = 60;

export default async function HomePage() {
  const [featuredPackages, destinations, testimonials, blogs] = await Promise.all([
    getFeaturedPackages(),
    getAllDestinations(),
    getAllTestimonials(),
    getAllBlogs(),
  ]);

  const featuredDestinations = (destinations ?? []).slice(0, 4);
  const featuredBlogs = (blogs ?? []).slice(0, 3);

  return (
    <HomeClient
      featuredPackages={featuredPackages ?? []}
      featuredDestinations={featuredDestinations}
      testimonials={testimonials ?? []}
      featuredBlogs={featuredBlogs}
    />
  );
}
