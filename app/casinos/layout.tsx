import { generatePageMetadata } from "@/lib/seo";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return await generatePageMetadata('casinos', {
    title: 'Top Rated Online Casinos 2025 - Reviews & Bonuses | Bonusory',
    description: 'Discover the best online casinos. Expert reviews, exclusive bonuses, and verified licenses. Find your perfect casino today.',
    keywords: 'online casinos, casino reviews, best casinos, casino bonuses, top casinos',
  });
}

export default function CasinosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

