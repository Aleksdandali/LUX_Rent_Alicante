'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Check, MessageCircle } from 'lucide-react';

const steps = [
  { number: 1, label: 'Даты и место' },
  { number: 2, label: 'Опции' },
  { number: 3, label: 'Ваши данные' },
  { number: 4, label: 'Подтверждение' },
];

const pickupLocations = [
  'Аэропорт Аликанте (ALC)',
  'Центр Аликанте',
  'Бенидорм',
  'Доставка в отель/виллу',
];

const additionalOptions = [
  { id: 'insurance', label: 'Полная страховка (без франшизы)', price: 45, unit: '/день' },
  { id: 'driver', label: 'Дополнительный водитель', price: 15, unit: '/день' },
  { id: 'child-seat', label: 'Детское кресло', price: 10, unit: '/день' },
  { id: 'gps', label: 'GPS-навигатор', price: 8, unit: '/день' },
  { id: 'delivery', label: 'Доставка в аэропорт', price: 0, unit: '', free: true },
];

export function BookingProcess() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['delivery']);
  const [formData, setFormData] = useState({
    pickupDate: '',
    pickupTime: '10:00',
    returnDate: '',
    returnTime: '10:00',
    pickupLocation: pickupLocations[0],
    name: '',
    phone: '',
    email: '',
    license: '',
    contactMethod: 'whatsapp',
    terms: false,
  });

  const days = 3; // placeholder calculation
  const basePrice = 850;
  const optionsTotal = selectedOptions.reduce((sum, id) => {
    const opt = additionalOptions.find((o) => o.id === id);
    return sum + (opt ? opt.price * days : 0);
  }, 0);
  const total = basePrice * days + optionsTotal;

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  return (
    <section id="booking" className="py-32 lg:py-40 bg-bg-primary relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-[700px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2
            className="font-display font-normal text-text-primary tracking-tight"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
          >
            <span className="italic text-gold">Бронирование</span>
          </h2>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`text-xs tracking-wide transition-colors duration-300 ${
                    currentStep >= step.number
                      ? 'text-text-primary'
                      : 'text-text-tertiary'
                  }`}
                >
                  {step.label}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden sm:block w-12 lg:w-20 h-px bg-border mx-3" />
                )}
              </div>
            ))}
          </div>
          <div className="h-px bg-border relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gold"
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Steps content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Selected car placeholder */}
              <div className="flex items-center gap-4 p-4 bg-bg-elevated border border-border">
                <div className="w-20 h-14 bg-bg-surface flex items-center justify-center">
                  <span className="text-xs text-text-tertiary">Авто</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Lamborghini Urus</p>
                  <p className="text-xs text-text-tertiary">{'\u20AC'}850 / день</p>
                </div>
              </div>

              {/* Pickup */}
              <div>
                <label className="block text-xs text-text-tertiary tracking-wide uppercase mb-2">
                  Получение
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="bg-bg-elevated border border-border text-text-primary text-sm p-3 focus:border-gold/40 focus:outline-none transition-colors"
                  />
                  <input
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    className="bg-bg-elevated border border-border text-text-primary text-sm p-3 focus:border-gold/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Return */}
              <div>
                <label className="block text-xs text-text-tertiary tracking-wide uppercase mb-2">
                  Возврат
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    className="bg-bg-elevated border border-border text-text-primary text-sm p-3 focus:border-gold/40 focus:outline-none transition-colors"
                  />
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                    className="bg-bg-elevated border border-border text-text-primary text-sm p-3 focus:border-gold/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs text-text-tertiary tracking-wide uppercase mb-2">
                  Место получения
                </label>
                <select
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                  className="w-full bg-bg-elevated border border-border text-text-primary text-sm p-3 focus:border-gold/40 focus:outline-none transition-colors"
                >
                  {pickupLocations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Price summary */}
              <div className="h-px bg-border" />
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-text-secondary">{days} дня × {'\u20AC'}{basePrice}</span>
                <span className="text-xl font-display text-text-primary">{'\u20AC'}{total.toLocaleString()}</span>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <p className="text-xs text-text-tertiary tracking-wide uppercase mb-4">
                Дополнительные опции
              </p>
              {additionalOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={`w-full flex items-center justify-between p-4 border transition-colors duration-300 text-left ${
                    selectedOptions.includes(opt.id)
                      ? 'border-gold/40 bg-gold-subtle'
                      : 'border-border bg-bg-elevated hover:border-border-hover'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                        selectedOptions.includes(opt.id)
                          ? 'border-gold bg-gold'
                          : 'border-border'
                      }`}
                    >
                      {selectedOptions.includes(opt.id) && (
                        <Check size={12} className="text-bg-primary" />
                      )}
                    </div>
                    <span className="text-sm text-text-primary">{opt.label}</span>
                  </div>
                  <span className="text-sm text-text-secondary">
                    {opt.free ? 'Бесплатно' : `+\u20AC${opt.price}${opt.unit}`}
                  </span>
                </button>
              ))}

              <div className="h-px bg-border mt-6" />
              <div className="flex justify-between items-baseline pt-3">
                <span className="text-sm text-text-secondary">Итого</span>
                <div className="text-right">
                  <span className="text-xl font-display text-text-primary">{'\u20AC'}{total.toLocaleString()}</span>
                  <p className="text-xs text-text-tertiary mt-1">Депозит: {'\u20AC'}5,000</p>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <p className="text-xs text-text-tertiary tracking-wide uppercase mb-4">
                Данные водителя
              </p>

              {[
                { label: 'Имя и фамилия', key: 'name', type: 'text' },
                { label: 'Телефон (WhatsApp)', key: 'phone', type: 'tel' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Номер вод. удостоверения', key: 'license', type: 'text' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs text-text-tertiary tracking-wide mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={(formData as any)[field.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="w-full bg-bg-elevated border border-border text-text-primary text-sm p-3 focus:border-gold/40 focus:outline-none transition-colors"
                  />
                </div>
              ))}

              <div>
                <p className="text-xs text-text-tertiary tracking-wide mb-3">
                  Предпочтительная связь
                </p>
                <div className="flex gap-4">
                  {[
                    { key: 'whatsapp', label: 'WhatsApp' },
                    { key: 'email', label: 'Email' },
                  ].map((m) => (
                    <button
                      key={m.key}
                      onClick={() => setFormData({ ...formData, contactMethod: m.key })}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        formData.contactMethod === m.key
                          ? 'border-gold/40 text-text-primary bg-gold-subtle'
                          : 'border-border text-text-tertiary'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              <button
                onClick={() => setFormData({ ...formData, terms: !formData.terms })}
                className="flex items-start gap-3 text-left"
              >
                <div
                  className={`w-5 h-5 border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                    formData.terms ? 'border-gold bg-gold' : 'border-border'
                  }`}
                >
                  {formData.terms && <Check size={12} className="text-bg-primary" />}
                </div>
                <span className="text-xs text-text-tertiary leading-relaxed">
                  Принимаю условия аренды и политику конфиденциальности
                </span>
              </button>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-16 h-16 border border-gold mx-auto mb-8 flex items-center justify-center"
              >
                <Check size={28} className="text-gold" />
              </motion.div>

              <h3 className="text-2xl font-display font-normal text-text-primary mb-2">
                Бронирование подтверждено
              </h3>
              <p className="text-sm text-text-tertiary mb-8">
                Заявка #ALD-2026-0847
              </p>

              <div className="bg-bg-elevated border border-border p-6 text-left mb-8 space-y-2">
                <p className="text-sm text-text-primary font-medium">Lamborghini Urus</p>
                <p className="text-sm text-text-secondary">24 марта — 27 марта 2026</p>
                <p className="text-sm text-text-secondary">Получение: Аэропорт Аликанте, 10:00</p>
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Итого</span>
                  <span className="text-sm text-text-primary">{'\u20AC'}{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Депозит</span>
                  <span className="text-sm text-text-primary">{'\u20AC'}5,000</span>
                </div>
              </div>

              <p className="text-sm text-text-secondary mb-6">
                Ваш консьерж свяжется с вами в WhatsApp в течение 30 минут
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/34123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white text-sm font-medium"
                >
                  <MessageCircle size={16} />
                  Написать в WhatsApp
                </a>
                <a
                  href="#"
                  className="flex-1 py-3 border border-border text-sm text-text-secondary text-center hover:text-text-primary transition-colors"
                >
                  На главную
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-10">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={14} />
                Назад
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex items-center gap-2 px-8 py-3 bg-gold text-bg-primary text-sm font-medium hover:bg-gold-light transition-colors duration-300"
            >
              {currentStep === 3 ? 'Подтвердить' : 'Далее'}
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Additional info */}
        {currentStep === 1 && (
          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { title: 'Возраст от 25 лет', text: 'Права категории B' },
              { title: 'Гибкая отмена', text: 'Бесплатно за 48 часов' },
              { title: 'Страховка CDW', text: 'Включена в стоимость' },
            ].map((info) => (
              <div
                key={info.title}
                className="p-4 border border-border text-center"
              >
                <p className="text-xs font-medium text-text-primary mb-1">{info.title}</p>
                <p className="text-xs text-text-tertiary">{info.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
