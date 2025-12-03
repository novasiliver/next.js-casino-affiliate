"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="bg-slate-950 text-slate-300 antialiased selection:bg-amber-500/30 selection:text-amber-200 flex flex-col min-h-screen">
        {/* Main Content */}
        <main className="flex-grow pt-32 pb-20 lg:pt-40 relative overflow-hidden">
          
          {/* Background Blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[0%] left-[20%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
            <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Page Header */}
            <div className="mb-12 md:mb-20 border-b border-white/5 pb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">Legal</span>
                    <span className="text-xs text-slate-500">Last updated: January 15, 2025</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter">
                    Privacy Policy
                  </h1>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:border-white/20 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" x2="12" y1="15" y2="3"></line>
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Table of Contents (Sticky Sidebar) */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-24">
                <nav className="space-y-1">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">Contents</h3>
                  <a href="#introduction" className="block px-3 py-2 text-sm font-medium text-amber-400 border-l-2 border-amber-500 bg-amber-500/5 rounded-r-lg transition-colors">1. Introduction</a>
                  <a href="#info-collect" className="block px-3 py-2 text-sm font-medium text-slate-400 hover:text-white border-l-2 border-transparent hover:border-slate-600 transition-colors">2. Information We Collect</a>
                  <a href="#cookies" className="block px-3 py-2 text-sm font-medium text-slate-400 hover:text-white border-l-2 border-transparent hover:border-slate-600 transition-colors">3. Cookies & Tracking</a>
                  <a href="#data-usage" className="block px-3 py-2 text-sm font-medium text-slate-400 hover:text-white border-l-2 border-transparent hover:border-slate-600 transition-colors">4. How We Use Data</a>
                  <a href="#security" className="block px-3 py-2 text-sm font-medium text-slate-400 hover:text-white border-l-2 border-transparent hover:border-slate-600 transition-colors">5. Security Measures</a>
                  <a href="#rights" className="block px-3 py-2 text-sm font-medium text-slate-400 hover:text-white border-l-2 border-transparent hover:border-slate-600 transition-colors">6. Your Rights</a>
                  <a href="#contact" className="block px-3 py-2 text-sm font-medium text-slate-400 hover:text-white border-l-2 border-transparent hover:border-slate-600 transition-colors">7. Contact Us</a>
                </nav>

                <div className="mt-8 p-5 rounded-xl bg-slate-900 border border-white/5">
                  <h4 className="text-sm font-medium text-white mb-2">Have questions?</h4>
                  <p className="text-xs text-slate-500 mb-4">Our Data Protection Officer is available to assist you.</p>
                  <a href="mailto:dpo@bonusory.com" className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1">
                    Contact DPO 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </aside>

              {/* Content Area */}
              <div className="lg:col-span-9 space-y-12">
                
                {/* Section 1 */}
                <section id="introduction" className="scroll-mt-24">
                  <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">1. Introduction</h2>
                  <div className="prose prose-invert prose-slate max-w-none text-slate-400 leading-relaxed space-y-4">
                    <p>
                      Welcome to Bonusory (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                    </p>
                    <p>
                      Bonusory operates as an independent casino review and information portal. We are not a gambling operator and do not process gambling transactions. Our role is to provide transparent, unbiased information to help you make informed decisions.
                    </p>
                  </div>
                </section>

                {/* Section 2 */}
                <section id="info-collect" className="scroll-mt-24 pt-8 border-t border-white/5">
                  <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">2. Information We Collect</h2>
                  <p className="text-slate-400 mb-6">We collect data to provide better services to all our users. The types of data we collect include:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <h3 className="text-white font-medium mb-2">Personal Identity Data</h3>
                      <p className="text-sm text-slate-400">Includes first name, last name, username or similar identifier when you subscribe to our newsletter or submit a complaint.</p>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                      </div>
                      <h3 className="text-white font-medium mb-2">Technical Usage Data</h3>
                      <p className="text-sm text-slate-400">Includes internet protocol (IP) address, browser type and version, time zone setting, operating system, and platform.</p>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section id="cookies" className="scroll-mt-24 pt-8 border-t border-white/5">
                  <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">3. Cookies & Tracking Technologies</h2>
                  <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-white/5 mb-6">
                    <p className="text-slate-400 mb-4 text-sm">
                      We use cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-500 shrink-0">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span><strong>Strictly Necessary Cookies:</strong> Essential for the operation of the website (e.g., security logins).</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-500 shrink-0">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span><strong>Analytical Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around the site.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-500 shrink-0">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        <span><strong>Functionality Cookies:</strong> Used to recognize you when you return to our website (e.g., language preference).</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-xs text-slate-500">You can set your browser to refuse all or some browser cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
                </section>

                 {/* Section 4 */}
                 <section id="data-usage" className="scroll-mt-24 pt-8 border-t border-white/5">
                  <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">4. How We Use Your Data</h2>
                  <p className="text-slate-400 mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <table className="w-full text-left text-sm text-slate-400">
                      <thead className="bg-slate-900 text-slate-200 font-medium">
                        <tr>
                          <th className="px-6 py-4">Purpose/Activity</th>
                          <th className="px-6 py-4">Type of Data</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 bg-slate-950/50">
                        <tr>
                          <td className="px-6 py-4">To notify you about changes to our terms or privacy policy</td>
                          <td className="px-6 py-4">Identity, Contact</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4">To administer and protect our business and this website</td>
                          <td className="px-6 py-4">Identity, Contact, Technical</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4">To deliver relevant website content and advertisements to you</td>
                          <td className="px-6 py-4">Identity, Contact, Profile, Usage</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4">To use data analytics to improve our website and experiences</td>
                          <td className="px-6 py-4">Technical, Usage</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Section 5 */}
                <section id="security" className="scroll-mt-24 pt-8 border-t border-white/5">
                  <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">5. Security Measures</h2>
                  <div className="flex gap-4">
                    <div className="shrink-0 pt-1">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-slate-400">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                      </p>
                      <p className="text-slate-400">
                        They will only process your personal data on our instructions and they are subject to a duty of confidentiality. We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
                      </p>
                    </div>
                  </div>
                </section>

                 {/* Section 6 */}
                 <section id="rights" className="scroll-mt-24 pt-8 border-t border-white/5">
                  <h2 className="text-2xl font-semibold text-white mb-6 tracking-tight">6. Your Rights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-white/5 bg-slate-900 hover:border-amber-500/30 transition-colors group">
                      <h3 className="text-white font-medium mb-1 group-hover:text-amber-400 transition-colors">Request Access</h3>
                      <p className="text-xs text-slate-500">Request a copy of the personal data we hold about you.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-slate-900 hover:border-amber-500/30 transition-colors group">
                      <h3 className="text-white font-medium mb-1 group-hover:text-amber-400 transition-colors">Request Correction</h3>
                      <p className="text-xs text-slate-500">Correct any incomplete or inaccurate data we hold about you.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-slate-900 hover:border-amber-500/30 transition-colors group">
                      <h3 className="text-white font-medium mb-1 group-hover:text-amber-400 transition-colors">Request Erasure</h3>
                      <p className="text-xs text-slate-500">Ask us to delete or remove personal data where there is no good reason for us continuing to process it.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/5 bg-slate-900 hover:border-amber-500/30 transition-colors group">
                      <h3 className="text-white font-medium mb-1 group-hover:text-amber-400 transition-colors">Withdraw Consent</h3>
                      <p className="text-xs text-slate-500">Withdraw consent at any time where we are relying on consent to process your personal data.</p>
                    </div>
                  </div>
                </section>

                {/* Contact Footer in Content */}
                <div id="contact" className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Still have questions regarding your privacy?</h3>
                  <p className="text-slate-400 mb-6 text-sm max-w-lg mx-auto">Our team is dedicated to transparency. If you cannot find the answer you are looking for in this policy, please reach out.</p>
                  <a href="/contact" className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white text-slate-950 font-semibold text-sm hover:bg-slate-200 transition-colors">
                    Contact Support Team
                  </a>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
