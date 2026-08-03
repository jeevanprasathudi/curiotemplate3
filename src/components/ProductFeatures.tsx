import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BatteryCharging, Volume2, Zap, Layers, Compass, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProductFeatures: React.FC = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const features = [
    {
      id: 'battery-life',
      title: 'Extended Battery Life',
      sub: '45+ Hours ANC Playback',
      desc: 'Custom high-density lithium polymer battery cells deliver uninterrupted studio listening through long transatlantic flights and workday routines.',
      icon: <BatteryCharging className="w-5 h-5 text-[#FF7A00]" />,
      hotspotPos: { top: '25%', left: '48%' },
    },
    {
      id: 'audio-quality',
      title: 'Crystal Clear Audio',
      sub: '40mm Titanium Diaphragms',
      desc: 'Precision tuned frequency balance delivers warm natural bass response, articulated midrange, and crystal clear treble detail.',
      icon: <Volume2 className="w-5 h-5 text-[#FF7A00]" />,
      hotspotPos: { top: '55%', left: '28%' },
    },
    {
      id: 'fast-charging',
      title: 'GaN Ultra Fast Charging',
      sub: '10 Min Charge = 5 Hours',
      desc: 'USB-C Power Delivery controller provides emergency juice in minutes so your rhythm never halts.',
      icon: <Zap className="w-5 h-5 text-[#FF7A00]" />,
      hotspotPos: { top: '80%', left: '50%' },
    },
    {
      id: 'materials',
      title: 'Premium Materials',
      sub: 'Aircraft-Grade Aluminum',
      desc: 'Lightweight anodized aluminum headband architecture paired with memory foam protein leather cushions.',
      icon: <Layers className="w-5 h-5 text-[#FF7A00]" />,
      hotspotPos: { top: '18%', left: '72%' },
    },
    {
      id: 'portable',
      title: 'Portable Design',
      sub: 'Foldable Swivel Architecture',
      desc: 'Collapses effortlessly into a compact water-resistant hard-shell travel case with magnetic latching.',
      icon: <Compass className="w-5 h-5 text-[#FF7A00]" />,
      hotspotPos: { top: '65%', left: '75%' },
    },
    {
      id: 'compatibility',
      title: 'Universal Compatibility',
      sub: 'Multipoint Bluetooth 5.3',
      desc: 'Instant seamless pairing across iPhone, Android, MacBook, Windows PC, and smart TVs simultaneously.',
      icon: <Smartphone className="w-5 h-5 text-[#FF7A00]" />,
      hotspotPos: { top: '42%', left: '50%' },
    },
  ];

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#0B1F3A] text-white text-[11px] font-extrabold tracking-widest uppercase shadow-lg shadow-[#0B1F3A]/15 border border-[#FF7A00]/40">
            <Compass className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">ARCHITECTURAL BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Engineered Without Compromise
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Every component is sculpted for long-term reliability, acoustic fidelity, and tactile satisfaction.
          </p>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: HOTSPOT PRODUCT VISUAL */}
          <div className="lg:col-span-6 relative rounded-3xl bg-slate-50 border border-slate-200/80 p-6 overflow-hidden shadow-lg group">
            
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
              alt="CURIO SoundCore Pro Anatomy"
              referrerPolicy="no-referrer"
              className="w-full h-[460px] object-contain drop-shadow-2xl"
            />

            {/* Interactive Hotspots */}
            {features.map((feat, idx) => (
              <button
                key={feat.id}
                onClick={() => setActiveFeatureIndex(idx)}
                style={{ top: feat.hotspotPos.top, left: feat.hotspotPos.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-20 ${
                  activeFeatureIndex === idx
                    ? 'bg-[#FF7A00] text-white scale-125 ring-4 ring-[#FF7A00]/30 shadow-lg'
                    : 'bg-white/90 text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white border border-slate-300'
                }`}
                title={feat.title}
              >
                <span className="text-xs font-bold">{idx + 1}</span>
              </button>
            ))}

            {/* Active Hotspot Preview Banner */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] text-white flex items-center justify-center font-bold">
                {activeFeatureIndex + 1}
              </div>
              <div>
                <div className="text-xs font-bold text-[#0F172A]">
                  {features[activeFeatureIndex].title}
                </div>
                <div className="text-[11px] text-slate-500">
                  {features[activeFeatureIndex].sub}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: FEATURE CARDS LIST */}
          <div className="lg:col-span-6 space-y-4">
            {features.map((feat, idx) => (
              <motion.div
                key={feat.id}
                onClick={() => setActiveFeatureIndex(idx)}
                whileHover={{ x: 4 }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  activeFeatureIndex === idx
                    ? 'bg-white border-[#FF7A00] shadow-xl ring-1 ring-[#FF7A00]/30'
                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-white'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${activeFeatureIndex === idx ? 'bg-[#FF7A00]/10' : 'bg-slate-200/50'}`}>
                    {feat.icon}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#0F172A]">
                        {feat.title}
                      </h3>
                      <span className="text-xs font-semibold text-[#FF7A00]">
                        {feat.sub}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
