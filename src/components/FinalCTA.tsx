import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenComingSoon: (source?: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenComingSoon }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A] to-[#1e3a66] text-white p-10 sm:p-20 relative overflow-hidden shadow-2xl flex flex-col items-center text-center space-y-8">
          
          {/* Ambient Glow Circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7A00]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFB347]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#FFB347] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>JOIN THE CURIO REVOLUTION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-tight font-['DM_Sans']">
            Discover Technology That Complements Your Lifestyle
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Elevate your sound, power, and connectivity with Scandinavian engineered accessories built for modern creators.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <a
              href="#products"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold text-[#0F172A] bg-white hover:bg-slate-100 transition-all text-center shadow-lg"
            >
              Explore Collection
            </a>

            <button
              onClick={() => onOpenComingSoon('Final CTA Shop Now')}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold text-white bg-[#FF7A00] hover:bg-[#ff8a1a] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
