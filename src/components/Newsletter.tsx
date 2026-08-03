import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0B1F3A', '#FF7A00', '#FFB347', '#10B981'],
    });
  };

  return (
    <section className="py-20 bg-[#F8FAFC] border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl bg-[#0B1F3A] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center space-y-6">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A00]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFB347]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#FFB347]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>VIP LAUNCH CLUB</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['DM_Sans']">
            Stay Updated with CURIO
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Subscribe to receive exclusive pre-order invitations, early bird discounts, and Behind-the-Design insider access.
          </p>

          {subscribed ? (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-4 rounded-2xl max-w-md mx-auto flex items-center justify-center space-x-2 text-sm font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>You are officially on the VIP launch list! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                />
              </div>

              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-[#FF7A00] hover:bg-[#ff8a1a] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-400">
            We respect your privacy. Unsubscribe anytime with one click.
          </p>

        </div>

      </div>
    </section>
  );
};
