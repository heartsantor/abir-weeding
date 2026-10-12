import React from 'react';
import confetti from 'canvas-confetti';
import { MailOpen, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function OpeningSection({ opening, isUnlocked, onOpen }) {
  const { t, lang } = useLanguage();

  const handleOpenClick = () => {
    // Trigger festive romantic confetti burst
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#c9a96e', '#f7dfe8', '#d4838f', '#ffffff', '#b38728'],
    });

    // Start background music if available
    if (window.startWeddingMusic) {
      window.startWeddingMusic();
    }

    onOpen();
  };

  return (
    <section
      id="opening"
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-[#fdf6f0] via-[#f7dfe8] to-[#f4d6e2] overflow-hidden"
    >
      {/* Background Floral/Ornamental watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-20 ornament-corner" />

      {/* Decorative Top Arch */}
      <div className="relative z-20 flex flex-col items-center max-w-lg mx-auto">
        {/* Arabic Bismillah */}
        <div className="mb-4 text-sm tracking-widest text-[#7a5c61] font-serif opacity-90">
          <span className="text-xl sm:text-2xl font-serif text-[#2a1625] tracking-wide block">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <span className="text-[11px] uppercase tracking-widest mt-1 block font-montserrat text-[#a37984]">
            In the name of Allah, the Most Gracious, the Most Merciful
          </span>
        </div>

        {/* Monogram Crest */}
        <div className="relative my-4 w-44 h-44 sm:w-56 sm:h-56 mx-auto drop-shadow-xl transition-transform duration-700 hover:scale-105">
          <img
            src="/assets/images/monogram.svg"
            alt="Abir & Nishi Monogram"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>

        {/* Couple Title */}
        <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold font-bengali-serif text-[#2a1625] tracking-tight">
          {lang === 'bn' ? 'মোঃ আব্দুল রামিম (আবির)' : 'Md. Abdul Ramin (Abir)'}
        </h1>
        <div className="flex items-center justify-center gap-3 my-1">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c9a96e]"></span>
          <Heart className="w-4 h-4 text-[#d4838f] fill-[#d4838f]" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c9a96e]"></span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-bengali-serif text-[#2a1625] tracking-tight">
          {lang === 'bn' ? 'মোসাম্মৎ সোমাইয়া আক্তার (নিশি)' : 'Mst. Somaiya Akter (Nishi)'}
        </h2>

        {/* Event Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-[#7a5c61] font-bengali-sans font-medium tracking-wide">
          {t(opening?.subtitle) || (lang === 'bn' ? 'শুভ বিবাহোত্তর বৌ-ভাত অনুষ্ঠান' : 'Post-Wedding Reception')}
        </p>

        <p className="text-xs uppercase tracking-widest text-[#a37984] mt-1 font-montserrat">
          25 October 2026 • Munshiganj
        </p>

        {/* Pulsing Open Invitation Button */}
        <div className="mt-8">
          <button
            onClick={handleOpenClick}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#2a1625] via-[#43233c] to-[#2a1625] border-2 border-[#c9a96e] shadow-xl hover:shadow-[#c9a96e]/40 transition-all duration-300 hover:scale-105 active:scale-95 animate-royal-pulse"
          >
            <MailOpen className="w-5 h-5 text-[#fbf5b7] transition-transform group-hover:rotate-12" />
            <span className="font-bengali-serif tracking-wide text-[#fdf6f0]">
              {t(opening?.buttonText) || (lang === 'bn' ? 'দাওয়াতনামা খুলুন' : 'Open Invitation')}
            </span>
            <Sparkles className="w-4 h-4 text-[#c9a96e] group-hover:animate-spin" />
          </button>
        </div>

        {/* Notice for guest */}
        <p className="mt-4 text-[11px] text-[#7a5c61]/80 italic font-bengali-sans">
          {lang === 'bn' ? 'দাওয়াতনামা দেখতে বাটনে স্পর্শ করুন' : 'Tap to unfold the royal invitation'}
        </p>
      </div>

      {/* Decorative Bottom Corner Vignette */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#f4d6e2] to-transparent pointer-events-none" />
    </section>
  );
}
