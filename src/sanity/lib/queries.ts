import { client } from './client'
import { urlFor } from './image'

// GROQ Queries
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

// Helper to resolve and optimize Sanity image objects to string URLs
function getOptimizedImages(featuredImage: any, galleryImages: any): string[] {
  const urls: string[] = []
  if (featuredImage) {
    try {
      urls.push(urlFor(featuredImage).width(1200).auto('format').url())
    } catch (e) {
      // Fallback
    }
  }
  if (Array.isArray(galleryImages)) {
    galleryImages.forEach((img) => {
      try {
        urls.push(urlFor(img).width(1200).auto('format').url())
      } catch (e) {
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

// Data Fetching Helpers
export async function getAllPackages() {
  const rawPackages = await client.fetch<any[]>(ALL_PACKAGES_QUERY)
  return rawPackages.map((pkg) => ({
    ...pkg,
    images: getOptimizedImages(pkg.featuredImage, pkg.galleryImages),
  }))
}

export async function getFeaturedPackages() {
  const rawPackages = await client.fetch<any[]>(FEATURED_PACKAGES_QUERY)
  return rawPackages.map((pkg) => ({
    ...pkg,
    images: getOptimizedImages(pkg.featuredImage, pkg.galleryImages),
  }))
}

export async function getPackageBySlug(slug: string) {
  const pkg = await client.fetch<any>(PACKAGE_BY_SLUG_QUERY, { slug })
  if (!pkg) return null
  return {
    ...pkg,
    images: getOptimizedImages(pkg.featuredImage, pkg.galleryImages),
  }
}
