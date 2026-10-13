import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function GiftsSection({ enabled = true }) {
  const { data } = useData();
  const { t } = useLanguage();

  if (enabled === false) return null;

  const heading = t(data?.gifts?.heading) || "A Thoughtful Gesture";
  const line1 = t(data?.gifts?.line1) || "Your presence is the greatest gift.";
  const line2 = t(data?.gifts?.line2) || "If you wish to contribute to";
  const line3 = t(data?.gifts?.line3) || "our new life together,";
  const line4 = t(data?.gifts?.line4) || "we leave our details here.";
  const iban = data?.gifts?.iban || "যোগাযোগ: 01829605959";

  return (
    <section className="relative w-full bg-background overflow-hidden py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full [container-type:inline-size]"
      >
        <img
          src="/assets/gifts-frame.png"
          alt="Gifts frame"
          className="w-full h-auto select-none pointer-events-none"
          draggable={false}
        />
        <div className="absolute inset-x-[12%] top-[14%] bottom-[57%] flex flex-col items-center justify-center text-center px-2">
          <p className="font-body text-[clamp(0.62rem,2.8cqw,0.95rem)] tracking-[0.24em] uppercase text-primary font-semibold mb-1 sm:mb-2">
            {heading}
          </p>
          <div className="font-body text-[clamp(0.68rem,3.2cqw,1.1rem)] leading-snug sm:leading-relaxed text-primary font-medium space-y-0.5 sm:space-y-1 max-w-[85cqw]">
            <p>{line1}</p>
            <p>{line2}</p>
            <p>{line3}</p>
            <p>{line4}</p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-[3.2%] flex justify-center px-4">
          <a
            href="tel:01829605959"
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-background/90 hover:bg-background border border-primary/30 text-primary font-body text-[clamp(0.62rem,2.7cqw,0.85rem)] font-semibold shadow-xs transition-transform hover:scale-105 active:scale-95"
          >
            <Phone className="w-3 h-3 text-primary/70" />
            <span>{iban}</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
