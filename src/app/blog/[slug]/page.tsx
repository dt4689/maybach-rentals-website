import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts, getBlogPost } from '@/lib/blog-data';
import Container from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Maybach Luxury Rentals Mumbai`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const waLink = buildWhatsAppLink('Hello, I read your blog and would like to enquire about a luxury car booking.');

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-12 border-b border-graphite">
        <Container>
          <div className="max-w-3xl">
            <Link href="/blog" className="font-inter text-xs text-muted hover:text-champagne transition-colors mb-6 inline-block">
              ← Back to Journal
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-inter text-[10px] font-medium text-champagne tracking-[0.2em] uppercase">{post.category}</span>
              <span className="font-inter text-xs text-muted">{post.date}</span>
              <span className="font-inter text-xs text-muted">&bull; {post.readTime}</span>
            </div>
            <h1 className="font-cormorant text-4xl sm:text-5xl font-semibold text-ivory tracking-[-0.02em] leading-tight mb-4">
              {post.title}
            </h1>
            <p className="font-inter text-base text-muted leading-relaxed">{post.excerpt}</p>
          </div>
        </Container>
      </div>

      {/* Article body */}
      <Container className="py-16">
        <div className="max-w-3xl">
          <div
            className="prose-maybach"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-16 bg-onyx border border-graphite rounded-sm p-8">
            <h2 className="font-cormorant text-2xl font-semibold text-ivory mb-3">Ready to book?</h2>
            <p className="font-inter text-sm text-muted mb-6">
              Our team confirms availability on WhatsApp within minutes. No forms, no waiting.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-inter text-sm font-medium bg-champagne text-obsidian px-8 py-4 rounded-sm hover:bg-champagne-light transition-all duration-300 tracking-wide"
            >
              Book on WhatsApp
            </a>
          </div>

          {/* Other posts */}
          <div className="mt-12 pt-8 border-t border-graphite">
            <p className="font-inter text-xs text-champagne uppercase tracking-[0.2em] mb-6">More from the journal</p>
            <div className="space-y-4">
              {blogPosts.filter(p => p.slug !== slug).map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="flex items-start gap-4 group"
                >
                  <div>
                    <p className="font-inter text-[10px] text-champagne uppercase tracking-[0.15em] mb-1">{p.category}</p>
                    <p className="font-cormorant text-xl font-semibold text-ivory group-hover:text-champagne transition-colors leading-snug">
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
