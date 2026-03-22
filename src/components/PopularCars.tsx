'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const carData = [
  {
    id: 1,
    name: 'Lamborghini Urus',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1570829194611-71a926d70ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYW1ib3JnaGluaSUyMFVydXMlMjBsdXh1cnklMjBTVVZ8ZW58MXx8fHwxNzc0MTc5OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Luxury SUV',
    specs: '650 л.с. · 0-100: 3.6s · 5 мест',
    interior: 'Кожа Nappa, панорамная крыша',
    pricePerDay: 850,
    deposit: 5000,
  },
  {
    id: 2,
    name: 'Bentley Continental GT',
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1629820402094-3c745c386950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZW50bGV5JTIwQ29udGluZW50YWwlMjBHVCUyMGx1eHVyeXxlbnwxfHx8fDE3NzQxNzk5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Grand Tourer',
    specs: '635 л.с. · 0-100: 3.7s · 4 места',
    interior: 'Кожа премиум, панорама',
    pricePerDay: 900,
    deposit: 6000,
  },
  {
    id: 3,
    name: 'Porsche Cayenne',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1644926402747-e3310f0fbf8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb3JzY2hlJTIwQ2F5ZW5uZSUyMGJsYWNrfGVufDF8fHx8MTc3NDE3OTk2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Luxury SUV',
    specs: '550 л.с. · 0-100: 3.9s · 5 мест',
    interior: 'Кожа, панорамная крыша',
    pricePerDay: 650,
    deposit: 4000,
  },
  {
    id: 4,
    name: 'Porsche 911',
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1742414955049-d332bc45b51a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb3JzY2hlJTIwOTExJTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc3NDE3OTk2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Sport',
    specs: '580 л.с. · 0-100: 3.0s · 2 места',
    interior: 'Спортивная кожа',
    pricePerDay: 750,
    deposit: 5000,
  },
  {
    id: 5,
    name: 'Range Rover',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1506616995931-556bc0c90c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSYW5nZSUyMFJvdmVyJTIwbHV4dXJ5JTIwU1VWfGVufDF8fHx8MTc3NDE3OTk2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Business',
    specs: '525 л.с. · 0-100: 4.3s · 5 мест',
    interior: 'Кожа Windsor, панорама',
    pricePerDay: 700,
    deposit: 4500,
  },
  {
    id: 6,
    name: 'Mercedes G-Class',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1554049019-cf34d12c7967?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXJjZWRlcyUyMEctQ2xhc3MlMjBsdXh1cnl8ZW58MXx8fHwxNzc0MTc5OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Luxury SUV',
    specs: '585 л.с. · 0-100: 4.5s · 5 мест',
    interior: 'Designo кожа, панорама',
    pricePerDay: 800,
    deposit: 5000,
  },
];

const filters = ['Все', 'SUV', 'Sport'];

export function PopularCars() {
  const [activeFilter, setActiveFilter] = useState('Все');

  const filteredCars =
    activeFilter === 'Все'
      ? carData
      : carData.filter((car) => car.category === activeFilter);

  return (
    <section id="cars" className="py-32 lg:py-40 bg-bg-primary relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
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
            <span className="italic text-gold">Автопарк</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl font-light">
            Собственный автопарк из 25 премиальных автомобилей. Каждый проходит предрейсовую подготовку перед выдачей.
          </p>
        </motion.div>

        {/* Filters — underline tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-8 mb-12 border-b border-border"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`pb-3 text-sm tracking-wide transition-colors duration-300 relative ${
                activeFilter === filter
                  ? 'text-text-primary'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                  transition={{ type: 'tween', duration: 0.3 }}
                />
              )}
            </button>
          ))}
          <span className="ml-auto pb-3 text-xs text-text-tertiary tracking-wide self-end">
            {filteredCars.length} автомобилей
          </span>
        </motion.div>

        {/* Cars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group bg-bg-elevated border border-border hover:border-gold/40 transition-colors duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated/80 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-bg-primary/80 backdrop-blur-sm text-xs tracking-[0.08em] uppercase text-text-secondary border border-border">
                    {car.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="text-xl font-body font-medium text-text-primary mb-3">
                  {car.name}
                </h3>

                {/* Specs — single line */}
                <p className="text-sm text-text-tertiary mb-1">{car.specs}</p>
                <p className="text-sm text-text-tertiary">{car.interior}</p>

                {/* Divider */}
                <div className="h-px bg-border my-5" />

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-display font-normal text-text-primary">
                      {'\u20AC'}{car.pricePerDay}
                    </span>
                    <span className="text-sm text-text-tertiary">/ день</span>
                  </div>
                  <p className="text-xs text-text-tertiary mt-1">
                    Депозит {'\u20AC'}{car.deposit.toLocaleString()}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 border border-border text-sm text-text-secondary hover:border-gold/40 hover:text-text-primary transition-colors duration-300">
                    Подробнее
                  </button>
                  <button className="flex-1 py-3 bg-gold text-bg-primary text-sm font-medium hover:bg-gold-light transition-colors duration-300 flex items-center justify-center gap-2">
                    Забронировать
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
