# Saachi Tours & Travels - Production Website

A premium, responsive, high-performance, and SEO-optimized travel agency website built for **Saachi Tours & Travels**, designed for high-end brand presentation and email-based lead generation.

---

## 🚀 Tech Stack

- **Framework:** React 19 + Next.js 16 (App Router)
- **CMS:** Sanity CMS (Studio embedded at `/studio`, GROQ queries, optimized next-sanity image helpers)
- **Inquiry Delivery:** Resend Email Integration (zero database overhead, instant email alerts)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Modern architecture, CSS variables, native selectors)
- **Animations:** Framer Motion (Hardware-accelerated entry slides, spring-based drawer transforms)
- **Forms:** React Hook Form + Zod (Validated client-side month selections and contact fields)
- **Icons:** Lucide React (Lightweight vector paths)
- **Image Optimization:** Next.js Image component (WebP/AVIF remote loaders)
- **Deployment:** Vercel

---

## 🎨 Key Features

1. **Floating Glass-Pill Navbar:** Detached floating navigation capsule (`bg-slate-950/45 border-slate-900/40 mt-4 sm:mt-6`) that transitions to a compact glass island (`bg-slate-950/75 border-slate-800/80`) on scroll. Features an active capsule link indicator and a custom CSS toggle button that morphs hamburger lines into a centered close "X".
2. **Inquiry Processing via Resend:** Direct, validated lead submissions dispatching structured HTML notification emails to the administrator and automated confirmation auto-replies to customers.
3. **Dynamic Months Selection:** Travel inquiries accept upcoming monthly selections (dynamically populated 12 months ahead) instead of exact dates, improving conversions.
4. **Dedicated Human-Friendly Sitemap:** A responsive 2-column card grid at `/sitemap` that maps main pages, legal terms, dynamic tour packages, destinations, and blog entries directly from Sanity CMS.
5. **SEO-Optimized Metadata:** Integrated canonical tags, dynamic OpenGraph/Twitter card descriptors, automated XML feeds, and rich JSON-LD schema layouts.
6. **Mutually Exclusive Itinerary Accordions:** Smooth collapsible guides utilizing native HTML `<details>` properties for quick find-in-page accessibility.
7. **Lightbox Photo Gallery:** Interactive lightbox grid supporting categorizations, keyboard slides, and gestures.

---

## 📂 Project Structure

```
/
├── public/                     # Static assets (favicons, brand logo)
├── src/
│   ├── app/                    # Next.js App Router Page directories
│   │   ├── about/              # About us page
│   │   ├── api/
│   │   │   └── inquiry/        # Resend email API endpoint
│   │   ├── blog/               # Blog listing page
│   │   │   └── [slug]/         # Blog details static route
│   │   ├── contact/            # Interactive contact form & map
│   │   ├── destinations/       # Destination cards directory
│   │   ├── disclaimer/         # Legal disclaimer page
│   │   ├── gallery/            # Category filtered lightbox gallery
│   │   ├── packages/           # Packages listing and live filters
│   │   │   └── [slug]/         # Dynamic package details and sticky CTAs
│   │   ├── privacy-policy/     # Legal privacy policy page
│   │   ├── refund-policy/      # Legal refund & cancellation page
│   │   ├── sitemap/            # Human-friendly sitemap page
│   │   ├── terms-and-conditions/ # Legal terms & conditions page
│   │   ├── testimonials/       # Guest reviews page
│   │   ├── globals.css         # Tailwind v4 directives and theme variables
│   │   ├── layout.tsx          # Global fonts, HTML metadata wrapper, Header, Footer
│   │   ├── page.tsx            # Home page sections and statistics
│   │   ├── robots.ts           # Robots crawler rules
│   │   └── sitemap.ts          # XML Sitemap generator script
│   ├── components/             # Reusable UI component blocks
│   │   ├── common/             # Global FloatingWhatsApp, InquiryForm, JSONLD
│   │   ├── layout/             # Sticky Header and detailed Footer
│   │   └── packages/           # PackageCard, PackageDetailClient layouts
│   ├── data/                   # Structured TypeScript mock fallback data files
│   │   ├── blogs.ts            # Blog topics targeting high-intent keywords
│   │   ├── destinations.ts     # Handpicked locations listing
│   │   ├── gallery.ts          # Categorized gallery images
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
NEXT_PUBLIC_WHATSAPP_NUMBER=919270267390

# Contact parameters
NEXT_PUBLIC_CONTACT_EMAIL=saachituourandtravel@gmail.com
NEXT_PUBLIC_CONTACT_PHONE="+91 92702 67390"
NEXT_PUBLIC_CONTACT_ADDRESS="Chandrabhaga Corner, Mukai Chowk, Ravet, Pune, Maharashtra 412101"

# Production Domain (Used to resolve sitemaps and canonical metadata tags)
NEXT_PUBLIC_SITE_URL=https://saachi-tours.vercel.app

# Google Maps place iframe source link
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.2223846618585!2d73.7431326!3d18.6540679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e69c79fa69%3A0xc3fa5ee2366718!2sMukai%20Chowk%2C%20Ravet%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718464000000!5m2!1sen!2sin"

# Resend Email Configuration
RESEND_API_KEY="re_your_api_key_here"
INQUIRY_EMAIL="naganechaitanya17@gmail.com"

# Sanity CMS config keys
NEXT_PUBLIC_SANITY_PROJECT_ID=4z2l1isy
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-19
SANITY_API_TOKEN="your_sanity_write_token_here"
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
This script runs the TypeScript compiler and pre-renders all dynamic static paths (`/packages/*`, `/blog/*`, `/sitemap`) to optimize server loads.

---

## 🗃️ Updating Content (Sanity CMS)

To update travel packages, destinations, testimonials, and blog posts, navigate to `/studio` in your browser. This mounts the embedded Sanity Studio authoring interface directly inside the Next.js application:

1. **Local Development:** Run `npm run dev` and open [http://localhost:3000/studio](http://localhost:3000/studio).
2. **Production Studio:** Visit `https://saachi-tours.vercel.app/studio` (or your active Vercel domain).
3. Log in using your Sanity credentials to create, publish, and delete content:
   - **Travel Packages:** Manage package titles, slugs, durations, starting prices, day-wise itineraries, inclusions/exclusions, pricing matrices, and photo galleries.
   - **Destinations:** Create new cities or regions and associate them with packages.
   - **Testimonials:** Post guest reviews, ratings, and customer avatar images.
   - **Blog Posts:** Compose new articles, upload features, select categories, and manage author profiles.

---

## 🌐 Deployment to Vercel

This repository is configured for instantaneous deployment to Vercel:

1. Create a Vercel Account and link your GitHub/GitLab/Bitbucket repository.
2. Select the repository and click **Import**.
3. Under **Environment Variables**, copy the keys and values from your `.env.local` file (including `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `RESEND_API_KEY`).
4. Click **Deploy**. Vercel will build the Next.js bundle and host it at a production URL.
