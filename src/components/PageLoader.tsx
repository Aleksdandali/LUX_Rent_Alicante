'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

type Phase = 'dark' | 'car' | 'flash1' | 'pause1' | 'flash2' | 'pause2' | 'flash3' | 'hold' | 'done';

export function PageLoader() {
  const [phase, setPhase] = useState<Phase>('dark');

  useEffect(() => {
    const sequence: { next: Phase; delay: number }[] = [
      { next: 'car', delay: 400 },
      { next: 'flash1', delay: 900 },
      { next: 'pause1', delay: 160 },
      { next: 'flash2', delay: 400 },
      { next: 'pause2', delay: 160 },
      { next: 'flash3', delay: 350 },
      { next: 'hold', delay: 220 },
      { next: 'done', delay: 800 },
    ];

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (i >= sequence.length) return;
      timer = setTimeout(() => {
        setPhase(sequence[i].next);
        i++;
        step();
      }, sequence[i].delay);
    };

    step();
    return () => clearTimeout(timer);
  }, []);

  const isFlash = phase === 'flash1' || phase === 'flash2' || phase === 'flash3';
  const showCar = phase !== 'dark';

  return (
    <AnimatePresence>
      {phase !== 'done' ? (
        <motion.div
          key="page-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#060709] overflow-hidden"
        >
          {/* Fullscreen car background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showCar ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
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
            <div className="absolute inset-0 bg-[#060709]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-[#060709]/30" />
          </motion.div>

          {/* Headlight flash — realistic multi-layer glow */}
          <AnimatePresence>
            {isFlash && (
              <motion.div
                key={phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.07 }}
                className="absolute inset-0 z-20 pointer-events-none"
              >
                {/* Left — hot core */}
                <div
                  className="absolute"
                  style={{
                    top: '36%', left: '15%',
                    width: 'clamp(120px, 20vw, 280px)',
                    height: 'clamp(60px, 10vw, 140px)',
                    background: 'radial-gradient(ellipse, rgba(255,253,240,0.95) 0%, rgba(255,248,220,0.5) 40%, transparent 80%)',
                    filter: 'blur(6px)',
                  }}
                />
                {/* Left — diffuse spread */}
                <div
                  className="absolute"
                  style={{
                    top: '22%', left: '2%',
                    width: 'clamp(250px, 40vw, 600px)',
                    height: 'clamp(150px, 25vw, 350px)',
                    background: 'radial-gradient(ellipse 60% 45%, rgba(255,250,230,0.2) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                  }}
                />

                {/* Right — hot core */}
                <div
                  className="absolute"
                  style={{
                    top: '36%', right: '15%',
                    width: 'clamp(120px, 20vw, 280px)',
                    height: 'clamp(60px, 10vw, 140px)',
                    background: 'radial-gradient(ellipse, rgba(255,253,240,0.95) 0%, rgba(255,248,220,0.5) 40%, transparent 80%)',
                    filter: 'blur(6px)',
                  }}
                />
                {/* Right — diffuse spread */}
                <div
                  className="absolute"
                  style={{
                    top: '22%', right: '2%',
                    width: 'clamp(250px, 40vw, 600px)',
                    height: 'clamp(150px, 25vw, 350px)',
                    background: 'radial-gradient(ellipse 60% 45%, rgba(255,250,230,0.2) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                  }}
                />

                {/* Screen ambient */}
                <div className="absolute inset-0 bg-white/[0.035]" />

                {/* Road reflection */}
                <div
                  className="absolute bottom-0 left-[10%] right-[10%] h-[25%]"
                  style={{
                    background: 'linear-gradient(to top, rgba(255,250,235,0.06) 0%, transparent 100%)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Brand watermark — bottom left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showCar ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-5 left-5 md:bottom-10 md:left-10 lg:bottom-14 lg:left-14 z-30"
          >
            <span className="text-[10px] md:text-[11px] font-display font-normal tracking-[0.3em] text-text-primary/50 uppercase">
              Alicante <span className="text-gold/60">Luxe</span> Drive
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
