'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { MessageCircle, Phone } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-28 lg:py-36 bg-bg-primary relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <div className="relative overflow-hidden aspect-[3/4] md:aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1506616995931-556bc0c90c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSYW5nZSUyMFJvdmVyJTIwbHV4dXJ5JTIwU1VWfGVufDF8fHx8MTc3NDE3OTk2MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Range Rover на побережье Испании"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2"
          >
            <span className="text-[11px] font-body font-medium tracking-[0.15em] uppercase text-gold mb-6 block">
              Начните с консультации
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-light text-text-primary tracking-tight mb-5">
              Подберём автомобиль{' '}
              <span className="text-gold">под ваш запрос</span>
            </h2>

            <p className="text-[14px] font-body text-text-secondary font-light leading-relaxed mb-4 max-w-md">
              Напишите консьержу — поможем выбрать автомобиль, спланировать маршрут и организовать доставку. Ответ в течение 30 минут.
            </p>

            <p className="text-[13px] font-body text-text-tertiary font-light leading-relaxed mb-10 max-w-md">
              Работаем с частными клиентами, семьями и корпоративными заказчиками. Возможна долгосрочная аренда и трансфер из аэропорта.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/34123456789?text=Здравствуйте!%20Хочу%20узнать%20о%20аренде%20авто"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white text-[13px] font-body font-medium tracking-[0.06em] uppercase hover:bg-[#20BD5A] transition-colors"
              >
                <MessageCircle size={14} />
                Написать в WhatsApp
              </a>
              <a
                href="tel:+34123456789"
                className="flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-[13px] font-body font-medium tracking-[0.06em] uppercase text-text-secondary hover:text-text-primary hover:border-gold/40 transition-colors"
              >
                <Phone size={14} />
                Позвонить
              </a>
            </div>

            {/* Trust signals */}
            <div className="mt-10 flex items-center gap-6 text-[11px] font-body text-text-tertiary">
              <span>Ответ за 30 мин</span>
              <span className="w-px h-3 bg-border" />
              <span>Без обязательств</span>
              <span className="w-px h-3 bg-border" />
              <span>На русском языке</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
