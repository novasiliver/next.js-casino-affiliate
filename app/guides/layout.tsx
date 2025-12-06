import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return await generatePageMetadata('guides', {
    title: 'Casino Guides & Strategy - Expert Tips | Bonusory',
    description: 'Learn winning strategies, game rules, and expert tips. Comprehensive guides for online casino players.',
    keywords: 'casino guides, gambling strategy, casino tips, game rules, casino news',
  });
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

