import { generatePageMetadata } from "@/lib/seo";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return await generatePageMetadata('about', {
    title: 'About Us - Bonusory',
    description: 'Learn about Bonusory, our mission, and how we help players find the best online casinos.',
    keywords: 'about bonusory, about us, casino reviews',
  });
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

