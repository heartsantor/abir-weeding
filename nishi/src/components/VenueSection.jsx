import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function VenueSection() {
  const { data } = useData();
  const { t, lang } = useLanguage();

  const badge = t(data?.venue?.badge) || (lang === "bn" ? "আমাদের ভেন্যু" : "Our Venue");
  const title = t(data?.venue?.title) || "বেনারসি কমিউনিটি সেন্টার";
  const location =
    t(data?.venue?.location) || (lang === "bn" ? "যাত্রাবাড়ী, ঢাকা, বাংলাদেশ" : "Jatrabari, Dhaka, Bangladesh");
  const description =
    t(data?.venue?.description) ||
    "সুপরিসর ও মনোরম পরিবেশে আমাদের সকল প্রিয় মেহমান, আত্মীয়স্বজন ও শুভাকাঙ্ক্ষীদের বরণ করে নিতে প্রস্তুত বেনারসি কমিউনিটি সেন্টার।";
  const buttonText =
    t(data?.venue?.buttonText) || (lang === "bn" ? "গুগল ম্যাপে লোকেশন দেখুন" : "Open in Google Maps");
  const mapsUrl =
    data?.couple?.maps_url || "https://maps.app.goo.gl/CG6Z9D7U1L7xjsui6";

  return (
    <section className="w-full py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <img
          src="/assets/venue-villa.png"
          alt="Benarosi Community Center"
          className="w-full h-auto select-none pointer-events-none"
          draggable={false}
        />
        <div className="flex flex-col items-center text-center text-foreground px-8 mt-6 md:mt-10">
          <p className="font-display text-[clamp(2.25rem,10vw,4.5rem)] leading-none">
            {badge}
          </p>
          <p className="font-display text-[clamp(1.5rem,6.5vw,3rem)] leading-tight mt-2 text-primary font-bold">
            {title}
          </p>
          <p className="font-body uppercase tracking-[0.2em] text-[clamp(0.8rem,3.2vw,1.25rem)] mt-4 font-medium text-foreground/85">
            {location}
          </p>
          <p className="font-body text-[clamp(0.95rem,3.6vw,1.25rem)] max-w-xl mt-4 leading-relaxed opacity-90">
            {description}
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body uppercase tracking-[0.16em] text-[clamp(0.75rem,2.8vw,1.125rem)] border border-foreground/40 rounded-full px-8 py-3 mt-7 transition-colors hover:bg-foreground hover:text-background font-semibold"
          >
            {buttonText}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
