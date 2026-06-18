import { db } from './db';
import { packages as mockPackages } from '@/data/packages';
import { destinations as mockDestinations } from '@/data/destinations';
import { testimonials as mockTestimonials } from '@/data/testimonials';
import { blogs as mockBlogs } from '@/data/blogs';
import { Package, Destination, Testimonial, Blog } from '@/types';

// Fetch Packages
export async function getDbPackages(): Promise<Package[]> {
  try {
    const dbPackages = await db.package.findMany({
      include: {
        itinerary: { orderBy: { day: 'asc' } },
        pricing: true,
      },
    });

    if (dbPackages.length > 0) {
      return dbPackages.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        destination: p.destination,
        duration: p.duration,
        durationDays: p.durationDays,
        price: p.price,
        rating: p.rating,
        tourType: p.tourType as Package['tourType'],
        images: p.images,
        overview: p.overview,
        itinerary: p.itinerary.map((i) => ({
          day: i.day,
          title: i.title,
          description: i.description,
        })),
        inclusions: p.inclusions,
        exclusions: p.exclusions,
        pricing: {
          couple: p.pricing?.couple || p.price,
          family: p.pricing?.family || p.price,
          group: p.pricing?.group || p.price,
        },
        popular: p.popular,
      }));
    }
  } catch (error) {
    console.warn('Database query failed for packages, using static mock data.', error);
  }
  return mockPackages;
}

// Fetch Package by Slug
export async function getDbPackageBySlug(slug: string): Promise<Package | null> {
  try {
    const p = await db.package.findUnique({
      where: { slug },
      include: {
        itinerary: { orderBy: { day: 'asc' } },
        pricing: true,
      },
    });

    if (p) {
      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        destination: p.destination,
        duration: p.duration,
        durationDays: p.durationDays,
        price: p.price,
        rating: p.rating,
        tourType: p.tourType as Package['tourType'],
        images: p.images,
        overview: p.overview,
        itinerary: p.itinerary.map((i) => ({
          day: i.day,
          title: i.title,
          description: i.description,
        })),
        inclusions: p.inclusions,
        exclusions: p.exclusions,
        pricing: {
          couple: p.pricing?.couple || p.price,
          family: p.pricing?.family || p.price,
          group: p.pricing?.group || p.price,
        },
        popular: p.popular,
      };
    }
  } catch (error) {
    console.warn(`Database query failed for package slug ${slug}, trying mock fallback.`, error);
  }
  // Mock fallback
  return mockPackages.find((p) => p.slug === slug) || null;
}

// Fetch Destinations
export async function getDbDestinations(): Promise<Destination[]> {
  try {
    const dbDestinations = await db.destination.findMany({
      include: {
        _count: {
          select: { packages: true },
        },
      },
    });

    if (dbDestinations.length > 0) {
      return dbDestinations.map((d) => ({
        id: d.id,
        slug: d.slug,
        name: d.name,
        image: d.image,
        description: d.description,
        packageCount: d._count.packages,
      }));
    }
  } catch (error) {
    console.warn('Database query failed for destinations, using static mock data.', error);
  }
  return mockDestinations;
}

// Fetch Testimonials
export async function getDbTestimonials(): Promise<Testimonial[]> {
  try {
    const dbTestimonials = await db.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (dbTestimonials.length > 0) {
      return dbTestimonials.map((t) => ({
        id: t.id,
        name: t.name,
        destinationVisited: t.destinationVisited,
        rating: t.rating,
        reviewText: t.reviewText,
        avatarUrl: t.avatarUrl || undefined,
      }));
    }
  } catch (error) {
    console.warn('Database query failed for testimonials, using static mock data.', error);
  }
  return mockTestimonials;
}

// Fetch Blogs
export async function getDbBlogs(): Promise<Blog[]> {
  try {
    const dbBlogs = await db.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (dbBlogs.length > 0) {
      return dbBlogs.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category as Blog['category'],
        author: b.author,
        date: b.date,
        image: b.image,
        readTime: b.readTime,
      }));
    }
  } catch (error) {
    console.warn('Database query failed for blogs, using static mock data.', error);
  }
  return mockBlogs;
}

// Fetch Blog by Slug
export async function getDbBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const b = await db.blog.findUnique({
      where: { slug },
    });

    if (b) {
      return {
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category as Blog['category'],
        author: b.author,
        date: b.date,
        image: b.image,
        readTime: b.readTime,
      };
    }
  } catch (error) {
    console.warn(`Database query failed for blog slug ${slug}, trying mock fallback.`, error);
  }
  return mockBlogs.find((b) => b.slug === slug) || null;
}
