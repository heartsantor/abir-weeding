import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function WhenWhereSection() {
  const { data } = useData();
  const { t, lang } = useLanguage();

  const heading = t(data?.whenWhere?.heading) || (lang === "bn" ? "কখন ও কোথায়" : "When & Where");
  const subtitle =
    t(data?.whenWhere?.subtitle) ||
    (lang === "bn" ? "শুভ বিবাহ ও প্রীতিভোজ অনুষ্ঠান" : "Wedding Ceremony & Grand Feast");
  const venue = t(data?.couple?.venue_name) || "বেনারসি কমিউনিটি সেন্টার";
  const dateStr =
    t(data?.whenWhere?.ceremonyDate) ||
    (lang === "bn" ? "শুক্রবার, ২৩শে অক্টোবর ২০২৬" : "Friday, 23 October 2026");
  const ceremonyTime =
    t(data?.whenWhere?.ceremonyTime) ||
    (lang === "bn" ? "দুপুর ১:৩০ ঘটিকা (প্রীতিভোজ)" : "Ceremony & Feast at 1:30 PM");
  const buttonText =
    t(data?.whenWhere?.buttonText) ||
    (lang === "bn" ? "গুগল ম্যাপে লোকেশন দেখুন" : "View on Google Maps");
  const mapsUrl =
    data?.couple?.maps_url || "https://maps.app.goo.gl/CG6Z9D7U1L7xjsui6";

  return (
    <section id="countdown" className="relative pt-2 pb-6 md:pb-10 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full"
      >
        <img
          src="/assets/when-where-frame.png"
          alt="When & Where frame"
          className="w-full h-auto"
          draggable={false}
        />
        <div className="absolute inset-x-0 bottom-[6%] top-[56%] flex flex-col items-center justify-start pt-[0.8cm] text-center px-8">
          <h2 className="font-display text-3xl sm:text-5xl text-primary font-bold">
            {heading}
          </h2>
          <p className="font-body mt-2 text-[0.68rem] sm:text-xs tracking-[0.16em] uppercase text-primary/80 font-medium">
            {subtitle}
          </p>
          <div className="mt-3 font-body text-xs sm:text-base leading-relaxed text-primary font-medium space-y-0.5">
            <p className="font-bold text-sm sm:text-lg">{venue}</p>
            <p>{dateStr}</p>
            <p className="text-primary/90">{ceremonyTime}</p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[0.8cm] sm:mt-[1cm] inline-block rounded-full border border-primary/30 bg-background/80 px-6 py-2 font-body text-xs sm:text-sm text-primary shadow-xs transition-colors hover:bg-background font-semibold"
          >
            {buttonText}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
