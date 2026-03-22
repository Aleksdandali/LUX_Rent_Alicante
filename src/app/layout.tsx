import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
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
    <html lang="ru" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
