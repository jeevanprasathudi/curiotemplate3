import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, ArrowUp, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import logoWb from '../assets/images/Logowb.png';

interface FooterProps {
  onOpenComingSoon: (source?: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenComingSoon, onSelectCategory }) => {
  const [miniEmail, setMiniEmail] = useState('');
  const [miniSubscribed, setMiniSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMiniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!miniEmail || !miniEmail.includes('@')) return;
    setMiniSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.9 },
      colors: ['#0B1F3A', '#FF7A00', '#FFB347'],
    });
  };

  return (
    <footer className="bg-[#0B1F3A] text-slate-300 pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* COL 1: ABOUT CURIO */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <img
                src={logoWb}
                alt="CURIO Logo"
                className="h-9 w-auto object-contain rounded-lg shadow-sm"
              />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              WHERE TECH MEETS TREND. CURIO designs minimal Scandinavian technology accessories — from ANC headphones to GaN power banks — built for everyday life.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => onOpenComingSoon('Social Instagram')}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF7A00] text-white transition-colors flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenComingSoon('Social Pinterest')}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF7A00] text-white transition-colors flex items-center justify-center"
                aria-label="Pinterest"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </button>
              <button
                onClick={() => onOpenComingSoon('Social Facebook')}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF7A00] text-white transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenComingSoon('Social YouTube')}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF7A00] text-white transition-colors flex items-center justify-center"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COL 2: CATEGORIES */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {['Headphones', 'Wireless Earbuds', 'Bluetooth Speakers', 'Power Banks', 'Charging Cables'].map((cat) => (
                <li key={cat}>
                  <a
                    href="#products"
                    onClick={() => onSelectCategory?.(cat)}
                    className="hover:text-[#FF7A00] transition-colors"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: QUICK LINKS */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#hero" className="hover:text-[#FF7A00] transition-colors">Home</a></li>
              <li><a href="#why-us" className="hover:text-[#FF7A00] transition-colors">Why Choose Us</a></li>
              <li><a href="#story" className="hover:text-[#FF7A00] transition-colors">Brand Story</a></li>
              <li><a href="#reviews" className="hover:text-[#FF7A00] transition-colors">Customer Reviews</a></li>
              <li><a href="#faq" className="hover:text-[#FF7A00] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* COL 4: CONTACT & MINI NEWSLETTER */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact & Support
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>support@curio.tech</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>+1 (800) 842-8746</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF7A00] shrink-0 mt-0.5" />
                <span>Gothenburg Design Studio, Sweden</span>
              </li>
            </ul>

            {/* Mini Newsletter */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-slate-300 mb-1.5">
                Join our newsletter:
              </div>
              {miniSubscribed ? (
                <div className="text-[11px] text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed!</span>
                </div>
              ) : (
                <form onSubmit={handleMiniSubmit} className="flex items-center space-x-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Your email..."
                    value={miniEmail}
                    onChange={(e) => setMiniEmail(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#FF7A00]"
                  />
                  <button
                    type="submit"
                    className="p-1.5 bg-[#FF7A00] text-white rounded-lg hover:bg-[#ff8a1a] transition-colors shrink-0"
                    aria-label="Submit email"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* BOTTOM COPYRIGHT ROW */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} CURIO Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => onOpenComingSoon('Privacy Policy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onOpenComingSoon('Terms of Service')} className="hover:text-slate-300 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onOpenComingSoon('Cookie Settings')} className="hover:text-slate-300 transition-colors">
              Cookie Preferences
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF7A00] text-white transition-colors flex items-center justify-center shadow"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
