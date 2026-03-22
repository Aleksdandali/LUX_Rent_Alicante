import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PopularCars } from '@/components/PopularCars';
import { WhereToGo } from '@/components/WhereToGo';
import { WhyUs } from '@/components/WhyUs';
import { Testimonials } from '@/components/Testimonials';
import { BookingProcess } from '@/components/BookingProcess';
import { FAQ } from '@/components/FAQ';
import { CTABanner } from '@/components/CTABanner';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ScrollToTop } from '@/components/ScrollToTop';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <ScrollProgress />
      <Header />

      <main>
        <Hero />
        <PopularCars />
        <WhereToGo />
        <WhyUs />
        <Testimonials />
        <BookingProcess />
        <FAQ />
        <CTABanner />
      </main>

      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}
