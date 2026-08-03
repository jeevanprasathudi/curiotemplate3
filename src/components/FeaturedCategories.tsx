import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data/mockData';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface FeaturedCategoriesProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="pt-10 pb-16 sm:pt-12 sm:pb-20 bg-[#F8FAFC] border-y border-slate-200/60 relative overflow-hidden scroll-mt-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#0B1F3A] text-white text-[11px] font-extrabold tracking-widest uppercase shadow-lg shadow-[#0B1F3A]/15 border border-[#FF7A00]/40 mt-0 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">CURIO PRODUCT LINEUP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Featured Categories
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Purposefully engineered accessories tailored for acoustics, power, and high-speed mobility.
          </p>
        </div>

        {/* 5-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => {
                onSelectCategory(cat.id);
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group cursor-pointer relative rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Category Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-[#0B1F3A]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#0F172A] border border-slate-200 shadow-sm">
                  {cat.itemCount} Models
                </div>

                {/* Floating Arrow Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0B1F3A] group-hover:bg-[#FF7A00] group-hover:text-white transition-all shadow-md">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </div>

              {/* Category Content Details */}
              <div className="p-5 space-y-2 bg-white">
                <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#FF7A00] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-3 flex items-center text-xs font-bold text-[#0B1F3A] group-hover:text-[#FF7A00] transition-colors">
                  <span>Explore Category</span>
                  <span className="ml-1 text-base leading-none">→</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
