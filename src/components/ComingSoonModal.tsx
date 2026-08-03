import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ExternalLink, Mail, CheckCircle2, ArrowLeft, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerSource?: string;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  triggerSource = 'Store Redirection',
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#0B1F3A', '#FF7A00', '#FFB347', '#10B981'],
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop Blur Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B1F3A]/80 backdrop-blur-xl"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 z-10 overflow-hidden text-center space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ambient Decorative Gradient Blob */}
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#FF7A00]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#0B1F3A] text-white flex items-center justify-center shadow-xl relative group">
            <ExternalLink className="w-9 h-9 text-[#FF7A00]" />
          </div>

          {/* Headline & Description */}
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>OFFICIAL STORE REDIRECTION</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-['DM_Sans']">
              Redirecting to Partner Store
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              You are being redirected to our official retailer portal. Enter your email to receive direct stock alerts and product drop notifications.
            </p>
          </div>

          {/* Trigger Context Badge */}
          {triggerSource && (
            <div className="text-[11px] font-medium text-slate-500 bg-slate-50 py-1.5 px-3 rounded-full border border-slate-200/60 inline-block">
              Selected: <span className="font-bold text-[#0B1F3A]">{triggerSource}</span>
            </div>
          )}

          {/* Subscription Form */}
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-800 space-y-1">
              <div className="flex items-center justify-center space-x-2 text-sm font-bold text-emerald-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Redirect Link Confirmed!</span>
              </div>
              <p className="text-xs text-emerald-600">
                We'll notify you when new inventory drops and official store channels open.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email for store drop updates..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#0B1F3A] hover:bg-[#FF7A00] text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-lg flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                <span>Get Direct Store Link</span>
              </button>
            </form>
          )}

          {/* Back to Home CTA */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-[#0B1F3A] transition-colors inline-flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Showcase</span>
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
