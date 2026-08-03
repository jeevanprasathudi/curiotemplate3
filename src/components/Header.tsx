import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenComingSoon: (source?: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenComingSoon, onSelectCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#story' },
    { name: 'Products', href: '#products' },
    { name: 'Collections', href: '#categories' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    if (targetId === 'hero') {
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 50);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);

      setIsMobileMenuOpen(false);

      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }, 50);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* 1. TOP CENTER LOGO ON INITIAL LOAD (WHEN NOT SCROLLED) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            key="initial-top-logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
            style={{ marginTop: '0px' }}
          >
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center space-x-2.5 group bg-black/20 hover:bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-2xl transition-all duration-300 hover:scale-[1.03]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-white shadow-lg group-hover:bg-[#FF7A00] transition-colors duration-300">
                <span className="font-extrabold text-xl tracking-tighter text-[#FF7A00] group-hover:text-white">
                  C
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-black tracking-widest text-white font-['Space_Grotesk',sans-serif]">
                  CURIO
                </span>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#FF7A00]">
                  Tech Meets Trend
                </span>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. TRANSFORMING STICKY NAVBAR (WHEN SCROLLED > 80px) */}
      <motion.header
        initial={false}
        animate={{
          y: isScrolled ? 0 : -100,
          opacity: isScrolled ? 1 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1], // cubic-bezier smooth transition
        }}
        className="fixed top-0 left-0 right-0 z-50 h-[80px] flex items-center shadow-sm"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
        }}
      >
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* LOGO (LEFT SIDE OF NAVBAR) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center space-x-2.5 group hover:scale-[1.03] transition-transform duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-white shadow-md group-hover:bg-[#FF7A00] transition-colors">
              <span className="font-bold text-xl tracking-tighter text-[#FF7A00] group-hover:text-white">
                C
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-[#0F172A] font-['Space_Grotesk',sans-serif]">
                CURIO
              </span>
              <span className="text-[9px] font-bold tracking-widest uppercase text-[#FF7A00]">
                Tech x Trend
              </span>
            </div>
          </a>

          {/* DESKTOP NAV LINKS WITH SUBTLE HOVER UNDERLINE */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-sm font-semibold text-[#0F172A]/80 hover:text-[#0B1F3A] transition-colors py-1 group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF7A00] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* RIGHT SIDE CTA BUTTON */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => onOpenComingSoon('Sticky Nav Shop Now')}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#0B1F3A] hover:bg-[#FF7A00] transition-all shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] flex items-center space-x-2 group"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => onOpenComingSoon('Cart Sticky')}
              className="p-2 text-slate-800 hover:text-[#FF7A00] transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF7A00]" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-[#0B1F3A] transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-[80px] left-0 right-0 lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 pb-4 border-b border-slate-100">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm font-semibold text-slate-800 hover:text-[#FF7A00] py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      const element = document.getElementById('products');
                      if (element) {
                        const headerOffset = 80;
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                        const offsetPosition = Math.max(0, elementPosition - headerOffset);
                        setIsMobileMenuOpen(false);
                        setTimeout(() => {
                          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }, 50);
                      } else {
                        setIsMobileMenuOpen(false);
                        onOpenComingSoon('Shop Now Mobile Nav');
                      }
                    }}
                    className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-[#0B1F3A] hover:bg-[#FF7A00] transition-colors text-center shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
