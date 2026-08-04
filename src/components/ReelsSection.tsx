import React from 'react';
import { Play, Eye, Heart, Music2, ExternalLink, Film } from 'lucide-react';
import reelHeadphones from '../assets/images/curio_reel_headphones_1785821192580.jpg';
import reelPowerbank from '../assets/images/curio_reel_powerbank_1785821171137.jpg';
import reelSpeaker from '../assets/images/curio_reel_speaker_1785821148071.jpg';
import reelEarbuds from '../assets/images/curio_reel_earbuds_1785821128046.jpg';

export interface ReelItem {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  likes: string;
  creator: string;
  instagramUrl: string;
  audioTrack: string;
}

const REELS: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'Unboxing the SoundSculpt ANC Headphones — Pure noise cancellation test 🎧',
    thumbnail: reelHeadphones,
    views: '542K',
    likes: '48.2K',
    creator: '@curio.tech',
    instagramUrl: 'https://www.instagram.com',
    audioTrack: 'Original Audio - curio.tech',
  },
  {
    id: 'reel-2',
    title: 'Testing the 15W magnetic wireless snap on PowerVault 10K ⚡ MagSafe ready',
    thumbnail: reelPowerbank,
    views: '810K',
    likes: '73.5K',
    creator: '@curio.tech',
    instagramUrl: 'https://www.instagram.com',
    audioTrack: 'Curio Beats - Fast Charge Remix',
  },
  {
    id: 'reel-3',
    title: 'Sound test: SubCube Mini Speaker filling an entire studio room 🔊',
    thumbnail: reelSpeaker,
    views: '320K',
    likes: '29.1K',
    creator: '@curio.tech',
    instagramUrl: 'https://www.instagram.com',
    audioTrack: 'Deep Bass Acoustic Demo',
  },
  {
    id: 'reel-4',
    title: 'Unboxing AirBeats Pro — Ceramic touch controls & instant pairing 🖤',
    thumbnail: reelEarbuds,
    views: '695K',
    likes: '61.8K',
    creator: '@curio.tech',
    instagramUrl: 'https://www.instagram.com',
    audioTrack: 'Original Sound - Nordic Minimalist',
  },
];

export const ReelsSection: React.FC = () => {
  return (
    <section id="reels" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0B1F3A]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-extrabold tracking-widest uppercase backdrop-blur-md border border-white/15">
              <Film className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span className="text-slate-100">INSTAGRAM REELS & SHORT VIDEOS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Watch CURIO in Action
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Discover sound tests, unboxing moments, and real-world durability demos on Instagram.
            </p>
          </div>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-[#FF7A00] hover:bg-[#ff8a1f] text-white text-xs font-extrabold tracking-wider uppercase transition-all shadow-lg shadow-[#FF7A00]/25 hover:scale-105 active:scale-95 flex items-center space-x-2.5"
          >
            <span>Watch More on Instagram</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Reels Grid (4 Vertical Video Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REELS.map((reel) => (
            <a
              key={reel.id}
              href={reel.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden aspect-[9/16] bg-slate-800 border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#FF7A00]/50 hover:shadow-[#FF7A00]/20 block"
            >
              {/* Thumbnail Image */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Dark Gradient Backdrop for Overlay readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/40 opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Top Bar: Reels Badge & View Count */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                  <Film className="w-3 h-3 text-[#FF7A00]" />
                  <span>Reels</span>
                </div>
                <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-slate-200 border border-white/20">
                  <Eye className="w-3 h-3 text-slate-300" />
                  <span>{reel.views}</span>
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#FF7A00]/90 text-white flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 group-hover:bg-[#FF7A00] transition-all duration-300 backdrop-blur-xs ring-4 ring-white/20 group-hover:ring-[#FF7A00]/50">
                  <Play className="w-7 h-7 fill-white" />
                </div>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 space-y-3">
                {/* Creator Handle & Likes */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-xs border border-white/10">
                    {reel.creator}
                  </span>
                  <div className="flex items-center space-x-1.5 text-rose-400 font-bold bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-xs border border-white/10">
                    <Heart className="w-3.5 h-3.5 fill-rose-400" />
                    <span>{reel.likes}</span>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-sm font-semibold text-slate-100 line-clamp-2 leading-snug drop-shadow-sm">
                  {reel.title}
                </p>

                {/* Audio Track bar */}
                <div className="flex items-center space-x-2 text-[11px] text-slate-300 pt-1 border-t border-white/10">
                  <Music2 className="w-3 h-3 text-[#FF7A00] animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="truncate">{reel.audioTrack}</span>
                  <ExternalLink className="w-3 h-3 ml-auto text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
