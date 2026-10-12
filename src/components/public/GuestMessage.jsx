import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function GuestMessage({ guestMessage }) {
  const { t, lang } = useLanguage();

  return (
    <section
      id="guest-message"
      className="relative py-20 px-4 sm:px-6 max-w-3xl mx-auto text-center"
    >
      <div className="glass-panel p-8 sm:p-12 rounded-3xl shadow-xl border border-[#c9a96e]/40 relative overflow-hidden">
        {/* Subtle decorative heart icon */}
        <div className="w-12 h-12 mx-auto rounded-full bg-[#f7dfe8] flex items-center justify-center mb-6">
          <Heart className="w-6 h-6 text-[#d4838f] fill-[#d4838f]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-bengali-serif text-[#2a1625] mb-4">
          {t(guestMessage?.title) || (lang === 'bn' ? 'প্রিয় অতিথি' : 'Dear Guest')}
        </h2>

        <p className="text-base sm:text-lg leading-relaxed text-[#3d2c2e] font-bengali-sans max-w-xl mx-auto mb-8 whitespace-pre-line">
          {t(guestMessage?.body)}
        </p>

        <div className="h-[1px] w-24 bg-[#c9a96e]/50 mx-auto mb-4" />

        <div className="text-xs uppercase tracking-widest text-[#a37984] font-montserrat mb-2">
          {t(guestMessage?.signOff)}
        </div>

        <div className="text-base sm:text-lg font-bold font-bengali-serif text-[#2a1625]">
          {t(guestMessage?.names)}
        </div>
      </div>
    </section>
  );
}
