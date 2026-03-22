'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'flash' | 'done'>('loading');
  const [flashVisible, setFlashVisible] = useState(false);
  const [flashIndex, setFlashIndex] = useState(0);

  // Progress 0 → 100
  useEffect(() => {
    if (phase !== 'loading') return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        if (p < 20) return p + 0.8;
        if (p < 60) return p + 1.5;
        if (p < 85) return p + 1;
        if (p < 95) return p + 0.5;
        return p + 0.3;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [phase]);

  // When 100% → flash phase
  useEffect(() => {
    if (progress >= 100 && phase === 'loading') {
      setTimeout(() => setPhase('flash'), 400);
    }
  }, [progress, phase]);

  // 3 flashes
  useEffect(() => {
    if (phase !== 'flash') return;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count <= 6) {
        setFlashVisible(count % 2 === 1);
        setFlashIndex(Math.ceil(count / 2));
      } else {
        clearInterval(interval);
        setFlashVisible(false);
        setTimeout(() => setPhase('done'), 500);
      }
    }, 180);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== 'done' ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#060709]"
        >
          {/* Car — FULLSCREEN background */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: phase === 'flash' && !flashVisible ? 0.4 : 0.7, scale: 1 }}
            transition={{ duration: phase === 'flash' ? 0.12 : 1.5, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt="Luxury Car"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Dark overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/40 to-[#060709]/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#060709]/50 via-transparent to-[#060709]" />
          </motion.div>

          {/* Headlight flashes — full-width glow */}
          {phase === 'flash' && flashVisible && (
            <>
              <div
                className="absolute top-[35%] left-[20%] w-40 h-20 blur-3xl z-20"
                style={{ background: 'radial-gradient(ellipse, rgba(255,255,230,0.8), transparent)' }}
              />
              <div
                className="absolute top-[35%] right-[20%] w-40 h-20 blur-3xl z-20"
                style={{ background: 'radial-gradient(ellipse, rgba(255,255,230,0.8), transparent)' }}
              />
              {/* Screen flash */}
              <div className="absolute inset-0 bg-white/[0.03] z-10" />
            </>
          )}

          {/* Bottom content — brand + progress */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-8 md:p-16">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8"
            >
              <span className="text-xs md:text-sm font-display font-light tracking-[0.3em] text-text-primary/80 uppercase">
                Alicante <span className="text-gold">Luxe</span> Drive
              </span>
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {/* Bar */}
              <div className="w-full max-w-md h-[1px] bg-white/10 relative mb-4">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gold"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                />
              </div>

              {/* Number */}
              <div className="flex justify-between items-baseline max-w-md">
                <span className="text-[10px] tracking-[0.2em] uppercase text-text-tertiary font-body">
                  Loading experience
                </span>
                <span className="text-3xl md:text-4xl font-display font-light text-text-primary tabular-nums tracking-tight">
                  {Math.floor(progress)}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
