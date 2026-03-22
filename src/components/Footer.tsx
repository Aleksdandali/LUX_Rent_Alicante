'use client';

import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const menuSections = [
  {
    title: 'Навигация',
    links: [
      { label: 'Автопарк', href: '#cars' },
      { label: 'Маршруты', href: '#routes' },
      { label: 'О сервисе', href: '#about' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Услуги',
    links: [
      { label: 'Аренда люкс-авто', href: '#cars' },
      { label: 'Трансфер из аэропорта', href: '#' },
      { label: 'Долгосрочная аренда', href: '#' },
      { label: 'Корпоративные клиенты', href: '#' },
    ],
  },
  {
    title: 'Информация',
    links: [
      { label: 'Условия аренды', href: '#' },
      { label: 'Политика конфиденциальности', href: '#' },
      { label: 'Страхование', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-bg-elevated relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-20">
        {/* Main grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <span className="text-[15px] font-display font-normal tracking-[0.25em] text-text-primary uppercase block mb-6">
              Alicante Luxe Drive
            </span>
            <p className="text-[13px] font-body font-light text-text-secondary leading-relaxed mb-8">
              Премиальная аренда автомобилей в Аликанте и по всей Испании
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="tel:+34123456789"
                className="flex items-center gap-3 text-[13px] font-body text-text-tertiary hover:text-text-primary transition-colors"
              >
                <Phone size={14} />
                +34 123 456 789
              </a>
              <a
                href="https://wa.me/34123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[13px] font-body text-text-tertiary hover:text-[#25D366] transition-colors"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
              <a
                href="mailto:info@alicanteluxedrive.com"
                className="flex items-center gap-3 text-[13px] font-body text-text-tertiary hover:text-text-primary transition-colors"
              >
                <Mail size={14} />
                info@alicanteluxedrive.com
              </a>
              <div className="flex items-start gap-3 text-[13px] font-body text-text-tertiary">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                <span>Aeropuerto de Alicante-Elche, 03195 L&apos;Altet, Alicante</span>
              </div>
            </div>
          </div>

          {/* Menu sections */}
          {menuSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[11px] font-body font-medium tracking-[0.12em] uppercase text-text-tertiary mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] font-body font-light text-text-secondary hover:text-text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment logos + social */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-8 border-t border-border">
          {/* Payment methods */}
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-body text-text-tertiary">Принимаем:</span>
            <div className="flex items-center gap-4 text-text-tertiary opacity-50">
              <span className="text-[11px] font-body font-medium tracking-[0.1em]">VISA</span>
              <span className="text-[11px] font-body font-medium tracking-[0.1em]">MC</span>
              <span className="text-[11px] font-body font-medium tracking-[0.1em]">AMEX</span>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {[
              { label: 'Instagram', href: '#' },
              { label: 'Facebook', href: '#' },
              { label: 'Telegram', href: '#' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-[12px] font-body text-text-tertiary hover:text-text-primary transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p className="text-[11px] font-body text-text-tertiary">
              {'\u00A9'} 2026 Alicante Luxe Drive. Все права защищены. CIF: B12345678
            </p>
            <p className="text-[10px] font-body text-text-tertiary max-w-lg">
              Для аренды необходимы водительские права категории B, минимальный возраст 25 лет и кредитная карта. Все автомобили застрахованы. Цены указаны без учёта депозита.
            </p>
          </div>
        </div>
      </div>

      {/* Gold accent line at very bottom */}
      <div className="h-px bg-gold/30" />
    </footer>
  );
}
