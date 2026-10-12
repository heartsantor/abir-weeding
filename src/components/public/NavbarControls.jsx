import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NavbarControls({ onOpenAdmin }) {
  const { lang, toggleLang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const synthIntervalRef = useRef(null);

  // Play peaceful romantic ambient harp/music synthesizer fallback if external audio fails
  const startGentleSynth = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Pentatonic harp chords (A4, C#5, E5, F#5, G#5, A5)
      const notes = [440, 554.37, 659.25, 739.99, 830.61, 880];
      let step = 0;

      synthIntervalRef.current = setInterval(() => {
        if (!isPlaying && synthIntervalRef.current) return;
        const freq = notes[step % notes.length];
        step++;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2.0);
      }, 700);
    } catch (err) {
      console.warn('Synth error:', err);
    }
  };

  const stopGentleSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    if (!isPlaying) {
      // Try playing audio element
      if (audioRef.current) {
        audioRef.current.volume = 0.45;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay or network fallback to synth
            startGentleSynth();
            setIsPlaying(true);
          });
      } else {
        startGentleSynth();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopGentleSynth();
      setIsPlaying(false);
    }
  };

  // Expose play function to trigger on "Open Invitation" click
  useEffect(() => {
    window.startWeddingMusic = () => {
      if (!isPlaying) {
        toggleMusic();
      }
    };
    return () => {
      delete window.startWeddingMusic;
      stopGentleSynth();
    };
  }, [isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
        loop
        preload="auto"
      />

      <nav className="fixed top-3 inset-x-0 z-50 flex items-center justify-between px-4 max-w-5xl mx-auto pointer-events-none">
        {/* Language Switcher */}
        <div className="pointer-events-auto">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 shadow-md backdrop-blur-md border border-[#c9a96e]/40 bg-white/80 hover:bg-white text-[#2a1625]"
            title="ভাষা পরিবর্তন করুন / Switch Language"
          >
            <span className={`px-2 py-0.5 rounded-full transition-all ${lang === 'bn' ? 'bg-[#c9a96e] text-white shadow-sm' : 'text-[#7a5c61]'}`}>
              বাং
            </span>
            <span className="text-[#c9a96e]">|</span>
            <span className={`px-2 py-0.5 rounded-full transition-all ${lang === 'en' ? 'bg-[#c9a96e] text-white shadow-sm' : 'text-[#7a5c61]'}`}>
              EN
            </span>
          </button>
        </div>

        {/* Right Controls: Music Toggle & Admin Key */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Admin shortcut button */}
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-full border border-[#c9a96e]/30 bg-white/70 hover:bg-white text-[#7a5c61] hover:text-[#2a1625] shadow-md backdrop-blur-md transition-all hover:scale-105"
            title="Admin Dashboard"
          >
            <Shield className="w-4 h-4 text-[#c9a96e]" />
          </button>

          {/* Music Button */}
          <button
            onClick={toggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border shadow-md backdrop-blur-md transition-all duration-300 ${
              isPlaying
                ? 'bg-[#2a1625]/90 border-[#c9a96e] text-[#fbf5b7] shadow-lg shadow-[#c9a96e]/20'
                : 'bg-white/80 border-[#c9a96e]/40 text-[#3d2c2e] hover:bg-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#c9a96e] animate-pulse" />
                <span className="tracking-wide">♫ ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#7a5c61]" />
                <span className="tracking-wide text-[#7a5c61]">♫ OFF</span>
              </>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
