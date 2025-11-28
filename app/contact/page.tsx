"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // In a real app, this would send to an API endpoint
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Get in Touch</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Have a question or feedback? We&apos;d love to hear from you. Fill out the form and we&apos;ll get back to you as soon as possible.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-medium mb-2">Email</h3>
                  <a href="mailto:contact@primebet.com" className="text-amber-400 hover:text-amber-300">
                    contact@primebet.com
                  </a>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Response Time</h3>
                  <p className="text-slate-300">We typically respond within 24-48 hours.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-emerald-400 text-sm">Thank you! We&apos;ll get back to you soon.</p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

