import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data/mockData';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, MessageSquareQuote } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const current = REVIEWS[activeReviewIndex];

  return (
    <section id="reviews" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#0B1F3A] text-white text-[11px] font-extrabold tracking-widest uppercase shadow-lg shadow-[#0B1F3A]/15 border border-[#FF7A00]/40">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">VERIFIED BUYER FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Loved by Audio Enthusiasts
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Hear what creators, travelers, and designers say about their CURIO experience.
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="max-w-4xl mx-auto relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 shadow-xl relative overflow-hidden space-y-6"
            >
              <Quote className="w-16 h-16 text-[#FF7A00]/10 absolute top-6 right-8 pointer-events-none" />

              {/* Rating Stars & Product Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                  <span className="ml-2 text-xs font-bold text-[#0F172A]">5.0 Rating</span>
                </div>

                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#0B1F3A] shadow-sm">
                  {current.productName}
                </span>
              </div>

              {/* Quote Headline & Text */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                  "{current.title}"
                </h3>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed italic">
                  "{current.comment}"
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center space-x-4 pt-4 border-t border-slate-200">
                <img
                  src={current.avatar}
                  alt={current.author}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#FF7A00]"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#0F172A] text-sm sm:text-base">
                      {current.author}
                    </span>
                    {current.verified && (
                      <span className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 mr-0.5" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{current.role}</div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between pt-8">
            <div className="flex items-center space-x-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeReviewIndex === idx ? 'w-8 bg-[#FF7A00]' : 'w-2.5 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={prevReview}
                className="w-11 h-11 rounded-full bg-slate-100 hover:bg-[#0B1F3A] hover:text-white transition-colors flex items-center justify-center text-slate-700 shadow-sm"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextReview}
                className="w-11 h-11 rounded-full bg-slate-100 hover:bg-[#0B1F3A] hover:text-white transition-colors flex items-center justify-center text-slate-700 shadow-sm"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
