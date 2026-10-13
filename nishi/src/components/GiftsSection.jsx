import { motion } from "framer-motion";
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
  const iban = data?.gifts?.iban || "IT00 0000 0000 0000 0000 000";

  return (
    <section className="relative w-full bg-background overflow-hidden py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full"
      >
        <img
          src="/assets/gifts-frame.png"
          alt="Gifts frame"
          className="w-full h-auto"
          draggable={false}
        />
        <div className="absolute inset-x-0 top-[16%] flex flex-col items-center text-center px-8">
          <p className="font-body text-[0.7rem] md:text-base tracking-[0.28em] uppercase text-primary">
            {heading}
          </p>
          <div className="mt-4 font-body text-sm md:text-2xl leading-relaxed text-primary">
            <p>{line1}</p>
            <p>{line2}</p>
            <p>{line3}</p>
            <p>{line4}</p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-[3%] flex justify-center px-6">
          <p className="font-body text-[0.75rem] md:text-2xl tracking-wide text-primary">
            {iban}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
