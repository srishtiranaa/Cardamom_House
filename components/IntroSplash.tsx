"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface IntroSplashProps {
  onDismiss: () => void;
}

export function IntroSplash({ onDismiss }: IntroSplashProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Disable body scroll when intro is active
  useEffect(() => {
    if (!isDismissed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss();
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso overflow-hidden select-none"
        >
          {/* Intro Video Element */}
          <video
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={handleDismiss}
            className="h-full w-full object-cover"
          >
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>

          {/* Action Bar (Skip / Sound Toggle) */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-10">
            {/* Audio Toggle button */}
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cream transition-all hover:bg-white/20 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              aria-label={isMuted ? "Unmute intro video" : "Mute intro video"}
            >
              {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
            </button>

            {/* Skip Button */}
            <button
              onClick={handleDismiss}
              className="px-6 py-3 rounded-full bg-white text-espresso font-semibold text-sm shadow-lg shadow-black/25 transition-all hover:scale-105 hover:bg-stone-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Skip Intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
