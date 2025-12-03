"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
        {/* Header Section */}
        <section className="pt-32 pb-16 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950"></div>
          {/* Abstract Bg Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-slate-800/50 border border-white/10 text-slate-400 text-xs font-medium">
                  Legal Information
                </span>
                <span className="text-slate-600 text-xs">•</span>
                <span className="text-slate-400 text-xs">Last Updated: January 15, 2025</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-6">
                Terms & Conditions
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Please read these terms carefully before using our services. They outline the rules and regulations for the use of Bonusory&apos;s Website and services.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Navigation (Sticky) */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Table of Contents</h5>
                  <nav className="space-y-1">
                    <a href="#introduction" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-amber-400 border-l-2 border-amber-400 transition-colors">
                      Introduction
                    </a>
                    <a href="#definitions" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 border-l-2 border-transparent hover:text-slate-200 hover:border-slate-700 transition-colors">
                      Definitions
                    </a>
                    <a href="#eligibility" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 border-l-2 border-transparent hover:text-slate-200 hover:border-slate-700 transition-colors">
                      Eligibility & Access
                    </a>
                    <a href="#affiliate-disclosure" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 border-l-2 border-transparent hover:text-slate-200 hover:border-slate-700 transition-colors">
                      Affiliate Disclosure
                    </a>
                    <a href="#intellectual-property" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 border-l-2 border-transparent hover:text-slate-200 hover:border-slate-700 transition-colors">
                      Intellectual Property
                    </a>
                    <a href="#liability" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 border-l-2 border-transparent hover:text-slate-200 hover:border-slate-700 transition-colors">
                      Limitation of Liability
                    </a>
                  </nav>
                </div>
                
                {/* Support Card */}
                <div className="p-6 rounded-xl bg-slate-900 border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-400">
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <path d="M12 17h.01"></path>
                    </svg>
                  </div>
                  <h4 className="text-white font-medium text-sm mb-2">Have questions?</h4>
                  <p className="text-slate-500 text-xs mb-4">Our legal team is available to clarify any points regarding these terms.</p>
                  <a href="/contact" className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                    Contact Support 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </aside>

            {/* Text Content */}
            <main className="col-span-1 lg:col-span-9">
              <div className="prose prose-invert prose-slate max-w-none">
                
                {/* 1. Introduction */}
                <div id="introduction" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono text-sm border border-white/10">01</span>
                    <h2 className="text-2xl font-semibold text-white tracking-tight m-0">Introduction</h2>
                  </div>
                  <div className="space-y-6 text-slate-400 leading-relaxed">
                    <p>
                      Welcome to Bonusory (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using our website, you agree to be bound by these Terms and Conditions (&quot;Terms&quot;) and our Privacy Policy. If you do not agree to these Terms, you must not access or use our services.
                    </p>
                    <p>
                      These Terms constitute a legally binding agreement between you and Bonusory regarding your use of the website. We reserve the right to modify these Terms at any time without prior notice. Your continued use of the site following any changes indicates your acceptance of the new Terms.
                    </p>
                  </div>
                </div>

                <hr className="border-white/5 mb-16" />

                {/* 2. Definitions */}
                <div id="definitions" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono text-sm border border-white/10">02</span>
                    <h2 className="text-2xl font-semibold text-white tracking-tight m-0">Definitions</h2>
                  </div>
                  <ul className="space-y-4 text-slate-400 leading-relaxed list-none pl-0">
                    <li className="bg-slate-900/30 p-4 rounded-xl border border-white/5">
                      <strong className="text-white font-medium block mb-1">&quot;Service&quot;</strong>
                      Refers to the Bonusory website, content, and any related features provided by us.
                    </li>
                    <li className="bg-slate-900/30 p-4 rounded-xl border border-white/5">
                      <strong className="text-white font-medium block mb-1">&quot;User&quot;</strong>
                      Means any individual who accesses or uses the Service.
                    </li>
                    <li className="bg-slate-900/30 p-4 rounded-xl border border-white/5">
                      <strong className="text-white font-medium block mb-1">&quot;Affiliate Link&quot;</strong>
                      Links that direct Users to third-party casino operators, for which we may receive compensation.
                    </li>
                  </ul>
                </div>

                <hr className="border-white/5 mb-16" />

                {/* 3. Eligibility */}
                <div id="eligibility" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono text-sm border border-white/10">03</span>
                    <h2 className="text-2xl font-semibold text-white tracking-tight m-0">Eligibility & Access</h2>
                  </div>
                  <div className="space-y-6 text-slate-400 leading-relaxed">
                    <p>
                      You must be at least 18 years of age, or the legal age of majority in your jurisdiction, to use our Service. By using Bonusory, you represent and warrant that you meet this requirement.
                    </p>
                    <div className="p-5 rounded-lg border border-amber-500/20 bg-amber-500/5 flex gap-4 items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-500 shrink-0 mt-0.5">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                      <div>
                        <h4 className="text-white font-medium text-sm mb-1">Restricted Jurisdictions</h4>
                        <p className="text-sm text-slate-400">
                          Access to online gambling services may be restricted in your location. It is your sole responsibility to ensure that your use of third-party casino sites complies with all applicable local laws and regulations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-white/5 mb-16" />

                {/* 4. Affiliate Disclosure */}
                <div id="affiliate-disclosure" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono text-sm border border-white/10">04</span>
                    <h2 className="text-2xl font-semibold text-white tracking-tight m-0">Affiliate Disclosure</h2>
                  </div>
                  <div className="space-y-6 text-slate-400 leading-relaxed">
                    <p>
                      Bonusory operates as an affiliate marketing website. This means we are not a casino operator and do not process any gambling transactions. Instead, we provide reviews and information about third-party gambling platforms.
                    </p>
                    <p>
                      When you click on links to various merchants on this site and make a purchase or deposit, this can result in this site earning a commission. Affiliate programs and affiliations include, but are not limited to, the casino partners listed on our site.
                    </p>
                    <p>
                      This compensation may impact how and where products appear on this site (including, for example, the order in which they appear). Bonusory does not include all card companies or all card offers available in the marketplace.
                    </p>
                  </div>
                </div>

                <hr className="border-white/5 mb-16" />

                {/* 5. Intellectual Property */}
                <div id="intellectual-property" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono text-sm border border-white/10">05</span>
                    <h2 className="text-2xl font-semibold text-white tracking-tight m-0">Intellectual Property</h2>
                  </div>
                  <div className="space-y-6 text-slate-400 leading-relaxed">
                    <p>
                      The Service and its original content, features, and functionality are and will remain the exclusive property of Bonusory and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                    </p>
                    <p>
                      Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Bonusory.
                    </p>
                  </div>
                </div>

                <hr className="border-white/5 mb-16" />

                {/* 6. Limitation of Liability */}
                <div id="liability" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono text-sm border border-white/10">06</span>
                    <h2 className="text-2xl font-semibold text-white tracking-tight m-0">Limitation of Liability</h2>
                  </div>
                  <div className="space-y-6 text-slate-400 leading-relaxed">
                    <p>
                      In no event shall Bonusory, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                      <li>Your access to or use of or inability to access or use the Service;</li>
                      <li>Any conduct or content of any third party on the Service;</li>
                      <li>Any content obtained from the Service; and</li>
                      <li>Unauthorized access, use or alteration of your transmissions or content.</li>
                    </ul>
                    <div className="bg-slate-900 border border-white/5 p-6 rounded-xl mt-6">
                      <p className="text-sm text-slate-500 italic">
                        &quot;We provide information for entertainment purposes only. We do not guarantee the accuracy of bonuses, terms, or conditions offered by third-party casinos, as these are subject to change by the operators.&quot;
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
