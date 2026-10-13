import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

const calcTimeLeft = (target) => {
  const targetTime = target || "2026-10-23T13:30:00";
  const diff = new Date(targetTime).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
};

export default function CountdownSection() {
  const { data } = useData();
  const { t, formatNum } = useLanguage();
  const targetDate =
    data?.saveDate?.targetDate ||
    (data?.couple?.wedding_date ? `${data?.couple?.wedding_date}T13:30:00` : "2026-10-23T13:30:00");

  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(targetDate));

  useEffect(() => {
    setTimeLeft(calcTimeLeft(targetDate));
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const titleText = t(data?.countdown?.title) || "Counting the days";

  const units = [
    {
      label: t(data?.countdown?.labels?.days) || "Days",
      value: formatNum(String(timeLeft.days).padStart(2, "0")),
    },
    {
      label: t(data?.countdown?.labels?.hours) || "Hours",
      value: formatNum(String(timeLeft.hours).padStart(2, "0")),
    },
    {
      label: t(data?.countdown?.labels?.minutes) || "Minutes",
      value: formatNum(String(timeLeft.minutes).padStart(2, "0")),
    },
    {
      label: t(data?.countdown?.labels?.seconds) || "Seconds",
      value: formatNum(String(timeLeft.seconds).padStart(2, "0")),
    },
  ];

  return (
    <section className="bg-background py-8 sm:py-12 md:py-14 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-xl text-center"
      >
        <p className="font-body uppercase tracking-[0.24em] text-[0.68rem] sm:text-xs text-primary/80 font-medium">
          {titleText}
        </p>
        <div className="mt-5 sm:mt-6 flex items-start justify-center gap-2 sm:gap-4 md:gap-8">
          {units.map((u) => (
            <div key={u.label} className="flex-1">
              <p className="font-display text-primary leading-none text-[clamp(2rem,9vw,3.5rem)] tabular-nums">
                {u.value}
              </p>
              <p className="mt-2 font-body text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-primary/70">
                {u.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
