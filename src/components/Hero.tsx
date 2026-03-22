'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';

/*
 * Headlight positions on the Bugatti Chiron image (photo-1544636331-e26879cd4d9b)
 * measured as % of the ORIGINAL image dimensions.
 *
 * The image is ~1920×1280 (3:2 landscape).
 * Left headlight center:  x≈23%, y≈47%
 * Right headlight center: x≈77%, y≈47%
 *
 * With object-cover on different viewports:
 * - Desktop 16:9:  image fills width, cropped ~10% top/bottom → headlights visible
 * - Mobile 9:16:   image fills height, cropped ~40% each side → headlights may be at edges
 *
 * Solution: position glow relative to a wrapper that matches the image's
 * rendered area using object-position tracking. Since we can't do that in CSS,
 * we use generous glow sizes (heavy blur) so ±10% misalignment is invisible.
 */

const HEADLIGHT_GLOW_CSS = `
@keyframes headlightFlash {
  0%   { opacity: 0; }
  8%   { opacity: 0.7; }
  15%  { opacity: 0.15; }
  25%  { opacity: 0; }
  35%  { opacity: 0.85; }
  42%  { opacity: 0.15; }
  52%  { opacity: 0; }
  62%  { opacity: 1; }
  75%  { opacity: 0.9; }
  100% { opacity: 0.65; }
}
`;

export function Hero() {
  const [played, setPlayed] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const didRun = useRef(false);

  useEffect(() => {
    // Only play once per session
    if (didRun.current) return;
    didRun.current = true;

    if (typeof window !== 'undefined' && sessionStorage.getItem('ald-intro-played')) {
      setPlayed(true);
      setShowContent(true);
      return;
    }

    // Start flash after image loads
    const timer1 = setTimeout(() => setPlayed(true), 400);
    // Show content after flashes settle
    const timer2 = setTimeout(() => {
      setShowContent(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ald-intro-played', '1');
      }
    }, 2800);

    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-bg-primary">
      {/* Inject keyframe animation */}
      <style dangerouslySetInnerHTML={{ __html: HEADLIGHT_GLOW_CSS }} />

      {/* ═══ IMAGE LAYER ═══ */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Bugatti Chiron"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* ═══ DARKNESS LAYER — dims the car, lightens during flash ═══ */}
      <motion.div
        initial={{ opacity: 0.7 }}
        animate={{ opacity: played ? 0.45 : 0.7 }}
        transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[#030405] z-[1]"
      />

      {/* ═══ HEADLIGHT GLOW LAYER ═══
          Two elliptical glows positioned over headlight areas.
          Uses CSS @keyframes (not JS) for smooth 60fps on mobile.
          will-change: opacity for GPU compositing (no repaints). */}
      {played && (
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {/* Left headlight — core glow */}
          <div
            className="absolute"
            style={{
              top: '42%',
              left: '16%',
              width: '14%',
              height: '8%',
              background: 'radial-gradient(ellipse 100% 100%, rgba(220,230,255,0.9) 0%, rgba(200,215,255,0.4) 40%, transparent 75%)',
              filter: 'blur(8px)',
              animation: 'headlightFlash 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              willChange: 'opacity',
            }}
          />
          {/* Left headlight — atmospheric spread */}
          <div
            className="absolute"
            style={{
              top: '32%',
              left: '5%',
              width: '30%',
              height: '22%',
              background: 'radial-gradient(ellipse 70% 55%, rgba(220,230,255,0.2) 0%, transparent 70%)',
              filter: 'blur(30px)',
              animation: 'headlightFlash 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              animationDelay: '0.03s',
              willChange: 'opacity',
            }}
          />

          {/* Right headlight — core glow */}
          <div
            className="absolute"
            style={{
              top: '42%',
              right: '16%',
              width: '14%',
              height: '8%',
              background: 'radial-gradient(ellipse 100% 100%, rgba(220,230,255,0.9) 0%, rgba(200,215,255,0.4) 40%, transparent 75%)',
              filter: 'blur(8px)',
              animation: 'headlightFlash 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              willChange: 'opacity',
            }}
          />
          {/* Right headlight — atmospheric spread */}
          <div
            className="absolute"
            style={{
              top: '32%',
              right: '5%',
              width: '30%',
              height: '22%',
              background: 'radial-gradient(ellipse 70% 55%, rgba(220,230,255,0.2) 0%, transparent 70%)',
              filter: 'blur(30px)',
              animation: 'headlightFlash 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              animationDelay: '0.03s',
              willChange: 'opacity',
            }}
          />

          {/* Ground bounce — light reflecting off surface below car */}
          <div
            className="absolute bottom-0 left-[15%] right-[15%]"
            style={{
              height: '15%',
              background: 'linear-gradient(to top, rgba(200,215,255,0.06), transparent)',
              animation: 'headlightFlash 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              animationDelay: '0.06s',
              willChange: 'opacity',
            }}
          />
        </div>
      )}

      {/* ═══ CINEMATIC GRADIENTS ═══ */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-[#060709]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060709]/80 via-[#060709]/20 to-transparent" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 100%, rgba(6,7,9,0.7), transparent 55%)' }}
        />
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-20 w-full pb-16 lg:pb-24">
        <div className="max-w-3xl">
          {/* Positioning label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <span className="text-[11px] font-body font-medium tracking-[0.2em] uppercase text-gold">
              N.1 Luxury Car Rental in Alicante
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light text-text-primary leading-[1.1] tracking-[-0.01em]"
          >
            Премиальная аренда{' '}
            <br className="hidden md:block" />
            авто в{' '}
            <span className="text-gold">Аликанте</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 15 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg font-body font-light text-text-secondary mt-5 max-w-2xl leading-relaxed"
          >
            Bentley, Lamborghini Urus, Porsche 911, Range Rover, G-Class — с доставкой в аэропорт, отель или виллу. Персональный консьерж на связи 24/7.
          </motion.p>

          {/* Dual CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 15 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#cars"
              className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gold text-bg-primary text-[13px] font-medium tracking-[0.06em] uppercase hover:bg-gold-light transition-colors duration-300"
            >
              Смотреть автопарк
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={14} />
            </a>
            <a
              href="https://wa.me/34123456789?text=Здравствуйте!%20Интересует%20аренда%20авто%20в%20Аликанте"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-border-hover text-text-primary text-[13px] font-medium tracking-[0.06em] uppercase hover:bg-bg-hover hover:border-gold-light/40 transition-colors duration-300"
            >
              <MessageCircle size={14} />
              Написать консьержу
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-16 lg:mt-24 pt-8 border-t border-border/50"
          >
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              {[
                { number: '500+', label: 'довольных клиентов' },
                { number: '25', label: 'премиальных авто' },
                { number: '4.9', label: 'рейтинг Google' },
                { number: '24/7', label: 'поддержка' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <span className="text-lg md:text-xl font-display font-normal text-text-primary">
                    {stat.number}
                  </span>
                  <span className="text-[11px] font-body text-text-tertiary tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
