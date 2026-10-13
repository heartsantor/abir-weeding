import React from "react";
import { Volume2, VolumeX, Shield, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function NavbarControls({ onOpenAdmin, isMuted, isPlaying, onToggleMusic }) {
  const { lang, toggleLang } = useLanguage();

  return (
    <header className="fixed top-3 right-3 sm:top-5 sm:right-5 z-40 flex items-center gap-2 pointer-events-auto">
      {/* Language Switcher Button */}
      <button
        onClick={toggleLang}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 hover:bg-background backdrop-blur-md border border-primary/25 shadow-sm text-primary transition-all duration-300 hover:scale-105 cursor-pointer text-xs font-body tracking-wider"
        title={lang === "bn" ? "Switch to English" : "বাংলা ভাষায় দেখুন"}
      >
        <Globe className="w-3.5 h-3.5 text-primary/70" />
        <span className="font-semibold">{lang === "bn" ? "ENG" : "বাংলা"}</span>
      </button>

      {/* Floating Audio Controls */}
      <button
        onClick={onToggleMusic}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-background/80 hover:bg-background backdrop-blur-md border border-primary/25 shadow-sm flex items-center justify-center text-primary transition-all duration-300 hover:scale-105 cursor-pointer"
        title={isMuted || !isPlaying ? "Play music" : "Mute music"}
      >
        {isMuted || !isPlaying ? (
          <VolumeX className="w-4 h-4 text-primary/70" />
        ) : (
          <Volume2 className="w-4 h-4 text-primary" />
        )}
      </button>

      {/* Admin Panel Launcher Button */}
      <button
        onClick={onOpenAdmin}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 hover:bg-background backdrop-blur-md border border-primary/25 shadow-sm text-primary transition-all duration-300 hover:scale-105 cursor-pointer text-xs font-body tracking-wider"
        title="Admin Dashboard"
      >
        <Shield className="w-3.5 h-3.5 text-primary/70" />
        <span className="hidden sm:inline font-medium uppercase text-[11px] tracking-widest">Admin</span>
      </button>
    </header>
  );
}
