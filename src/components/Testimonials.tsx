'use client';

import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    initials: 'АП',
    name: 'Александр П.',
    location: 'Москва',
    car: 'Lamborghini Urus',
    date: 'Февраль 2026',
    text: 'Всё было организовано чётко — от бронирования до возврата. Машина в идеальном состоянии, менеджер на связи в WhatsApp. Арендую здесь уже второй раз.',
    rating: 5,
    source: 'Google Reviews',
  },
  {
    id: 2,
    initials: 'МС',
    name: 'Мария С.',
    location: 'Санкт-Петербург',
    car: 'Porsche 911',
    date: 'Январь 2026',
    text: 'Взяла 911 для поездки по побережью. Машина в идеальном состоянии, прозрачные условия, поддержка реально работает 24/7. Путешествие получилось незабываемым.',
    rating: 5,
    source: 'Google Reviews',
  },
  {
    id: 3,
    initials: 'JS',
    name: 'John S.',
    location: 'London',
    car: 'Bentley Continental GT',
    date: 'Декабрь 2025',
    text: 'Best luxury car rental in Alicante. Bentley was perfect for my business trip. Professional service, transparent pricing, no hidden fees. Will definitely use again.',
    rating: 5,
    source: 'Trustpilot',
  },
];

export function Testimonials() {
  return (
    <section className="py-32 lg:py-40 bg-bg-surface relative">
      {/* Divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <h2
              className="font-display font-normal text-text-primary tracking-tight"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
            >
              <span className="italic text-gold">Отзывы</span>
            </h2>
            <p className="text-text-secondary mt-4 font-light">
              4.9 из 5 на Google Reviews (127 отзывов)
            </p>
          </div>
        </motion.div>

        {/* Testimonials Grid — all visible */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-elevated border border-border p-8 lg:p-10 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-text-secondary font-light leading-relaxed mb-8 flex-1 text-[15px]">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Divider */}
              <div className="h-px bg-border mb-6" />

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar with initials */}
                <div className="w-10 h-10 bg-bg-surface border border-border flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-gold tracking-wide">
                    {testimonial.initials}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-text-tertiary">
                    {testimonial.location} · {testimonial.car}, {testimonial.date}
                  </div>
                </div>
              </div>

              {/* Source */}
              <div className="mt-4 text-xs text-text-tertiary">
                Verified on {testimonial.source}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
