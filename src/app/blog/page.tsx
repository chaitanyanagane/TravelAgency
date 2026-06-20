import React from 'react';
import BlogClient from '@/components/blog/BlogClient';
import { getAllBlogs } from '@/sanity/lib/queries';

export const revalidate = 60;

export default async function BlogListingPage() {
  const blogs = await getAllBlogs();
  return <BlogClient blogs={blogs} />;
}
