import { generatePageMetadata } from "@/lib/seo";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return await generatePageMetadata('contact', {
    title: 'Contact Us - Bonusory',
    description: 'Get in touch with the Bonusory team. We\'re here to help with any questions about casinos or bonuses.',
    keywords: 'contact us, customer support, help',
  });
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

