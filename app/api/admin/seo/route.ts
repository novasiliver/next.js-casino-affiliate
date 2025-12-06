import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET all SEO settings
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const seoSettings = await prisma.seoSettings.findMany({
      orderBy: { pageName: 'asc' }
    });
    
    return NextResponse.json({ seoSettings });
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return NextResponse.json({ error: 'Failed to fetch SEO settings' }, { status: 500 });
  }
}

// POST create or update SEO settings
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      pageKey,
      pageName,
      seoTitle,
      seoDescription,
      seoKeywords,
      seoAuthor,
      seoPublisher,
      seoCanonical,
      seoRobots,
      ogImage
    } = body;

    if (!pageKey || !pageName) {
      return NextResponse.json({ error: 'Page key and name are required' }, { status: 400 });
    }

    // Upsert (create or update)
    const seoSetting = await prisma.seoSettings.upsert({
      where: { pageKey },
      update: {
        pageName,
        seoTitle,
        seoDescription,
        seoKeywords,
        seoAuthor,
        seoPublisher,
        seoCanonical,
        seoRobots,
        ogImage
      },
      create: {
        pageKey,
        pageName,
        seoTitle,
        seoDescription,
        seoKeywords,
        seoAuthor,
        seoPublisher,
        seoCanonical,
        seoRobots,
        ogImage
      }
    });

    return NextResponse.json({ seoSetting }, { status: 200 });
  } catch (error) {
    console.error('Error creating/updating SEO settings:', error);
    return NextResponse.json({ error: 'Failed to save SEO settings' }, { status: 500 });
  }
}

