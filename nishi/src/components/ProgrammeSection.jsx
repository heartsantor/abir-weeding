import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function ProgrammeSection() {
  const { data } = useData();
  const { t, formatNum, lang } = useLanguage();

  const heading = t(data?.programme?.heading) || "Programme";
  const items = data?.programme?.items || [
    { time: "5:30", period: "PM", label: { en: "Welcome", bn: "অভ্যর্থনা" } },
    { time: "6:00", period: "PM", label: { en: "Ceremony", bn: "মূল অনুষ্ঠান" } },
    { time: "7:00", period: "PM", label: { en: "Cocktail", bn: "ককটেল পর্ব" } },
    { time: "9:00", period: "PM", label: { en: "Dinner", bn: "নৈশভোজ" } },
    { time: "11:30", period: "PM", label: { en: "Dancing", bn: "নৃত্য ও গান" } }
  ];

  return (
    <section className="w-full py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full [container-type:inline-size]"
      >
        <img
          src="/assets/programme-linen.png"
          alt="Wedding programme on embroidered linen"
          className="w-full h-auto select-none pointer-events-none"
          draggable={false}
        />
        <div className="absolute inset-y-0 left-[44%] right-[8%] flex flex-col justify-center items-center text-foreground pointer-events-none select-none">
          <p
            className="font-display leading-none"
            style={{ fontSize: "8cqw", marginBottom: "9cqw" }}
          >
            {heading}
          </p>
          <div className="flex flex-col" style={{ gap: "8cqw" }}>
            {items.map((e, idx) => {
              const formattedTime = formatNum(e.time);
              const label = t(e.label);
              return (
                <div key={idx} className="flex items-baseline">
                  <span
                    className="font-body text-right"
                    style={{ fontSize: "4.6cqw", width: "10cqw" }}
                  >
                    {formattedTime}
                  </span>
                  <span
                    className="font-body uppercase"
                    style={{
                      fontSize: "3cqw",
                      marginLeft: "1.2cqw",
                      letterSpacing: "0.06em"
                    }}
                  >
                    {e.period}
                  </span>
                  <span
                    className="font-display text-left"
                    style={{
                      fontSize: "6.5cqw",
                      marginLeft: "2.5cqw",
                      width: "20cqw",
                      lineHeight: 1
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
