import React from 'react';
import { Heart, Sparkles, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer({ footer, onOpenAdmin }) {
  const { t, lang } = useLanguage();

  return (
    <footer className="relative py-16 px-4 text-center bg-[#2a1625] text-white border-t border-[#c9a96e]/30">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Monogram or emblem */}
        <div className="w-16 h-16 mb-4 opacity-90">
          <img
            src="/assets/images/monogram.svg"
            alt="Monogram Crest"
            className="w-full h-full object-contain filter drop-shadow"
          />
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-bengali-serif text-[#fbf5b7] mb-2">
          {t(footer?.title) || (lang === 'bn' ? 'আন্তরিক ধন্যবাদ' : 'Thank You')}
        </h3>

        <p className="text-sm sm:text-base text-[#e8c6ce] font-bengali-sans max-w-md mx-auto mb-6 whitespace-pre-line leading-relaxed">
          {t(footer?.note)}
        </p>

        <div className="h-[1px] w-20 bg-[#c9a96e]/40 mx-auto my-4" />

        <p className="text-xs uppercase tracking-widest text-[#c9a96e] font-montserrat">
          {footer?.tagline || 'With love & prayers • Abir & Nishi • 2026'}
        </p>

        <p className="text-[11px] text-gray-400 mt-2 flex items-center justify-center gap-1 font-montserrat">
          <span>{footer?.credit || 'Designed with love by Abir'}</span>
        </p>

        {/* Admin entry point */}
        <div className="mt-8">
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] text-[#c9a96e]/80 hover:text-[#fbf5b7] hover:bg-white/10 transition-colors border border-[#c9a96e]/20"
          >
            <Shield className="w-3 h-3" />
            <span>Admin Settings</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
