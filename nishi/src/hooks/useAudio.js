import { useState, useEffect, useRef } from "react";

let audioInstance = null;

export function useAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioInstance) {
      audioInstance = new Audio("/assets/waltz-sentimental.mp3");
      audioInstance.loop = true;
      audioInstance.volume = 0.5;
    }
    audioRef.current = audioInstance;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audioInstance.addEventListener("play", onPlay);
    audioInstance.addEventListener("pause", onPause);

    return () => {
      audioInstance?.removeEventListener("play", onPlay);
      audioInstance?.removeEventListener("pause", onPause);
    };
  }, []);

  const startMusic = () => {
    if (audioInstance) {
      audioInstance.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log("Audio autoplay prevented, user interaction required:", e);
      });
    }
  };

  const toggleMute = () => {
    if (audioInstance) {
      if (audioInstance.paused) {
        audioInstance.play().catch(() => {});
        setIsMuted(false);
        setIsPlaying(true);
      } else {
        const nextMuted = !audioInstance.muted;
        audioInstance.muted = nextMuted;
        setIsMuted(nextMuted);
      }
    }
  };

  return { isMuted, isPlaying, toggleMute, startMusic };
}
