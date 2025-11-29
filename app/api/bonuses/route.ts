import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const casinos = await prisma.casino.findMany({
      where: { isActive: true },
      select: {
        id: true,
        slug: true,
        name: true,
        logo: true,
        rating: true,
        data: true,
      },
    });

    const bonuses = casinos.map((casino) => {
      const data = JSON.parse(casino.data);
      return {
        casinoId: casino.id,
        casinoSlug: casino.slug,
        casinoName: casino.name,
        casinoLogo: casino.logo,
        casinoRating: casino.rating,
        bonus: data.bonus,
      };
    });

    return NextResponse.json({ bonuses });
  } catch (error) {
    console.error('Error fetching bonuses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bonuses' },
      { status: 500 }
    );
  }
}

