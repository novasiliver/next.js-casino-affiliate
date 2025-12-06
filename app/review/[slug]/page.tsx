import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Template1 from "@/components/templates/casino/template1";
import { Casino } from "@/types/casino";
import { prisma } from "@/lib/db";
import { generateCasinoMetadata } from "@/lib/seo";
import { getCasinoReviewSchema, getBreadcrumbSchema } from "@/lib/structured-data";

export const dynamic = 'force-dynamic';

async function getCasinoBySlug(slug: string): Promise<Casino | null> {
  try {
    const casino = await prisma.casino.findUnique({
      where: { slug },
    });

    if (!casino || !casino.isActive) {
      return null;
    }

    // Parse the data JSON string
    let parsedData = {};
    try {
      parsedData = casino.data ? JSON.parse(casino.data) : {};
    } catch (error) {
      console.error('Error parsing casino data:', error);
      parsedData = {};
    }
    
    // Merge the data object into the main casino object
    // This flattens the structure so templates can access casino.bonus instead of casino.data.bonus
    const casinoResponse = {
      id: casino.id,
      slug: casino.slug,
      name: casino.name,
      logo: casino.logo,
      rating: casino.rating,
      isActive: casino.isActive,
      rank: casino.rank,
      createdAt: casino.createdAt,
      updatedAt: casino.updatedAt,
      // Merge all fields from the data object (bonus, verdict, prosCons, banking, etc.)
      ...parsedData,
    } as unknown as Casino;

    return casinoResponse;
  } catch (error) {
    console.error('Error fetching casino:', error);
    return null;
  }
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const casino = await getCasinoBySlug(slug);

  if (!casino) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bonusory.com';
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Review', url: `${baseUrl}/casinos` },
    { name: casino.name, url: `${baseUrl}/review/${casino.slug}` }
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getCasinoReviewSchema(casino)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbItems)) }}
      />
      
      <Navbar currentPage="review" />
      <Template1 casino={casino} previewMode={false} />
      <Footer />
    </>
  );
}

// Generate static params for known casinos (optional, for static generation)
export async function generateStaticParams() {
  try {
    const casinos = await prisma.casino.findMany({
      where: { isActive: true },
      select: { slug: true },
    });
    
    return casinos.map((casino) => ({
      slug: casino.slug,
    }));
  } catch (error) {
    console.error('Error fetching casinos for static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const casinoDb = await prisma.casino.findUnique({
      where: { slug },
    });
    
    if (!casinoDb) {
      return {
        title: "Casino Not Found - Bonusory",
      };
    }

    // Parse the data to get description
    let parsedData = {};
    try {
      parsedData = casinoDb.data ? JSON.parse(casinoDb.data) : {};
    } catch (error) {
      console.error('Error parsing casino data for metadata:', error);
    }

    // Combine casino data with SEO fields
    const casinoForMetadata = {
      ...casinoDb,
      ...parsedData,
    };

    return generateCasinoMetadata(casinoForMetadata);
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Casino Review - Bonusory",
    };
  }
}

