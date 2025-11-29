import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadTemplate } from "@/lib/template-loader";
import { Casino } from "@/types/casino";
import { prisma } from "@/lib/db";

// Get a sample casino for template preview
async function getSampleCasino(): Promise<Casino | null> {
  try {
    // Try to get the first active casino from database
    const casino = await prisma.casino.findFirst({
      where: { isActive: true },
      orderBy: { rank: 'asc' },
    });

    if (casino) {
      const data = JSON.parse(casino.data);
      return {
        slug: casino.slug,
        name: casino.name,
        logo: casino.logo,
        rating: casino.rating,
        template: casino.template,
        ...data,
      } as Casino;
    }

    // Fallback to demo data if no casino found
    return {
      slug: "demo-casino",
      name: "Demo Casino",
      logo: "DEMO",
      rating: 4.8,
      votes: 1250,
      established: 2020,
      region: "Global",
      payoutSpeed: "24-48 hours",
      rtp: "96.5%",
      bonus: {
        title: "Welcome Bonus",
        amount: "$3,000 + 150 Free Spins",
        details: "Valid on your first 3 deposits",
        code: "WELCOME3000",
        wagering: "35x Bonus",
        minDeposit: "$20.00",
        expiry: "30 Days"
      },
      tags: ["Instant Payout", "Crypto Friendly", "Live Casino"],
      description: "A premium online casino with excellent game selection and fast payouts",
      template: "template1",
      verdict: "This is a demo casino review template. When you click on a template from the navbar, you'll see how it looks with sample data. In production, each casino will use its own data with the selected template.",
      prosCons: {
        pros: [
          "Fast withdrawal processing",
          "Large game library with 3,000+ games",
          "24/7 customer support",
          "Mobile-friendly platform"
        ],
        cons: [
          "Limited payment methods in some regions",
          "No dedicated mobile app"
        ]
      },
      banking: [
        {
          name: "Bitcoin",
          type: "Cryptocurrency",
          time: "15 minutes",
          fee: "Free"
        },
        {
          name: "Visa",
          type: "Credit Card",
          time: "1-3 days",
          fee: "Free"
        },
        {
          name: "Bank Transfer",
          type: "Banking",
          time: "3-5 days",
          fee: "$10"
        }
      ],
      gameSelection: {
        slots: 2500,
        liveTables: 150,
        jackpots: 45,
        liveAction: "24/7",
        providers: ["NetEnt", "Microgaming", "Evolution Gaming", "Pragmatic Play"]
      },
      ratingBreakdown: {
        fairness: 4.9,
        bonuses: 4.7,
        gameVariety: 4.8,
        supportSpeed: 4.6
      },
      casinoInfo: {
        established: 2020,
        license: "Malta Gaming Authority",
        owner: "Demo Gaming Ltd",
        minDeposit: "$20",
        vpnFriendly: true
      },
      reviewContent: {
        userExperience: "The platform offers a smooth and intuitive user experience with modern design and easy navigation.",
        customerSupport: "Customer support is available 24/7 via live chat, email, and phone with average response times under 2 minutes."
      }
    };
  } catch (error) {
    console.error('Error fetching sample casino:', error);
    return null;
  }
}

export default async function TemplatePreviewPage({ 
  params 
}: { 
  params: Promise<{ templateSlug: string }> 
}) {
  const { templateSlug } = await params;
  
  // Try to get template from database to get the component name
  let componentName = templateSlug;
  try {
    const template = await prisma.template.findUnique({
      where: { slug: templateSlug },
    });
    if (template?.component) {
      componentName = template.component;
    }
  } catch (error) {
    console.error('Error fetching template:', error);
    // Fallback to using templateSlug
  }
  
  // Load the template
  const TemplateComponent = await loadTemplate('casino', componentName);
  
  if (!TemplateComponent) {
    console.error(`Template not found: casino/${componentName}`);
    notFound();
  }

  // Get sample casino data
  const casino = await getSampleCasino();
  
  if (!casino) {
    notFound();
  }

  return (
    <>
      <Navbar currentPage="review" />
      <TemplateComponent casino={casino} previewMode={true} />
      <Footer />
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ templateSlug: string }> 
}) {
  const { templateSlug } = await params;
  
  return {
    title: `Template Preview: ${templateSlug} - PrimeBet`,
    description: `Preview of the ${templateSlug} casino review template`,
  };
}

