import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SitemapPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Sitemap</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li><Link href="/" className="text-amber-400 hover:text-amber-300">Home</Link></li>
                <li><Link href="/bonuses" className="text-amber-400 hover:text-amber-300">Bonuses</Link></li>
                <li><Link href="/games" className="text-amber-400 hover:text-amber-300">Games</Link></li>
                <li><Link href="/guides" className="text-amber-400 hover:text-amber-300">Guides</Link></li>
                <li><Link href="/crypto" className="text-amber-400 hover:text-amber-300">Crypto Casinos</Link></li>
                <li><Link href="/mobile-apps" className="text-amber-400 hover:text-amber-300">Mobile Apps</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Information</h2>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-amber-400 hover:text-amber-300">About Us</Link></li>
                <li><Link href="/safety-guide" className="text-amber-400 hover:text-amber-300">Safety Guide</Link></li>
                <li><Link href="/responsible-gaming" className="text-amber-400 hover:text-amber-300">Responsible Gaming</Link></li>
                <li><Link href="/contact" className="text-amber-400 hover:text-amber-300">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Legal</h2>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-amber-400 hover:text-amber-300">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-amber-400 hover:text-amber-300">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-amber-400 hover:text-amber-300">Cookie Policy</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Categories</h2>
              <ul className="space-y-2">
                <li><Link href="/category/slots" className="text-amber-400 hover:text-amber-300">Slots</Link></li>
                <li><Link href="/category/live-dealer" className="text-amber-400 hover:text-amber-300">Live Dealer</Link></li>
                <li><Link href="/category/crypto" className="text-amber-400 hover:text-amber-300">Crypto</Link></li>
                <li><Link href="/category/crash-games" className="text-amber-400 hover:text-amber-300">Crash Games</Link></li>
                <li><Link href="/category/sportsbook" className="text-amber-400 hover:text-amber-300">Sportsbook</Link></li>
                <li><Link href="/category/poker" className="text-amber-400 hover:text-amber-300">Poker</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

