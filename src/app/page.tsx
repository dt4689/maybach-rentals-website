import Hero from '@/components/home/Hero';
import FleetTeaser from '@/components/home/FleetTeaser';
import WhyUs from '@/components/home/WhyUs';
import ChauffeurSpotlight from '@/components/home/ChauffeurSpotlight';
import Testimonials from '@/components/home/Testimonials';
import ServiceAreas from '@/components/home/ServiceAreas';
import AvailabilityChecker from '@/components/booking/AvailabilityChecker';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <FleetTeaser />
      <WhyUs />
      <ChauffeurSpotlight />
      <Testimonials />
      <ServiceAreas />
      <AvailabilityChecker />
      <CTASection />
    </>
  );
}
