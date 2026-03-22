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
    <section id="about" className="py-28 lg:py-36 bg-bg-primary relative">
      {/* Divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-light text-text-primary tracking-tight">
            Почему клиенты{' '}
            <span className="text-gold">выбирают нас</span>
          </h2>
          <p className="text-text-secondary mt-5 max-w-2xl font-light">
            Собственный автопарк, собственная команда, прямые условия. С 2020 года мы специализируемся исключительно на аренде премиальных автомобилей в Аликанте.
          </p>
        </motion.div>

        {/* Benefits — clean grid with top border */}
        <div className="border-t border-border">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="p-8 lg:p-10"
                >
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className="text-gold mb-6"
                  />
                  <h3 className="text-[15px] font-body font-medium text-text-primary mb-3 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-[13px] font-body font-light text-text-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
