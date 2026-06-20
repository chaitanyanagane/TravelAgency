import React from 'react';
import DestinationsClient from '@/components/destinations/DestinationsClient';
import { getAllDestinations } from '@/sanity/lib/queries';

export const revalidate = 60;

export default async function DestinationsPage() {
  const destinations = await getAllDestinations();
  return <DestinationsClient destinations={destinations} />;
}
