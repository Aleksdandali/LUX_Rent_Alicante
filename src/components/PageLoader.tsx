'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/*
 * Premium loader: fullscreen car, 3 headlight blinks, site reveal.
 *
 * Strategy: the ENTIRE screen brightness pulses (darkness overlay).
 * No positioned glow elements that break on different viewports.
 * The car image is object-cover so it FILLS the screen edge-to-edge.
 * The "headlights" effect = the whole image gets brighter then darker,
 * like in a cinematic car commercial when headlights flash.
 */

export function PageLoader() {
  const [show, setShow] = useState(true);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    if (typeof window !== 'undefined' && sessionStorage.getItem('ald')) {
      setShow(false);
      return;
    }

    // Total: 3s dark intro + flash animation, then fade out
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('ald', '1');
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="ld"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999]"
          style={{ background: '#020203' }}
        >
          {/* Car — FULLSCREEN, edge to edge, no letterbox */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)`,
            }}
          />

          {/* Animated darkness overlay — this IS the flash effect */}
          <div
            className="absolute inset-0"
            style={{
              background: '#020203',
              animation: 'loaderFlash 3s cubic-bezier(0.4,0,0.2,1) 0.6s forwards',
              willChange: 'opacity',
            }}
          />

          {/* Vignette — cinematic edges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, rgba(2,2,3,0.5) 100%)
              `,
            }}
          />

          {/* Brand — bottom center on mobile, bottom left on desktop */}
          <div className="absolute bottom-6 left-0 right-0 md:left-10 md:right-auto z-10 text-center md:text-left">
            <span
              className="text-[10px] md:text-[11px] font-display font-normal tracking-[0.25em] uppercase"
              style={{
                color: 'rgba(240,236,226,0.35)',
                animation: 'loaderBrandIn 1s ease-out 0.8s both',
              }}
            >
              Alicante{' '}
              <span style={{ color: 'rgba(201,168,76,0.45)' }}>Luxe</span>{' '}
              Drive
            </span>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes loaderFlash {
              0%   { opacity: 0.72 }
              12%  { opacity: 0.72 }

              /* Flash 1 — gentle */
              17%  { opacity: 0.25 }
              22%  { opacity: 0.72 }

              /* Pause */
              30%  { opacity: 0.72 }

              /* Flash 2 — stronger */
              35%  { opacity: 0.15 }
              42%  { opacity: 0.72 }

              /* Pause */
              50%  { opacity: 0.72 }

              /* Flash 3 — full, hold, then settle */
              56%  { opacity: 0.08 }
              65%  { opacity: 0.06 }
              78%  { opacity: 0.10 }
              100% { opacity: 0.40 }
            }

            @keyframes loaderBrandIn {
              from { opacity: 0 }
              to   { opacity: 1 }
            }
          `}} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
