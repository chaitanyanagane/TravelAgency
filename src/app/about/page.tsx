'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, Target, Sparkles, Award, Heart, Shield } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Established', value: '19 March 2025' },
    { label: 'Travelers Served', value: '1,000+' },
    { label: 'Destinations Covered', value: '50+' },
    { label: 'Rating', value: '4.9/5' },
  ];

  const team = [
    {
      name: 'Varsha Gaikwad',
      role: 'Founder & Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80',
      bio: 'Varsha established Saachi Tours & Travels with the core vision of making travel premium, transparent, and exceptionally caring for every customer.',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      desc: 'No hidden charges, no surprises. We lay out pricing details clearly and deliver exactly what we promise.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      desc: 'We select top-rated eco-resorts, heritage hotels, and verified clean vehicles for transfers.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      desc: 'Your safety and comfort is our priority. Our team is active day and night to handle any delays or emergencies.',
    },
    {
      icon: Sparkles,
      title: 'Custom Care',
      desc: 'Every traveler is unique. We tailor dates, activities, and meals to ensure a bespoke holiday experience.',
    },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wider uppercase inline-block">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Saachi Tours & Travels
          </h1>
          <p className="text-slate-300 font-light leading-relaxed">
            Established on 19 March 2025 in Ravet, Pune, Saachi Tours & Travels was built with a clear purpose: Where every journey begins with care. We believe that travel is more than just visiting destinations—it&apos;s about creating lifelong memories, discovering new cultures, and enjoying every moment of the journey.
          </p>
          <p className="text-slate-400 font-light leading-relaxed">
            Under the leadership of our founder, Varsha Gaikwad, we realized that holiday planning can often feel overwhelming. We set out to change this by coordinating every detail with safety, comfort, and direct value—whether it is customized family packages, spiritual pilgrimage tours like Ashtavinayak and Char Dham, or logistics for corporate groups.
          </p>
          <p className="text-slate-400 font-light leading-relaxed">
            Today, we stand proud as a trusted partner for travelers seeking authentic experiences across Maharashtra and beyond, making holiday planning a transparent and delightful experience.
          </p>
        </motion.div>

        <motion.div
          className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-900 bg-slate-950"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
            alt="Travel Planning Team Desk"
            fill
            className="object-cover opacity-80"
          />
        </motion.div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-slate-900/40 border border-slate-800/40 rounded-3xl p-10 shadow-lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="block text-3xl sm:text-4xl font-extrabold text-teal-400">
                {stat.value}
              </span>
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-slate-900 border border-slate-800/60 rounded-3xl p-8 space-y-4 shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Our Mission</h2>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            To provide safe, affordable, and memorable travel experiences while delivering exceptional customer service and value.
          </p>
        </motion.div>

        <motion.div
          className="bg-slate-900 border border-slate-800/60 rounded-3xl p-8 space-y-4 shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-12 h-12 rounded-xl bg-amber-900/30 text-amber-400 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Our Vision</h2>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            To become a preferred and trusted travel partner by offering innovative travel solutions and unforgettable journeys for every traveler.
          </p>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-teal-500 font-semibold tracking-wider uppercase text-xs">
            Our Philosophy
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
            Core Business Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-slate-900/30 border border-slate-800/40 hover:border-slate-800 rounded-2xl p-6 space-y-3 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-teal-900/20 text-teal-400 flex items-center justify-center">
                <val.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">{val.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="space-y-12 border-t border-slate-900 pt-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-teal-500 font-semibold tracking-wider uppercase text-xs">
            Our Leadership
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
            Meet Our Founder
          </h2>
        </div>

        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800/60 rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row items-stretch group">
          <div className="relative aspect-square w-full md:w-1/2 overflow-hidden bg-slate-950 min-h-[300px]">
            <Image
              src={team[0].image}
              alt={team[0].name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-8 flex flex-col justify-center w-full md:w-1/2 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">
                {team[0].name}
              </h3>
              <span className="text-teal-400 text-xs font-semibold block mt-1">
                {team[0].role}
              </span>
            </div>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              {team[0].bio}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
