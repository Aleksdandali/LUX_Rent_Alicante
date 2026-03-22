import type { Metadata } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import '@/styles/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
  weight: ['200', '300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Alicante Luxe Drive — Премиальная аренда авто в Аликанте',
  description:
    'Собственный автопарк из 25 премиальных автомобилей: Bentley, Lamborghini Urus, Porsche 911, Range Rover, G-Class. Доставка в аэропорт, отель или виллу. Персональный консьерж 24/7.',
  keywords: [
    'аренда авто Аликанте',
    'luxury car rental Alicante',
    'Bentley аренда Испания',
    'Lamborghini Urus Alicante',
    'Porsche 911 rent Spain',
    'премиальная аренда авто',
    'люкс авто Коста-Бланка',
  ],
  openGraph: {
    title: 'Alicante Luxe Drive — N.1 Luxury Car Rental in Alicante',
    description:
      'Собственный автопарк: Bentley, Lamborghini, Porsche, Range Rover, G-Class. Доставка, консьерж 24/7, прозрачные условия.',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
