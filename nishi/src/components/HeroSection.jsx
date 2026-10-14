import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function HeroSection({ showText, onVideoEnded }) {
  const { data } = useData();
  const { t, lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  const isVisible = visible || showText;

  useEffect(() => {
    if (showText && !visible) {
      setVisible(true);
      onVideoEnded?.();
    }
  }, [showText, visible, onVideoEnded]);

  const anim = (delay) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
  });

  const name1 = lang === "bn" ? "নিশি" : "Nishi";
  const name2 = lang === "bn" ? "আবির" : "Abir";
  const fullName1 = t(data?.couple?.name1) || "মোসাম্মৎ সোমাইয়া আক্তার (নিশি)";
  const fullName2 = t(data?.couple?.name2) || "মোঃ আব্দুল রামিম (আবির)";

  const dateStr = t(data?.hero?.dateDisplay) || "Friday, 23 October 2026";
  const timeStr = t(data?.hero?.timeDisplay) || "1:30 PM (Grand Feast)";
  const locationStr = t(data?.hero?.locationDisplay) || "Benarosi Community Center · Dhaka";

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-background py-6 px-3 sm:px-6">
      <div className="relative w-full max-w-[420px] sm:max-w-[480px] aspect-[1072/1920] flex items-center justify-center">
        {/* Ornate Oval Floral Frame */}
        <img
          src="/assets/hero-frame-oval.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          draggable={false}
        />

        {/* Content nestled precisely in the oval aperture */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center w-[62%] h-[52%] px-2">
          {/* Short Names in Large Elegant Typography */}
          <h1 className="font-display font-bold leading-[0.98] text-primary text-3xl sm:text-5xl md:text-6xl shrink-0">
            <span className="block" style={anim(150)}>
              {name1}
            </span>
            <span className="block my-0.5 text-2xl sm:text-3xl text-primary/80" style={anim(450)}>
              &
            </span>
            <span className="block" style={anim(800)}>
              {name2}
            </span>
          </h1>

          {/* Sub-label with full names */}
          <div
            className="font-body text-[10px] sm:text-xs text-primary/85 mt-2 max-w-[220px] sm:max-w-[260px] leading-tight"
            style={anim(1100)}
          >
            <p className="line-clamp-1">{fullName1}</p>
            <p className="text-[9px] sm:text-[10px] text-primary/60 my-0.5">&</p>
            <p className="line-clamp-1">{fullName2}</p>
          </div>

          {/* Date, Time & Venue */}
          <div className="mt-4 sm:mt-6 space-y-1 shrink-0">
            <p
              className="font-body text-[9.5px] sm:text-xs tracking-[0.14em] uppercase text-primary/90 font-medium"
              style={anim(1400)}
            >
              {dateStr}
            </p>
            <p
              className="font-body text-[9px] sm:text-[11px] tracking-[0.12em] uppercase text-primary/80"
              style={anim(1700)}
            >
              {timeStr}
            </p>
            <p
              className="font-body text-[9.5px] sm:text-xs tracking-[0.14em] uppercase text-primary font-semibold pt-0.5 text-balance"
              style={anim(2000)}
            >
              {locationStr}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
