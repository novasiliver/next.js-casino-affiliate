import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
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

    // Debug logging
    console.log('Templates fetched:', templates.length);
    console.log('Grouped templates:', Object.keys(groupedTemplates));
    console.log('Casino Review Page Template count:', groupedTemplates['Casino Review Page Template']?.length || 0);

    // Return with no-cache headers to ensure fresh data
    return NextResponse.json(
      { templates: groupedTemplates },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

