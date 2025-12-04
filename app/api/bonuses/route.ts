import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const active = searchParams.get('active') !== 'false';

    const bonuses = await prisma.bonus.findMany({
      where: active ? { isActive: true } : {},
      orderBy: [
        { isExclusive: 'desc' },
        { isHotPick: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    // Parse features JSON and filter by type if provided
    let parsedBonuses = bonuses.map((bonus) => ({
      id: bonus.id,
      title: bonus.title,
      slug: bonus.slug,
      casinoId: bonus.casinoId,
      casinoSlug: bonus.casinoSlug,
      casinoName: bonus.casinoName,
      casinoLogo: bonus.casinoLogo,
      casinoRating: bonus.casinoRating,
      amount: bonus.amount,
      type: bonus.type,
      wagering: bonus.wagering,
      minDeposit: bonus.minDeposit,
      code: bonus.code,
      expiry: bonus.expiry,
      isExclusive: bonus.isExclusive,
      isHotPick: bonus.isHotPick,
      provider: bonus.provider,
      features: bonus.features ? JSON.parse(bonus.features) : [],
      createdAt: bonus.createdAt.toISOString(),
    }));

    // Filter by type if provided
    if (type && type !== 'all') {
      parsedBonuses = parsedBonuses.filter((bonus) => bonus.type === type);
    }

    return NextResponse.json({ bonuses: parsedBonuses });
  } catch (error) {
    console.error('Error fetching bonuses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bonuses' },
      { status: 500 }
    );
  }
}

