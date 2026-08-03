import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ThreeProductCanvas } from './ThreeProductCanvas';
import { PRODUCTS } from '../data/mockData';
import { Sparkles, Sliders, Volume2, ShieldCheck, CheckCircle, RotateCw } from 'lucide-react';

interface Product3DStudioProps {
  onOpenComingSoon: (productName: string) => void;
}

export const Product3DStudio: React.FC<Product3DStudioProps> = ({ onOpenComingSoon }) => {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const [activeColorHex, setActiveColorHex] = useState(selectedProduct.colors[0]?.hex || '#0B1F3A');
  const [activeSoundProfile, setActiveSoundProfile] = useState<'Acoustic Flat' | 'Bass Boost' | 'Nordic Spatial'>('Nordic Spatial');

  return (
    <section id="3d-studio" className="py-24 bg-[#0B1F3A] text-white relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF7A00]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FFB347]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#FFB347] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>INTERACTIVE 3D LAB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            3D Product Inspection Studio
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Rotate 360°, customize Nordic finishes, examine exploded internal acoustics, and audition studio profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: 3D VIEWPORT CANVAS */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative">
            
            {/* Product Switcher Bar */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-2 no-scrollbar border-b border-white/10">
              {PRODUCTS.slice(0, 5).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProductId(p.id);
                    setActiveColorHex(p.colors[0]?.hex || '#0B1F3A');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedProductId === p.id
                      ? 'bg-[#FF7A00] text-white shadow-lg'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* 3D Canvas */}
            <ThreeProductCanvas
              modelType={selectedProduct.model3DType}
              activeColorHex={activeColorHex}
              autoRotate={true}
              className="h-[400px] w-full"
            />

            {/* Bottom Color Selector Palette */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Available Finish:</span>
              <div className="flex items-center space-x-3">
                {selectedProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setActiveColorHex(c.hex)}
                    title={c.name}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      activeColorHex === c.hex ? 'border-[#FF7A00] scale-125 ring-2 ring-[#FF7A00]/40' : 'border-white/30 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SPECS & SOUND PROFILES */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-[#FF7A00] uppercase">
                {selectedProduct.category}
              </span>
              <h3 className="text-3xl font-extrabold text-white">
                {selectedProduct.name}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Key Specs Grid */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5">
              <div className="text-xs font-bold text-[#FFB347] flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>ACOUSTIC SPECIFICATIONS</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                {Object.entries(selectedProduct.specs).slice(0, 4).map(([key, val]) => (
                  <div key={key} className="space-y-0.5">
                    <span className="text-slate-400 block text-[11px]">{key}</span>
                    <span className="font-semibold text-white">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sound Equalizer Profile Simulator */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-[#FF7A00]" />
                  <span>Acoustic Equalizer Preset</span>
                </div>
                <span className="text-[#FF7A00]">{activeSoundProfile}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['Nordic Spatial', 'Acoustic Flat', 'Bass Boost'] as const).map((prof) => (
                  <button
                    key={prof}
                    onClick={() => setActiveSoundProfile(prof)}
                    className={`py-2 px-2 rounded-lg text-[11px] font-bold text-center transition-all ${
                      activeSoundProfile === prof
                        ? 'bg-white text-[#0B1F3A] shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {prof}
                  </button>
                ))}
              </div>
            </div>

            {/* Preorder Action */}
            <div className="pt-2 flex items-center space-x-4">
              <div className="text-2xl font-extrabold text-white">
                ${selectedProduct.price}{' '}
                <span className="text-sm font-normal text-slate-400 line-through">
                  ${selectedProduct.originalPrice}
                </span>
              </div>

              <button
                onClick={() => onOpenComingSoon(`Pre-order ${selectedProduct.name}`)}
                className="flex-1 py-3.5 rounded-full bg-[#FF7A00] hover:bg-[#ff8a1a] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all text-center"
              >
                Pre-Order in 3D Studio
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
