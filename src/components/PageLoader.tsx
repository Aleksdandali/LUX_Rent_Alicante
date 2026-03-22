'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function PageLoader() {
  const [show, setShow] = useState(true);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    if (sessionStorage.getItem('ald')) { setShow(false); return; }
    const t = setTimeout(() => { setShow(false); sessionStorage.setItem('ald', '1'); }, 3200);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-black"
        >
          {/* Car image:
              Mobile: bg-contain — shows full car, dark bars above/below blend with bg
              Desktop: bg-cover — fills entire screen */}
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat md:bg-cover opacity-60"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80)' }}
          />

          {/* Left headlight glow
              Mobile (contain): headlights at ~32% from left, ~48% from top
              Desktop (cover):  headlights at ~24% from left, ~42% from top */}
          <div className="absolute top-[48%] left-[30%] md:top-[42%] md:left-[24%] w-16 h-8 md:w-32 md:h-16 pointer-events-none blur-lg md:blur-2xl bg-white/90 rounded-full headlight-blink" />

          {/* Right headlight glow */}
          <div className="absolute top-[48%] right-[30%] md:top-[42%] md:right-[24%] w-16 h-8 md:w-32 md:h-16 pointer-events-none blur-lg md:blur-2xl bg-white/90 rounded-full headlight-blink" />

          {/* Brand */}
          <div className="absolute bottom-6 inset-x-0 text-center z-10 opacity-0 animate-[fadeIn_0.5s_ease_1s_forwards]">
            <span className="text-[10px] md:text-[11px] font-display tracking-[0.25em] text-white/30 uppercase">
              Alicante <span className="text-gold/40">Luxe</span> Drive
            </span>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .headlight-blink {
              opacity: 0;
              animation: blink 2s ease-in-out 0.8s forwards;
              will-change: opacity;
            }
            @keyframes blink {
              0%   { opacity: 0 }
              15%  { opacity: 1 }
              25%  { opacity: 0 }
              50%  { opacity: 0 }
              65%  { opacity: 1 }
              75%  { opacity: 0 }
              100% { opacity: 0 }
            }
            @keyframes fadeIn {
              to { opacity: 1 }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
