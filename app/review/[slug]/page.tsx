import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadTemplate, loadDefaultTemplate } from "@/lib/template-loader";
import { Casino } from "@/types/casino";
import { prisma } from "@/lib/db";

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
      template: casino.template,
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

  // Load template dynamically
  let TemplateComponent = null;
  
  if (casino.template) {
    // Try to load the specified template (assuming casino category)
    TemplateComponent = await loadTemplate('casino', casino.template);
  }
  
  // Fallback to default template if not found
  if (!TemplateComponent) {
    TemplateComponent = await loadDefaultTemplate('casino');
  }
  
  // Final fallback - if still no template, show error
  if (!TemplateComponent) {
    console.error('No template found for casino:', casino.slug);
    notFound();
  }

  return (
    <>
      <Navbar currentPage="review" />
      <TemplateComponent casino={casino} />
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
  const casino = await getCasinoBySlug(slug);
  
  if (!casino) {
    return {
      title: "Casino Not Found - Bonusory",
    };
  }

  const bonusText = casino.bonus?.amount || 'exclusive welcome bonus';
  
  return {
    title: `${casino.name} Review 2024 - Bonusory`,
    description: `Read our comprehensive review of ${casino.name}. ${bonusText}, ${casino.rating}/5 rating, and expert analysis.`,
  };
}

