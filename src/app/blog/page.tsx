'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { blogs } from '../../data/blogs';

type BlogCategory = 'all' | 'Travel Tips' | 'Weekend Getaways' | 'Monsoon Destinations' | 'Family Travel';

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('all');

  // Filter and Search
  const filteredBlogs = blogs.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: { label: string; value: BlogCategory }[] = [
    { label: 'All Articles', value: 'all' },
    { label: 'Travel Tips', value: 'Travel Tips' },
    { label: 'Weekend Getaways', value: 'Weekend Getaways' },
    { label: 'Monsoon Destinations', value: 'Monsoon Destinations' },
    { label: 'Family Travel', value: 'Family Travel' },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wider uppercase inline-block">
          Travel Journal
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
          Saachi Tours & Travels Blog
        </h1>
        <p className="text-slate-400 font-light leading-relaxed">
          Stay updated with packing checklists, local monsoon weather guides, weekend drive suggestions, and family travel secrets.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search articles by title, keywords or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800/80 rounded-2xl pl-12 pr-4 py-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors shadow-inner"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all duration-300 ${
                selectedCategory === cat.value
                  ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-900/20'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredBlogs.map((post) => (
              <motion.article
                key={post.id}
                className="bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden flex flex-col h-full hover:border-slate-800 shadow-md group"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 z-10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-slate-950/80 backdrop-blur-md rounded-full text-teal-400 border border-slate-800">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-3 text-xs text-slate-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <span>&bull;</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-teal-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-slate-400 text-sm font-light line-clamp-2 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 border-t border-slate-800/80 mt-auto flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      By {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-teal-400 hover:text-teal-300 group"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 space-y-4 max-w-sm mx-auto"
        >
          <div className="w-12 h-12 bg-slate-900 border border-slate-800 text-slate-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-display">No articles found</h3>
            <p className="text-slate-500 text-xs font-light">
              Try searching for something else or change the category filter.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-teal-400 text-xs font-semibold hover:text-teal-300 transition-colors"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
