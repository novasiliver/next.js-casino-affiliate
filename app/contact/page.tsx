"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dept: 'issue',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // In a real app, this would send to an API endpoint
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', dept: 'issue', message: '' });
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="bg-slate-950 text-slate-300 antialiased selection:bg-amber-500/30 selection:text-amber-200 flex flex-col min-h-screen">
        {/* Main Content */}
        <main className="flex-grow pt-32 pb-20 lg:pt-48 relative overflow-hidden">
          
          {/* Background Blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[20%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
            <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-4">
                Get in touch
              </h1>
              <p className="text-lg text-slate-400 font-light leading-relaxed">
                Have a question about a casino? Found incorrect information? Or just want to say hello? Our team is distributed across 4 time zones to help you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
              
              {/* Left Column: Contact Info */}
              <div className="lg:col-span-4 space-y-6">
                {/* Info Card 1 */}
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4 text-amber-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-white font-medium text-lg mb-1">General Support</h3>
                  <p className="text-sm text-slate-400 mb-4">For player complaints and general inquiries.</p>
                  <a href="mailto:support@bonusory.com" className="text-sm text-amber-400 hover:text-amber-300 font-medium flex items-center gap-2 transition-colors">
                    support@bonusory.com 
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                </div>

                {/* Info Card 2 */}
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-4 text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <h3 className="text-white font-medium text-lg mb-1">Partnerships</h3>
                  <p className="text-sm text-slate-400 mb-4">For casinos wishing to be reviewed (strict criteria apply).</p>
                  <a href="mailto:partners@bonusory.com" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2 transition-colors">
                    partners@bonusory.com 
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                </div>

                {/* Response Time Note */}
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5 flex gap-4 items-center">
                  <div className="flex -space-x-3">
                    <img className="w-8 h-8 rounded-full border-2 border-slate-900" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&q=75" alt="Support" />
                    <img className="w-8 h-8 rounded-full border-2 border-slate-900" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&q=75" alt="Support" />
                    <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] text-white font-bold">+4</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Avg. response time</div>
                    <div className="text-sm font-semibold text-emerald-400">~ 2 hours</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-8">
                <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        placeholder="John Doe" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="john@example.com" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Department Selection */}
                  <div className="mb-8">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1 block mb-3">I want to discuss</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Option 1 */}
                      <label className="cursor-pointer relative">
                        <input 
                          type="radio" 
                          name="dept" 
                          value="issue"
                          checked={formData.dept === 'issue'}
                          onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                          className="peer sr-only" 
                        />
                        <div className="p-3 rounded-xl border border-white/10 bg-slate-950/30 text-center hover:bg-slate-900/80 peer-checked:bg-amber-500/10 peer-checked:border-amber-500/50 peer-checked:text-amber-400 transition-all">
                          <span className="text-sm font-medium">Issue with Casino</span>
                        </div>
                      </label>
                      {/* Option 2 */}
                      <label className="cursor-pointer relative">
                        <input 
                          type="radio" 
                          name="dept" 
                          value="advertising"
                          checked={formData.dept === 'advertising'}
                          onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                          className="peer sr-only"
                        />
                        <div className="p-3 rounded-xl border border-white/10 bg-slate-950/30 text-center hover:bg-slate-900/80 peer-checked:bg-amber-500/10 peer-checked:border-amber-500/50 peer-checked:text-amber-400 transition-all">
                          <span className="text-sm font-medium">Advertising</span>
                        </div>
                      </label>
                      {/* Option 3 */}
                      <label className="cursor-pointer relative">
                        <input 
                          type="radio" 
                          name="dept" 
                          value="feedback"
                          checked={formData.dept === 'feedback'}
                          onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                          className="peer sr-only"
                        />
                        <div className="p-3 rounded-xl border border-white/10 bg-slate-950/30 text-center hover:bg-slate-900/80 peer-checked:bg-amber-500/10 peer-checked:border-amber-500/50 peer-checked:text-amber-400 transition-all">
                          <span className="text-sm font-medium">Feedback / Other</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2 mb-8">
                    <label htmlFor="message" className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      placeholder="Please provide as much detail as possible. If reporting a casino, include your username and date of incident." 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  {/* Submit Action */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span className="text-xs text-slate-500">Your data is encrypted & secure.</span>
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'sending'}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                    </button>
                  </div>

                  {status === 'success' && (
                    <p className="text-emerald-400 text-sm mt-4">Thank you! We&apos;ll get back to you soon.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </main>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-900/30 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="p-5 rounded-xl border border-white/5 bg-slate-900 hover:bg-slate-800/50 transition-colors">
                <h3 className="text-base font-medium text-white mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  How long does it take for you to reply?
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed pl-6">
                  We aim to respond to all player inquiries within 24 hours. For partnership requests, please allow up to 3 business days for our compliance team to run initial checks on your brand.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="p-5 rounded-xl border border-white/5 bg-slate-900 hover:bg-slate-800/50 transition-colors">
                <h3 className="text-base font-medium text-white mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <path d="M12 13v4"></path>
                    <path d="M12 9h.01"></path>
                  </svg>
                  Can I report a casino that scammed me?
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed pl-6">
                  Absolutely. Please select &quot;Issue with Casino&quot; in the contact form. Include screenshots of your chat history and transaction IDs. We will investigate and if verified, blacklist the casino immediately.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="p-5 rounded-xl border border-white/5 bg-slate-900 hover:bg-slate-800/50 transition-colors">
                <h3 className="text-base font-medium text-white mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Where are you located?
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed pl-6">
                  Our headquarters are in London, UK, but we operate fully remotely with team members in Malta, Estonia, and Curacao. We do not accept walk-in visitors at our registered office.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
