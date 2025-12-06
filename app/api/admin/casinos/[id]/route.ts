import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const casinoSchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  logo: z.string().min(1).optional(),
  rating: z.number().min(0).max(5).optional(),
  data: z.any().optional(),
  isActive: z.boolean().optional(),
  rank: z.number().optional(),
  categories: z.array(z.string()).optional(),
  // SEO fields
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  seoAuthor: z.string().optional(),
  seoCanonical: z.string().optional(),
  seoRobots: z.string().optional(),
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
    const validated = casinoSchema.parse(body);

    const updateData: any = { ...validated };
    // if (validated.data) {
    //   updateData.data = JSON.stringify(validated.data);
    // }

    if ("data" in validated) {
      updateData.data = JSON.stringify(validated.data);
    }

    if ("categories" in validated) {
      updateData.categories = validated.categories ? JSON.stringify(validated.categories) : null;
    }

    const casino = await prisma.casino.update({
      where: { id },
      data: updateData,
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

    console.error('Error updating casino:', error);
    return NextResponse.json(
      { error: 'Failed to update casino' },
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

    await prisma.casino.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Casino deleted' });
  } catch (error) {
    console.error('Error deleting casino:', error);
    return NextResponse.json(
      { error: 'Failed to delete casino' },
      { status: 500 }
    );
  }
}

