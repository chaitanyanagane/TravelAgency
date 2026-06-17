'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919823997276';
  const defaultMessage = 'Hi! I am interested in planning a vacation with Saachi Tour & Travel. Please share some popular packages.';
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-full shadow-lg text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Inquire on WhatsApp"
    >
      <svg
        className="w-8 h-8 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.632 1.971 14.16 1.97 11.53 1.97 6.137 1.97 1.71 6.34 1.706 11.769c-.001 1.705.452 3.37 1.31 4.862l-.997 3.642 3.734-.979zm11.378-4.708c-.305-.153-1.802-.889-2.083-.99-.281-.101-.485-.153-.688.152-.204.304-.787.99-.965 1.191-.177.203-.355.228-.66.076-.305-.152-1.288-.475-2.454-1.514-.908-.81-1.52-1.81-1.698-2.115-.178-.305-.019-.47.133-.621.137-.136.305-.355.457-.533.153-.177.204-.304.305-.507.102-.203.051-.38-.025-.533-.076-.152-.688-1.659-.942-2.268-.247-.594-.5-.514-.688-.524-.178-.009-.38-.01-.584-.01-.203 0-.534.076-.814.38-.28.305-1.068 1.039-1.068 2.535s1.093 2.942 1.246 3.145c.153.203 2.152 3.284 5.216 4.602.729.314 1.298.5 1.743.64.732.233 1.398.2 1.925.122.587-.087 1.802-.736 2.057-1.448.254-.71.254-1.32.178-1.448-.076-.127-.28-.203-.585-.355z" />
      </svg>
      {/* Decorative pulse ring */}
      <span className="absolute -z-10 inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
    </motion.a>
  );
}
