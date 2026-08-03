import React from 'react';
import { motion } from 'motion/react';
import { Users, ShoppingBag, Star, Globe, Sparkles } from 'lucide-react';

export const Statistics: React.FC = () => {
  const stats = [
    {
      id: 'happy-customers',
      label: 'Happy Customers',
      value: '50,000+',
      desc: 'Across North America & Europe',
      icon: <Users className="w-5 h-5 text-[#FF7A00]" />,
    },
    {
      id: 'products-sold',
      label: 'Products Sold',
      value: '120,000+',
      desc: 'Flagship headphones & accessories',
      icon: <ShoppingBag className="w-5 h-5 text-[#FF7A00]" />,
    },
    {
      id: 'positive-reviews',
      label: 'Positive Reviews',
      value: '4.9 / 5.0',
      desc: 'Verified rating on Trustpilot',
      icon: <Star className="w-5 h-5 text-[#FF7A00]" />,
    },
    {
      id: 'cities-served',
      label: 'Global Cities Served',
      value: '85+ Cities',
      desc: 'Carbon-neutral express delivery',
      icon: <Globe className="w-5 h-5 text-[#FF7A00]" />,
    },
  ];

  return (
    <section className="py-20 bg-[#0B1F3A] text-white relative overflow-hidden">
      
      {/* Background Subtle Mesh Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFB347]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg space-y-3 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FF7A00]/15 flex items-center justify-center">
                {stat.icon}
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['DM_Sans']">
                {stat.value}
              </div>

              <div className="space-y-0.5">
                <div className="text-sm font-bold text-[#FFB347]">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400">
                  {stat.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
