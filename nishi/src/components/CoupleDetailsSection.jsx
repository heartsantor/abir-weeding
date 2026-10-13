import React from "react";
import { motion } from "framer-motion";
import { Crown, MapPin } from "lucide-react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

function RoyalEmblem({ initial, label }) {
  return (
    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center mb-5 p-2 bg-gradient-to-b from-primary/[0.08] via-background to-primary/[0.03] border-2 border-primary/30 shadow-[0_4px_20px_rgba(71,84,58,0.08)]">
      {/* Decorative dashed inner ring */}
      <div className="relative w-full h-full rounded-full border border-dashed border-primary/45 flex flex-col items-center justify-center overflow-hidden">
        {/* Antique Laurel Wreath SVG */}
        <svg
          className="absolute inset-1 w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] text-primary/35 pointer-events-none select-none"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
        >
          {/* Left branch */}
          <path d="M 24,70 C 17,55 17,40 25,27" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 20,64 C 15,62 14,56 19,54" strokeWidth="1" fill="currentColor" fillOpacity="0.3" />
          <path d="M 19,52 C 14,48 15,42 20,42" strokeWidth="1" fill="currentColor" fillOpacity="0.3" />
          <path d="M 21,40 C 17,34 19,30 25,32" strokeWidth="1" fill="currentColor" fillOpacity="0.3" />
          {/* Right branch */}
          <path d="M 76,70 C 83,55 83,40 75,27" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 80,64 C 85,62 86,56 81,54" strokeWidth="1" fill="currentColor" fillOpacity="0.3" />
          <path d="M 81,52 C 86,48 85,42 80,42" strokeWidth="1" fill="currentColor" fillOpacity="0.3" />
          <path d="M 79,40 C 83,34 81,30 75,32" strokeWidth="1" fill="currentColor" fillOpacity="0.3" />
          {/* Bottom ribbon tie */}
          <path d="M 46,74 C 48,76 52,76 54,74" strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        {/* Crown & Royal Initial */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Crown className="w-4 h-4 text-primary/80 mb-0.5" />
          <span className="font-display text-4xl sm:text-5xl font-bold text-primary leading-none select-none tracking-wide">
            {initial}
          </span>
          <span className="font-body text-[9.5px] uppercase tracking-[0.2em] text-primary/70 font-semibold mt-1">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CoupleDetailsSection() {
  const { data } = useData();
  const { t, lang } = useLanguage();

  const couple = data?.couple;
  const bride = couple?.bride;
  const groom = couple?.groom;

  return (
    <section className="py-10 md:py-16 px-5">
      <div className="text-center mb-8">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-primary/70 mb-2">
          {lang === "bn" ? "শুভ পরিণয়" : "Solemn Wedding Union"}
        </p>
        <h2 className="font-display text-4xl sm:text-5xl text-primary font-bold">
          {lang === "bn" ? "বর ও কনে পরিচিতি" : "The Bride & The Groom"}
        </h2>
        <div className="w-12 h-px bg-foreground/20 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Bride Card (First - since it's the wedding ceremony for the Bride) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-foreground/[0.03] border border-foreground/15 rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center shadow-xs"
        >
          <span className="px-4 py-1 rounded-full text-xs font-semibold tracking-wider bg-primary text-primary-foreground mb-4 font-body">
            {t(bride?.tag) || (lang === "bn" ? "কনে সাজে" : "The Bride")}
          </span>

          <RoyalEmblem
            initial="N"
            label={lang === "bn" ? "নিশি" : "Nishi"}
          />

          <h3 className="text-xl sm:text-2xl font-bold font-display text-primary mb-2 whitespace-pre-line leading-tight">
            {t(bride?.name)}
          </h3>

          <p className="text-xs sm:text-sm text-foreground/90 font-body leading-relaxed whitespace-pre-line mb-3 font-medium">
            {t(bride?.parents)}
          </p>

          <div className="mt-auto pt-3 border-t border-foreground/10 w-full flex items-start justify-center gap-1.5 text-[11px] text-foreground/80 font-medium">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary/70 mt-0.5" />
            <span className="whitespace-pre-line leading-tight">{t(bride?.address)}</span>
          </div>
        </motion.div>

        {/* Groom Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-foreground/[0.03] border border-foreground/15 rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center shadow-xs"
        >
          <span className="px-4 py-1 rounded-full text-xs font-semibold tracking-wider bg-primary/90 text-primary-foreground mb-4 font-body">
            {t(groom?.tag) || (lang === "bn" ? "বর বেশে" : "The Groom")}
          </span>

          <RoyalEmblem
            initial="A"
            label={lang === "bn" ? "আবির" : "Abir"}
          />

          <h3 className="text-xl sm:text-2xl font-bold font-display text-primary mb-2 whitespace-pre-line leading-tight">
            {t(groom?.name)}
          </h3>

          <p className="text-xs sm:text-sm text-foreground/90 font-body leading-relaxed whitespace-pre-line mb-3 font-medium">
            {t(groom?.parents)}
          </p>

          <div className="mt-auto pt-3 border-t border-foreground/10 w-full flex items-start justify-center gap-1.5 text-[11px] text-foreground/80 font-medium">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary/70 mt-0.5" />
            <span className="whitespace-pre-line leading-tight">{t(groom?.address)}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
