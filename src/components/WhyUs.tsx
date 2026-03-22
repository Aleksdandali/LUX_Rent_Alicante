'use client';

import { motion } from 'motion/react';
import { Car, Shield, MessageCircle, MapPin, Clock, FileCheck } from 'lucide-react';

const benefits = [
  {
    icon: Car,
    title: 'Собственный автопарк',
    description: 'Все 25 автомобилей принадлежат нам — не субаренда и не посредники. Мы лично контролируем состояние каждой машины, от Bentley до G-Class.',
  },
  {
    icon: Shield,
    title: 'Полная прозрачность условий',
    description: 'Фиксированная стоимость, депозит, страховка, лимит пробега — вы знаете всё до подписания договора. Без скрытых платежей.',
  },
  {
    icon: MessageCircle,
    title: 'Персональный консьерж',
    description: 'Выделенный менеджер в WhatsApp на русском, английском и испанском. На связи 24/7, включая праздники и выходные.',
  },
  {
    icon: MapPin,
    title: 'Доставка в любую точку',
    description: 'Аэропорт ALC, ваш отель, вилла или яхт-клуб. Бесплатная подача по Аликанте и всей Коста-Бланка.',
  },
  {
    icon: FileCheck,
    title: 'Договор за 5 минут',
    description: 'Никаких офисов и очередей. Документы подписываются на месте при получении автомобиля. Всё просто и быстро.',
  },
  {
    icon: Clock,
    title: 'Гибкие сроки аренды',
    description: 'От 1 дня до нескольких месяцев. Специальные условия для долгосрочной аренды и корпоративных клиентов.',
  },
];

export function WhyUs() {
  return (
    <section id="about" className="py-32 lg:py-40 bg-bg-primary relative">
      {/* Divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2
            className="font-display font-medium text-text-primary tracking-tight"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
          >
            Почему клиенты{' '}
            <span className="italic text-gold">выбирают нас</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl font-light">
            Собственный автопарк, собственная команда, прямые условия. С 2020 года мы специализируемся исключительно на аренде премиальных автомобилей в Аликанте.
          </p>
        </motion.div>

        {/* Benefits — clean grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 lg:p-10 border-border ${
                  index % 3 !== 0 ? 'lg:border-l' : ''
                } ${index >= 3 ? 'lg:border-t' : ''} ${
                  index % 2 !== 0 ? 'md:border-l lg:border-l-0' : ''
                } ${index >= 2 ? 'md:border-t lg:border-t-0' : ''} ${
                  index % 3 !== 0 ? 'lg:border-l' : ''
                }`}
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-gold mb-6"
                />
                <h3 className="text-base font-body font-medium text-text-primary mb-3 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
