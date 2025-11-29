import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';

    if (!q || q.length < 2) {
      return NextResponse.json({ casinos: [], articles: [] });
    }

    const searchTerm = q.toLowerCase();

    // Search casinos (SQLite doesn't support case-insensitive, so we filter in memory)
    const allCasinos = await prisma.casino.findMany({
      where: { isActive: true },
    });
    
    const casinos = allCasinos
      .filter((c) => 
        c.name.toLowerCase().includes(searchTerm) || 
        c.slug.toLowerCase().includes(searchTerm)
      )
      .slice(0, 10);

    // Search articles
    const allArticles = await prisma.article.findMany({
      where: { publishedAt: { not: null } },
    });
    
    const articles = allArticles
      .filter((a) =>
        a.title.toLowerCase().includes(searchTerm) ||
        a.content.toLowerCase().includes(searchTerm)
      )
      .slice(0, 10);

    return NextResponse.json({
      casinos: casinos.map((c) => ({
        ...c,
        data: JSON.parse(c.data),
      })),
      articles,
    });
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

