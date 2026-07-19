"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, ChevronUp } from "lucide-react";

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

  // Text details for typewriter writing animation
  const titleWord1 = "Cardamom".split("");
  const titleWord2 = "Cafe".split("");

  // Framer Motion animation configurations
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.15, ease: "easeOut" as const },
    },
  };

  const subtextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.7,
      transition: { delay: 1.5, duration: 0.8 },
    },
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

          {/* Typing Overlay matching exact coordinates of Hero title */}
          <div className="absolute inset-0 px-4 flex flex-col justify-between sm:px-6 lg:px-8 py-8 md:py-12 pointer-events-none">
            {/* Top spacer to align layout vertically */}
            <div className="h-8 md:h-12" />

            <div className="relative mx-auto w-full max-w-5xl flex-1 flex flex-col justify-center py-10 md:py-16">
              {/* Staggered subtitle entry */}
              <motion.p
                variants={subtextVariants}
                initial="hidden"
                animate="visible"
                className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-glow"
              >
                Lisbon · Estrela
              </motion.p>

              {/* Typewriter H1 */}
              <motion.h1
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                className="mt-4 font-serif text-6xl leading-tight sm:text-7xl lg:text-8xl max-w-3xl tracking-tight font-light flex flex-wrap gap-x-4"
              >
                <span className="text-brand-glow font-normal italic inline-flex">
                  {titleWord1.map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="text-white font-semibold inline-flex">
                  {titleWord2.map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
            </div>

            {/* Bottom spacer for layout balancing */}
            <div className="h-16" />
          </div>

          {/* Bottom Left Controls: Mute/Unmute */}
          <div className="absolute bottom-8 left-8 z-10">
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cream transition-all hover:bg-white/20 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              aria-label={isMuted ? "Unmute intro video" : "Mute intro video"}
            >
              {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
            </button>
          </div>

          {/* Bottom Center Controls: Scroll Up Chevron */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            <button
              onClick={handleDismiss}
              className="flex flex-col items-center gap-1 text-cream hover:text-white transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg p-2"
              aria-label="Enter Cardamom Cafe"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ChevronUp className="h-6 w-6 stroke-[2.5] text-white" />
              </motion.div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-cream/70 group-hover:text-white transition-colors">
                Scroll Up
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
