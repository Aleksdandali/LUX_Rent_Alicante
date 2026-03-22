'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const [flashCount, setFlashCount] = useState(0);

  // Progress counter 0 → 100
  useEffect(() => {
    if (phase !== 'loading') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Accelerate: slow start, fast middle, slow end
        if (prev < 30) return prev + 1;
        if (prev < 70) return prev + 2;
        if (prev < 90) return prev + 1;
        if (prev < 100) return prev + 0.5;
        return 100;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [phase]);

  // When progress hits 100 → start reveal phase (car flashes)
  useEffect(() => {
    if (progress >= 100 && phase === 'loading') {
      setTimeout(() => setPhase('reveal'), 300);
    }
  }, [progress, phase]);

  // 3 flashes then done
  useEffect(() => {
    if (phase !== 'reveal') return;

    const flashInterval = setInterval(() => {
      setFlashCount((prev) => {
        if (prev >= 6) {
          // 6 = 3 on + 3 off cycles
          clearInterval(flashInterval);
          setTimeout(() => setPhase('done'), 400);
          return prev;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(flashInterval);
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== 'done' ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#060709] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle radial glow behind car */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20"
            style={{
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.3), transparent 70%)',
            }}
          />

          {/* Car image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: phase === 'reveal' && flashCount % 2 === 1 ? 0.3 : 1,
              scale: 1,
            }}
            transition={{ duration: phase === 'reveal' ? 0.15 : 1, ease: 'easeOut' }}
            className="relative w-[80vw] max-w-[700px] aspect-[16/9] mb-12"
          >
            <Image
              src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
              alt="Luxury Car"
              fill
              className="object-contain"
              priority
              sizes="700px"
            />

            {/* Headlight flash effects */}
            {phase === 'reveal' && flashCount % 2 === 0 && flashCount < 6 && (
              <>
                <div
                  className="absolute top-[40%] left-[12%] w-24 h-12 blur-2xl animate-pulse"
                  style={{ background: 'radial-gradient(ellipse, rgba(255,255,240,0.9), transparent)' }}
                />
                <div
                  className="absolute top-[40%] right-[12%] w-24 h-12 blur-2xl animate-pulse"
                  style={{ background: 'radial-gradient(ellipse, rgba(255,255,240,0.9), transparent)' }}
                />
              </>
            )}
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-10"
          >
            <span className="text-sm md:text-base font-display font-medium tracking-[0.25em] text-text-primary uppercase">
              Alicante <span className="text-gold">Luxe</span> Drive
            </span>
          </motion.div>

          {/* Progress bar + percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-48 md:w-64"
          >
            {/* Percentage */}
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-xs tracking-[0.15em] uppercase text-text-tertiary">
                Loading
              </span>
              <span className="text-2xl font-display font-medium text-text-primary tabular-nums">
                {Math.floor(progress)}
                <span className="text-sm text-text-tertiary ml-0.5">%</span>
              </span>
            </div>

            {/* Bar */}
            <div className="h-[1px] bg-border-hover relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gold"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
