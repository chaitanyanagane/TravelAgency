import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, User, Compass } from 'lucide-react';
import { getBlogBySlug, getAllBlogs } from '@/sanity/lib/queries';
import JSONLD from '@/components/common/JSONLD';
import BlogTracker from '@/components/common/BlogTracker';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static routes
export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs();
    return (blogs ?? []).map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params for blogs:', error);
    return [];
  }
}

// Dynamic Metadata
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogBySlug(slug);
    if (!post) return {};

    let isoDate = '';
    try {
      if (post?.date) {
        isoDate = new Date(post.date).toISOString();
      }
    } catch {
      // Fallback
    }

    return {
      title: post.title || 'Travel Blog',
      description: post.excerpt || '',
      alternates: {
        canonical: `/blog/${post.slug || ''}`,
      },
      openGraph: {
        type: 'article',
        url: `https://saachitours.in/blog/${post.slug || ''}`,
        title: post.title || '',
        description: post.excerpt || '',
        publishedTime: isoDate || undefined,
        authors: post.author ? [post.author] : [],
        images: post.image ? [{ url: post.image }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title || '',
        description: post.excerpt || '',
        images: post.image ? [post.image] : [],
      },
    };
  } catch (error) {
    console.error(`Failed to generate metadata for blog ${slug}:`, error);
    return {};
  }
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  
  let post = null;
  try {
    post = await getBlogBySlug(slug);
  } catch (error) {
    console.error(`Failed to load blog by slug ${slug}:`, error);
  }

  if (!post) {
    notFound();
  }

  let isoDate = '';
  try {
    if (post?.date) {
      isoDate = new Date(post.date).toISOString();
    }
  } catch {
    // Fallback
  }

  // Structured Data Schema for SEO
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post?.title || '',
    'description': post?.excerpt || '',
    'image': post?.image || '/images/logo.png',
    'datePublished': isoDate || undefined,
    'author': {
      '@type': 'Person',
      'name': post?.author || 'Saachi Tours & Travels',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Saachi Tours & Travels',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://saachitours.in/images/logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://saachitours.in/blog/${post?.slug || ''}`,
    },
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <BlogTracker title={post?.title || ''} />
      <JSONLD data={blogSchema} />

      {/* Back to Blogs */}
      <Link
        href="/blog"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-teal-400 hover:text-teal-300 mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        <span>Back to Blog Journal</span>
      </Link>

      {/* Article Container */}
      <article className="space-y-8 bg-slate-900 border border-slate-800/60 rounded-3xl p-6 sm:p-10 shadow-lg">
        {/* Banner metadata */}
        <div className="space-y-4">
          {post?.category && (
            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider inline-block">
              {post.category}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
            {post?.title || ''}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-b border-slate-800/80 pb-6">
            {post?.author && (
              <div className="flex items-center space-x-1.5">
                <User className="w-4 h-4 text-teal-500 shrink-0" />
                <span>By {post.author}</span>
              </div>
            )}
            {post?.author && post?.date && <span className="hidden sm:inline">&bull;</span>}
            {post?.date && (
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-teal-500 shrink-0" />
                <span>Published: {post.date}</span>
              </div>
            )}
            {post?.date && post?.readTime && <span className="hidden sm:inline">&bull;</span>}
            {post?.readTime && (
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-teal-500 shrink-0" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Feature Image */}
        {post?.image && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/60">
            <Image
              src={post.image || '/images/logo.png'}
              alt={post.title || ''}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
              priority
              fetchPriority="high"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div 
          className="text-slate-300 font-light text-sm sm:text-base leading-relaxed space-y-6 max-w-none 
            prose prose-invert prose-headings:font-display prose-headings:font-bold prose-headings:text-white 
            prose-a:text-teal-400 hover:prose-a:text-teal-300 prose-strong:text-white prose-ol:list-decimal 
            prose-ul:list-disc prose-ul:pl-5 prose-ol:pl-5"
          dangerouslySetInnerHTML={{ __html: post?.content || '' }}
        />
      </article>

      {/* Share Section CTA banner */}
      <div className="mt-12 bg-slate-900/40 border border-slate-850 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="block text-sm font-bold text-white">Need professional travel advice?</span>
          <span className="block text-xs text-slate-500 font-light">Get custom vacation itineraries coordinated for your group sizes.</span>
        </div>
        <Link
          href="/contact"
          className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors shadow-md shrink-0"
        >
          <Compass className="w-4 h-4" />
          <span>Inquire Now</span>
        </Link>
      </div>
    </div>
  );
}
