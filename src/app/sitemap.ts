import type { MetadataRoute } from 'next';
import { fleet } from '@/lib/fleet-data';
import { blogPosts } from '@/lib/blog-data';

const BASE_URL = 'https://maybachrental.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/fleet`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/pricing`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/contact`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/faq`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: 'weekly' as const },
  ];

  const fleetPages = fleet.map(car => ({
    url: `${BASE_URL}/fleet/${car.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  const blogPages = blogPosts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticPages, ...fleetPages, ...blogPages];
}
