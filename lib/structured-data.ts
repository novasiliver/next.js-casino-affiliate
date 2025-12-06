const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bonusory.com';

// Organization Schema
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bonusory',
    description: 'Curated selection of the world\'s most premium gaming destinations. Exclusive bonuses, instant withdrawals, and bank-grade security vetted by experts.',
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
    foundingDate: '2025',
    sameAs: [
      'https://twitter.com/bonusory',
      'https://facebook.com/bonusory',
      'https://instagram.com/bonusory',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@bonusory.com',
      availableLanguage: 'English'
    }
  };
}

// Website Schema
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bonusory',
    description: 'Premium Casino Reviews & Bonuses',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/casinos?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

// Breadcrumb Schema
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// Casino Review Schema
export function getCasinoReviewSchema(casino: any) {
  const casinoUrl = `${baseUrl}/review/${casino.slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      name: casino.name,
      description: casino.description || `${casino.name} online casino`,
      image: casino.logo?.startsWith('http') ? casino.logo : `${baseUrl}/uploads/casinos/${casino.logo}`,
      url: casino.affiliateLink || casinoUrl,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: casino.rating,
        bestRating: '5',
        worstRating: '1',
        ratingCount: casino.votes || 1
      }
    },
    author: {
      '@type': 'Organization',
      name: 'Bonusory'
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: casino.rating,
      bestRating: '5',
      worstRating: '1'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bonusory',
      url: baseUrl
    },
    datePublished: casino.createdAt,
    dateModified: casino.updatedAt,
    reviewBody: casino.verdict || casino.description || `Comprehensive review of ${casino.name} covering bonuses, games, and security.`,
    positiveNotes: casino.prosCons?.pros ? {
      '@type': 'ItemList',
      itemListElement: casino.prosCons.pros.map((pro: string, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: pro
      }))
    } : undefined,
    negativeNotes: casino.prosCons?.cons ? {
      '@type': 'ItemList',
      itemListElement: casino.prosCons.cons.map((con: string, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: con
      }))
    } : undefined
  };
}

// Article Schema
export function getArticleSchema(article: any) {
  const articleUrl = `${baseUrl}/guides/${article.slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.title,
    image: article.imageUrl || `${baseUrl}/og-image.jpg`,
    author: {
      '@type': 'Person',
      name: article.seoAuthor || 'Bonusory Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bonusory',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.svg`
      }
    },
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    articleSection: article.category,
    keywords: article.seoKeywords || article.category
  };
}

// FAQ Schema
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Item List Schema (for casino listings)
export function getItemListSchema(casinos: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: casinos.map((casino, index) => ({
      '@type': 'ListItem',
      position: casino.rank || (index + 1),
      item: {
        '@type': 'Organization',
        name: casino.name,
        description: casino.description || `${casino.name} online casino`,
        image: casino.logo?.startsWith('http') ? casino.logo : `${baseUrl}/uploads/casinos/${casino.logo}`,
        url: `${baseUrl}/review/${casino.slug}`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: casino.rating,
          bestRating: '5',
          worstRating: '1'
        }
      }
    }))
  };
}

