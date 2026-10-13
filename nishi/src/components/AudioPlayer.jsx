import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer({ isMuted, onToggle }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-secondary/90 backdrop-blur-sm border border-muted/30 shadow-lg flex items-center justify-center text-primary hover:bg-secondary hover:scale-110 transition-all duration-300 cursor-pointer"
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
    >
      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </motion.button>
  );
}
