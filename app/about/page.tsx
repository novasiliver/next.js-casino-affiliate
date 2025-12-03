"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  useEffect(() => {
    // Initialize Lucide icons if needed
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-slate-950 text-slate-300 antialiased selection:bg-amber-500/30 selection:text-amber-200">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
            <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tighter mb-6 leading-[1.1]">
              Bringing <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">transparency</span> to the<br /> world of online gambling.
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Bonusory was founded by industry veterans and data scientists with a single mission: to provide the most accurate, data-driven casino reviews on the internet. No fluff, just facts.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/5 py-8">
              <div>
                <div className="text-3xl font-bold text-white tracking-tight mb-1">10+</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Years Active</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white tracking-tight mb-1">850+</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Casinos Reviewed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white tracking-tight mb-1">$50M</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Bonuses Claimed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white tracking-tight mb-1">0%</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Bias Tolerated</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 hover:border-amber-500/30 transition-colors duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-amber-500/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-slate-400 group-hover:text-amber-500 transition-colors">
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">Safety First</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We never list a casino without verifying its license validity directly with the regulator. If it&apos;s not safe for us, it&apos;s not safe for you.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 hover:border-amber-500/30 transition-colors duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-amber-500/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-slate-400 group-hover:text-amber-500 transition-colors">
                    <path d="M6 18h8"></path>
                    <path d="M3 22h18"></path>
                    <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
                    <path d="M9 14h2"></path>
                    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path>
                    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">Data Driven</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We don&apos;t rely on feelings. We deposit real money, test withdrawal speeds with a stopwatch, and analyze terms of service with legal experts.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 hover:border-amber-500/30 transition-colors duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-amber-500/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-slate-400 group-hover:text-amber-500 transition-colors">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">Player Advocacy</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We stand between the player and the casino. If a casino treats a player unfairly, we remove them from our lists. Simple as that.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Team Section */}
        <section className="py-20 bg-slate-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">Meet the Experts</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                A diverse team of former casino managers, professional poker players, and tech auditors working together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Team Member 1 */}
              <div className="group relative rounded-2xl bg-slate-900 border border-white/5 overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" alt="Team Member" className="transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100 opacity-80 w-full h-full object-cover" />
                </div>
                <div className="p-4 bg-slate-900 absolute bottom-0 w-full border-t border-white/5 backdrop-blur-md bg-slate-900/90">
                  <h4 className="text-lg font-semibold text-white">Alex Mercer</h4>
                  <p className="text-xs text-amber-400 font-medium uppercase tracking-wider mb-2">Editor in Chief</p>
                  <p className="text-xs text-slate-500 line-clamp-2">Former floor manager at a major Vegas strip casino with 15 years experience.</p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="group relative rounded-2xl bg-slate-900 border border-white/5 overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" alt="Team Member" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-4 bg-slate-900 absolute bottom-0 w-full border-t border-white/5 backdrop-blur-md bg-slate-900/90">
                  <h4 className="text-lg font-semibold text-white">Sarah Chen</h4>
                  <p className="text-xs text-amber-400 font-medium uppercase tracking-wider mb-2">Head of Compliance</p>
                  <p className="text-xs text-slate-500 line-clamp-2">Legal expert specializing in international gaming regulations and licensing.</p>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="group relative rounded-2xl bg-slate-900 border border-white/5 overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80" alt="Team Member" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-4 bg-slate-900 absolute bottom-0 w-full border-t border-white/5 backdrop-blur-md bg-slate-900/90">
                  <h4 className="text-lg font-semibold text-white">David Torres</h4>
                  <p className="text-xs text-amber-400 font-medium uppercase tracking-wider mb-2">Technical Auditor</p>
                  <p className="text-xs text-slate-500 line-clamp-2">Software engineer ensuring RNG fairness and site security protocols.</p>
                </div>
              </div>

              {/* Team Member 4 */}
              <div className="group relative rounded-2xl bg-slate-900 border border-white/5 overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80" alt="Team Member" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-4 bg-slate-900 absolute bottom-0 w-full border-t border-white/5 backdrop-blur-md bg-slate-900/90">
                  <h4 className="text-lg font-semibold text-white">Elena Popov</h4>
                  <p className="text-xs text-amber-400 font-medium uppercase tracking-wider mb-2">Crypto Analyst</p>
                  <p className="text-xs text-slate-500 line-clamp-2">Blockchain specialist focused on crypto casinos and provably fair algorithms.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Review Process Steps */}
        <section className="py-20 bg-slate-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-white tracking-tight mb-6">Our 5-Step Review Standard</h2>
                <p className="text-slate-400 mb-8">
                  Most sites just copy-paste information. We don&apos;t. Every casino listed on Bonusory goes through a rigorous manual auditing process that takes an average of 40 hours per brand.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">1</div>
                    <div>
                      <h4 className="text-white font-medium">Background Check</h4>
                      <p className="text-sm text-slate-500 mt-1">We verify company ownership, past fines, and license validity directly with regulators.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">2</div>
                    <div>
                      <h4 className="text-white font-medium">Deposit & Bonus</h4>
                      <p className="text-sm text-slate-500 mt-1">We deposit real money to check if the bonus terms match the fine print (wagering, max bets).</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">3</div>
                    <div>
                      <h4 className="text-white font-medium">Gameplay Testing</h4>
                      <p className="text-sm text-slate-500 mt-1">We play on desktop and mobile to ensure games don&apos;t lag and RTP seems consistent.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">4</div>
                    <div>
                      <h4 className="text-white font-medium">Support Audit</h4>
                      <p className="text-sm text-slate-500 mt-1">We ask difficult questions to support agents anonymously to test knowledge and speed.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">5</div>
                    <div>
                      <h4 className="text-white font-medium">Withdrawal Stress Test</h4>
                      <p className="text-sm text-slate-500 mt-1">The most important step. We withdraw winnings to crypto and bank accounts to time the speed.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-indigo-500/10 rounded-2xl blur-2xl"></div>
                <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <span className="text-sm font-mono text-slate-500">AUDIT_LOG_2025.txt</span>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                    </div>
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">[PASS]</span>
                      <span className="text-slate-300">SSL Certificate Valid (Expires 2025)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">[PASS]</span>
                      <span className="text-slate-300">License: Curacao 8048/JAZ verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-400">[FAIL]</span>
                      <span className="text-slate-300">Live Support: Response time &gt; 15 mins</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">[PASS]</span>
                      <span className="text-slate-300">Game Provider Integrity Check</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">[PASS]</span>
                      <span className="text-slate-300">Terms of Service Analysis</span>
                    </div>
                    <div className="pl-4 border-l border-white/10 mt-2 pt-2 text-slate-500 italic">
                      &quot;Clause 4.2 regarding withdrawal limits deemed predatory. Recommendation: DO NOT LIST.&quot;
                    </div>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <span className="text-xs text-slate-400">Audited by Sarah C.</span>
                    </div>
                    <span className="text-xs font-mono text-slate-600">ID: #992-AZ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Offices / Global */}
        <section className="py-20 bg-slate-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-semibold text-white tracking-tight mb-8">Global Presence</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 rounded-full bg-slate-900 border border-white/5 text-sm text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> London, UK (HQ)
              </div>
              <div className="px-6 py-3 rounded-full bg-slate-900 border border-white/5 text-sm text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span> Malta
              </div>
              <div className="px-6 py-3 rounded-full bg-slate-900 border border-white/5 text-sm text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span> Tallinn, Estonia
              </div>
              <div className="px-6 py-3 rounded-full bg-slate-900 border border-white/5 text-sm text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span> Curacao
              </div>
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <section className="py-20 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">Have questions or found a scam?</h2>
            <p className="text-slate-400 mb-8">
              We are constantly updating our database. If you&apos;ve had a bad experience with a casino listed here or elsewhere, let us know immediately.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="px-8 py-3 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-colors">
                Contact Support
              </a>
              <a href="/contact" className="px-8 py-3 rounded-xl bg-slate-800 border border-white/10 text-white font-medium text-sm hover:bg-slate-700 transition-colors">
                Report a Casino
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
