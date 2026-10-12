import React from 'react';
import { Heart, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function CoupleSection({ couple }) {
  const { t, lang } = useLanguage();

  return (
    <section
      id="couple-section"
      className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center"
    >
      {/* Ornate Top Emblem */}
      <div className="flex flex-col items-center mb-8">
        <div className="inline-block px-5 py-1.5 rounded-full border border-[#c9a96e]/50 bg-white/60 backdrop-blur-md shadow-sm mb-3">
          <span className="text-xs uppercase tracking-widest text-[#7a5c61] font-montserrat">
            {lang === 'bn' ? 'শুভ পরিণয় আমন্ত্রণ' : 'Solemn Wedding Union'}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif text-[#2a1625]">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h3>
      </div>

      {/* Formal Invitation Card Text (From Physical Card) */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-lg border border-[#c9a96e]/30 mb-14 text-center max-w-2xl mx-auto">
        <p className="text-lg sm:text-xl font-bold font-bengali-serif text-[#2a1625] mb-1">
          {t(couple?.invitationHeading)}
        </p>
        <p className="text-sm font-semibold text-[#7a5c61] mb-4">
          {t(couple?.greeting)}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-[#3d2c2e] font-bengali-sans whitespace-pre-line text-justify sm:text-center">
          {t(couple?.introText)}
        </p>
      </div>

      {/* Groom & Bride Cards Side-by-Side or Stacked Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Groom Card */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl shadow-xl border border-[#c9a96e]/40 flex flex-col items-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          {/* Tag */}
          <span className="px-4 py-1 rounded-full text-xs font-semibold tracking-wider bg-[#2a1625] text-[#fbf5b7] border border-[#c9a96e] mb-4 font-bengali-serif">
            {t(couple?.groom?.tag)}
          </span>

          {/* Portrait Image */}
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-[#c9a96e] via-[#fbf5b7] to-[#aa771c] shadow-lg mb-5 overflow-hidden">
            <img
              src={couple?.groom?.image || '/assets/images/groom.jpg'}
              alt="Groom Md. Abdul Ramin Abir"
              className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Groom Name */}
          <h3 className="text-xl sm:text-2xl font-bold font-bengali-serif text-[#2a1625] mb-2">
            {t(couple?.groom?.name)}
          </h3>

          {/* Parents */}
          <div className="text-sm text-[#7a5c61] font-bengali-sans leading-relaxed whitespace-pre-line mb-3">
            {t(couple?.groom?.parents)}
          </div>

          {/* Address */}
          <div className="mt-auto pt-3 border-t border-[#c9a96e]/20 w-full flex items-center justify-center gap-1.5 text-xs text-[#a37984] font-bengali-sans whitespace-pre-line">
            <MapPin className="w-3.5 h-3.5 text-[#c9a96e] flex-shrink-0" />
            <span>{t(couple?.groom?.address)}</span>
          </div>
        </div>

        {/* Bride Card */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl shadow-xl border border-[#c9a96e]/40 flex flex-col items-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          {/* Tag */}
          <span className="px-4 py-1 rounded-full text-xs font-semibold tracking-wider bg-[#2a1625] text-[#fbf5b7] border border-[#c9a96e] mb-4 font-bengali-serif">
            {t(couple?.bride?.tag)}
          </span>

          {/* Portrait Image */}
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-[#c9a96e] via-[#fbf5b7] to-[#aa771c] shadow-lg mb-5 overflow-hidden">
            <img
              src={couple?.bride?.image || '/assets/images/bride.jpg'}
              alt="Bride Mst. Somaiya Akter Nishi"
              className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Bride Name */}
          <h3 className="text-xl sm:text-2xl font-bold font-bengali-serif text-[#2a1625] mb-2">
            {t(couple?.bride?.name)}
          </h3>

          {/* Parents */}
          <div className="text-sm text-[#7a5c61] font-bengali-sans leading-relaxed whitespace-pre-line mb-3">
            {t(couple?.bride?.parents)}
          </div>

          {/* Address */}
          <div className="mt-auto pt-3 border-t border-[#c9a96e]/20 w-full flex items-center justify-center gap-1.5 text-xs text-[#a37984] font-bengali-sans whitespace-pre-line">
            <MapPin className="w-3.5 h-3.5 text-[#c9a96e] flex-shrink-0" />
            <span>{t(couple?.bride?.address)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
