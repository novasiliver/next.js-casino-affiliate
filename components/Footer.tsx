import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center">
                <span className="text-slate-950 font-bold text-xs">B</span>
              </div>
              <span className="text-white font-semibold tracking-tight">BONUSORY</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              The definitive source for premium online gaming reviews. We prioritize safety, speed, and fairness.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Discover</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/casinos" className="hover:text-amber-400 transition-colors">All Casinos</Link></li>
              <li><Link href="/#top-list" className="hover:text-amber-400 transition-colors">Top 10 Casinos</Link></li>
              <li><Link href="/bonuses" className="hover:text-amber-400 transition-colors">Casino Bonuses</Link></li>
              <li><Link href="/guides" className="hover:text-amber-400 transition-colors">Casino Guides</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/safety-guide" className="hover:text-amber-400 transition-colors">Safety Guide</Link></li>
              <li><a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Responsible Gaming</a></li>
              <li><a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Problem Gambling Help</a></li>
              <li><a href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">GamCare</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-amber-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Newsletter</h4>
            <p className="text-xs text-slate-500 mb-4">Get exclusive bonuses and updates delivered to your inbox weekly.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="border border-white/20 px-2 py-1 rounded text-[10px] font-bold text-white">18+</div>
            <a 
              href="https://www.begambleaware.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-white hover:text-amber-400 transition-colors"
            >
              BEGAMBLEAWARE
            </a>
            <div className="text-[10px] font-bold text-white">SSL SECURE</div>
          </div>
          <div className="text-xs text-slate-600 text-center md:text-right">
            <p>© 2025 Bonusory Media. All rights reserved.</p>
            <div className="flex gap-4 justify-center md:justify-end mt-2">
              <Link href="/privacy" className="hover:text-slate-400">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-400">Terms</Link>
              <Link href="/cookies" className="hover:text-slate-400">Cookies</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-white/5 text-[10px] text-slate-500 leading-relaxed text-justify">
          Gambling involves risk. Please gamble responsibly. Bonusory is an affiliate website and does not offer real money gambling services. We receive compensation from the companies advertised on this site, which may impact how and where they appear. We do not guarantee the accuracy of information as bonuses and terms can change. Users must be 18+.
        </div>
      </div>
    </footer>
  );
}

