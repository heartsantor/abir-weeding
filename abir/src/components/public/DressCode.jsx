import React from 'react';
import { Sparkles, Palette } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function DressCode({ dressCode }) {
  const { t, lang } = useLanguage();

  const palette = dressCode?.palette || [
    { name: 'Soft Blush', hex: '#F7DFE8' },
    { name: 'Champagne Gold', hex: '#C9A96E' },
    { name: 'Rose Bloom', hex: '#D4838F' },
    { name: 'Royal Plum', hex: '#2A1625' },
    { name: 'Warm Cream', hex: '#FDF6F0' },
  ];

  return (
    <section
      id="dress-code"
      className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center"
    >
      <div className="inline-block px-4 py-1 rounded-full border border-[#c9a96e]/40 bg-white/70 backdrop-blur-md shadow-sm mb-3">
        <span className="text-xs uppercase tracking-widest text-[#7a5c61] font-montserrat">
          {t(dressCode?.title) || (lang === 'bn' ? 'অতিথিদের পোশাক শৈলী' : 'Dress Code')}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold font-bengali-serif text-[#2a1625] mb-2">
        {t(dressCode?.subtitle) || (lang === 'bn' ? 'রয়্যাল প্যাস্টেল ও ঐতিহ্যবাহী সাজসজ্জা' : 'Pastel & Royal Glamour')}
      </h2>

      <p className="text-sm text-[#7a5c61] font-bengali-sans max-w-lg mx-auto mb-8">
        {t(dressCode?.description)}
      </p>

      {/* Color Palette Display */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl border border-[#c9a96e]/30 max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-[#7a5c61] font-montserrat">
          <Palette className="w-4 h-4 text-[#c9a96e]" />
          <span>{lang === 'bn' ? 'অনুষ্ঠানের প্রস্তাবিত রঙের প্যালেট' : 'Recommended Color Palette'}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-2">
          {palette.map((color, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md border-2 border-white ring-1 ring-[#c9a96e]/40 transition-transform hover:scale-110"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-[11px] font-semibold text-[#5c3e44] mt-2 font-montserrat">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
