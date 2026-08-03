import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data/mockData';
import { Product, ProductCategory } from '../types';
import { Eye, ExternalLink, Sparkles } from 'lucide-react';

interface ProductsSectionProps {
  onOpenComingSoon: (productName: string) => void;
  onOpenQuickView: (product: Product) => void;
  selectedCategoryFilter?: ProductCategory | 'All';
  onCategoryFilterChange?: (cat: ProductCategory | 'All') => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onOpenComingSoon,
  onOpenQuickView,
  selectedCategoryFilter = 'All',
  onCategoryFilterChange,
}) => {
  const [activeTab, setActiveTab] = useState<ProductCategory | 'All'>(selectedCategoryFilter);

  const categoriesList: (ProductCategory | 'All')[] = [
    'All',
    'Headphones',
    'Earbuds',
    'Speakers',
    'Power Banks',
    'Charging Cables',
  ];

  const handleTabChange = (cat: ProductCategory | 'All') => {
    setActiveTab(cat);
    if (onCategoryFilterChange) {
      onCategoryFilterChange(cat);
    }
  };

  // Filter Logic
  const filteredProducts = PRODUCTS.filter((p) => {
    return activeTab === 'All' || p.category === activeTab;
  });

  return (
    <section id="products" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#0B1F3A] text-white text-[11px] font-extrabold tracking-widest uppercase shadow-lg shadow-[#0B1F3A]/15 border border-[#FF7A00]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">CURIO SHOWCASE LINEUP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-['DM_Sans']">
            Featured Products
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Explore Scandinavian designed technology accessories. Click any model to redirect to store.
          </p>
        </div>

        {/* Category Tabs Filter Bar */}
        <div className="flex items-center justify-center gap-2 mb-10 pb-6 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                activeTab === cat
                  ? 'bg-[#0B1F3A] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-3xl bg-white border border-slate-200/80 p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-60 rounded-2xl bg-slate-50 overflow-hidden mb-4 flex items-center justify-center">
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1.5">
                      {product.isBestSeller && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-[#0B1F3A] text-white tracking-wider shadow">
                          FEATURED
                        </span>
                      )}
                      {product.isNew && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-[#FF7A00] text-white tracking-wider shadow">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Product Image with Zoom */}
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Quick Overview Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0B1F3A]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => onOpenQuickView(product)}
                        className="px-4 py-2 rounded-full bg-white text-[#0F172A] text-xs font-bold shadow-lg hover:bg-[#FF7A00] hover:text-white transition-all flex items-center space-x-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick Overview</span>
                      </button>
                    </div>

                  </div>

                  {/* Product Details (Reduced Information) */}
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-[#FF7A00]">{product.category}</span>
                      </div>

                      <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#FF7A00] transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1 mt-1 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Color Swatches */}
                    <div className="flex items-center space-x-1.5 py-1">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          title={c.name}
                          className="w-3.5 h-3.5 rounded-full border border-slate-300"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                      <span className="text-[10px] text-slate-400 ml-1">
                        {product.colors.length} Finishes
                      </span>
                    </div>

                    {/* Redirection Action Row */}
                    <div className="pt-3 border-t border-slate-100">
                      <button
                        onClick={() => onOpenComingSoon(`Redirect to Store - ${product.name}`)}
                        className="w-full py-2.5 rounded-full text-xs font-bold text-white bg-[#0B1F3A] hover:bg-[#FF7A00] transition-colors shadow-md flex items-center justify-center space-x-2 group/btn"
                      >
                        <span>Explore Product</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
