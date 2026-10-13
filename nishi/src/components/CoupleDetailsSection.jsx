import React from "react";
import { motion } from "framer-motion";
import { Heart, MapPin } from "lucide-react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

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

          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-primary/30 to-primary/10 shadow-md mb-4 overflow-hidden">
            <img
              src="/assets/couple-2.jpg"
              alt="The Bride"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.currentTarget.src = "/assets/hero-frame-oval.png";
              }}
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display text-primary mb-2 whitespace-pre-line leading-tight">
            {t(bride?.name)}
          </h3>

          <p className="text-xs sm:text-sm text-foreground/80 font-body leading-relaxed whitespace-pre-line mb-3">
            {t(bride?.parents)}
          </p>

          <div className="mt-auto pt-3 border-t border-foreground/10 w-full flex items-start justify-center gap-1.5 text-[11px] text-foreground/70">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary/60 mt-0.5" />
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

          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-primary/30 to-primary/10 shadow-md mb-4 overflow-hidden">
            <img
              src="/assets/couple-1.jpg"
              alt="The Groom"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.currentTarget.src = "/assets/hero-frame-oval.png";
              }}
            />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-display text-primary mb-2 whitespace-pre-line leading-tight">
            {t(groom?.name)}
          </h3>

          <p className="text-xs sm:text-sm text-foreground/80 font-body leading-relaxed whitespace-pre-line mb-3">
            {t(groom?.parents)}
          </p>

          <div className="mt-auto pt-3 border-t border-foreground/10 w-full flex items-start justify-center gap-1.5 text-[11px] text-foreground/70">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary/60 mt-0.5" />
            <span className="whitespace-pre-line leading-tight">{t(groom?.address)}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
