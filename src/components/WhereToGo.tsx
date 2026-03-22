'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Гуадалест',
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    time: '45 мин',
    bestCar: 'SUV',
    description: 'Средневековый город в горах с потрясающими видами на побережье и горные озёра',
    region: 'costa-blanca',
  },
  {
    id: 2,
    name: 'Бенидорм',
    image: 'https://images.unsplash.com/photo-1655405927893-96a5b68490c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZW5pZG9ybSUyMFNwYWluJTIwYmVhY2glMjByZXNvcnR8ZW58MXx8fHwxNzc0MTc5OTYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    time: '30 мин',
    bestCar: 'Cabrio',
    description: 'Знаменитый курорт с золотыми пляжами и панорамной набережной вдоль моря',
    region: 'costa-blanca',
  },
  {
    id: 3,
    name: 'Альтеа',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    time: '50 мин',
    bestCar: 'Sport',
    description: 'Белоснежный городок художников с видом на Средиземное море и уютными улочками',
    region: 'costa-blanca',
  },
  {
    id: 4,
    name: 'Валенсия',
    image: 'https://images.unsplash.com/photo-1666861522569-3a352a533c1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWYWxlbmNpYSUyMFNwYWluJTIwYXJjaGl0ZWN0dXJlJTIwY2l0eXxlbnwxfHx8fDE3NzQxNzk5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    time: '1 ч 40 мин',
    bestCar: 'Business',
    description: 'Третий по величине город Испании — Город наук и искусств, родина паэльи',
    region: 'spain',
  },
  {
    id: 5,
    name: 'Гранада',
    image: 'https://images.unsplash.com/photo-1719863131288-dc893fdcb955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHcmFuYWRhJTIwQWxoYW1icmElMjBTcGFpbnxlbnwxfHx8fDE3NzQxNzk5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    time: '4 ч 20 мин',
    bestCar: 'SUV',
    description: 'Легендарная Альгамбра и андалузская культура — идеальный маршрут на выходные',
    region: 'spain',
  },
  {
    id: 6,
    name: 'Мурсия',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    time: '1 ч 10 мин',
    bestCar: 'Business',
    description: 'Город барокко и средиземноморской кухни с богатой историей',
    region: 'spain',
  },
];

const tabs = [
  { key: 'all', label: 'Все маршруты' },
  { key: 'costa-blanca', label: 'Коста-Бланка' },
  { key: 'spain', label: 'Вся Испания' },
];

export function WhereToGo() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered =
    activeTab === 'all'
      ? destinations
      : destinations.filter((d) => d.region === activeTab);

  return (
    <section id="routes" className="py-32 lg:py-40 bg-bg-surface relative">
      {/* Divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

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
            Куда <span className="italic text-gold">поехать</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl font-light">
            Лучшие маршруты из Аликанте по побережью и вглубь Испании
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-8 mb-12 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm tracking-wide transition-colors duration-300 relative ${
                activeTab === tab.key
                  ? 'text-text-primary'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeRouteTab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                  transition={{ type: 'tween', duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Horizontal scroll carousel */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
            {filtered.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[calc(50%-12px)] bg-bg-elevated border border-border hover:border-gold/40 transition-colors duration-300 cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Image — left side */}
                  <div className="relative overflow-hidden lg:w-1/2 aspect-[16/10] lg:aspect-auto lg:min-h-[280px]">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 25vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-bg-elevated/20" />
                  </div>

                  {/* Content — right side */}
                  <div className="p-6 lg:p-8 lg:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl font-display font-normal text-text-primary mb-3">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-text-secondary font-light leading-relaxed mb-6">
                      {destination.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-2 text-sm text-text-tertiary">
                        <Clock size={14} className="text-gold" />
                        <span>{destination.time} из Аликанте</span>
                      </div>
                      <div className="text-sm text-text-tertiary">
                        Лучше всего на: <span className="text-text-secondary">{destination.bestCar}</span>
                      </div>
                    </div>

                    <button className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors duration-300 group/btn">
                      Построить маршрут
                      <ArrowRight
                        size={14}
                        className="group-hover/btn:translate-x-1 transition-transform duration-300"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <p className="text-xs text-text-tertiary mt-6 tracking-wide">
          Листайте для просмотра всех маршрутов
        </p>
      </div>
    </section>
  );
}
