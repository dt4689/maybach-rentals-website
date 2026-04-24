import { NextRequest, NextResponse } from 'next/server';
import { fleet } from '@/lib/fleet-data';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const BASE_HOURS = 8;
const BASE_KM = 80;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { slug, hours = BASE_HOURS, km = BASE_KM } = body;

  const car = fleet.find(c => c.slug === slug);
  if (!car) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }

  const base = car.pricePerHour * BASE_HOURS;
  const extraHourCost = Math.max(0, hours - BASE_HOURS) * car.extraHourRate;
  const extraKmCost = Math.max(0, km - BASE_KM) * car.extraKmRate;
  const total = base + extraHourCost + extraKmCost;

  const message = [
    `Hello! I would like to book the ${car.name} (${car.colour}).`,
    `Duration: ${hours} hours`,
    `Distance: ${km} km`,
    `Estimated total: ₹${total.toLocaleString('en-IN')}`,
    `Please confirm availability.`,
  ].join('\n');

  return NextResponse.json({
    car: { name: car.name, colour: car.colour, slug: car.slug },
    breakdown: { base, extraHourCost, extraKmCost, total },
    whatsappLink: buildWhatsAppLink(message),
  });
}
