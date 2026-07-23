/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from './client'
import { urlFor } from './image'

// ==========================================
// GROQ Queries
// ==========================================

export const ALL_PACKAGES_QUERY = `
  *[_type == "package"] | order(rating desc) {
    "id": _id,
    "slug": slug.current,
    title,
    "destination": destination->name,
    duration,
    durationDays,
    price,
    rating,
    tourType,
    featuredImage,
    galleryImages,
    overview,
    itinerary[] {
      day,
      title,
      description
    },
    inclusions,
    exclusions,
    pricing {
      couple,
      family,
      group
    },
    "popular": featuredPackage
  }
`

export const FEATURED_PACKAGES_QUERY = `
  *[_type == "package" && featuredPackage == true] | order(rating desc) {
    "id": _id,
    "slug": slug.current,
    title,
    "destination": destination->name,
    duration,
    durationDays,
    price,
    rating,
    tourType,
    featuredImage,
    galleryImages,
    overview,
    itinerary[] {
      day,
      title,
      description
    },
    inclusions,
    exclusions,
    pricing {
      couple,
      family,
      group
    },
    "popular": featuredPackage
  }
`

export const PACKAGE_BY_SLUG_QUERY = `
  *[_type == "package" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    "destination": destination->name,
    duration,
    durationDays,
    price,
    rating,
    tourType,
    featuredImage,
    galleryImages,
    overview,
    itinerary[] {
      day,
      title,
      description
    },
    inclusions,
    exclusions,
    pricing {
      couple,
      family,
      group
    },
    "popular": featuredPackage
  }
`

export const ALL_DESTINATIONS_QUERY = `
  *[_type == "destination"] | order(name asc) {
    "id": _id,
    "slug": slug.current,
    name,
    image,
    description,
    packageCount
  }
`

export const ALL_TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(_createdAt desc) {
    "id": _id,
    name,
    destinationVisited,
    rating,
    reviewText,
    avatar
  }
`

export const ALL_BLOGS_QUERY = `
  *[_type == "blog"] | order(date desc) {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    content,
    category,
    author,
    date,
    image,
    readTime
  }
`

export const BLOG_BY_SLUG_QUERY = `
  *[_type == "blog" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    content,
    category,
    author,
    date,
    image,
    readTime
  }
