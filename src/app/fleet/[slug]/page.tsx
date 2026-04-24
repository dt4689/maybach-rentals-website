import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fleet } from '@/lib/fleet-data';
import CarDetail from '@/components/fleet/CarDetail';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return fleet.map(car => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = fleet.find(c => c.slug === slug);
  if (!car) return {};
  return {
    title: `${car.name} Rental Mumbai — Chauffeur-Driven | Maybach Luxury Rentals`,
    description: `Hire the ${car.name} (${car.colour}) in Mumbai with a professional chauffeur. ${car.seats} seats. From ₹${car.pricePerHour.toLocaleString('en-IN')}/hr.`,
  };
}

export default async function CarPage({ params }: Props) {
  const { slug } = await params;
  const car = fleet.find(c => c.slug === slug);
  if (!car) notFound();
  return <CarDetail car={car} />;
}
