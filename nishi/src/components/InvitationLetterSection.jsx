import React from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function InvitationLetterSection() {
  const { data } = useData();
  const { t } = useLanguage();

  const letter = data?.invitationLetter;
  const bismillahTitle = t(letter?.bismillahTitle) || "বিসমিল্লাহির রাহমানির রাহীম";
  const bismillahSub =
    t(letter?.bismillahSub) || "পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে";
  const salutation = t(letter?.salutation) || "জনাব / জনাবা,";
  const greeting = t(letter?.greeting) || "আসসালামু আলাইকুম,";
  const body =
    t(letter?.body) ||
    "পরম করুণাময় আল্লাহ তা'য়ালার অশেষ রহমতে আসছে ২৩শে অক্টোবর ২০২৬ইং রোজ শুক্রবার মোঃ মোস্তফা জামাল ভুঁইয়া সাহেবের প্রথমা কন্যা মোসাম্মৎ সোমাইয়া আক্তার (নিশি) এর সাথে মোঃ আমিনুর রহমান (আমিন) সাহেবের একমাত্র পুত্র মোঃ আব্দুল রামিম (আবির) এর শুভ বিবাহ অনুষ্ঠানের আয়োজন করা হয়েছে।";

  return (
    <section className="py-10 md:py-14 px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative bg-foreground/[0.03] border border-foreground/15 rounded-2xl p-6 sm:p-8 text-center shadow-sm"
      >
        {/* Monogram or Emblem */}
        <div className="flex justify-center mb-4">
          <img
            src="/assets/monogram-an-transparent.png"
            alt="AN Monogram"
            className="w-20 h-auto drop-shadow-sm opacity-90 select-none pointer-events-none"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Bismillah Calligraphy */}
        <p className="font-serif text-xl sm:text-2xl text-primary font-bold mb-1 tracking-wide">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="font-body text-xs text-primary/80 font-medium mb-0.5">
          {bismillahTitle}
        </p>
        <p className="font-body text-[11px] text-primary/60 italic mb-5">
          {bismillahSub}
        </p>

        <div className="w-16 h-px bg-foreground/20 mx-auto my-3" />

        {/* Salutation & Greeting */}
        <p className="font-body text-sm font-semibold text-primary mb-1">
          {salutation}
        </p>
        <p className="font-body text-sm font-semibold text-primary/90 mb-4">
          {greeting}
        </p>

        {/* Letter Body */}
        <p className="font-body text-sm sm:text-base leading-relaxed text-foreground/85 whitespace-pre-line text-justify sm:text-center px-1 sm:px-4">
          {body}
        </p>

        <div className="w-12 h-px bg-foreground/20 mx-auto mt-6" />
      </motion.div>
    </section>
  );
}
