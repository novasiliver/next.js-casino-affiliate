import { generatePageMetadata } from "@/lib/seo";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return await generatePageMetadata('terms', {
    title: 'Terms of Service - Bonusory',
    description: 'Read our terms of service to understand the rules and guidelines for using Bonusory.',
    keywords: 'terms of service, terms and conditions, user agreement',
  });
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

