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
          {/* Car — fullscreen */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80)' }}
          />

          {/* Left headlight glow */}
          <div className="absolute top-[42%] left-[22%] md:top-[42%] md:left-[24%] w-20 h-10 md:w-32 md:h-16 pointer-events-none blur-xl md:blur-2xl bg-white/90 headlight-blink" />

          {/* Right headlight glow */}
          <div className="absolute top-[42%] right-[22%] md:top-[42%] md:right-[24%] w-20 h-10 md:w-32 md:h-16 pointer-events-none blur-xl md:blur-2xl bg-white/90 headlight-blink" />

          {/* Brand */}
          <div className="absolute bottom-6 inset-x-0 text-center z-10 opacity-0 animate-[fadeIn_0.5s_ease_1s_forwards]">
            <span className="text-[10px] md:text-[11px] font-display tracking-[0.25em] text-white/30 uppercase">
              Alicante <span className="text-gold/40">Luxe</span> Drive
            </span>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .headlight-blink {
              opacity: 0;
              border-radius: 50%;
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
