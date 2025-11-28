import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const casino = await prisma.casino.findUnique({
      where: { slug },
    });

    if (!casino || !casino.isActive) {
      return NextResponse.json(
        { error: 'Casino not found' },
        { status: 404 }
      );
    }

    // Parse the data JSON string
    let parsedData = {};
    try {
      parsedData = casino.data ? JSON.parse(casino.data) : {};
    } catch (error) {
      console.error('Error parsing casino data:', error);
      parsedData = {};
    }
    
    // Merge the data object into the main casino object
    // This flattens the structure so templates can access casino.bonus instead of casino.data.bonus
    const casinoResponse = {
      id: casino.id,
      slug: casino.slug,
      name: casino.name,
      logo: casino.logo,
      rating: casino.rating,
      template: casino.template,
      isActive: casino.isActive,
      rank: casino.rank,
      createdAt: casino.createdAt,
      updatedAt: casino.updatedAt,
      // Merge all fields from the data object (bonus, verdict, prosCons, banking, etc.)
      ...parsedData,
    };

    return NextResponse.json(casinoResponse);
  } catch (error) {
    console.error('Error fetching casino:', error);
    return NextResponse.json(
      { error: 'Failed to fetch casino' },
      { status: 500 }
    );
  }
}

