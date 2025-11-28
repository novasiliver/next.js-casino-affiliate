import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    // Group templates by category
    const groupedTemplates: Record<string, Array<{
      id: string;
      name: string;
      slug: string;
    }>> = {};

    templates.forEach((template) => {
      const category = template.category || 'Other';
      if (!groupedTemplates[category]) {
        groupedTemplates[category] = [];
      }
      groupedTemplates[category].push({
        id: template.id,
        name: template.name,
        slug: template.slug,
      });
    });

    return NextResponse.json({ templates: groupedTemplates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

