import React from 'react';
import TestimonialsClient from '@/components/testimonials/TestimonialsClient';
import { getAllTestimonials } from '@/sanity/lib/queries';

export const revalidate = 60;

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();
  return <TestimonialsClient testimonials={testimonials} />;
}
