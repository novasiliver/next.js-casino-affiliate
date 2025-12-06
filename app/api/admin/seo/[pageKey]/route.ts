import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET SEO settings for a specific page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pageKey } = await params;
    const seoSetting = await prisma.seoSettings.findUnique({
      where: { pageKey }
    });

    if (!seoSetting) {
      return NextResponse.json({ seoSetting: null });
    }

    return NextResponse.json({ seoSetting });
  } catch (error) {
    console.error('Error fetching SEO setting:', error);
    return NextResponse.json({ error: 'Failed to fetch SEO setting' }, { status: 500 });
  }
}

// DELETE SEO settings for a specific page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pageKey } = await params;
    await prisma.seoSettings.delete({
      where: { pageKey }
    });

    return NextResponse.json({ message: 'SEO settings deleted successfully' });
  } catch (error) {
    console.error('Error deleting SEO settings:', error);
    return NextResponse.json({ error: 'Failed to delete SEO settings' }, { status: 500 });
  }
}

