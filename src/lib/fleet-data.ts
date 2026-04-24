export type Car = {
  slug: string;
  name: string;
  brand: string;
  tier: 'ultra' | 'premium' | 'standard';
  seats: number;
  pricePerHour: number;
  extraHourRate: number;
  extraKmRate: number;
  image: string;
  colour: string;
  bestFor: Array<'wedding' | 'airport' | 'corporate' | 'outstation' | 'photoshoot'>;
};

export const fleet: Car[] = [
  // ULTRA TIER
  { slug: 'bentley-flying-spur-w12-white', name: 'Bentley Flying Spur W12', brand: 'Bentley', tier: 'ultra', seats: 5, pricePerHour: 1875, extraHourRate: 3000, extraKmRate: 300, image: '/cars/bentley-flying-spur.png', colour: 'White', bestFor: ['wedding', 'corporate'] },
  { slug: 'maybach-v600-limousine-black', name: 'Maybach V600 Limousine', brand: 'Maybach', tier: 'ultra', seats: 6, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/maybach-v600.png', colour: 'Black', bestFor: ['wedding', 'corporate', 'airport'] },
  { slug: 'maybach-s500-original-white-vip', name: 'Maybach S500 Original VIP', brand: 'Maybach', tier: 'ultra', seats: 5, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/maybach-s500-original.png', colour: 'White', bestFor: ['wedding', 'corporate'] },
  { slug: 'maybach-s500-kit-white', name: 'Mercedes-Maybach S500 Kit', brand: 'Maybach', tier: 'ultra', seats: 4, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/maybach-s500-kit.png', colour: 'White', bestFor: ['wedding', 'corporate'] },
  { slug: 'maybach-gls600-suv-white', name: 'Mercedes-Maybach GLS600 SUV', brand: 'Maybach', tier: 'ultra', seats: 7, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/maybach-gls600.png', colour: 'White', bestFor: ['wedding', 'outstation'] },
  { slug: 'maybach-gls-kit-suv-white', name: 'Mercedes-Maybach GLS Kit SUV', brand: 'Maybach', tier: 'ultra', seats: 7, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/maybach-gls-kit.jpg', colour: 'White', bestFor: ['wedding', 'outstation', 'corporate'] },
  { slug: 'mercedes-amg-e63-convertible-white', name: 'Mercedes AMG E63 Convertible VIP', brand: 'Mercedes-Benz', tier: 'ultra', seats: 4, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/amg-e63-convertible.png', colour: 'White', bestFor: ['photoshoot', 'wedding'] },

  // PREMIUM TIER
  { slug: 'mercedes-s-class-s500', name: 'Mercedes S-Class S500', brand: 'Mercedes-Benz', tier: 'premium', seats: 5, pricePerHour: 1875, extraHourRate: 3000, extraKmRate: 300, image: '/cars/s-class-s500.png', colour: 'Black', bestFor: ['corporate', 'airport'] },
  { slug: 'mercedes-e53-cabriolet', name: 'Mercedes AMG E53 Cabriolet', brand: 'Mercedes-Benz', tier: 'premium', seats: 4, pricePerHour: 1460, extraHourRate: 2000, extraKmRate: 200, image: '/cars/e53-cabriolet.png', colour: 'White', bestFor: ['photoshoot', 'wedding'] },
  { slug: 'mercedes-amg-e53-convertible-white', name: 'Mercedes AMG E53 Convertible', brand: 'Mercedes-Benz', tier: 'premium', seats: 4, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/e53-convertible.png', colour: 'White', bestFor: ['photoshoot', 'wedding'] },
  { slug: 'range-rover-vogue-white', name: 'Range Rover Vogue SUV', brand: 'Range Rover', tier: 'premium', seats: 5, pricePerHour: 1250, extraHourRate: 2000, extraKmRate: 200, image: '/cars/range-rover-vogue-white.png', colour: 'White', bestFor: ['wedding', 'outstation', 'airport'] },
  { slug: 'range-rover-vogue-black', name: 'Range Rover Vogue SUV', brand: 'Range Rover', tier: 'premium', seats: 5, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/range-rover-vogue-black.png', colour: 'Black', bestFor: ['corporate', 'outstation'] },
  { slug: 'mercedes-e-class-black', name: 'Mercedes E-Class', brand: 'Mercedes-Benz', tier: 'premium', seats: 5, pricePerHour: 1250, extraHourRate: 2000, extraKmRate: 200, image: '/cars/e-class-black.png', colour: 'Black', bestFor: ['corporate', 'airport'] },
  { slug: 'mercedes-e-class-white', name: 'Mercedes E-Class', brand: 'Mercedes-Benz', tier: 'premium', seats: 5, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/e-class-white.jpeg', colour: 'White', bestFor: ['wedding', 'corporate'] },
  { slug: 'gls-600d', name: 'Mercedes GLS 600D', brand: 'Mercedes-Benz', tier: 'premium', seats: 7, pricePerHour: 1250, extraHourRate: 2000, extraKmRate: 200, image: '/cars/gls-600d.png', colour: 'Black', bestFor: ['wedding', 'outstation'] },
  { slug: 'bmw-m5-white', name: 'BMW M5', brand: 'BMW', tier: 'premium', seats: 5, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/bmw-m5-white.png', colour: 'White', bestFor: ['corporate', 'photoshoot'] },
  { slug: 'bmw-m5-red', name: 'BMW M5', brand: 'BMW', tier: 'premium', seats: 5, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/bmw-m5-red.png', colour: 'Red', bestFor: ['photoshoot', 'corporate'] },
  { slug: 'bmw-7-series-740d-white', name: 'BMW 7 Series 740D Kit', brand: 'BMW', tier: 'premium', seats: 5, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/bmw-7-white.png', colour: 'White', bestFor: ['wedding', 'corporate'] },
  { slug: 'bmw-7-series', name: 'BMW 7 Series', brand: 'BMW', tier: 'premium', seats: 5, pricePerHour: 835, extraHourRate: 1000, extraKmRate: 100, image: '/cars/bmw-7-series.png', colour: 'Black', bestFor: ['corporate', 'airport'] },
  { slug: 'audi-a8l-white', name: 'Audi A8L Kit', brand: 'Audi', tier: 'premium', seats: 5, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/audi-a8l-white.png', colour: 'White', bestFor: ['wedding', 'corporate'] },
  { slug: 'audi-a8l-black', name: 'Audi A8L', brand: 'Audi', tier: 'premium', seats: 4, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/audi-a8l-black.png', colour: 'Black', bestFor: ['corporate', 'airport'] },
  { slug: 'audi-a8l', name: 'Audi A8L', brand: 'Audi', tier: 'premium', seats: 5, pricePerHour: 835, extraHourRate: 1000, extraKmRate: 100, image: '/cars/audi-a8l.png', colour: 'White', bestFor: ['corporate', 'airport'] },
  { slug: 'audi-q7-white-vip', name: 'Audi Q7 SUV VIP', brand: 'Audi', tier: 'premium', seats: 6, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/audi-q7-white.jpg', colour: 'White', bestFor: ['wedding', 'outstation'] },
  { slug: 'audi-q7-red-vip', name: 'Audi Q7 SUV VIP', brand: 'Audi', tier: 'premium', seats: 7, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/audi-q7-red.png', colour: 'Red', bestFor: ['photoshoot', 'outstation'] },
  { slug: 'audi-q7', name: 'Audi Q7', brand: 'Audi', tier: 'premium', seats: 7, pricePerHour: 835, extraHourRate: 1000, extraKmRate: 100, image: '/cars/audi-q7.png', colour: 'Black', bestFor: ['outstation', 'airport'] },

  // STANDARD TIER
  { slug: 'toyota-vellfire-white', name: 'Toyota Vellfire', brand: 'Toyota', tier: 'standard', seats: 7, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/vellfire-white.png', colour: 'White', bestFor: ['airport', 'outstation'] },
  { slug: 'toyota-vellfire-black', name: 'Toyota Vellfire', brand: 'Toyota', tier: 'standard', seats: 7, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/vellfire-black.png', colour: 'Black', bestFor: ['airport', 'outstation', 'corporate'] },
  { slug: 'mercedes-s350d', name: 'Mercedes S-Class S350D', brand: 'Mercedes-Benz', tier: 'standard', seats: 5, pricePerHour: 835, extraHourRate: 1000, extraKmRate: 100, image: '/cars/s350d.png', colour: 'Black', bestFor: ['corporate', 'airport'] },
  { slug: 'mercedes-c200', name: 'Mercedes C200', brand: 'Mercedes-Benz', tier: 'standard', seats: 5, pricePerHour: 750, extraHourRate: 800, extraKmRate: 80, image: '/cars/c200.png', colour: 'White', bestFor: ['corporate', 'airport'] },
  { slug: 'bmw-525d-530d', name: 'BMW 525D / 530D', brand: 'BMW', tier: 'standard', seats: 5, pricePerHour: 710, extraHourRate: 700, extraKmRate: 70, image: '/cars/bmw-525d.jpeg', colour: 'Black', bestFor: ['corporate', 'airport'] },
];

export const featuredCars = fleet.filter(c =>
  ['bentley-flying-spur-w12-white', 'maybach-v600-limousine-black', 'maybach-gls600-suv-white', 'range-rover-vogue-white', 'mercedes-s-class-s500', 'bmw-7-series'].includes(c.slug)
);
