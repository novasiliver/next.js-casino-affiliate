import { NextResponse } from 'next/server';

// Mock games data - can be replaced with database later
const games = [
  { id: '1', name: 'Starburst', provider: 'NetEnt', category: 'Slots', rtp: '96.1%' },
  { id: '2', name: 'Book of Dead', provider: 'Play\'n Go', category: 'Slots', rtp: '96.21%' },
  { id: '3', name: 'Gonzo\'s Quest', provider: 'NetEnt', category: 'Slots', rtp: '95.97%' },
  { id: '4', name: 'Mega Moolah', provider: 'Microgaming', category: 'Jackpots', rtp: '88.12%' },
  { id: '5', name: 'Lightning Roulette', provider: 'Evolution', category: 'Live Dealer', rtp: '97.3%' },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const provider = searchParams.get('provider');

    let filteredGames = games;

    if (category) {
      filteredGames = filteredGames.filter((g) => g.category === category);
    }

    if (provider) {
      filteredGames = filteredGames.filter((g) => g.provider === provider);
    }

    return NextResponse.json({ games: filteredGames });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}

