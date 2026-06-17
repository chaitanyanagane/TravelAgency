# Saachi Tour & Travel - Production Website

A modern, responsive, high-performance, and SEO-optimized travel agency website built for **Saachi Tour & Travel**, designed primarily for premium brand presentation and lead generation.

---

## 🚀 Tech Stack

- **Framework:** React 19 + Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Modern architecture, CSS variables, native selectors)
- **Animations:** Framer Motion (Hardware-accelerated entries, scroll reveals, sliding carousels)
- **Forms:** React Hook Form (Validated inputs, client-side error handling)
- **Icons:** Lucide React (Lightweight vector paths)
- **Image Optimization:** Next.js Image component (WebP/AVIF remote loaders)
- **Deployment:** Vercel

---

## 🎨 Key Features

1. **Responsive Glassmorphism Header:** Transitions from transparent to blurred glass upon scroll.
2. **SEO-Optimized Metadata & Schemas:** Dynamic page titles, OpenGraph previews, canonical tags, automated XML sitemaps, and rich JSON-LD schema structures.
3. **Frontend Filtering & Sorting:** Instant client-side filters for Destination, Category, Duration, and Budget, with multiple sorting methods.
4. **Mutually Exclusive Itinerary Accordions:** Interactive details disclosure cards utilizing native HTML `<details>` properties for quick find-in-page accessibility.
5. **Lightbox Photo Gallery:** Smooth grid columns presenting photos with a custom lightbox supporting tap, swipe, and Esc/Arrow keys.
6. **Dual Inquiry Conversion Submission:** Fully validated form checkout generating a formatted WhatsApp message or triggering a local email client fallback.

---

## 📂 Project Structure

```
/
├── public/                     # Static assets (favicons, overlays)
├── src/
│   ├── app/                    # Next.js App Router Page directories
│   │   ├── about/              # About us page
│   │   ├── blog/               # Blog listing page
│   │   │   └── [slug]/         # Blog details static route
│   │   ├── contact/            # Interactive contact form & map
│   │   ├── destinations/       # Destination cards directory
│   │   ├── gallery/            # Category filtered lightbox gallery
│   │   ├── packages/           # Packages listing and live filters
│   │   │   └── [slug]/         # Dynamic package overview, accordion, and inquiry form
│   │   ├── testimonials/       # Grid reviews
│   │   ├── globals.css         # Tailwind v4 directives and theme values
│   │   ├── layout.tsx          # Global fonts, HTML metadata wrapper, Header, Footer
│   │   ├── page.tsx            # Home page sections and statistics
│   │   ├── robots.ts           # Robots crawler rules
│   │   └── sitemap.ts          # XML Sitemap generator script
│   ├── components/             # Reusable UI component blocks
│   │   ├── common/             # Global FloatingWhatsApp, JSONLD schema scripts
│   │   ├── layout/             # Sticky Header and detailed Footer
│   │   └── packages/           # PackageCard, PackageDetailClient layouts
│   ├── data/                   # Structured TypeScript mock data files
│   │   ├── blogs.ts            # Blog topics targeting high-intent keywords
│   │   ├── destinations.ts     # Handpicked locations listing
│   │   ├── gallery.ts          # categorized gallery images
│   │   ├── packages.ts         # Multi-day itineraries and tiered pricing
│   │   └── testimonials.ts     # Client logs and ratings
│   └── types/                  # TypeScript interfaces
│       └── index.ts            # Data structures models
├── next.config.ts              # Next.js Image remote loaders config
├── tailwind.config.ts          # PostCSS configurations
└── .env.local                  # Local environment bindings
```

---

## ⚙️ Environment Variables Config

Create a `.env.local` file in the root directory. Add the following variables to customize business coordinates:

```env
# Country code + mobile number (Do not add leading + or spaces)
NEXT_PUBLIC_WHATSAPP_NUMBER=919823997276

# Contact parameters
NEXT_PUBLIC_CONTACT_EMAIL=varshaagaikwad563@gmail.com
NEXT_PUBLIC_CONTACT_PHONE="+91 98239 97276"
NEXT_PUBLIC_CONTACT_ADDRESS="Chandrabhaga corner, Mukai chouk Ravet, Pune, Maharashtra 412101"

# Production Domain (Used to resolve sitemaps and canonical metadata tags)
NEXT_PUBLIC_SITE_URL=https://saachi-tours.vercel.app

# Google Maps place iframe source link
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.2223846618585!2d73.7431326!3d18.6540679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e69c79fa69%3A0xc3fa5ee2366718!2sMukai%20Chowk%2C%20Ravet%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718464000000!5m2!1sen!2sin"
```

---

## 🛠️ Local Development Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to test the local build.

### 3. Check for Style Guidelines Compliance (Linter)
```bash
npm run lint
```

### 4. Build for Production Compilation
```bash
npm run build
```
This script runs the TypeScript compiler and pre-renders all dynamic static paths (`/packages/*`, `/blog/*`) to optimize server loads.

---

## 🗃️ Updating Content (For Non-Technical Users)

To update destinations, pricing, blogs, or reviews, modify the static files in `/src/data/`:
- **Packages:** Edit `/src/data/packages.ts` to add/edit itineraries, pricing structures, or inclusions.
- **Destinations:** Edit `/src/data/destinations.ts` to change summary copy or featured counts.
- **Blogs:** Edit `/src/data/blogs.ts` to compose new travel guides with standard HTML formatting tags.
- **Testimonials:** Edit `/src/data/testimonials.ts` to update customer ratings.

---

## 🌐 Deployment to Vercel

This repository is configured for instantaneous deployment to Vercel:

1. Create a Vercel Account and link your GitHub/GitLab/Bitbucket repository.
2. Select the repository and click **Import**.
3. Under **Environment Variables**, copy the keys and values from your `.env.local` file.
4. Click **Deploy**. Vercel will build the Next.js bundle and host it at a production URL.
