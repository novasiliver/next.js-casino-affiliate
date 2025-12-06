import { generatePageMetadata } from "@/lib/seo";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return await generatePageMetadata('bonuses', {
    title: 'Casino Bonuses 2025 - Exclusive Welcome Offers | Bonusory',
    description: 'Find the best casino bonuses. Exclusive welcome packages, no deposit bonuses, and free spins. Updated daily.',
    keywords: 'casino bonuses, welcome bonus, no deposit bonus, free spins, reload bonus',
  });
}

export default function BonusesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

