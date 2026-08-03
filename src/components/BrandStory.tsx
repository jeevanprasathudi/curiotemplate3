import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Shield, Heart, Feather, ArrowRight } from 'lucide-react';

interface BrandStoryProps {
  onOpenComingSoon: (source?: string) => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onOpenComingSoon }) => {
  return (
    <section id="story" className="py-24 bg-[#F8FAFC] border-y border-slate-200/60 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: STORY CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#0B1F3A] text-white text-[11px] font-extrabold tracking-widest uppercase shadow-lg shadow-[#0B1F3A]/15 border border-[#FF7A00]/40">
              <BookOpen className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">THE CURIO PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Where Tech Meets Trend
            </h2>

            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p className="font-semibold text-[#0F172A]">
                CURIO believes technology should be both functional and stylish.
              </p>
              <p>
                From immersive sound to reliable everyday accessories, every CURIO product is designed to enhance modern lifestyles with quality, simplicity, and premium Scandinavian design.
              </p>
              <p>
                Our mission is to make innovative technology accessible without compromising aesthetics, performance, or environmental responsibility.
              </p>
            </div>

            {/* Core Values Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1.5 shadow-sm">
                <Feather className="w-5 h-5 text-[#FF7A00]" />
                <h4 className="text-sm font-bold text-[#0F172A]">Minimal Nordic Design</h4>
                <p className="text-xs text-slate-500">Uncluttered forms crafted from premium tactile materials.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1.5 shadow-sm">
                <Shield className="w-5 h-5 text-[#FF7A00]" />
                <h4 className="text-sm font-bold text-[#0F172A]">Precision Engineering</h4>
                <p className="text-xs text-slate-500">Rigorously tested acoustic and power architectures.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenComingSoon('Brand Story')}
                className="px-6 py-3.5 rounded-full bg-[#0B1F3A] hover:bg-[#FF7A00] text-white text-xs font-bold transition-all shadow-md flex items-center space-x-2 group"
              >
                <span>Read Full Brand Manifesto</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </motion.div>

          {/* RIGHT: HIGH RESOLUTION PHOTOGRAPHY MASONRY COMPOSITION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-3">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80"
                alt="CURIO Design Studio"
                referrerPolicy="no-referrer"
                className="w-full h-[480px] object-cover rounded-2xl"
              />

              {/* Floating Quote Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-xl space-y-2">
                <div className="flex items-center space-x-1 text-[#FF7A00]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Gothenburg, Sweden</span>
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "True design quietness requires eliminating every non-essential edge until pure acoustic performance remains."
                </p>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
