import Link from 'next/link';
import Container from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <Container className="text-center py-32">
        <p className="font-cormorant text-[120px] font-semibold text-graphite leading-none select-none">404</p>
        <h1 className="font-cormorant text-4xl font-semibold text-ivory mt-4 mb-4">Page not found.</h1>
        <p className="font-inter text-base text-muted mb-10 max-w-sm mx-auto">
          The page you are looking for does not exist. Perhaps you were looking for one of our luxury cars?
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="font-inter text-sm font-medium bg-champagne text-obsidian px-8 py-4 rounded-sm hover:bg-champagne-light transition-all duration-300 tracking-wide"
          >
            Back to Home
          </Link>
          <Link
            href="/fleet"
            className="font-inter text-sm font-medium border border-champagne text-champagne px-8 py-4 rounded-sm hover:bg-champagne hover:text-obsidian transition-all duration-300 tracking-wide"
          >
            Browse the Fleet
          </Link>
        </div>
      </Container>
    </div>
  );
}
