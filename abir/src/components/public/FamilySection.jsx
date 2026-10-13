import React from 'react';
import { Phone, Users, Heart, Smile } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function FamilySection({ family }) {
  const { t, lang } = useLanguage();

  return (
    <section
      id="family-section"
      className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center"
    >
      <div className="inline-block px-4 py-1 rounded-full border border-[#c9a96e]/40 bg-white/70 backdrop-blur-md shadow-sm mb-3">
        <span className="text-xs uppercase tracking-widest text-[#7a5c61] font-montserrat">
          {lang === 'bn' ? 'শুভাকাঙ্ক্ষী ও পরিবার' : 'Family & Well-Wishers'}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold font-bengali-serif text-[#2a1625] mb-8">
        {lang === 'bn' ? 'আন্তরিক ভালোবাসা ও শুভেচ্ছায়' : 'With Warm Love & Regards'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
        {/* শুভেচ্ছান্তে */}
        <div className="glass-panel p-6 rounded-2xl shadow-md border border-[#c9a96e]/30 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#f7dfe8] flex items-center justify-center mb-3">
            <Heart className="w-5 h-5 text-[#d4838f]" />
          </div>
          <h3 className="text-lg font-bold font-bengali-serif text-[#2a1625] mb-2">
            -ঃ {t(family?.wishesTitle)} ঃ-
          </h3>
          <p className="text-sm font-bengali-sans text-[#5c3e44] leading-relaxed">
            {t(family?.wishesList)}
          </p>
        </div>

        {/* অভ্যর্থনায় */}
        <div className="glass-panel p-6 rounded-2xl shadow-md border border-[#c9a96e]/30 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#f7dfe8] flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-[#c9a96e]" />
          </div>
          <h3 className="text-lg font-bold font-bengali-serif text-[#2a1625] mb-2">
            -ঃ {t(family?.receptionTitle)} ঃ-
          </h3>
          <p className="text-sm font-bengali-sans text-[#5c3e44] leading-relaxed">
            {t(family?.receptionList)}
          </p>
        </div>
      </div>

      {/* হৈ চৈ */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-md border border-[#c9a96e]/30 mb-8 max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#f7dfe8] flex items-center justify-center mb-3">
          <Smile className="w-5 h-5 text-[#c9a96e]" />
        </div>
        <h3 className="text-lg font-bold font-bengali-serif text-[#2a1625] mb-2">
          -ঃ {t(family?.youngTitle)} ঃ-
        </h3>
        <p className="text-sm font-bengali-sans text-[#7a5c61] leading-relaxed">
          {t(family?.youngList)}
        </p>
      </div>

      {/* যোগাযোগ ফোন নাম্বারসমূহ */}
      {family?.contacts && family.contacts.length > 0 && (
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3 rounded-full border border-[#c9a96e]/40 bg-white/80 shadow-md">
          <Phone className="w-4 h-4 text-[#c9a96e]" />
          <span className="text-xs font-semibold text-[#7a5c61] uppercase tracking-wider font-montserrat">
            {lang === 'bn' ? 'যোগাযোগ:' : 'Contact:'}
          </span>
          <div className="flex items-center gap-3">
            {family.contacts.map((num, idx) => (
              <a
                key={idx}
                href={`tel:${num}`}
                className="text-xs sm:text-sm font-bold font-montserrat text-[#2a1625] hover:text-[#b38728] transition-colors"
              >
                {num}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