`

// ==========================================
// Helper Functions & URL Resolvers
// ==========================================

// Helper to resolve and optimize Sanity image objects to string URLs
// Helper to resolve and optimize Sanity image objects to string URLs
function getOptimizedImages(featuredImage: any, galleryImages: any): string[] {
  const urls: string[] = []
  if (featuredImage) {
    try {
      const url = urlFor(featuredImage).width(1200).auto('format').url()
      if (url) urls.push(url)
    } catch {
      // Fallback
    }
  }
  if (Array.isArray(galleryImages)) {
    galleryImages.forEach((img) => {
      try {
        const url = urlFor(img).width(1200).auto('format').url()
        if (url) urls.push(url)
      } catch {
        // Fallback
      }
    })
  }
  
  // Fallback to placeholder if no images resolved
  if (urls.length === 0) {
    urls.push('https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80')
  }
  return urls
}

// ==========================================
// Exposed Data Fetching Helpers
// ==========================================

export async function getAllPackages() {
  console.log('Sanity Client Config [getAllPackages]:', {
    projectId: client.config().projectId,
    dataset: client.config().dataset,
    apiVersion: client.config().apiVersion,
    useCdn: client.config().useCdn,
  });
  try {
    const rawPackages = await client.fetch<any[]>(ALL_PACKAGES_QUERY)
    console.log(`getAllPackages query success: returned ${rawPackages?.length || 0} documents.`);
    if (!rawPackages) return [];
    return (rawPackages ?? []).map((pkg) => ({
      ...pkg,
      itinerary: pkg.itinerary ?? [],
      inclusions: pkg.inclusions ?? [],
      exclusions: pkg.exclusions ?? [],
      pricing: pkg.pricing ?? { couple: null, family: null, group: null },
      images: getOptimizedImages(pkg?.featuredImage, pkg?.galleryImages),
    }))
  } catch (err) {
    console.error('Sanity: getAllPackages query failed. Real error:', err)
    return []
  }
}

export async function getFeaturedPackages() {
  console.log('Sanity Client Config [getFeaturedPackages]:', {
    projectId: client.config().projectId,
    dataset: client.config().dataset,
    apiVersion: client.config().apiVersion,
    useCdn: client.config().useCdn,
  });
  try {
    const rawPackages = await client.fetch<any[]>(FEATURED_PACKAGES_QUERY)
    console.log(`getFeaturedPackages query success: returned ${rawPackages?.length || 0} documents.`);
    if (!rawPackages) return [];
    return (rawPackages ?? []).map((pkg) => ({
      ...pkg,
      itinerary: pkg.itinerary ?? [],
      inclusions: pkg.inclusions ?? [],
      exclusions: pkg.exclusions ?? [],
      pricing: pkg.pricing ?? { couple: null, family: null, group: null },
      images: getOptimizedImages(pkg?.featuredImage, pkg?.galleryImages),
    }))
  } catch (err) {
    console.error('Sanity: getFeaturedPackages query failed. Real error:', err)
    return []
  }
}

export async function getPackageBySlug(slug: string) {
  console.log(`Sanity Client Config [getPackageBySlug] for "${slug}":`, {
    projectId: client.config().projectId,
    dataset: client.config().dataset,
    apiVersion: client.config().apiVersion,
    useCdn: client.config().useCdn,
  });
  try {
    const pkg = await client.fetch<any>(PACKAGE_BY_SLUG_QUERY, { slug })
    console.log(`getPackageBySlug query success for "${slug}":`, pkg ? 'found' : 'not found');
    if (!pkg) return null;
    return {
      ...pkg,
      itinerary: pkg.itinerary ?? [],
      inclusions: pkg.inclusions ?? [],
      exclusions: pkg.exclusions ?? [],
      pricing: pkg.pricing ?? { couple: null, family: null, group: null },
      images: getOptimizedImages(pkg?.featuredImage, pkg?.galleryImages),
    }
  } catch (err) {
    console.error(`Sanity: getPackageBySlug for "${slug}" failed. Real error:`, err)
    return null
  }
}

export async function getAllDestinations() {
  console.log('Sanity Client Config [getAllDestinations]:', {
    projectId: client.config().projectId,
    dataset: client.config().dataset,
    apiVersion: client.config().apiVersion,
    useCdn: client.config().useCdn,
  });
  try {
    const rawDestinations = await client.fetch<any[]>(ALL_DESTINATIONS_QUERY)
    console.log(`getAllDestinations query success: returned ${rawDestinations?.length || 0} documents.`);
    if (!rawDestinations) return [];
    return (rawDestinations ?? []).map((dest) => {
      let imageUrl = 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80';
      if (dest?.image) {
        try {
          imageUrl = urlFor(dest.image).width(800).auto('format').url() || imageUrl;
        } catch {
          // Fallback
        }
      }
      return {
        ...dest,
        image: imageUrl,
      };
    })
  } catch (err) {
    console.error('Sanity: getAllDestinations query failed. Real error:', err)
    return []
  }
}

export async function getAllTestimonials() {
  console.log('Sanity Client Config [getAllTestimonials]:', {
    projectId: client.config().projectId,
    dataset: client.config().dataset,
    apiVersion: client.config().apiVersion,
    useCdn: client.config().useCdn,
  });
  try {
    const rawTestimonials = await client.fetch<any[]>(ALL_TESTIMONIALS_QUERY)
    console.log(`getAllTestimonials query success: returned ${rawTestimonials?.length || 0} documents.`);
    if (!rawTestimonials) return [];
    return (rawTestimonials ?? []).map((t) => {
      let avatarUrl = undefined;
      if (t?.avatar) {
        try {
          avatarUrl = urlFor(t.avatar).width(150).height(150).auto('format').url() || undefined;
        } catch {
          // Fallback
        }
      }
      return {
        ...t,
        avatarUrl,
      };
    })
  } catch (err) {
    console.error('Sanity: getAllTestimonials query failed. Real error:', err)
    return []
  }
}

export async function getAllBlogs() {
  console.log('Sanity Client Config [getAllBlogs]:', {
    projectId: client.config().projectId,
    dataset: client.config().dataset,
    apiVersion: client.config().apiVersion,
    useCdn: client.config().useCdn,
  });
  try {
    const rawBlogs = await client.fetch<any[]>(ALL_BLOGS_QUERY)
    console.log(`getAllBlogs query success: returned ${rawBlogs?.length || 0} documents.`);
    if (!rawBlogs) return [];
    return (rawBlogs ?? []).map((post) => {
      let imageUrl = 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=800&q=80';
      if (post?.image) {
        try {
          imageUrl = urlFor(post.image).width(1200).auto('format').url() || imageUrl;
        } catch {
          // Fallback
        }
      }
      return {
        ...post,
        image: imageUrl,
      };
    })
  } catch (err) {
    console.error('Sanity: getAllBlogs query failed. Real error:', err)
    return []
  }
}

export async function getBlogBySlug(slug: string) {
  console.log(`Sanity Client Config [getBlogBySlug] for "${slug}":`, {
    projectId: client.config().projectId,
    dataset: client.config().dataset,
    apiVersion: client.config().apiVersion,
    useCdn: client.config().useCdn,
  });
  try {
    const post = await client.fetch<any>(BLOG_BY_SLUG_QUERY, { slug })
    console.log(`getBlogBySlug query success for "${slug}":`, post ? 'found' : 'not found');
    if (!post) return null;
    let imageUrl = 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=800&q=80';
    if (post?.image) {
      try {
        imageUrl = urlFor(post.image).width(1200).auto('format').url() || imageUrl;
      } catch {
        // Fallback
      }
    }
    return {
      ...post,
      image: imageUrl,
    }
  } catch (err) {
    console.error(`Sanity: getBlogBySlug for "${slug}" failed. Real error:`, err)
    return null
  }
}
