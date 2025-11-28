import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const casinoSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  logo: z.string().min(1),
  rating: z.number().min(0).max(5),
  data: z.any(),
  template: z.string(),
  isActive: z.boolean().optional(),
  rank: z.number().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const casinos = await prisma.casino.findMany({
      orderBy: [{ rank: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({
      casinos: casinos.map((c) => ({
        ...c,
        data: JSON.parse(c.data),
      })),
    });
  } catch (error) {
    console.error('Error fetching casinos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch casinos' },
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
    const validated = casinoSchema.parse(body);

    const casino = await prisma.casino.create({
      data: {
        ...validated,
        data: JSON.stringify(validated.data),
        isActive: validated.isActive ?? true,
      },
    });

    return NextResponse.json({
      ...casino,
      data: JSON.parse(casino.data),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating casino:', error);
    return NextResponse.json(
      { error: 'Failed to create casino' },
      { status: 500 }
    );
  }
}

