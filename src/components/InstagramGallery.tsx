import React from 'react';
import { INSTAGRAM_POSTS } from '../data/mockData';
import { Instagram, Heart, MessageCircle, Sparkles, ExternalLink } from 'lucide-react';

interface InstagramGalleryProps {
  onOpenComingSoon: (source?: string) => void;
}

export const InstagramGallery: React.FC<InstagramGalleryProps> = ({ onOpenComingSoon }) => {
  return (
    <section className="py-24 bg-[#F8FAFC] border-y border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#0B1F3A] text-white text-[11px] font-extrabold tracking-widest uppercase shadow-lg shadow-[#0B1F3A]/15 border border-[#FF7A00]/40">
              <Instagram className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">COMMUNITY GALLERY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Follow Us on Instagram
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Tag <span className="font-bold text-[#0B1F3A]">@curio.tech</span> or <span className="font-bold text-[#FF7A00]">#CURIOtech</span> to be featured.
            </p>
          </div>

          <button
            onClick={() => onOpenComingSoon('Instagram @curio.tech')}
            className="px-6 py-3 rounded-full bg-[#0B1F3A] hover:bg-[#FF7A00] text-white text-xs font-bold transition-all shadow-md flex items-center space-x-2"
          >
            <Instagram className="w-4 h-4" />
            <span>@curio.tech</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => onOpenComingSoon(`Instagram ${post.id}`)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-square bg-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#0B1F3A]/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                <div className="text-[11px] font-medium line-clamp-3 leading-tight text-slate-200">
                  {post.caption}
                </div>

                <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-white/20">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5 text-[#FF7A00] fill-[#FF7A00]" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3.5 h-3.5 text-slate-300" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
