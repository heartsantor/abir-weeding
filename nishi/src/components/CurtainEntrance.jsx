import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export default function CurtainEntrance({ onEnter, onDone, onStartMusic, onShowHeroText }) {
  const { data } = useData();
  const { t } = useLanguage();

  const [stage, setStage] = useState("idle"); // "idle", "envelope", "fading", "done"
  const [videoStarted, setVideoStarted] = useState(false);
  const [textTriggered, setTextTriggered] = useState(false);
  const [entered, setEntered] = useState(false);
  const videoRef = useRef(null);

  const startFading = () => {
    setStage("fading");
    window.setTimeout(() => onDone?.(), 3200);
  };

  const handleTap = () => {
    if (stage === "idle") {
      setStage("envelope");
      onStartMusic?.();
      const v = videoRef.current;
      if (v) {
        v.play().catch(() => {
          // If browser policy blocks video playback or fails, auto-reveal content
          setTimeout(() => {
            if (!entered) {
              onEnter?.();
              setEntered(true);
              onShowHeroText?.();
              startFading();
            }
          }, 1500);
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime > 0.05 && !videoStarted) {
      setVideoStarted(true);
    }
    const dur = v.duration || 0;
    if (!entered && dur > 0 && v.currentTime >= dur - 3.2) {
      setEntered(true);
      v.pause();
      onEnter?.();
      startFading();
      if (!textTriggered) {
        setTextTriggered(true);
        window.setTimeout(() => onShowHeroText?.(), 900);
      }
    }
  };

  const handleEnded = () => {
    if (!entered) {
      onEnter?.();
      setEntered(true);
    }
    if (!textTriggered) {
      setTextTriggered(true);
      onShowHeroText?.();
    }
    startFading();
  };

  const handleSkip = (e) => {
    e.stopPropagation();
    if (!entered) {
      setEntered(true);
      onEnter?.();
    }
    if (!textTriggered) {
      setTextTriggered(true);
      onShowHeroText?.();
    }
    startFading();
  };

  const isPosterVisible = stage === "idle" || (stage === "envelope" && !videoStarted);
  const isVideoVisible = stage !== "idle";

  const tapText = t(data?.entrance?.tapToOpen) || "Tap to open";
  const skipText = t(data?.entrance?.skip) || "Skip";

  return (
    <motion.div
      className="fixed inset-0 z-50 cursor-pointer bg-background"
      onClick={handleTap}
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === "fading" || stage === "done" ? 0 : 1 }}
      transition={{ duration: 2.8, ease: [0.4, 0, 0.2, 1] }}
      style={{ pointerEvents: stage === "fading" || stage === "done" ? "none" : "auto" }}
    >
      <img
        src="/assets/eleganza-poster.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: isPosterVisible ? 1 : 0 }}
        draggable={false}
      />
      <video
        ref={videoRef}
        src="/assets/eleganza.mp4"
        poster="/assets/eleganza-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        style={{ opacity: isVideoVisible ? 1 : 0 }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={() => {
          if (!entered) {
            onEnter?.();
            setEntered(true);
            onShowHeroText?.();
            startFading();
          }
        }}
        playsInline
        muted
        preload="auto"
      />
      {stage === "idle" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-14 z-40 text-center">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] animate-pulse">
            {tapText}
          </p>
        </div>
      )}
      {stage === "envelope" && (
        <button
          onClick={handleSkip}
          className="absolute bottom-6 right-6 z-50 bg-background/90 text-foreground px-5 py-2 rounded-full font-serif text-sm tracking-wide backdrop-blur-sm transition-opacity duration-300 hover:bg-background cursor-pointer"
        >
          {skipText}
        </button>
      )}
    </motion.div>
  );
}
