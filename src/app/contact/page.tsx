'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 9823997276';
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'varshaagaikwad563@gmail.com';
  const contactAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Chandrabhaga corner, Mukai chouk Ravet, Pune, Maharashtra 412101';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91 9823997276';
  const mapsEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || 'https://maps.app.goo.gl/gGVvVSFo8tBP7FwPA';

  const onSubmit = (data: ContactFormData) => {
    setFormData(data);
    setIsSubmitted(true);
  };

  const triggerWhatsApp = () => {
    if (!formData) return;
    const text = `*New Contact Inquiry*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    handleReset();
  };

  const triggerEmail = () => {
    if (!formData) return;
    const subject = `Saachi Tour & Travel Contact Inquiry - ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
    const url = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_self');
    handleReset();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData(null);
    reset();
  };

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wider uppercase inline-block">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
          Contact Our Travel Experts
        </h1>
        <p className="text-slate-400 font-light leading-relaxed">
          Have questions about pricing, customized routing, or booking conditions? Write to us, email us, or chat with our experts directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Contact Information & Maps */}
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800/60 rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white font-display">Office Information</h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold">Address</span>
                  <span className="text-slate-200 text-sm">{contactAddress}</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold">Phone Number</span>
                  <a
                    href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                    className="text-teal-400 hover:text-teal-300 font-medium text-sm transition-colors"
                  >
                    {contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold">Email Address</span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-teal-400 hover:text-teal-300 font-medium text-sm transition-colors"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-teal-900/30 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold">Business Hours</span>
                  <span className="text-slate-200 text-sm block">Mon - Sat: 10:00 AM - 6:00 PM</span>
                  <span className="text-slate-500 text-xs">Sunday: Closed</span>
                </div>
              </div>
            </div>
            
            {/* Direct WhatsApp Call to Action */}
            <div className="pt-6 border-t border-slate-800/80">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi%20Saachi%20Tours%2520and%2520Travels,%2520I%2520have%2520an%2520inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center space-x-2 text-sm shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Maps Embed */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-900 shadow-md bg-slate-950">
            <iframe
              src={mapsEmbedUrl}
              className="absolute inset-0 w-full h-full border-0 grayscale invert opacity-70"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Saachi Tour & Travel Office Map"
            />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-slate-900 border border-slate-800/60 rounded-3xl p-8 shadow-md">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="text-2xl font-bold text-white font-display mb-4">Send an Inquiry</h2>

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Your Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 transition-colors"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <span className="text-red-400 text-xs font-medium block">{errors.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 transition-colors"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-400 text-xs font-medium block">{errors.email.message}</span>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Mobile Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter mobile number"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 transition-colors"
                  {...register('phone', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^[0-9+-\s]{10,15}$/,
                      message: 'Invalid phone number',
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-red-400 text-xs font-medium block">{errors.phone.message}</span>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Your Requirements / Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about the destinations, group size, or custom expectations..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 transition-colors resize-none"
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message && (
                  <span className="text-red-400 text-xs font-medium block">{errors.message.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Validating...' : 'Proceed to Submit'}</span>
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-16 h-16 bg-teal-950/40 text-teal-400 border border-teal-500/20 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-display">Inquiry Validated!</h3>
                <p className="text-slate-400 text-xs font-light max-w-sm mx-auto">
                  Choose how you want to deliver your request details to our travel coordinator.
                </p>
              </div>

              <div className="space-y-3 max-w-sm mx-auto pt-4">
                <button
                  onClick={triggerWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center space-x-2 text-sm shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Send via WhatsApp</span>
                </button>
                <button
                  onClick={triggerEmail}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-3.5 rounded-xl transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email Client</span>
                </button>
                <button
                  onClick={handleReset}
                  className="w-full text-slate-500 hover:text-slate-400 font-semibold text-xs pt-2"
                >
                  Edit Inquiry Details
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
