"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiesPage() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

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
                <span className="text-slate-400 text-xs">Effective: October 24, 2024</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-6">
                Cookies Policy
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed font-light">
                We believe in being transparent about how we collect and use data. This policy provides detailed information about how and when we use cookies on Bonusory.
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
                  <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">On this page</h5>
                  <nav className="space-y-1">
                    <a href="#what-are-cookies" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-amber-400 border-l-2 border-amber-400 transition-colors">
                      What are Cookies?
                    </a>
                    <a href="#how-we-use" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 border-l-2 border-transparent hover:text-slate-200 hover:border-slate-700 transition-colors">
                      How We Use Cookies
                    </a>
                    <a href="#cookie-types" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 border-l-2 border-transparent hover:text-slate-200 hover:border-slate-700 transition-colors">
                      Types of Cookies
                    </a>
                    <a href="#preferences" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 border-l-2 border-transparent hover:text-slate-200 hover:border-slate-700 transition-colors">
                      Manage Preferences
                    </a>
                    <a href="#third-party" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 border-l-2 border-transparent hover:text-slate-200 hover:border-slate-700 transition-colors">
                      Third Party Cookies
                    </a>
                  </nav>
                </div>
                
                {/* Settings Card */}
                <div className="p-6 rounded-xl bg-slate-900 border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-400">
                      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                      <path d="M8.5 8.5v.01"></path>
                      <path d="M16 15.5v.01"></path>
                      <path d="M12 12v.01"></path>
                      <path d="M11 17v.01"></path>
                      <path d="M7 14v.01"></path>
                    </svg>
                  </div>
                  <h4 className="text-white font-medium text-sm mb-2">Privacy Settings</h4>
                  <p className="text-slate-500 text-xs mb-4">You can change your cookie preferences at any time via the settings panel.</p>
                  <a href="#preferences" className="text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg border border-white/5 inline-block transition-all">
                    Open Settings
                  </a>
                </div>
              </div>
            </aside>

            {/* Text Content */}
            <main className="col-span-1 lg:col-span-9">
              <div className="prose prose-invert prose-slate max-w-none">
                
                {/* 1. What are cookies */}
                <div id="what-are-cookies" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono text-sm border border-white/10">01</span>
                    <h2 className="text-2xl font-semibold text-white tracking-tight m-0">What are Cookies?</h2>
                  </div>
                  <div className="space-y-6 text-slate-400 leading-relaxed font-light">
                    <p>
                      Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                    </p>
                    <p>
                      Cookies do not contain any information that personally identifies you, but personal information that we store about you may be linked to the information stored in and obtained from cookies.
                    </p>
                  </div>
                </div>

                <hr className="border-white/5 mb-16" />

                {/* 2. How We Use */}
                <div id="how-we-use" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono text-sm border border-white/10">02</span>
                    <h2 className="text-2xl font-semibold text-white tracking-tight m-0">How We Use Cookies</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-slate-900/30 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4 text-amber-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <h3 className="text-white font-medium mb-2">Essential Functions</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        To authenticate users and prevent fraudulent use of user accounts. Without these, our services cannot be provided.
                      </p>
                    </div>
                    
                    <div className="bg-slate-900/30 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4 text-amber-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <line x1="18" x2="18" y1="20" y2="10"></line>
                          <line x1="12" x2="12" y1="20" y2="4"></line>
                          <line x1="6" x2="6" y1="20" y2="14"></line>
                        </svg>
                      </div>
                      <h3 className="text-white font-medium mb-2">Performance & Analytics</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        To recognize and count the number of visitors and to see how visitors move around our website when they are using it.
                      </p>
                    </div>

                    <div className="bg-slate-900/30 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4 text-amber-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <path d="M20 7h-9"></path>
                          <path d="M14 17H5"></path>
                          <circle cx="17" cy="17" r="3"></circle>
                          <circle cx="7" cy="7" r="3"></circle>
                        </svg>
                      </div>
                      <h3 className="text-white font-medium mb-2">Functionality</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        To recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences.
                      </p>
                    </div>

                    <div className="bg-slate-900/30 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4 text-amber-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <circle cx="12" cy="12" r="10"></circle>
                          <circle cx="12" cy="12" r="6"></circle>
                          <circle cx="12" cy="12" r="2"></circle>
                        </svg>
                      </div>
                      <h3 className="text-white font-medium mb-2">Targeting</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        To record your visit to our website, the pages you have visited and the links you have followed to make advertising more relevant.
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-white/5 mb-16" />

                {/* 3. Preferences UI */}
                <div id="preferences" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono text-sm border border-white/10">03</span>
                    <h2 className="text-2xl font-semibold text-white tracking-tight m-0">Manage Preferences</h2>
                  </div>
                  <p className="text-slate-400 mb-8 font-light">
                    You can choose which cookies you&apos;d like to allow. Please note that blocking some types of cookies may impact your experience on our site.
                  </p>

                  {/* Preferences Panel */}
                  <div className="border border-white/5 rounded-2xl overflow-hidden bg-slate-900/20 backdrop-blur-sm">
                    
                    {/* Strictly Necessary */}
                    <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-white font-semibold text-sm">Strictly Necessary</h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-white/10">REQUIRED</span>
                        </div>
                        <p className="text-sm text-slate-500 font-light">These cookies are essential for the website to function properly and cannot be switched off in our systems.</p>
                      </div>
                      <div className="relative inline-block w-10 h-6 align-middle select-none shrink-0 opacity-50 cursor-not-allowed">
                        <input type="checkbox" checked disabled className="absolute block w-4 h-4 rounded-full bg-white border-4 border-slate-700 appearance-none cursor-not-allowed transition-all duration-300 right-0" />
                        <label className="block overflow-hidden h-6 rounded-full bg-slate-700 cursor-not-allowed"></label>
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-white font-semibold text-sm mb-2">Analytics & Performance</h3>
                        <p className="text-sm text-slate-500 font-light">Allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
                      </div>
                      <div className="relative inline-block w-10 h-6 align-middle select-none shrink-0">
                        <input 
                          type="checkbox" 
                          checked={analyticsEnabled}
                          onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                          id="toggle-analytics" 
                          className="sr-only peer"
                        />
                        <label 
                          htmlFor="toggle-analytics" 
                          className={`block overflow-hidden h-6 rounded-full border cursor-pointer transition-colors duration-300 relative ${analyticsEnabled ? 'bg-amber-500 border-amber-500' : 'bg-slate-800 border-white/10'}`}
                        >
                          <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white border-4 transition-all duration-300 ${analyticsEnabled ? 'translate-x-4 border-amber-500' : 'border-slate-700'}`}></span>
                        </label>
                      </div>
                    </div>

                    {/* Marketing */}
                    <div className="p-6 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-white font-semibold text-sm mb-2">Marketing & Targeting</h3>
                        <p className="text-sm text-slate-500 font-light">Used by our advertising partners to build a profile of your interests and show you relevant adverts on other sites.</p>
                      </div>
                      <div className="relative inline-block w-10 h-6 align-middle select-none shrink-0">
                        <input 
                          type="checkbox" 
                          checked={marketingEnabled}
                          onChange={(e) => setMarketingEnabled(e.target.checked)}
                          id="toggle-marketing" 
                          className="sr-only peer"
                        />
                        <label 
                          htmlFor="toggle-marketing" 
                          className={`block overflow-hidden h-6 rounded-full border cursor-pointer transition-colors duration-300 relative ${marketingEnabled ? 'bg-amber-500 border-amber-500' : 'bg-slate-800 border-white/10'}`}
                        >
                          <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white border-4 transition-all duration-300 ${marketingEnabled ? 'translate-x-4 border-amber-500' : 'border-slate-700'}`}></span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 p-4 border-t border-white/5 flex justify-end">
                      <button 
                        onClick={() => {
                          // In a real app, this would save preferences
                          alert('Preferences saved!');
                        }}
                        className="bg-white text-slate-950 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors shadow-lg shadow-white/5"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>

                <hr className="border-white/5 mb-16" />

                {/* 4. Third Party */}
                <div id="third-party" className="mb-16 scroll-mt-32">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-mono text-sm border border-white/10">04</span>
                    <h2 className="text-2xl font-semibold text-white tracking-tight m-0">Third Party Cookies</h2>
                  </div>
                  <div className="space-y-6 text-slate-400 leading-relaxed font-light">
                    <p>
                      In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
                    </p>
                    <div className="overflow-hidden rounded-xl border border-white/5 bg-slate-900/20">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-900/50 text-xs uppercase font-semibold text-slate-500">
                          <tr>
                            <th className="px-6 py-4">Provider</th>
                            <th className="px-6 py-4">Purpose</th>
                            <th className="px-6 py-4">Retention</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <tr>
                            <td className="px-6 py-4 font-medium text-white">Google Analytics</td>
                            <td className="px-6 py-4">Traffic Analysis</td>
                            <td className="px-6 py-4">2 Years</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-medium text-white">Cloudflare</td>
                            <td className="px-6 py-4">Security & CDN</td>
                            <td className="px-6 py-4">1 Year</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-medium text-white">Hotjar</td>
                            <td className="px-6 py-4">User Behavior</td>
                            <td className="px-6 py-4">365 Days</td>
                          </tr>
                        </tbody>
                      </table>
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
