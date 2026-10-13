import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function FooterSection() {
  const { data } = useData();
  const { t } = useLanguage();

  const name1 = t(data?.couple?.name1) || "Alessia";
  const name2 = t(data?.couple?.name2) || "Matteo";
  const cantWait = t(data?.footer?.cantWait) || "We cannot wait to celebrate with you";
  const locationFull =
    t(data?.couple?.venue_location_full) || "Villa Cipressi · Lake Como · 12 September 2027";
  const madeBy = t(data?.footer?.madeWithLove) || "Made with love by";

  return (
    <footer className="relative bg-background pt-6 pb-0">
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
          className="w-full h-auto"
          draggable={false}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[16%]">
          <p className="font-display italic text-primary leading-tight text-[clamp(1.1rem,4.6vw,3rem)]">
            {cantWait}
          </p>
          <p className="font-display uppercase text-primary mt-[2%] tracking-[0.06em] text-[clamp(1rem,4.2vw,2.6rem)]">
            {name1} & {name2}
          </p>
          <p className="font-body uppercase text-primary mt-[2%] tracking-[0.12em] text-[clamp(0.5rem,1.9vw,1.1rem)]">
            {locationFull}
          </p>
          <p className="font-body text-primary/60 mt-[5%] text-[clamp(0.45rem,1.6vw,0.9rem)]">
            {madeBy}{" "}
            <a
              href="https://www.thedigitalyes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-primary"
            >
              The Digital Yes
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
