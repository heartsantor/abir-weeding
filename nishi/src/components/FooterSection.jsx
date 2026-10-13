import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function FooterSection() {
  const { data } = useData();
  const { t, lang } = useLanguage();

  const name1 = lang === "bn" ? "নিশি" : "Nishi";
  const name2 = lang === "bn" ? "আবির" : "Abir";
  const cantWait = t(data?.footer?.cantWait) || "We cannot wait to celebrate with you";
  const locationFull =
    t(data?.couple?.venue_location_full) ||
    (lang === "bn"
      ? "বেনারসি কমিউনিটি সেন্টার · ঢাকা · ২৩ অক্টোবর ২০২৬"
      : "Benarosi Community Center · Dhaka · 23 October 2026");
  const madeBy =
    t(data?.footer?.madeWithLove) || (lang === "bn" ? "ভালোবাসায় তৈরি করেছেন" : "Crafted with love by");
  const refText = data?.footer?.reference || "trialvo.com";
  const refUrl = data?.footer?.referenceUrl || "https://trialvo.com";

  return (
    <footer className="relative bg-background pt-6 pb-2">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full"
      >
        <img
          src="/assets/footer-frame.png"
          alt=""
          className="w-full h-auto select-none pointer-events-none"
          draggable={false}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[10%] pb-2">
          <p className="font-display italic text-primary leading-tight text-[clamp(0.78rem,3.4vw,1.4rem)] max-w-sm">
            {cantWait}
          </p>
          <p className="font-display uppercase text-primary mt-1.5 sm:mt-2 tracking-[0.08em] text-[clamp(1.1rem,4.6vw,2.2rem)] font-bold">
            {name1} {lang === "bn" ? "ও" : "&"} {name2}
          </p>
          <p className="font-body uppercase text-primary/85 mt-1 sm:mt-1.5 tracking-[0.14em] text-[clamp(0.6rem,2.3vw,0.85rem)] font-medium">
            {locationFull}
          </p>
          <p className="font-body text-primary/70 mt-2 sm:mt-3 text-[clamp(0.58rem,2.1vw,0.78rem)]">
            {madeBy}{" "}
            <a
              href={refUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-primary font-medium"
            >
              {refText}
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
