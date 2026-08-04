import React from 'react';
import { motion } from 'motion/react';
import { WHY_US_ITEMS } from '../data/mockData';
import { ShieldCheck, Truck, RotateCcw, Award, Headphones, CheckCircle2, Handshake } from 'lucide-react';

export const WhyChooseCurio: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#FF7A00]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#FF7A00]" />;
      case 'RotateCcw':
        return <RotateCcw className="w-6 h-6 text-[#FF7A00]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#FF7A00]" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-[#FF7A00]" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-[#FF7A00]" />;
    }
  };

  return (
    <section id="why-us" className="py-24 bg-[#F8FAFC] border-y border-slate-200/60 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#0B1F3A] text-white text-[11px] font-extrabold tracking-widest uppercase shadow-lg shadow-[#0B1F3A]/15 border border-[#FF7A00]/40 mt-0 mb-6">
            <Handshake className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">THE CURIO PROMISE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Why Choose CURIO
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We hold our engineering, materials, and service to uncompromising global standards.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4"
            >
              {/* Animated Icon Housing */}
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center group-hover:bg-[#0B1F3A] transition-colors duration-300 shadow-sm">
                <div className="group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {getIcon(item.iconName)}
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#FF7A00] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
