import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrintButton from "@/components/PrintButton";

export default function SafetyGuidePage() {
  const shareTitle = 'The Complete Guide to Online Casino Safety - Bonusory';

  return (
    <>
      <Navbar />
      
      {/* Progress Bar (Static for guide) */}
      <div className="fixed top-16 left-0 h-0.5 bg-emerald-500 z-50 w-full opacity-0"></div>

      {/* Article Header */}
      <header className="pt-32 pb-12 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
            <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
            <span className="text-emerald-500">Safety & Security</span>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              Player Protection
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-8 leading-tight">
              The Complete Guide to Online Casino Safety
            </h1>
            
            <div className="flex items-center justify-center gap-8 border-y border-white/5 py-6">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                  BO
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Bonusory Team</div>
                  <div className="text-xs text-slate-500">Editorial Staff</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10"></div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-slate-500">Last Updated</span>
                <span className="text-sm text-slate-300 font-medium">Nov 02, 2024</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10"></div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-slate-500">Category</span>
                <span className="text-sm text-slate-300 font-medium">Education</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar (Share) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 flex flex-col gap-4">
                <a
                  href="https://www.facebook.com/sharer/sharer.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(shareTitle)}`}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  </svg>
                </a>
                <div className="w-full h-px bg-white/10 my-2"></div>
                <PrintButton />
              </div>
            </div>

            {/* Article Body */}
            <article className="col-span-1 lg:col-span-8">
              
              {/* Intro Text */}
              <div className="prose-lg text-lg leading-relaxed font-light text-slate-300 mb-8">
                <p className="mb-6 drop-cap first-letter:float-left first-letter:text-5xl first-letter:pr-4 first-letter:font-bold first-letter:text-white">
                  Online gambling should be entertaining, not a source of stress or financial ruin. With the proliferation of new crypto casinos and betting platforms, distinguishing between legitimate operators and predatory sites has become increasingly difficult for the average player.
                </p>
                <p className="mb-6">
                  This guide outlines the non-negotiable security standards you must demand from any operator, as well as the tools available to maintain control over your gaming habits.
                </p>
              </div>

              {/* Safety Checklist Box */}
              <div id="checklist" className="my-10 p-6 md:p-8 rounded-xl bg-slate-900/50 border border-white/5 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  The &quot;Safe Site&quot; Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3 items-start p-3 rounded-lg bg-slate-900 border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-500 shrink-0 mt-1">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <div>
                      <span className="block text-sm font-medium text-white mb-1">SSL Encryption</span>
                      <span className="text-xs text-slate-500">Look for the padlock icon in the URL bar. Never deposit on HTTP sites.</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start p-3 rounded-lg bg-slate-900 border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-500 shrink-0 mt-1">
                      <path d="M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3"></path>
                      <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                      <path d="m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88"></path>
                      <circle cx="6" cy="14" r="3"></circle>
                    </svg>
                    <div>
                      <span className="block text-sm font-medium text-white mb-1">Valid License</span>
                      <span className="text-xs text-slate-500">Curacao, Malta (MGA), or UKGC verification in the footer.</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start p-3 rounded-lg bg-slate-900 border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-500 shrink-0 mt-1">
                      <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                      <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                      <line x1="6" x2="6.01" y1="6" y2="6"></line>
                      <line x1="6" x2="6.01" y1="18" y2="18"></line>
                    </svg>
                    <div>
                      <span className="block text-sm font-medium text-white mb-1">RNG Certified</span>
                      <span className="text-xs text-slate-500">Games audited by eCOGRA or iTechLabs for fairness.</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start p-3 rounded-lg bg-slate-900 border border-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-500 shrink-0 mt-1">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m4.93 4.93 4.24 4.24"></path>
                      <path d="m14.83 9.17 4.24-4.24"></path>
                      <path d="m14.83 14.83 4.24 4.24"></path>
                      <path d="m9.17 14.83-4.24 4.24"></path>
                      <circle cx="12" cy="12" r="4"></circle>
                    </svg>
                    <div>
                      <span className="block text-sm font-medium text-white mb-1">24/7 Support</span>
                      <span className="text-xs text-slate-500">Live chat availability to resolve withdrawal issues immediately.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* H2 Section: Technical Security */}
              <h2 id="technical" className="text-2xl md:text-3xl font-semibold text-white tracking-tight mt-12 mb-6">Technical Security Measures</h2>
              <p className="text-lg text-slate-400 leading-relaxed font-light mb-6">
                Before creating an account, verify how the casino handles your data. In 2024, standard password protection is not enough. You should prioritize casinos that offer <span className="text-white font-medium">Two-Factor Authentication (2FA)</span> via apps like Google Authenticator or Authy.
              </p>

              {/* Warning Block */}
              <div className="my-8 p-4 rounded-lg bg-rose-950/20 border border-rose-500/20 flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-rose-500 shrink-0">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <div>
                  <h4 className="text-sm font-bold text-rose-400 mb-1">Security Warning</h4>
                  <p className="text-sm text-rose-200/70">
                    Avoid casinos that send passwords via plain text email or use SMS for 2FA, as these are vulnerable to SIM-swapping attacks. Always use app-based 2FA.
                  </p>
                </div>
              </div>

              <h3 id="provably-fair" className="text-xl font-semibold text-white mt-8 mb-4">Provably Fair Technology</h3>
              <p className="text-lg text-slate-400 leading-relaxed font-light mb-6">
                For crypto casinos, &quot;Provably Fair&quot; is the gold standard. This technology allows players to verify the randomness of every roll or spin using cryptographic hashes. 
              </p>

              {/* Provably Fair Visual */}
              <div className="bg-slate-900 rounded-xl border border-white/10 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-slate-500">Server Seed (Hashed)</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-600">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  <span className="text-xs font-mono text-slate-500">Client Seed (User)</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-600">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  <span className="text-xs font-mono text-emerald-500 font-bold">Fair Result</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 w-3/4"></div>
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">
                  The operator cannot manipulate the outcome once the bet is placed because the seed is generated beforehand.
                </p>
              </div>

              <h2 id="responsible" className="text-2xl md:text-3xl font-semibold text-white tracking-tight mt-12 mb-6">Responsible Gaming Tools</h2>
              <p className="text-lg text-slate-400 leading-relaxed font-light mb-6">
                Safety isn&apos;t just about external threats; it&apos;s also about managing your own behavior. Reputable casinos provide a suite of tools to help you stay in control.
              </p>

              <div className="space-y-4">
                <div className="group border border-white/5 hover:border-white/10 bg-slate-900/40 rounded-lg p-5 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-medium">Deposit Limits</h4>
                    <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">Most Essential</span>
                  </div>
                  <p className="text-sm text-slate-400">Restrict the amount of money you can deposit within a daily, weekly, or monthly timeframe. Once reached, no further transactions are allowed.</p>
                </div>

                <div className="group border border-white/5 hover:border-white/10 bg-slate-900/40 rounded-lg p-5 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-medium">Self-Exclusion</h4>
                    <span className="text-xs px-2 py-1 rounded bg-rose-950/30 text-rose-400 border border-rose-500/20">Emergency</span>
                  </div>
                  <p className="text-sm text-slate-400">Voluntarily lock your account for a set period (6 months to 5 years). During this time, the casino must prevent you from logging in or creating new accounts.</p>
                </div>
                
                <div className="group border border-white/5 hover:border-white/10 bg-slate-900/40 rounded-lg p-5 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-medium">Reality Checks</h4>
                    <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">Awareness</span>
                  </div>
                  <p className="text-sm text-slate-400">Pop-up notifications that appear every 30 or 60 minutes, displaying your session duration and net profit/loss.</p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <h3 className="text-xl font-semibold text-white mb-4">Final Recommendation</h3>
                <p className="text-lg text-slate-400 leading-relaxed font-light mb-8">
                  If you ever feel that gambling is negatively affecting your life, stop immediately. Use the resources provided in the sidebar to seek professional help. Gambling is a form of entertainment, not a way to make money.
                </p>
              </div>

            </article>

            {/* Right Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 space-y-8">
              
              {/* Help Box */}
              <div id="support" className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/20 blur-2xl rounded-full"></div>
                <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-rose-500">
                    <path d="M13 2a9 9 0 0 1 9 9"></path>
                    <path d="M13 6a5 5 0 0 1 5 5"></path>
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                  </svg>
                  Need Help?
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Confidential support is available 24/7. You are not alone.
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-950/50 rounded border border-white/5">
                    <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">USA / International</span>
                    <span className="block text-sm text-white font-mono">1-800-522-4700</span>
                  </div>
                  <div className="p-3 bg-slate-950/50 rounded border border-white/5">
                    <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">UK</span>
                    <span className="block text-sm text-white font-mono">0808 8020 133</span>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="sticky top-32">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Navigation</h4>
                <ul className="space-y-0 border-l border-white/10">
                  <li>
                    <a href="#checklist" className="block pl-4 py-2 border-l border-emerald-500 -ml-px text-sm font-medium text-emerald-500">Safety Checklist</a>
                  </li>
                  <li>
                    <a href="#technical" className="block pl-4 py-2 border-l border-transparent -ml-px text-sm text-slate-500 hover:text-slate-300 hover:border-slate-700 transition-all">Technical Security</a>
                  </li>
                  <li>
                    <a href="#provably-fair" className="block pl-4 py-2 border-l border-transparent -ml-px text-sm text-slate-500 hover:text-slate-300 hover:border-slate-700 transition-all">Provably Fair</a>
                  </li>
                  <li>
                    <a href="#responsible" className="block pl-4 py-2 border-l border-transparent -ml-px text-sm text-slate-500 hover:text-slate-300 hover:border-slate-700 transition-all">Responsible Tools</a>
                  </li>
                  <li>
                    <a href="#support" className="block pl-4 py-2 border-l border-transparent -ml-px text-sm text-slate-500 hover:text-slate-300 hover:border-slate-700 transition-all">Emergency Support</a>
                  </li>
                </ul>

                {/* Safe Casino Widget */}
                <div className="mt-8 rounded-xl bg-slate-900 border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-500">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <h4 className="text-sm font-bold text-white">Verified Safe</h4>
                  </div>
                  <div className="space-y-3">
                    <Link href="/review/ignite-casino" className="flex items-center justify-between p-2 rounded bg-slate-800/50 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-bold">IG</div>
                        <div>
                          <div className="text-xs text-white font-medium">Ignite Casino</div>
                          <div className="text-[10px] text-emerald-400">10/10 Safety</div>
                        </div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-600">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </Link>
                    <Link href="/review/royal-fort" className="flex items-center justify-between p-2 rounded bg-slate-800/50 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-bold">RF</div>
                        <div>
                          <div className="text-xs text-white font-medium">Royal Fort</div>
                          <div className="text-[10px] text-emerald-400">9.8/10 Safety</div>
                        </div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-600">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
