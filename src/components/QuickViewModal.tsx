import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { ThreeProductCanvas } from './ThreeProductCanvas';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenComingSoon: (source: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onOpenComingSoon,
}) => {
  if (!product) return null;

  const [selectedColorHex, setSelectedColorHex] = useState(
    product.colors[0]?.hex || '#0B1F3A'
  );
  const [activeTab, setActiveTab] = useState<'3d' | 'gallery'>('3d');
  const [activeImage, setActiveImage] = useState(product.image);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B1F3A]/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 overflow-hidden text-slate-800"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors z-20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* LEFT: 3D / GALLERY VIEWPORT */}
            <div className="md:col-span-6 bg-slate-50 rounded-2xl p-4 border border-slate-200 relative">
              
              {/* Tab Selector */}
              <div className="flex items-center space-x-2 mb-3">
                <button
                  onClick={() => setActiveTab('3d')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    activeTab === '3d'
                      ? 'bg-[#0B1F3A] text-white shadow'
                      : 'bg-white text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  3D Viewport
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    activeTab === 'gallery'
                      ? 'bg-[#0B1F3A] text-white shadow'
                      : 'bg-white text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Gallery
                </button>
              </div>

              {activeTab === '3d' ? (
                <ThreeProductCanvas
                  modelType={product.model3DType}
                  activeColorHex={selectedColorHex}
                  autoRotate={true}
                  className="h-[280px] w-full"
                />
              ) : (
                <div className="space-y-3">
                  <div className="h-[220px] rounded-xl overflow-hidden bg-white">
                    <img
                      src={activeImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex items-center space-x-2 overflow-x-auto">
                    {product.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 ${
                          activeImage === img ? 'border-[#FF7A00]' : 'border-slate-200'
                        }`}
                      >
                        <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT: CONCISE OVERVIEW & REDIRECTION */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <div className="text-xs font-bold text-[#FF7A00] uppercase tracking-wider mb-1">
                  {product.category}
                </div>

                <h3 className="text-2xl font-extrabold text-[#0F172A]">{product.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{product.tagline}</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700">Available Finishes:</span>
                <div className="flex items-center space-x-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColorHex(c.hex)}
                      title={c.name}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        selectedColorHex === c.hex
                          ? 'border-[#FF7A00] scale-110 ring-2 ring-[#FF7A00]/30'
                          : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Essential Highlights */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1.5 text-xs">
                <div className="font-bold text-[#0B1F3A]">Key Highlights:</div>
                <ul className="space-y-1 text-[11px] text-slate-600">
                  {product.features.slice(0, 3).map((f, idx) => (
                    <li key={idx} className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Redirection Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenComingSoon(`Redirect to Retailer Store - ${product.name}`);
                }}
                className="w-full py-3.5 rounded-full bg-[#0B1F3A] hover:bg-[#FF7A00] text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-lg flex items-center justify-center space-x-2 group"
              >
                <span>Redirect to Store</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
