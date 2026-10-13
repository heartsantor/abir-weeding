import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function CelebrationSection() {
  const { data } = useData();
  const { t, lang } = useLanguage();

  const heading = t(data?.celebration?.heading) || (lang === "bn" ? "শুভ বিবাহ অনুষ্ঠান" : "The Celebrations");
  const badge = t(data?.celebration?.badge) || (lang === "bn" ? "পবিত্র বন্ধন ও শুভ মিলন" : "A Blessed Union");
  const villaLine1 = t(data?.celebration?.villaLine1) || (lang === "bn" ? "বেনারসি" : "Benarosi");
  const villaLine2 = t(data?.celebration?.villaLine2) || (lang === "bn" ? "কমিউনিটি সেন্টার" : "Community Center");
  const detailLine1 =
    t(data?.celebration?.detailLine1) ||
    (lang === "bn" ? "শুভ বিবাহ ও পবিত্র আকদ অনুষ্ঠান" : "Solemn Wedding Ceremony & Akd");
  const detailLine2 =
    t(data?.celebration?.detailLine2) ||
    (lang === "bn" ? "অনুষ্ঠানস্থলে ঐতিহ্যবাহী রাজকীয় প্রীতিভোজ" : "Followed by a Traditional Grand Feast");
  const dateText =
    t(data?.celebration?.date) || (lang === "bn" ? "শুক্রবার, ২৩শে অক্টোবর ২০২৬" : "Friday, 23 October 2026");
  const timeText =
    t(data?.celebration?.time) || (lang === "bn" ? "দুপুর ১:৩০ ঘটিকা (প্রীতিভোজ)" : "1:30 PM (Grand Feast)");
  const mapsUrl =
    data?.couple?.maps_url || "https://maps.app.goo.gl/CG6Z9D7U1L7xjsui6";
  const buttonText =
    t(data?.celebration?.buttonText) || (lang === "bn" ? "গুগল ম্যাপে দেখুন" : "View on Map");
  const dressTitle =
    t(data?.celebration?.dressCodeTitle) || (lang === "bn" ? "উৎসবমুখর ঐতিহ্যবাহী পোশাক" : "Festive Traditional Formal");
  const dressDesc =
    t(data?.celebration?.dressCodeDesc) ||
    (lang === "bn"
      ? "উৎসবের উজ্জ্বল রঙ · মার্জিত ঐতিহ্যবাহী পাঞ্জাবি, শাড়ি ও ফরমাল পোশাক"
      : "Vibrant festive colors · Traditional formal wedding attire");
  const dressLabel =
    t(data?.dressCodeSection?.title) || (lang === "bn" ? "পোশাক রীতি" : "Dress Code");

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-4xl sm:text-6xl text-foreground font-bold">
            {heading}
          </h2>
        </motion.div>

        <div className="space-y-8">
          <div className="relative">
            <motion.div
              className="relative z-10 flex justify-center -mb-8"
              animate={{ y: [0, -4, 0, -4, 0], x: [0, 3, 0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/assets/villa-illustration.png"
                alt=""
                className="w-72 md:w-[26rem] h-auto drop-shadow-sm pointer-events-none select-none"
                draggable={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative text-center bg-foreground/[0.03] border border-foreground/10 rounded-2xl px-6 py-10 md:px-10 md:py-14"
            >
              <img
                src="/assets/key-tassel.png"
                alt=""
                draggable={false}
                className="pointer-events-none select-none absolute -bottom-5 -right-2 sm:-bottom-6 sm:-right-4 md:-bottom-8 md:-right-8 w-24 sm:w-28 md:w-40 h-auto z-20 drop-shadow-sm"
              />
              <p className="font-body text-xs sm:text-sm tracking-[0.22em] uppercase text-foreground/75 mb-3 font-semibold">
                {badge}
              </p>
              <h3 className="font-display text-4xl sm:text-6xl text-foreground mb-3 leading-tight font-bold">
                {villaLine1}
                <br />
                {villaLine2}
              </h3>
              <p className="font-body text-sm sm:text-base text-foreground/85 font-medium">{detailLine1}</p>
              <p className="font-body text-sm sm:text-base text-foreground/80 mt-1">{detailLine2}</p>

              <div className="w-10 h-px bg-foreground/20 mx-auto my-5" />
              <div className="space-y-1.5">
                <p className="font-body text-sm sm:text-base text-foreground font-medium italic tracking-wide">
                  {dateText}
                </p>
                <p className="font-body text-sm sm:text-base text-foreground font-bold tracking-wide">
                  {timeText}
                </p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 font-body text-xs sm:text-sm tracking-[0.15em] uppercase text-foreground/75 hover:text-foreground transition-colors border-b border-foreground/30 hover:border-foreground/60 pb-1 font-semibold"
              >
                {buttonText}
              </a>

              <div className="mt-8 pt-6 border-t border-foreground/15">
                <p className="font-body text-[11px] sm:text-xs tracking-[0.25em] uppercase text-foreground/60 mb-2 font-semibold">
                  {dressLabel}
                </p>
                <p className="font-display text-2xl sm:text-4xl text-foreground leading-tight font-bold">
                  {dressTitle}
                </p>
                {dressDesc && (
                  <p className="font-body text-xs sm:text-sm text-foreground/75 italic mt-2">
                    {dressDesc}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
