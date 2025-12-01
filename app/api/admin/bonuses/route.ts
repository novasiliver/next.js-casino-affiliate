import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bonusSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  casinoId: z.string().optional(),
  casinoSlug: z.string().optional(),
  casinoName: z.string().min(1),
  casinoLogo: z.string().min(1),
  casinoRating: z.number().min(0).max(5),
  amount: z.string().min(1),
  type: z.string().min(1),
  wagering: z.string().optional(),
  minDeposit: z.string().optional(),
  code: z.string().optional(),
  expiry: z.string().optional(),
  isExclusive: z.boolean().optional(),
  isHotPick: z.boolean().optional(),
  isActive: z.boolean().optional(),
  provider: z.string().optional(),
  features: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bonuses = await prisma.bonus.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Parse features JSON
    const parsedBonuses = bonuses.map((bonus) => ({
      ...bonus,
      features: bonus.features ? JSON.parse(bonus.features) : [],
    }));

    return NextResponse.json({ bonuses: parsedBonuses });
  } catch (error) {
    console.error('Error fetching bonuses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bonuses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = bonusSchema.parse(body);

    // Check for duplicate slug
    const existingBonus = await prisma.bonus.findUnique({
      where: { slug: validated.slug },
    });

    if (existingBonus) {
      return NextResponse.json(
        { error: 'A bonus with this slug already exists', details: [{ path: ['slug'], message: 'Slug must be unique' }] },
        { status: 409 }
      );
    }

    const bonus = await prisma.bonus.create({
      data: {
        ...validated,
        expiry: validated.expiry ? new Date(validated.expiry) : null,
        isExclusive: validated.isExclusive ?? false,
        isHotPick: validated.isHotPick ?? false,
        isActive: validated.isActive ?? true,
        features: validated.features ? JSON.stringify(validated.features) : JSON.stringify([]),
      },
    });

    return NextResponse.json({
      ...bonus,
      features: bonus.features ? JSON.parse(bonus.features) : [],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating bonus:', error);
    return NextResponse.json(
      { error: 'Failed to create bonus' },
      { status: 500 }
    );
  }
}

