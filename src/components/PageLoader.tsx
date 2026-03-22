'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/*
 * ═══════════════════════════════════════════════════════
 * HEADLIGHT POSITION MATH
 * ═══════════════════════════════════════════════════════
 *
 * The Bugatti image (photo-1544636331-e26879cd4d9b) is 1920×1280 (3:2).
 * Headlight DRL positions measured on the original image:
 *   Left headlight:  x=34%, y=46%
 *   Right headlight: x=66%, y=46%
 *
 * With object-cover + object-position:center, the browser scales
 * the image to COVER the container, then centers it.
 *
 * We must calculate where those image coordinates end up on the
 * actual viewport, accounting for the crop.
 *
 * On desktop (landscape): image fills width, slight top/bottom crop
 *   → headlights at ~34% and ~66% horizontally (correct)
 *
 * On mobile (portrait): image fills height, heavy side crop
 *   → headlights pushed to very edges of screen
 *   → glow emanates from the edges inward (realistic)
 */

const IMG_W = 1920;
const IMG_H = 1280;
const IMG_ASPECT = IMG_W / IMG_H; // 1.5

// Headlight positions as fraction of original image
const HL_LEFT_X = 0.34;
const HL_RIGHT_X = 0.66;
const HL_Y = 0.46;

function calcHeadlightPos(vw: number, vh: number) {
  const viewAspect = vw / vh;
  let scale: number, offX: number, offY: number;

  if (viewAspect > IMG_ASPECT) {
    scale = vw / IMG_W;
    offX = 0;
    offY = (vh - IMG_H * scale) / 2;
  } else {
    scale = vh / IMG_H;
    offX = (vw - IMG_W * scale) / 2;
    offY = 0;
  }

  return {
    left: {
      x: HL_LEFT_X * IMG_W * scale + offX,
      y: HL_Y * IMG_H * scale + offY,
    },
    right: {
      x: HL_RIGHT_X * IMG_W * scale + offX,
      y: HL_Y * IMG_H * scale + offY,
    },
  };
}

const CSS = `
@keyframes hlBlink {
  0%   { opacity: 0 }
  10%  { opacity: 0.85 }
  20%  { opacity: 0.08 }
  30%  { opacity: 0 }
  40%  { opacity: 0.95 }
  50%  { opacity: 0.08 }
  60%  { opacity: 0 }
  70%  { opacity: 1 }
  82%  { opacity: 0.9 }
  100% { opacity: 0.7 }
}
@keyframes hlBlinkSoft {
  0%   { opacity: 0 }
  10%  { opacity: 0.4 }
  20%  { opacity: 0.03 }
  30%  { opacity: 0 }
  40%  { opacity: 0.5 }
  50%  { opacity: 0.03 }
  60%  { opacity: 0 }
  70%  { opacity: 0.6 }
  82%  { opacity: 0.45 }
  100% { opacity: 0.3 }
}
`;

export function PageLoader() {
  const [show, setShow] = useState(true);
  const [flash, setFlash] = useState(false);
  const [pos, setPos] = useState<ReturnType<typeof calcHeadlightPos> | null>(null);
  const didRun = useRef(false);

  const updatePos = useCallback(() => {
    setPos(calcHeadlightPos(window.innerWidth, window.innerHeight));
  }, []);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    if (typeof window !== 'undefined' && sessionStorage.getItem('ald')) {
      setShow(false);
      return;
    }

    updatePos();
    window.addEventListener('resize', updatePos);

    const t1 = setTimeout(() => setFlash(true), 800);
    const t2 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('ald', '1');
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updatePos);
    };
  }, [updatePos]);

  if (!show || !pos) return null;

  // Glow size scales with viewport
  const glowW = Math.max(80, window.innerWidth * 0.08);
  const glowH = glowW * 0.5;
  const spreadW = glowW * 3;
  const spreadH = glowH * 3;

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
          <style dangerouslySetInnerHTML={{ __html: CSS }} />

          {/* Car — fullscreen, edge to edge */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
            }}
          />

          {/* Darken car slightly so glow is visible */}
          <div className="absolute inset-0" style={{ background: 'rgba(2,2,3,0.5)' }} />

          {/* ═══ LEFT HEADLIGHT ═══ */}
          {flash && (
            <>
              {/* Core — bright, sharp */}
              <div
                style={{
                  position: 'absolute',
                  left: pos.left.x - glowW / 2,
                  top: pos.left.y - glowH / 2,
                  width: glowW,
                  height: glowH,
                  background: 'radial-gradient(ellipse, rgba(215,230,255,0.95) 0%, rgba(190,210,255,0.5) 40%, transparent 75%)',
                  filter: `blur(${Math.max(3, glowW * 0.04)}px)`,
                  animation: 'hlBlink 2.2s cubic-bezier(0.4,0,0.2,1) forwards',
                  willChange: 'opacity',
                  pointerEvents: 'none',
                }}
              />
              {/* Spread — soft, wide */}
              <div
                style={{
                  position: 'absolute',
                  left: pos.left.x - spreadW / 2,
                  top: pos.left.y - spreadH / 2,
                  width: spreadW,
                  height: spreadH,
                  background: 'radial-gradient(ellipse 60% 45%, rgba(200,218,255,0.22) 0%, transparent 70%)',
                  filter: `blur(${Math.max(15, glowW * 0.2)}px)`,
                  animation: 'hlBlinkSoft 2.2s cubic-bezier(0.4,0,0.2,1) forwards',
                  willChange: 'opacity',
                  pointerEvents: 'none',
                }}
              />
            </>
          )}

          {/* ═══ RIGHT HEADLIGHT ═══ */}
          {flash && (
            <>
              <div
                style={{
                  position: 'absolute',
                  left: pos.right.x - glowW / 2,
                  top: pos.right.y - glowH / 2,
                  width: glowW,
                  height: glowH,
                  background: 'radial-gradient(ellipse, rgba(215,230,255,0.95) 0%, rgba(190,210,255,0.5) 40%, transparent 75%)',
                  filter: `blur(${Math.max(3, glowW * 0.04)}px)`,
                  animation: 'hlBlink 2.2s cubic-bezier(0.4,0,0.2,1) forwards',
                  willChange: 'opacity',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: pos.right.x - spreadW / 2,
                  top: pos.right.y - spreadH / 2,
                  width: spreadW,
                  height: spreadH,
                  background: 'radial-gradient(ellipse 60% 45%, rgba(200,218,255,0.22) 0%, transparent 70%)',
                  filter: `blur(${Math.max(15, glowW * 0.2)}px)`,
                  animation: 'hlBlinkSoft 2.2s cubic-bezier(0.4,0,0.2,1) forwards',
                  willChange: 'opacity',
                  pointerEvents: 'none',
                }}
              />
            </>
          )}

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, rgba(2,2,3,0.45) 100%)' }}
          />

          {/* Brand */}
          <div
            className="absolute bottom-6 left-0 right-0 md:left-10 md:right-auto z-10 text-center md:text-left"
            style={{ animation: 'hlBlinkSoft 0.8s ease-out 1s both' }}
          >
            <span className="text-[10px] md:text-[11px] font-display font-normal tracking-[0.25em] uppercase" style={{ color: 'rgba(240,236,226,0.35)' }}>
              Alicante <span style={{ color: 'rgba(201,168,76,0.45)' }}>Luxe</span> Drive
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
