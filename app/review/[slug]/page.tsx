import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadTemplate, loadDefaultTemplate } from "@/lib/template-loader";
import { Casino } from "@/types/casino";
import casinosData from "@/data/casinos.json";

async function getCasinoBySlug(slug: string): Promise<Casino | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/casinos/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data as Casino;
  } catch (error) {
    console.error('Error fetching casino:', error);
    // Fallback to JSON data
    return (casinosData as Casino[]).find((casino) => casino.slug === slug) || null;
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
    // Try to fetch from database first
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/casinos`, {
      cache: 'no-store',
    });
    
    if (res.ok) {
      const data = await res.json();
      const casinos = data.casinos || [];
      return casinos
        .filter((casino: any) => casino.isActive)
        .map((casino: any) => ({
          slug: casino.slug,
        }));
    }
  } catch (error) {
    console.error('Error fetching casinos for static params:', error);
  }
  
  // Fallback to static data
  return (casinosData as Casino[]).map((casino) => ({
    slug: casino.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const casino = await getCasinoBySlug(slug);
  
  if (!casino) {
    return {
      title: "Casino Not Found - PrimeBet",
    };
  }

  const bonusText = casino.bonus?.amount || 'exclusive welcome bonus';
  
  return {
    title: `${casino.name} Review 2024 - PrimeBet`,
    description: `Read our comprehensive review of ${casino.name}. ${bonusText}, ${casino.rating}/5 rating, and expert analysis.`,
  };
}

