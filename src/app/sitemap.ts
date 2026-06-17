import { MetadataRoute } from 'next';
import { packages } from '../data/packages';
import { blogs } from '../data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saachi-tours.vercel.app';

  // Core Static routes
  const staticRoutes = [
    '',
    '/packages',
    '/destinations',
    '/gallery',
    '/testimonials',
    '/about',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Package routes
  const packageRoutes = packages.map((tour) => ({
    url: `${baseUrl}/packages/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Blog routes
  const blogRoutes = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...packageRoutes, ...blogRoutes];
}
