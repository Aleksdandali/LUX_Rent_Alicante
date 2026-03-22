import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Phone, Mail } from 'lucide-react';

const faqs = [
  {
    question: 'Какие документы нужны для аренды?',
    answer: 'Действительные водительские права категории B (стаж от 2 лет), паспорт или ID-карта, кредитная карта для блокировки депозита. Минимальный возраст — 25 лет.',
  },
  {
    question: 'Что входит в стоимость аренды?',
    answer: 'Базовая страховка CDW (Collision Damage Waiver), НДС (IVA 21%), лимит 200 км в день. Полная страховка без франшизы, доп. водитель и другие опции — за дополнительную плату.',
  },
  {
    question: 'Какой размер депозита?',
    answer: 'От \u20AC4,000 до \u20AC6,000 в зависимости от класса автомобиля. Депозит блокируется на кредитной карте и возвращается в течение 7-14 дней после возврата авто без повреждений.',
  },
  {
    question: 'Принимаете ли дебетовые карты?',
    answer: 'Нет, для блокировки депозита принимаются только кредитные карты Visa, Mastercard или American Express. Это стандартное требование для аренды премиальных автомобилей.',
  },
  {
    question: 'Как происходит получение и возврат?',
    answer: 'Мы доставляем автомобиль в аэропорт Аликанте, ваш отель или виллу. Документы подписываются на месте — без офисов и очередей. Возврат в любую удобную точку.',
  },
  {
    question: 'Можно ли выехать за пределы Испании?',
    answer: 'Выезд за пределы Испании возможен по предварительному согласованию и при оформлении расширенной страховки. Свяжитесь с нами для уточнения условий.',
  },
  {
    question: 'Что происходит при ДТП или повреждении?',
    answer: 'Свяжитесь с нашим консьержем 24/7 — мы организуем эвакуацию и замену авто. С базовой страховкой CDW ваша ответственность ограничена размером франшизы. С полной страховкой — \u20AC0.',
  },
  {
    question: 'Можно ли отменить бронирование?',
    answer: 'Бесплатная отмена за 48 часов до начала аренды. При отмене менее чем за 48 часов — штраф 50% от стоимости первого дня.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 lg:py-40 bg-bg-surface relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="font-display font-normal text-text-primary tracking-tight"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
          >
            Частые <span className="italic text-gold">вопросы</span>
          </h2>
        </motion.div>

        {/* FAQ Items — clean accordion with line dividers */}
        <div>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border-b border-border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className="text-[15px] text-text-primary group-hover:text-gold transition-colors duration-300 pr-8">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-text-tertiary">
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-sm text-text-secondary font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 border border-border"
        >
          <h3 className="text-lg font-display font-normal text-text-primary mb-2">
            Не нашли ответ?
          </h3>
          <p className="text-sm text-text-secondary mb-6">
            Свяжитесь с нами — ответим в течение 30 минут
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+34123456789"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gold text-bg-primary text-sm font-medium hover:bg-gold-light transition-colors"
            >
              <Phone size={14} />
              Позвонить
            </a>
            <a
              href="mailto:info@alicanteluxedrive.com"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-sm text-text-secondary hover:text-text-primary hover:border-gold/40 transition-colors"
            >
              <Mail size={14} />
              Написать email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
