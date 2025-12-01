import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bonusSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  casinoId: z.string().optional(),
  casinoSlug: z.string().optional(),
  casinoName: z.string().min(1).optional(),
  casinoLogo: z.string().min(1).optional(),
  casinoRating: z.number().min(0).max(5).optional(),
  amount: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validated = bonusSchema.parse(body);

    // Check for duplicate slug if slug is being updated
    if (validated.slug) {
      const existingBonus = await prisma.bonus.findFirst({
        where: {
          slug: validated.slug,
          id: { not: id },
        },
      });

      if (existingBonus) {
        return NextResponse.json(
          { error: 'A bonus with this slug already exists', details: [{ path: ['slug'], message: 'Slug must be unique' }] },
          { status: 409 }
        );
      }
    }

    const updateData: any = { ...validated };
    if (validated.expiry !== undefined) {
      updateData.expiry = validated.expiry ? new Date(validated.expiry) : null;
    }
    if (validated.features !== undefined) {
      updateData.features = JSON.stringify(validated.features);
    }

    const bonus = await prisma.bonus.update({
      where: { id },
      data: updateData,
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

    console.error('Error updating bonus:', error);
    return NextResponse.json(
      { error: 'Failed to update bonus' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.bonus.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Bonus deleted' });
  } catch (error) {
    console.error('Error deleting bonus:', error);
    return NextResponse.json(
      { error: 'Failed to delete bonus' },
      { status: 500 }
    );
  }
}

