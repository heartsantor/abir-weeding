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
        {/* Heading + gift line sit in the clear space between the side vines */}
        <div className="absolute inset-x-[21%] top-[18%] bottom-[60%] flex flex-col items-center justify-center text-center">
          <p className="font-body text-[clamp(0.62rem,2.8cqw,0.95rem)] tracking-[0.2em] uppercase text-primary font-semibold mb-1.5 sm:mb-2">
            {heading}
          </p>
          <p className="font-body text-[clamp(0.8rem,3.6cqw,1.2rem)] leading-snug text-primary font-medium text-balance">
            {line1}
          </p>
        </div>
        {/* Pulled up under the wreath; the opaque background hides the placeholder text baked into the frame */}
        <div
          className="relative bg-background flex flex-col items-center text-center px-[12%] pt-1"
          style={{ marginTop: "-8.7cqw" }}
        >
          <div className="font-body italic text-[clamp(0.78rem,3.4cqw,1.1rem)] leading-snug text-primary/90 space-y-1 text-balance">
            <p>{line2} {line3}</p>
            <p>{line4}</p>
          </div>
          <a
            href="tel:01829605959"
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-background border border-primary/30 text-primary font-body text-[clamp(0.68rem,2.9cqw,0.9rem)] font-semibold shadow-xs transition-transform hover:scale-105 active:scale-95"
          >
            <Phone className="w-3 h-3 text-primary/70" />
            <span>{iban}</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
