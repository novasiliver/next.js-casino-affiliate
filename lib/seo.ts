import { Metadata } from 'next';
import { prisma } from './db';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bonusory.com';
const siteName = 'Bonusory';
const defaultTitle = 'Bonusory - Premium Casino Reviews & Bonuses';
const defaultDescription = 'Curated selection of the world\'s most premium gaming destinations. Exclusive bonuses, instant withdrawals, and bank-grade security vetted by experts.';
const defaultKeywords = 'online casino, casino bonus, casino reviews, gambling, slots, crypto casino';

// Fetch SEO settings for a specific page
export async function getPageSeo(pageKey: string) {
  try {
    const seoSettings = await prisma.seoSettings.findUnique({
      where: { pageKey }
    });
    return seoSettings;
  } catch (error) {
    console.error(`Error fetching SEO for page ${pageKey}:`, error);
    return null;
  }
}

// Generate metadata for static pages
export async function generatePageMetadata(pageKey: string, defaults?: {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}): Promise<Metadata> {
  const seoSettings = await getPageSeo(pageKey);
  
  const title = seoSettings?.seoTitle || defaults?.title || defaultTitle;
  const description = seoSettings?.seoDescription || defaults?.description || defaultDescription;
  const keywords = seoSettings?.seoKeywords || defaults?.keywords || defaultKeywords;
  const canonical = seoSettings?.seoCanonical || defaults?.canonical || `${baseUrl}/${pageKey === 'home' ? '' : pageKey}`;
  const robots = seoSettings?.seoRobots || 'index, follow';
  const author = seoSettings?.seoAuthor || 'Bonusory Team';
  const publisher = seoSettings?.seoPublisher || 'Bonusory';
  const ogImage = seoSettings?.ogImage || `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    keywords: keywords.split(',').map(k => k.trim()),
    authors: [{ name: author }],
    publisher,
    robots,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// Generate metadata for casino pages
export function generateCasinoMetadata(casino: any): Metadata {
  const title = casino.seoTitle || `${casino.name} Review 2025 - Bonuses & Rating | Bonusory`;
  const description = casino.seoDescription || casino.description || `Read our expert review of ${casino.name}. Discover exclusive bonuses, game selection, payout speed, and more.`;
  const keywords = casino.seoKeywords || `${casino.name}, ${casino.name} review, ${casino.name} bonus, online casino`;
  const canonical = casino.seoCanonical || `${baseUrl}/review/${casino.slug}`;
  const robots = casino.seoRobots || 'index, follow';
  const author = casino.seoAuthor || 'Bonusory Team';

  return {
    title,
    description,
    keywords: typeof keywords === 'string' ? keywords.split(',').map((k: string) => k.trim()) : keywords,
    authors: [{ name: author }],
    publisher: 'Bonusory',
    robots,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      images: [
        {
          url: casino.logo?.startsWith('http') ? casino.logo : `${baseUrl}/uploads/casinos/${casino.logo}`,
          width: 1200,
          height: 630,
          alt: `${casino.name} Logo`
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// Generate metadata for article pages
export function generateArticleMetadata(article: any): Metadata {
  const title = article.seoTitle || `${article.title} | Bonusory`;
  const description = article.seoDescription || article.excerpt || `Read our expert guide: ${article.title}`;
  const keywords = article.seoKeywords || `casino guide, gambling tips, ${article.category}`;
  const canonical = article.seoCanonical || `${baseUrl}/guides/${article.slug}`;
  const robots = article.seoRobots || 'index, follow';
  const author = article.seoAuthor || 'Bonusory Team';

  return {
    title,
    description,
    keywords: typeof keywords === 'string' ? keywords.split(',').map((k: string) => k.trim()) : keywords,
    authors: [{ name: author }],
    publisher: 'Bonusory',
    robots,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      images: [
        {
          url: article.imageUrl || `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [article.imageUrl || `${baseUrl}/og-image.jpg`],
    },
  };
}

