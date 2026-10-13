import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Smile, Phone } from "lucide-react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function FamilySection() {
  const { data } = useData();
  const { t, lang } = useLanguage();

  const blessings = data?.blessings;
  const wishesTitle = t(blessings?.wishes?.title) || (lang === "bn" ? "-: শুভেচ্ছান্তে :-" : "Best Wishes From");
  const wishesNames = t(blessings?.wishes?.names) || "মোঃ মোস্তফা জামাল ভুঁইয়া\nরোজিনা আক্তার\nপরিবারবর্গ";

  const receptionTitle = t(blessings?.reception?.title) || (lang === "bn" ? "-: অভ্যর্থনায় :-" : "Cordially Welcomed By");
  const receptionNames = t(blessings?.reception?.names) || "সকল আত্মীয়স্বজন ও শুভাকাঙ্ক্ষীবৃন্দ";

  const youngstersTitle = t(blessings?.youngsters?.title) || (lang === "bn" ? "-: হৈ চৈ :-" : "The Little Stars");
  const youngstersNames =
    t(blessings?.youngsters?.names) ||
    "মায়ান, নুজাইম, মুয়াজ, নুহাশ, রিয়ান, রাফা, রিমি, অর্নি, আবিবা, নিরা, নুসরাত, নাবিলা, তন্ময়, নাবিল ও মাহবুব";

  const contacts = blessings?.contacts || ["01829605959"];

  return (
    <section className="py-12 md:py-16 px-5">
      <div className="text-center mb-8">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-primary/70 mb-2">
          {lang === "bn" ? "শুভাকাঙ্ক্ষী ও পরিবার" : "Family & Well-Wishers"}
        </p>
        <h2 className="font-display text-4xl sm:text-5xl text-primary font-bold">
          {lang === "bn" ? "আন্তরিক ভালোবাসা ও শুভেচ্ছায়" : "With Warm Love & Regards"}
        </h2>
        <div className="w-12 h-px bg-foreground/20 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* শুভেচ্ছান্তে */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-foreground/[0.03] border border-foreground/15 rounded-2xl p-6 text-center flex flex-col items-center shadow-xs"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-base font-bold font-body text-primary mb-2">
            {wishesTitle}
          </h3>
          <p className="text-xs sm:text-sm font-body text-foreground/90 leading-relaxed whitespace-pre-line font-medium">
            {wishesNames}
          </p>
        </motion.div>

        {/* অভ্যর্থনায় */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-foreground/[0.03] border border-foreground/15 rounded-2xl p-6 text-center flex flex-col items-center shadow-xs"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-base font-bold font-body text-primary mb-2">
            {receptionTitle}
          </h3>
          <p className="text-xs sm:text-sm font-body text-foreground/90 leading-relaxed whitespace-pre-line font-medium">
            {receptionNames}
          </p>
        </motion.div>
      </div>

      {/* হৈ চৈ (Little Stars) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-foreground/[0.03] border border-foreground/15 rounded-2xl p-6 text-center flex flex-col items-center shadow-xs mb-5"
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
          <Smile className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-base font-bold font-body text-primary mb-2">
          {youngstersTitle}
        </h3>
        <p className="text-xs sm:text-sm font-body text-foreground/85 leading-relaxed max-w-xl font-medium">
          {youngstersNames}
        </p>
      </motion.div>

      {/* যোগাযোগ */}
      {contacts && contacts.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={`tel:${c}`}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-background/80 hover:bg-background text-xs font-body font-semibold text-primary shadow-xs transition-transform hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{lang === "bn" ? "যোগাযোগ:" : "Contact:"} {c}</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
