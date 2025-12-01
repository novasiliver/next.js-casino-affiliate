import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Category to tag mapping
const categoryTagMap: Record<string, string[]> = {
  'crypto': ['Crypto', 'Bitcoin', 'Crypto Friendly', 'Cryptocurrency'],
  'slots': ['Slots', 'Slot Games', 'Slot'],
  'live-dealer': ['Live Dealer', 'Live Casino', 'Live Games'],
  'crash-games': ['Crash Games', 'Crash'],
  'sportsbook': ['Sportsbook', 'Sports Betting', 'Sports'],
  'poker': ['Poker', 'Poker Room'],
};

function matchesCategory(casinoData: any, category: string): boolean {
  if (!category || !categoryTagMap[category]) return true;
  
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
    }));

    // Filter by category if provided
    if (category) {
      parsedCasinos = parsedCasinos.filter((casino) => 
        matchesCategory(casino.data, category)
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

