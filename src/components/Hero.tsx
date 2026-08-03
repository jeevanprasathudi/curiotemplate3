import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import heroGirlImg from '../assets/images/curio_hero_girl_1785741443852.jpg';

interface HeroProps {
  onOpenComingSoon: (source?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenComingSoon }) => {
  // Mouse movement parallax state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll parallax effect (0.7x speed relative to scroll)
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]); // Moves at 0.3 factor relative to content = 0.7x speed

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // max +-10px shift
      const y = (e.clientY / innerHeight - 0.5) * 20; // max +-10px shift
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#0B1F3A] py-8 sm:py-12"
    >
      {/* 1. CINEMATIC HERO BACKGROUND IMAGE WITH ENTRANCE SCALE & PARALLAX */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
        style={{ y: bgY }}
      >
        <motion.img
          src={heroGirlImg}
          alt="College student wearing CURIO black wireless boom headset"
          initial={{ scale: 1.08 }}
          animate={{
            scale: 1,
            x: mousePos.x,
            y: mousePos.y,
          }}
          transition={{
            scale: { duration: 2.5, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 0.5, ease: 'easeOut' },
            y: { duration: 0.5, ease: 'easeOut' },
          }}
          onError={(e) => {
            // Unsplash high-res campaign fallback if local image fails
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2000&auto=format&fit=crop';
          }}
          className="w-full h-full object-cover object-center"
        />

        {/* SOFT DARK GRADIENT OVERLAY BEHIND TEXT FOR 100% WCAG AA READABILITY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0B1F3A]/60 to-[#0F172A]/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0B1F3A]/30 to-[#0B1F3A]/80" />
      </motion.div>

      {/* 2. CENTERED HERO CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center space-y-4 sm:space-y-5 pt-2 sm:pt-4">
        
        {/* H2 HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl lg:text-[64px] font-bold text-white tracking-tight leading-[1.1] font-['Space_Grotesk',sans-serif] max-w-4xl drop-shadow-lg"
        >
          Where Technology
          <br />
          Meets Modern Lifestyle
        </motion.h2>

        {/* PARAGRAPH */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg lg:text-xl text-slate-200/90 font-normal leading-[1.6] max-w-[650px] mx-auto text-center drop-shadow"
        >
          Premium wireless accessories crafted for everyday life.
          <br className="hidden sm:inline" /> Experience technology that complements your style.
        </motion.p>

        {/* CTA BUTTONS ROW */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1"
        >
          {/* PRIMARY BUTTON */}
          <a
            href="#products"
            className="w-full sm:w-auto h-[50px] sm:h-[54px] px-7 rounded-[14px] bg-[#0B1F3A] hover:bg-[#FF7A00] text-white font-bold text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center border border-white/10"
          >
            Explore Collection
          </a>

          {/* SECONDARY BUTTON */}
          <a
            href="#story"
            className="w-full sm:w-auto h-[50px] sm:h-[54px] px-7 rounded-[14px] bg-transparent hover:bg-white text-white hover:text-[#0B1F3A] border-2 border-white/80 font-bold text-base transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center shadow-md"
          >
            Learn More
          </a>
        </motion.div>

      </div>

      {/* SUBTLE SCROLL DOWN INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-1.5 text-white/70"
      >
        <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-300">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1 h-2 bg-[#FF7A00] rounded-full"
          />
        </div>
      </motion.div>

    </section>
  );
};
