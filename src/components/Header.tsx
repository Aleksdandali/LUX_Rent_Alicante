'use client';

import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const menuItems = [
  { label: 'Автопарк', href: '#cars' },
  { label: 'Маршруты', href: '#routes' },
  { label: 'О сервисе', href: '#about' },
];

const languages = ['RU', 'EN', 'ES'];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('RU');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg-primary/95 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <span className="text-base lg:text-lg font-display font-light tracking-[0.2em] text-text-primary uppercase">
              Alicante <span className="text-gold">Luxe</span> Drive
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Phone */}
            <a
              href="tel:+34123456789"
              className="text-xs tracking-wide text-text-tertiary hover:text-text-primary transition-colors duration-300"
            >
              +34 123 456 789
            </a>

            <div className="w-px h-4 bg-border" />

            {/* Language switcher */}
            <div className="flex items-center gap-1 text-xs tracking-wide">
              {languages.map((lang, i) => (
                <span key={lang} className="flex items-center">
                  <button
                    onClick={() => setActiveLang(lang)}
                    className={`transition-colors duration-300 ${
                      activeLang === lang
                        ? 'text-text-primary'
                        : 'text-text-tertiary hover:text-text-secondary'
                    }`}
                  >
                    {lang}
                  </button>
                  {i < languages.length - 1 && (
                    <span className="text-text-tertiary mx-1">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/34123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-[#25D366] transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>

            {/* Divider */}
            <div className="w-px h-5 bg-border" />

            {/* CTA */}
            <motion.a
              href="#booking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="px-7 py-2.5 bg-gold text-bg-primary text-sm font-body font-medium tracking-wide hover:bg-gold-light transition-colors duration-300"
            >
              Забронировать
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-bg-primary/98 backdrop-blur-xl border-t border-border"
          >
            <div className="px-6 py-8 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-3 text-base font-light tracking-wide text-text-secondary hover:text-text-primary transition-colors border-b border-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-6 space-y-4">
                {/* Language */}
                <div className="flex items-center gap-3 text-sm">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`transition-colors ${
                        activeLang === lang
                          ? 'text-text-primary'
                          : 'text-text-tertiary'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Mobile CTA */}
                <a
                  href="#booking"
                  className="block w-full px-7 py-3 bg-gold text-bg-primary text-sm font-medium tracking-wide text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Забронировать
                </a>

                <a
                  href="https://wa.me/34123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-border text-text-secondary text-sm"
                >
                  <MessageCircle size={16} />
                  Написать в WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
