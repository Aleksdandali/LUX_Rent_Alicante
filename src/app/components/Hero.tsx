import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-bg-primary">
      {/* Background Image — cinematic car on coastal road */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/85 via-[#050608]/30 to-transparent z-10" />
        <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(circle at 50% 100%, rgba(5,6,8,0.8), transparent 60%)' }} />
        <img
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Премиальный автомобиль на побережье Средиземного моря"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content — positioned at bottom for cinematic feel */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-20 w-full pb-20 lg:pb-28">
        <div className="max-w-3xl">
          {/* Positioning label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-gold">
              N.1 Luxury Car Rental in Alicante
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-normal text-text-primary leading-[1.08] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            Премиальная аренда{' '}
            <br className="hidden md:block" />
            авто в{' '}
            <span className="text-gold italic">Аликанте</span>
          </motion.h1>

          {/* Subheading — professional, factual */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-text-secondary mt-8 max-w-2xl font-light leading-relaxed"
          >
            Bentley, Lamborghini Urus, Porsche 911, Range Rover, G-Class — с доставкой в аэропорт, отель или виллу. Персональный консьерж на связи 24/7.
          </motion.p>

          {/* Dual CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#cars"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold text-bg-primary font-medium text-[15px] tracking-wide hover:bg-gold-light transition-colors duration-300"
            >
              Смотреть автопарк
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform duration-300"
                size={16}
              />
            </a>
            <a
              href="https://wa.me/34123456789?text=Здравствуйте!%20Интересует%20аренда%20авто%20в%20Аликанте"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-border-hover text-text-primary text-[15px] tracking-wide hover:bg-bg-hover hover:border-gold-light/40 transition-colors duration-300"
            >
              <MessageCircle size={16} />
              Написать консьержу
            </a>
          </motion.div>

          {/* Stats row — integrated into hero bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
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
                  <span className="text-xl md:text-2xl font-display font-normal text-text-primary">
                    {stat.number}
                  </span>
                  <span className="text-xs text-text-tertiary tracking-wide">
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
