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
        className="relative w-full [container-type:inline-size]"
      >
        <img
          src="/assets/when-where-frame.png"
          alt="When & Where frame"
          className="w-full h-auto select-none pointer-events-none"
          draggable={false}
        />
        <div className="absolute inset-x-[10%] bottom-[5%] top-[61.5%] flex flex-col items-center justify-evenly text-center px-3 sm:px-6 pb-1 sm:pb-3">
          <div>
            <h2 className="font-display text-[clamp(1.35rem,6.2cqw,2.4rem)] text-primary font-bold leading-tight">
              {heading}
            </h2>
            <p className="font-body mt-1 text-[clamp(0.6rem,2.3cqw,0.8rem)] tracking-[0.16em] uppercase text-primary/80 font-medium">
              {subtitle}
            </p>
          </div>

          <div className="font-body text-[clamp(0.72rem,3.2cqw,1.05rem)] leading-snug text-primary font-medium space-y-0.5">
            <p className="font-bold text-[clamp(0.82rem,3.8cqw,1.25rem)] text-primary">{venue}</p>
            <p className="text-primary/90">{dateStr}</p>
            <p className="text-primary/90 font-semibold">{ceremonyTime}</p>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-primary/35 bg-background/90 px-5 py-1.5 font-body text-[clamp(0.65rem,2.7cqw,0.85rem)] text-primary shadow-xs transition-transform hover:scale-105 active:scale-95 font-semibold"
          >
            {buttonText}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
