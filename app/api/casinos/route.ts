import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Category to tag mapping
const categoryTagMap: Record<string, string[]> = {
  'crypto': ['Crypto', 'Bitcoin', 'Crypto Friendly', 'Cryptocurrency'],
  'slots': ['Slots', 'Slot Games', 'Slot'],
  'live-dealer': ['Live Dealer', 'Live Casino', 'Live Games'],
  'crash-games': ['Crash Games', 'Crash'],
  'sportsbook': ['Sportsbook', 'Sports Betting', 'Sports'],
  'poker': ['Poker', 'Poker Room'],
};

function matchesCategory(casino: any, category: string): boolean {
  if (!category) return true;
  
  // First check if casino has categories field (new system)
  if (casino.categories) {
    try {
      const categories = typeof casino.categories === 'string' 
        ? JSON.parse(casino.categories) 
        : casino.categories;
      if (Array.isArray(categories) && categories.includes(category)) {
        return true;
      }
    } catch (e) {
      // If parsing fails, fall back to tag-based matching
    }
  }
  
  // Fall back to tag-based matching for backward compatibility
  if (!categoryTagMap[category]) return true;
  
  const casinoData = casino.data || {};
  const tags = casinoData?.tags || [];
  const searchTags = categoryTagMap[category];
  
  // Check if any tag matches (case-insensitive)
  return tags.some((tag: string) => 
    searchTags.some(searchTag => 
      tag.toLowerCase().includes(searchTag.toLowerCase())
    )
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const active = searchParams.get('active') !== 'false';
    const category = searchParams.get('category') || '';

    const casinos = await prisma.casino.findMany({
      where: active ? { isActive: true } : {},
      orderBy: [
        { rank: 'asc' },
        { rating: 'desc' },
      ],
    });

    // Parse and filter by category
    let parsedCasinos = casinos.map((casino) => ({
      ...casino,
      data: JSON.parse(casino.data),
      categories: casino.categories ? (typeof casino.categories === 'string' ? JSON.parse(casino.categories) : casino.categories) : null,
    }));

    // Filter by category if provided
    if (category) {
      parsedCasinos = parsedCasinos.filter((casino) => 
        matchesCategory(casino, category)
      );
    }

    // Apply pagination after filtering
    const total = parsedCasinos.length;
    const paginatedCasinos = parsedCasinos.slice(offset, offset + limit);

    return NextResponse.json({
      casinos: paginatedCasinos,
      total,
    });
  } catch (error) {
    console.error('Error fetching casinos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch casinos' },
      { status: 500 }
    );
  }
}

