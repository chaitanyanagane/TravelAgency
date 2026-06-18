'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 flex items-start space-x-3"
        >
          {/* Icon */}
          <div className="shrink-0 mt-0.5">
            {type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-500" />
            )}
          </div>

          {/* Text Message */}
          <div className="flex-grow">
            <span className="block text-xs uppercase font-bold tracking-wider text-slate-500 mb-0.5">
              {type === 'success' ? 'Success' : 'Error'}
            </span>
            <p className="text-slate-200 text-sm font-light leading-relaxed">
              {message}
            </p>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={onClose}
            className="shrink-0 text-slate-500 hover:text-slate-300 p-0.5 transition-colors focus:outline-none"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
