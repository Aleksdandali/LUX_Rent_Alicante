'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export function PageLoader() {
  const [showCar, setShowCar] = useState(false);
  const [startFlash, setStartFlash] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCar(true), 300);
    const t2 = setTimeout(() => setStartFlash(true), 1400);
    const t3 = setTimeout(() => setDone(true), 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Keyframes: 3 blinks with increasing power
  // The DARK overlay fades OUT during flash (car gets brighter)
  // and fades back IN during pause (car gets darker)
  const darknessKeyframes = {
    opacity: [
      0.65,
      // Blink 1 — subtle
      0.65, 0.35, 0.25, 0.35, 0.65,
      // Pause
      0.65,
      // Blink 2 — medium
      0.65, 0.20, 0.12, 0.20, 0.65,
      // Pause
      0.65,
      // Blink 3 — full brightness, hold
      0.65, 0.10, 0.05, 0.05, 0.10, 0.55,
    ],
  };

  // Warm glow overlay — appears when car brightens
  const glowKeyframes = {
    opacity: [
      0,
      // Blink 1
      0, 0.15, 0.25, 0.15, 0,
      // Pause
      0,
      // Blink 2
      0, 0.3, 0.45, 0.3, 0,
      // Pause
      0,
      // Blink 3
      0, 0.5, 0.65, 0.65, 0.4, 0,
    ],
  };

  const times = [
    0,
    0.02, 0.08, 0.12, 0.18, 0.26,
    0.33,
    0.35, 0.41, 0.45, 0.51, 0.59,
    0.66,
    0.68, 0.73, 0.78, 0.84, 0.92, 1.0,
  ];

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="page-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#030405] overflow-hidden"
        >
          {/* Car image — always visible once loaded */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{
              opacity: showCar ? 1 : 0,
              scale: showCar ? 1 : 1.02,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt=""
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </motion.div>

          {/* DARKNESS OVERLAY — this is what "blinks"
              High opacity = dark (headlights off)
              Low opacity = bright (headlights on)
              The car itself becomes brighter/darker */}
          <motion.div
            initial={{ opacity: 0.65 }}
            animate={startFlash ? darknessKeyframes : { opacity: 0.65 }}
            transition={startFlash ? { duration: 2.6, times, ease: 'easeInOut' } : { duration: 0 }}
            className="absolute inset-0 bg-[#030405] z-10"
          />

          {/* Gradient overlays — always on, for cinematic depth */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030405] via-transparent to-[#030405]/30 pointer-events-none" />

          {/* WARM GLOW — subtle warm tint when headlights "on"
              Simulates warm light bouncing off the ground and surroundings */}
          {startFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={glowKeyframes}
              transition={{ duration: 2.6, times, ease: 'easeInOut' }}
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(255,245,220,0.12) 0%, transparent 70%)',
              }}
            />
          )}

          {/* Brand watermark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showCar ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-5 left-5 md:bottom-10 md:left-10 lg:bottom-14 lg:left-14 z-30"
          >
            <span className="text-[10px] md:text-[11px] font-display font-normal tracking-[0.3em] text-text-primary/40 uppercase">
              Alicante <span className="text-gold/50">Luxe</span> Drive
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
