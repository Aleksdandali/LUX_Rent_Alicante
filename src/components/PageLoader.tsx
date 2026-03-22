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
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('ald', '1');
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }, 3400);
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] bg-black"
        >
          {/* Car — bg-contain shows full car on any screen */}
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80)',
              opacity: 0.55,
            }}
          />

          {/* Soften the black bars — blend edges into scene */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
          }} />

          {/* LEFT HEADLIGHT — 12% from left edge, 48% from top */}
          <div className="absolute top-[48%] left-[10%] md:left-[13%] w-12 h-6 md:w-24 md:h-12 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-md md:blur-xl bg-white/90 rounded-full headlight-blink" />

          {/* RIGHT HEADLIGHT — 12% from right edge, 48% from top */}
          <div className="absolute top-[48%] right-[10%] md:right-[13%] w-12 h-6 md:w-24 md:h-12 translate-x-1/2 -translate-y-1/2 pointer-events-none blur-md md:blur-xl bg-white/90 rounded-full headlight-blink" />

          {/* Brand */}
          <div className="absolute bottom-6 inset-x-0 text-center z-10 opacity-0 animate-[fadeIn_0.5s_ease_1s_forwards]">
            <span className="text-[10px] md:text-[11px] font-display tracking-[0.25em] text-white/25 uppercase">
              Alicante <span className="text-gold/35">Luxe</span> Drive
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
            @keyframes fadeIn { to { opacity: 1 } }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
