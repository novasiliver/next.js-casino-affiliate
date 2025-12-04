import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bonusory - Premium Casino Reviews & Bonuses",
  description: "Curated selection of the world's most premium gaming destinations. Exclusive bonuses, instant withdrawals, and bank-grade security vetted by experts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-300 antialiased selection:bg-amber-500/30 selection:text-amber-200`}>
        {children}
        <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" />
        <Script id="lucide-init" strategy="afterInteractive">
          {`if (typeof lucide !== 'undefined') { lucide.createIcons(); }`}
        </Script>
      </body>
    </html>
  );
}

