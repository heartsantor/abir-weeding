import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function PhotoGallery({ gallery }) {
  const { t, lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = gallery?.items || [
    {
      url: '/assets/images/gallery-1.jpg',
      caption: {
        bn: '“দুটি মন, দুটি হৃদয়, এক নতুন জীবনের শুভ সূচনা।”',
        en: '"Two hearts, one soul, a divine new beginning."',
      },
    },
  ];

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const currentItem = items[currentIndex] || items[0];

  return (
    <section
      id="photo-gallery"
      className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center"
    >
      <div className="inline-block px-4 py-1 rounded-full border border-[#c9a96e]/40 bg-white/70 backdrop-blur-md shadow-sm mb-3">
        <span className="text-xs uppercase tracking-widest text-[#7a5c61] font-montserrat">
          {t(gallery?.title) || (lang === 'bn' ? 'ফটো গ্যালারি' : 'Photo Gallery')}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold font-bengali-serif text-[#2a1625] mb-2">
        {t(gallery?.subtitle) || (lang === 'bn' ? 'মধুর স্মৃতিমালা' : 'Cherished Memories')}
      </h2>

      {/* Polaroid Gallery Frame */}
      <div className="mt-8 relative max-w-md mx-auto">
        <div className="relative bg-white p-4 sm:p-5 pb-8 rounded-2xl shadow-2xl border border-gray-100 transform rotate-[-0.5deg] hover:rotate-0 transition-transform duration-500">
          {/* Main Photo View */}
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 mb-5 shadow-inner">
            <img
              src={currentItem?.url}
              alt="Abir & Nishi Wedding Memory"
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>

          {/* Caption */}
          <p className="text-sm sm:text-base italic text-[#4a3319] font-bengali-serif min-h-[48px] flex items-center justify-center px-2">
            {t(currentItem?.caption)}
          </p>

          {/* Prev Navigation Button */}
          <button
            onClick={prevPhoto}
            aria-label="Previous photo"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-[#c9a96e]/30 flex items-center justify-center text-[#2a1625] hover:bg-[#fbf5b7] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Navigation Button */}
          <button
            onClick={nextPhoto}
            aria-label="Next photo"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-[#c9a96e]/30 flex items-center justify-center text-[#2a1625] hover:bg-[#fbf5b7] transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-7 bg-[#c9a96e] shadow-sm'
                  : 'w-2.5 bg-[#c9a96e]/40 hover:bg-[#c9a96e]/70'
              }`}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
