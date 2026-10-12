import React from 'react';
import { MapPin, Clock, Calendar, Utensils, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function EventSection({ event }) {
  const { t, lang } = useLanguage();

  return (
    <section
      id="event-section"
      className="relative py-20 px-4 sm:px-6 max-w-3xl mx-auto text-center"
    >
      <div className="inline-block px-4 py-1 rounded-full border border-[#c9a96e]/40 bg-white/70 backdrop-blur-md shadow-sm mb-3">
        <span className="text-xs uppercase tracking-widest text-[#7a5c61] font-montserrat">
          {t(event?.title) || (lang === 'bn' ? 'অনুষ্ঠান সূচি' : 'Event Schedule')}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-bengali-serif text-[#2a1625] mb-2">
        {t(event?.subTitle) || (lang === 'bn' ? 'বৌ-ভাত ও প্রীতিভোজ' : 'Bou-Bhat Reception')}
      </h2>

      {/* Main Event Card */}
      <div className="mt-8 glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#c9a96e]/40 relative overflow-hidden text-center">
        {/* Subtle decorative gold badge */}
        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-[#c9a96e] to-[#fbf5b7] p-0.5 shadow-md flex items-center justify-center mb-6">
          <div className="w-full h-full rounded-full bg-[#2a1625] flex items-center justify-center">
            <Utensils className="w-6 h-6 text-[#fbf5b7]" />
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-bold font-bengali-serif text-[#2a1625] mb-1">
          <Calendar className="w-4 h-4 text-[#c9a96e]" />
          <span>{t(event?.date)}</span>
        </div>

        {/* Time */}
        <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-[#7a5c61] font-bengali-sans mb-6">
          <Clock className="w-4 h-4 text-[#c9a96e]" />
          <span>{t(event?.time)}</span>
        </div>

        <div className="h-[1px] w-28 bg-[#c9a96e]/40 mx-auto my-4" />

        {/* Venue Title */}
        <div className="text-xl sm:text-2xl font-bold font-bengali-serif text-[#2a1625] mb-2">
          {t(event?.venue)}
        </div>

        {/* Address */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#7a5c61] font-bengali-sans leading-relaxed max-w-md mx-auto mb-8 whitespace-pre-line">
          <MapPin className="w-4 h-4 text-[#c9a96e] flex-shrink-0 mt-0.5" />
          <span>{t(event?.address)}</span>
        </div>

        {/* Google Map Link Button */}
        <div>
          <a
            href={event?.mapUrl || 'https://maps.app.goo.gl/F8BpyknDbEjNUFy16'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#2a1625] bg-gradient-to-r from-[#fbf5b7] via-[#c9a96e] to-[#aa771c] hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>{t(event?.mapBtn) || (lang === 'bn' ? 'গুগল ম্যাপে লোকেশন দেখুন' : 'Open Google Maps')}</span>
            <ExternalLink className="w-4 h-4 text-[#2a1625]" />
          </a>
        </div>
      </div>
    </section>
  );
}
