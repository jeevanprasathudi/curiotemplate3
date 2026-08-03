import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { ProductsSection } from './components/ProductsSection';
import { WhyChooseCurio } from './components/WhyChooseCurio';
import { ProductFeatures } from './components/ProductFeatures';
import { Statistics } from './components/Statistics';
import { BrandStory } from './components/BrandStory';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramGallery } from './components/InstagramGallery';
import { FAQSection } from './components/FAQSection';
import { Newsletter } from './components/Newsletter';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ComingSoonModal } from './components/ComingSoonModal';
import { QuickViewModal } from './components/QuickViewModal';
import { Product, ProductCategory } from './types';

export default function App() {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonSource, setComingSoonSource] = useState<string>('');
  
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<ProductCategory | 'All'>('All');

  const handleOpenComingSoon = (source?: string) => {
    setComingSoonSource(source || 'Store Navigation');
    setIsComingSoonOpen(true);
  };

  const handleSelectCategory = (category: string) => {
    if (
      category === 'Headphones' ||
      category === 'Wireless Earbuds' ||
      category === 'Earbuds' ||
      category === 'Bluetooth Speakers' ||
      category === 'Speakers' ||
      category === 'Power Banks' ||
      category === 'Charging Cables'
    ) {
      const mapped = category.includes('Earbuds')
        ? 'Earbuds'
        : category.includes('Speaker')
        ? 'Speakers'
        : (category as ProductCategory);
      setSelectedCategoryFilter(mapped);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#64748B] font-['DM_Sans',sans-serif] selection:bg-[#FF7A00] selection:text-white antialiased">
      
      {/* 1. STICKY HEADER */}
      <Header
        onOpenComingSoon={handleOpenComingSoon}
        onSelectCategory={handleSelectCategory}
      />

      {/* MAIN CONTENT LANDING FLOW */}
      <main>
        {/* 2. HERO SECTION WITH 3D PRODUCT CANVAS */}
        <Hero onOpenComingSoon={handleOpenComingSoon} />

        {/* 3. FEATURED CATEGORIES */}
        <FeaturedCategories
          onSelectCategory={(cat) => {
            setSelectedCategoryFilter(cat);
          }}
        />

        {/* 4. BEST SELLING PRODUCTS GRID WITH SEARCH & SORT */}
        <ProductsSection
          onOpenComingSoon={handleOpenComingSoon}
          onOpenQuickView={(prod) => setQuickViewProduct(prod)}
          selectedCategoryFilter={selectedCategoryFilter}
          onCategoryFilterChange={(cat) => setSelectedCategoryFilter(cat)}
        />

        {/* 6. WHY CHOOSE CURIO */}
        <WhyChooseCurio />

        {/* 7. ARCHITECTURAL PRODUCT FEATURES WITH HOTSPOTS */}
        <ProductFeatures />

        {/* 8. ANIMATED STATISTICS COUNTERS */}
        <Statistics />

        {/* 9. BRAND STORY & PHILOSOPHY */}
        <BrandStory onOpenComingSoon={handleOpenComingSoon} />

        {/* 10. CUSTOMER REVIEWS CAROUSEL */}
        <CustomerReviews />

        {/* 11. INSTAGRAM COMMUNITY GALLERY */}
        <InstagramGallery onOpenComingSoon={handleOpenComingSoon} />

        {/* 12. FREQUENTLY ASKED QUESTIONS */}
        <FAQSection />

        {/* 13. VIP NEWSLETTER */}
        <Newsletter />

        {/* 14. FINAL CTA BANNER */}
        <FinalCTA onOpenComingSoon={handleOpenComingSoon} />
      </main>

      {/* 15. FOOTER */}
      <Footer
        onOpenComingSoon={handleOpenComingSoon}
        onSelectCategory={handleSelectCategory}
      />

      {/* COMING SOON MODAL (TRIGGERED BY ALL CTAs) */}
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        triggerSource={comingSoonSource}
      />

      {/* QUICK VIEW SPECIFICATIONS MODAL */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenComingSoon={handleOpenComingSoon}
      />

    </div>
  );
}
