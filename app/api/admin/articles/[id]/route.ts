import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const articleSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  imageUrl: z.string().optional(),
  publishedAt: z.string().optional(),
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
    const validated = articleSchema.parse(body);

    const updateData: any = { ...validated };
    if (validated.publishedAt !== undefined) {
      updateData.publishedAt = validated.publishedAt ? new Date(validated.publishedAt) : null;
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(article);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
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

    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Article deleted' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
