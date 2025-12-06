import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return await generatePageMetadata('safety-guide', {
    title: 'Safety Guide - Responsible Gambling | Bonusory',
    description: 'Learn how to gamble safely and responsibly. Tips, resources, and support for online casino players.',
    keywords: 'responsible gambling, gambling safety, problem gambling, gamble aware',
  });
}

export default function SafetyGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

