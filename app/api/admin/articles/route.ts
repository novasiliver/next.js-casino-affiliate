import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const articleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  imageUrl: z.string().optional(),
  publishedAt: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
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
    const validated = articleSchema.parse(body);

    // Check for duplicate slug
    const existingArticle = await prisma.article.findUnique({
      where: { slug: validated.slug },
    });

    if (existingArticle) {
      return NextResponse.json(
        { error: 'An article with this slug already exists', details: [{ path: ['slug'], message: 'Slug must be unique' }] },
        { status: 409 }
      );
    }

    const article = await prisma.article.create({
      data: {
        ...validated,
        publishedAt: validated.publishedAt ? new Date(validated.publishedAt) : null,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}

