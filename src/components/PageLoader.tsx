'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export function PageLoader() {
  const [showCar, setShowCar] = useState(false);
  const [startFlash, setStartFlash] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Timeline: dark → car appears → 3 blinks → reveal
    const t1 = setTimeout(() => setShowCar(true), 300);
    const t2 = setTimeout(() => setStartFlash(true), 1200);
    // Total flash duration: ~2.4s, then hold 0.6s, then fade
    const t3 = setTimeout(() => setDone(true), 4200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // 3 blinks keyframe: each blink = fade in 120ms, hold 60ms, fade out 150ms, pause 300ms
  // Total per blink ~630ms × 3 = ~1890ms
  const blinkKeyframes = {
    opacity: [
      0,
      // Blink 1 — gentle
      0, 0.6, 0.8, 0.6, 0,
      // Pause
      0,
      // Blink 2 — stronger
      0, 0.85, 1, 0.85, 0,
      // Pause
      0,
      // Blink 3 — full power, hold longer
      0, 1, 1, 1, 0.7, 0,
    ],
  };

  const blinkTimes = [
    0,
    // Blink 1
    0.02, 0.08, 0.12, 0.18, 0.25,
    // Pause
    0.32,
    // Blink 2
    0.34, 0.40, 0.44, 0.50, 0.58,
    // Pause
    0.65,
    // Blink 3
    0.67, 0.72, 0.78, 0.84, 0.92, 1.0,
  ];

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="page-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#060709] overflow-hidden"
        >
          {/* Fullscreen car */}
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
            {/* Darken the car so flash is more visible */}
            <div className="absolute inset-0 bg-[#060709]/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-[#060709]/40" />
          </motion.div>

          {/* ═══ HEADLIGHT FLASH SYSTEM ═══ */}
          {startFlash && (
            <div className="absolute inset-0 z-20 pointer-events-none">

              {/* LEFT HEADLIGHT — positioned relative to center for mobile compat */}
              {/* Hot core — small, bright, sharp */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={blinkKeyframes}
                transition={{ duration: 2.4, times: blinkTimes, ease: 'easeOut' }}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(calc(-50% - min(18vw, 200px)), calc(-50% - 2vh))',
                  width: 'min(18vw, 160px)',
                  height: 'min(9vw, 80px)',
                  background: 'radial-gradient(ellipse 100% 70%, rgba(255,253,242,1) 0%, rgba(255,248,225,0.7) 35%, rgba(255,240,200,0.15) 70%, transparent 100%)',
                  filter: 'blur(3px)',
                }}
              />
              {/* Left — medium glow ring */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={blinkKeyframes}
                transition={{ duration: 2.4, times: blinkTimes, ease: 'easeOut' }}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(calc(-50% - min(18vw, 200px)), calc(-50% - 2vh))',
                  width: 'min(30vw, 300px)',
                  height: 'min(18vw, 180px)',
                  background: 'radial-gradient(ellipse 80% 60%, rgba(255,250,235,0.35) 0%, rgba(255,245,215,0.1) 50%, transparent 80%)',
                  filter: 'blur(15px)',
                }}
              />
              {/* Left — wide atmospheric haze */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: blinkKeyframes.opacity.map(v => v * 0.5),
                }}
                transition={{ duration: 2.4, times: blinkTimes, ease: 'easeOut' }}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(calc(-50% - min(15vw, 160px)), calc(-50% + 2vh))',
                  width: 'min(50vw, 500px)',
                  height: 'min(35vw, 350px)',
                  background: 'radial-gradient(ellipse 55% 40%, rgba(255,250,235,0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* RIGHT HEADLIGHT — mirror of left */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={blinkKeyframes}
                transition={{ duration: 2.4, times: blinkTimes, ease: 'easeOut' }}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(calc(-50% + min(18vw, 200px)), calc(-50% - 2vh))',
                  width: 'min(18vw, 160px)',
                  height: 'min(9vw, 80px)',
                  background: 'radial-gradient(ellipse 100% 70%, rgba(255,253,242,1) 0%, rgba(255,248,225,0.7) 35%, rgba(255,240,200,0.15) 70%, transparent 100%)',
                  filter: 'blur(3px)',
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={blinkKeyframes}
                transition={{ duration: 2.4, times: blinkTimes, ease: 'easeOut' }}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(calc(-50% + min(18vw, 200px)), calc(-50% - 2vh))',
                  width: 'min(30vw, 300px)',
                  height: 'min(18vw, 180px)',
                  background: 'radial-gradient(ellipse 80% 60%, rgba(255,250,235,0.35) 0%, rgba(255,245,215,0.1) 50%, transparent 80%)',
                  filter: 'blur(15px)',
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: blinkKeyframes.opacity.map(v => v * 0.5),
                }}
                transition={{ duration: 2.4, times: blinkTimes, ease: 'easeOut' }}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(calc(-50% + min(15vw, 160px)), calc(-50% + 2vh))',
                  width: 'min(50vw, 500px)',
                  height: 'min(35vw, 350px)',
                  background: 'radial-gradient(ellipse 55% 40%, rgba(255,250,235,0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* AMBIENT — screen-wide flash (very subtle) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: blinkKeyframes.opacity.map(v => v * 0.04),
                }}
                transition={{ duration: 2.4, times: blinkTimes, ease: 'easeOut' }}
                className="absolute inset-0 bg-white"
              />

              {/* GROUND REFLECTION — below car */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: blinkKeyframes.opacity.map(v => v * 0.7),
                }}
                transition={{ duration: 2.4, times: blinkTimes, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 right-0 h-[20vh]"
                style={{
                  background: 'linear-gradient(to top, rgba(255,250,235,0.07) 0%, rgba(255,248,225,0.02) 40%, transparent 100%)',
                }}
              />
            </div>
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
