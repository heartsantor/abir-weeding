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
        <div className="absolute inset-y-0 left-[39%] right-[6%] flex flex-col justify-center items-center text-foreground px-2">
          <p
            className="font-display leading-none text-primary font-bold"
            style={{ fontSize: "6.8cqw", marginBottom: "4.5cqw" }}
          >
            {heading}
          </p>
          <div className="flex flex-col w-full max-w-[50cqw]" style={{ gap: "3.8cqw" }}>
            {items.map((e, idx) => {
              const formattedTime = formatNum(e.time);
              const label = t(e.label);
              return (
                <div key={idx} className="flex items-baseline w-full">
                  <span
                    className="font-body text-right font-medium text-primary shrink-0"
                    style={{ fontSize: "3.8cqw", width: "9cqw" }}
                  >
                    {formattedTime}
                  </span>
                  <span
                    className="font-body uppercase text-primary/75 shrink-0"
                    style={{
                      fontSize: "2.4cqw",
                      marginLeft: "1cqw",
                      letterSpacing: "0.05em"
                    }}
                  >
                    {e.period}
                  </span>
                  <span
                    className="font-display text-left font-semibold text-primary"
                    style={{
                      fontSize: "4.2cqw",
                      marginLeft: "2.2cqw",
                      flex: 1,
                      minWidth: 0,
                      lineHeight: 1.2
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
