import { generatePageMetadata } from "@/lib/seo";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return await generatePageMetadata('cookies', {
    title: 'Cookies Policy - Bonusory',
    description: 'Learn about how we use cookies and similar technologies on Bonusory.',
    keywords: 'cookies policy, cookie consent, tracking',
  });
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

