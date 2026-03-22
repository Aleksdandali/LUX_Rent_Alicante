'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-svh flex flex-col justify-end overflow-hidden bg-bg-primary">
      {/* ═══ IMAGE ═══ */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Bugatti Chiron"
          fill
          sizes="100vw"
          className="object-contain md:object-cover object-center"
          priority
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-[#060709]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060709]/70 via-transparent to-transparent hidden md:block" />
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 w-full">
        <div className="max-w-[1320px] mx-auto px-5 md:px-6 lg:px-12 pb-8 md:pb-16 lg:pb-24">
          <div className="max-w-2xl">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 md:mb-6"
            >
              <span className="text-[10px] md:text-[11px] font-body font-medium tracking-[0.2em] uppercase text-gold">
                N.1 Luxury Car Rental in Alicante
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2rem] md:text-5xl lg:text-6xl font-display font-light text-text-primary leading-[1.15] tracking-[-0.01em]"
            >
              Премиальная аренда авто в{' '}
              <span className="text-gold">Аликанте</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-[14px] md:text-base lg:text-lg font-body font-light text-text-secondary mt-4 md:mt-5 leading-relaxed max-w-lg"
            >
              Bentley, Lamborghini Urus, Porsche 911, Range Rover, G-Class — с доставкой в аэропорт, отель или виллу.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#cars"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3 md:px-8 md:py-3.5 bg-gold text-bg-primary text-[12px] md:text-[13px] font-medium tracking-[0.06em] uppercase hover:bg-gold-light transition-colors duration-300"
              >
                Смотреть автопарк
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={14} />
              </a>
              <a
                href="https://wa.me/34123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-3 md:px-8 md:py-3.5 border border-border-hover text-text-primary text-[12px] md:text-[13px] font-medium tracking-[0.06em] uppercase hover:bg-bg-hover transition-colors duration-300"
              >
                <MessageCircle size={14} />
                Написать консьержу
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-10 md:mt-16 lg:mt-20 pt-6 md:pt-8 border-t border-border/40"
            >
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-x-10 gap-y-3">
                {[
                  { number: '500+', label: 'клиентов' },
                  { number: '25', label: 'авто' },
                  { number: '4.9', label: 'Google' },
                  { number: '24/7', label: 'поддержка' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-1.5">
                    <span className="text-lg md:text-xl font-display font-normal text-text-primary">
                      {stat.number}
                    </span>
                    <span className="text-[10px] md:text-[11px] font-body text-text-tertiary tracking-wide">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
