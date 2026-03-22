'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

/*
 * PageLoader — cinematic intro with headlight flash.
 *
 * Uses object-contain (NOT object-cover) so the car image
 * keeps its proportions on ALL screen sizes. This means
 * headlight glow positions in % are always accurate.
 *
 * On mobile: car sits centered with dark bars above/below
 * (cinematic letterbox effect).
 *
 * Headlight positions measured on the original image:
 * Left headlight:  x≈22%, y≈47% of image
 * Right headlight: x≈78%, y≈47% of image
 */

const CSS = `
@keyframes headlightBlink {
  0%   { opacity: 0 }
  10%  { opacity: 0.8 }
  18%  { opacity: 0.1 }
  28%  { opacity: 0 }
  38%  { opacity: 0.9 }
  46%  { opacity: 0.1 }
  56%  { opacity: 0 }
  66%  { opacity: 1 }
  80%  { opacity: 0.85 }
  100% { opacity: 0.7 }
}
`;

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [carLoaded, setCarLoaded] = useState(false);
  const [startFlash, setStartFlash] = useState(false);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    // Skip if already played this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('ald-played')) {
      setVisible(false);
      return;
    }
  }, []);

  useEffect(() => {
    if (!carLoaded || !visible) return;
    const t1 = setTimeout(() => setStartFlash(true), 600);
    const t2 = setTimeout(() => {
      setVisible(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ald-played', '1');
      }
    }, 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [carLoaded, visible]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#030405]"
        >
          <style dangerouslySetInnerHTML={{ __html: CSS }} />

          {/* Car image — object-contain keeps proportions on all screens */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-h-[70vh] md:max-h-[80vh]">
              <Image
                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
                alt=""
                fill
                className="object-contain"
                priority
                sizes="100vw"
                onLoad={() => setCarLoaded(true)}
              />

              {/* ═══ HEADLIGHT GLOWS — positioned over actual headlights ═══ */}
              {startFlash && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Left headlight — hot core */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '43%', left: '18%',
                      width: '10%', height: '6%',
                      background: 'radial-gradient(ellipse, rgba(210,225,255,0.95) 0%, rgba(190,210,255,0.5) 40%, transparent 75%)',
                      filter: 'blur(4px)',
                      animation: 'headlightBlink 2s cubic-bezier(0.4,0,0.2,1) forwards',
                      willChange: 'opacity',
                    }}
                  />
                  {/* Left headlight — spread */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '35%', left: '8%',
                      width: '25%', height: '18%',
                      background: 'radial-gradient(ellipse 65% 50%, rgba(200,218,255,0.2) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                      animation: 'headlightBlink 2s cubic-bezier(0.4,0,0.2,1) forwards',
                      animationDelay: '0.02s',
                      willChange: 'opacity',
                    }}
                  />

                  {/* Right headlight — hot core */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '43%', right: '18%',
                      width: '10%', height: '6%',
                      background: 'radial-gradient(ellipse, rgba(210,225,255,0.95) 0%, rgba(190,210,255,0.5) 40%, transparent 75%)',
                      filter: 'blur(4px)',
                      animation: 'headlightBlink 2s cubic-bezier(0.4,0,0.2,1) forwards',
                      willChange: 'opacity',
                    }}
                  />
                  {/* Right headlight — spread */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '35%', right: '8%',
                      width: '25%', height: '18%',
                      background: 'radial-gradient(ellipse 65% 50%, rgba(200,218,255,0.2) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                      animation: 'headlightBlink 2s cubic-bezier(0.4,0,0.2,1) forwards',
                      animationDelay: '0.02s',
                      willChange: 'opacity',
                    }}
                  />

                  {/* Ground reflection */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10%', left: '20%', right: '20%',
                      height: '12%',
                      background: 'linear-gradient(to top, rgba(200,218,255,0.06), transparent)',
                      animation: 'headlightBlink 2s cubic-bezier(0.4,0,0.2,1) forwards',
                      animationDelay: '0.04s',
                      willChange: 'opacity',
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 70%, transparent 40%, rgba(3,4,5,0.6) 100%)' }}
          />

          {/* Brand — bottom left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: carLoaded ? 0.5 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10"
          >
            <span className="text-[10px] md:text-[11px] font-display font-normal tracking-[0.25em] text-text-primary uppercase">
              Alicante <span className="text-gold">Luxe</span> Drive
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
