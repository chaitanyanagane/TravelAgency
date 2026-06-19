import React from 'react';
import HomeClient from '@/components/home/HomeClient';
import { getFeaturedPackages } from '@/sanity/lib/queries';

// Live content revalidation (re-cache after 60 seconds)
export const revalidate = 60;

export default async function HomePage() {
  const featuredPackages = await getFeaturedPackages();
  return <HomeClient featuredPackages={featuredPackages} />;
}
