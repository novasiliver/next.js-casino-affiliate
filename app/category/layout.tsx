import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Browse Casinos by Category | Bonusory',
    description: 'Explore online casinos filtered by your preferred category. Find the perfect casino for your gaming style.',
    keywords: 'casino categories, casino types, online casino games',
    robots: 'index, follow',
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

