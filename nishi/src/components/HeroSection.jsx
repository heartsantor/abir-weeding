import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function HeroSection({ showText, onVideoEnded }) {
  const { data } = useData();
  const { t, lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showText && !visible) {
      setVisible(true);
      onVideoEnded?.();
    }
  }, [showText, visible, onVideoEnded]);

  const anim = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 1400ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 1400ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
  });

  const name1 = lang === "bn" ? "নিশি" : "Nishi";
  const name2 = lang === "bn" ? "আবির" : "Abir";
  const fullName1 = t(data?.couple?.name1) || "মোসাম্মৎ সোমাইয়া আক্তার (নিশি)";
  const fullName2 = t(data?.couple?.name2) || "মোঃ আব্দুল রামিম (আবির)";

  const dateStr = t(data?.hero?.dateDisplay) || "Friday, 23 October 2026";
  const timeStr = t(data?.hero?.timeDisplay) || "1:30 PM (Grand Feast)";
  const locationStr = t(data?.hero?.locationDisplay) || "Benarosi Community Center · Dhaka";

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/assets/hero-frame-oval.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        {/* Monogram */}
        <div style={anim(0)} className="mb-2">
          <img
            src="/assets/monogram-an-transparent.png"
            alt="AN Monogram"
            className="w-16 sm:w-20 h-auto drop-shadow-sm select-none pointer-events-none mx-auto opacity-85"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Short Names in Large Elegant Typography */}
        <h1 className="font-display font-bold leading-[1.05] text-primary text-5xl sm:text-7xl md:text-8xl">
          <span className="block" style={anim(200)}>
            {name1}
          </span>
          <span className="block my-1 text-4xl sm:text-5xl" style={anim(700)}>
            &
          </span>
          <span className="block" style={anim(1200)}>
            {name2}
          </span>
        </h1>

        {/* Sub-label with full names */}
        <p
          className="font-body text-[11px] sm:text-xs text-primary/80 mt-3 max-w-sm tracking-wide"
          style={anim(1600)}
        >
          {fullName1} · {fullName2}
        </p>

        {/* Date, Time & Venue */}
        <div className="mt-8 md:mt-12 space-y-1.5">
          <p
            className="font-body text-xs md:text-sm tracking-[0.16em] uppercase text-primary/90 font-medium"
            style={anim(2000)}
          >
            {dateStr}
          </p>
          <p
            className="font-body text-[11px] md:text-xs tracking-[0.14em] uppercase text-primary/80"
            style={anim(2400)}
          >
            {timeStr}
          </p>
          <p
            className="font-body text-xs md:text-sm tracking-[0.16em] uppercase text-primary font-semibold pt-1"
            style={anim(2800)}
          >
            {locationStr}
          </p>
        </div>
      </div>
    </section>
  );
}
