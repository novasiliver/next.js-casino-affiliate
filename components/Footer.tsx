import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center">
                <span className="text-slate-950 font-bold text-xs">P</span>
              </div>
              <span className="text-white font-semibold tracking-tight">PRIMEBET</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The definitive source for premium online gaming reviews. We prioritize safety, speed, and fairness.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Discover</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/#top-list" className="hover:text-amber-400 transition-colors">Top 10 Casinos</Link></li>
              <li><Link href="/bonuses" className="hover:text-amber-400 transition-colors">New Bonuses</Link></li>
              <li><Link href="/crypto" className="hover:text-amber-400 transition-colors">Crypto Gambling</Link></li>
              <li><Link href="/mobile-apps" className="hover:text-amber-400 transition-colors">Mobile Apps</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Support</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/responsible-gaming" className="hover:text-amber-400 transition-colors">Responsible Gaming</Link></li>
              <li><Link href="/sitemap" className="hover:text-amber-400 transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Newsletter</h4>
            <p className="text-xs text-slate-500 mb-4">Get exclusive bonuses delivered to your inbox.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="border border-white/20 px-2 py-1 rounded text-[10px] font-bold text-white">18+</div>
            <div className="text-[10px] font-bold text-white">GAMBLEAWARE</div>
            <div className="text-[10px] font-bold text-white">SSL SECURE</div>
          </div>
          <div className="text-xs text-slate-600 text-center md:text-right">
            <p>© 2024 PrimeBet Media. All rights reserved.</p>
            <div className="flex gap-4 justify-center md:justify-end mt-2">
              <Link href="/privacy" className="hover:text-slate-400">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-400">Terms</Link>
              <Link href="/cookies" className="hover:text-slate-400">Cookies</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-white/5 text-[10px] text-slate-500 leading-relaxed text-justify">
          Gambling involves risk. Please gamble responsibly. PrimeBet is an affiliate website and does not offer real money gambling services. We receive compensation from the companies advertised on this site, which may impact how and where they appear. We do not guarantee the accuracy of information as bonuses and terms can change. Users must be 18+.
        </div>
      </div>
    </footer>
  );
}

