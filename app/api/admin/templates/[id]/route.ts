import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const templateSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  component: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
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
    const validated = templateSchema.parse(body);

    const template = await prisma.template.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json(template);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating template:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
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

    // Get template info before deleting to potentially remove component file
    const template = await prisma.template.findUnique({
      where: { id },
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Check if any casinos are using this template
    const casinosUsingTemplate = await prisma.casino.findMany({
      where: {
        template: template.component, // Casinos store the component name in template field
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    if (casinosUsingTemplate.length > 0) {
      return NextResponse.json(
        { 
          error: `Cannot delete template. ${casinosUsingTemplate.length} casino(s) are using this template. Please update or delete those casinos first.`,
          casinos: casinosUsingTemplate.map(c => ({ name: c.name, slug: c.slug }))
        },
        { status: 409 }
      );
    }

    // Delete the template from database
    await prisma.template.delete({
      where: { id },
    });

    // Optionally delete the component file if it exists
    try {
      const { unlink } = await import('fs/promises');
      const { join } = await import('path');
      const { existsSync } = await import('fs');

      // Map category to directory name
      const categoryToDir: Record<string, string> = {
        'Casino Review Page Template': 'casino',
        'Post Page Template': 'post',
        'Game Page Template': 'game',
        'Bonus Page Template': 'bonus',
      };

      const categoryDir = categoryToDir[template.category] || 'casino';
      // Use component name, not slug, as that's what the file is named
      const componentPath = join(
        process.cwd(),
        'components',
        'templates',
        categoryDir,
        `${template.component}.tsx`
      );

      if (existsSync(componentPath)) {
        await unlink(componentPath);
      }
    } catch (fileError) {
      // Log but don't fail if file deletion fails
      console.warn('Failed to delete component file:', fileError);
    }

    return NextResponse.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}

