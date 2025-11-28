import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const active = searchParams.get('active') !== 'false';

    const casinos = await prisma.casino.findMany({
      where: active ? { isActive: true } : {},
      orderBy: [
        { rank: 'asc' },
        { rating: 'desc' },
      ],
      take: limit,
      skip: offset,
    });

    const parsedCasinos = casinos.map((casino) => ({
      ...casino,
      data: JSON.parse(casino.data),
    }));

    return NextResponse.json({
      casinos: parsedCasinos,
      total: await prisma.casino.count({ where: active ? { isActive: true } : {} }),
    });
  } catch (error) {
    console.error('Error fetching casinos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch casinos' },
      { status: 500 }
    );
  }
}

