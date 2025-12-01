import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const templateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  component: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const templates = await prisma.template.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
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
    const validated = templateSchema.parse(body);

    // Check if template with this slug already exists
    const existingTemplate = await prisma.template.findUnique({
      where: { slug: validated.slug },
    });

    if (existingTemplate) {
      return NextResponse.json(
        { error: 'Template with this slug already exists', template: existingTemplate },
        { status: 409 }
      );
    }

    const template = await prisma.template.create({
      data: {
        ...validated,
        isActive: validated.isActive ?? true,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    // Handle Prisma unique constraint errors
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Template with this slug already exists' },
        { status: 409 }
      );
    }

    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}

