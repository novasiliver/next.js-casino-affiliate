import { generatePageMetadata } from "@/lib/seo";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return await generatePageMetadata('privacy', {
    title: 'Privacy Policy - Bonusory',
    description: 'Read our privacy policy to learn how we collect, use, and protect your personal information.',
    keywords: 'privacy policy, data protection, privacy',
  });
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

