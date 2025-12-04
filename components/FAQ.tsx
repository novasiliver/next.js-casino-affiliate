"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do you review and rank casinos?",
    answer: "Our team of experts evaluates each casino based on multiple criteria including licensing and security, game selection, payout speed, customer support quality, bonus terms, and user feedback. We personally test withdrawal processes and verify all claims before publishing reviews. Casinos are ranked using a weighted scoring system that prioritizes player safety and fairness above all else."
  },
  {
    question: "Are the bonuses on Bonusory really exclusive?",
    answer: "Yes! Bonuses marked as 'Exclusive' are special offers negotiated directly with casino operators and are only available through Bonusory. These often include better terms, higher amounts, or lower wagering requirements compared to standard offers. You won't find these exact deals on the casino's own website or other review sites."
  },
  {
    question: "What are wagering requirements and why do they matter?",
    answer: "Wagering requirements (e.g., 35x) indicate how many times you must bet the bonus amount before you can withdraw winnings. For example, a $100 bonus with 35x wagering means you need to wager $3,500 total. Lower wagering requirements are better for players. We always display this information clearly so you can make informed decisions about which bonuses offer real value."
  },
  {
    question: "How quickly can I withdraw my winnings?",
    answer: "Withdrawal speed varies by casino and payment method. Casinos marked as 'Instant Payout' typically process withdrawals within minutes to a few hours, especially for crypto transactions. Traditional methods like bank transfers may take 1-5 business days. We test and verify payout speeds for each casino and display this information prominently in our reviews."
  },
  {
    question: "Are the casinos on Bonusory safe and licensed?",
    answer: "Absolutely. We only feature licensed casinos that hold valid gambling licenses from reputable jurisdictions such as Curacao, Malta Gaming Authority, or UK Gambling Commission. Each casino undergoes a thorough security audit before being listed. We verify SSL encryption, fair gaming practices, and responsible gambling measures. Any casino that fails our security standards is immediately removed from our site."
  },
  {
    question: "Can I trust the ratings and reviews on Bonusory?",
    answer: "Yes. Our ratings are based on objective testing and real player experiences. We maintain editorial independence and are not influenced by affiliate partnerships. If a casino receives complaints or fails to meet our standards, we update the rating accordingly or remove the listing entirely. We also encourage users to report their experiences so we can keep our information current and accurate."
  },
  {
    question: "Do I need to use bonus codes, and where do I find them?",
    answer: "Some bonuses require codes while others are activated automatically. When a code is needed, we display it clearly on the bonus card and in the casino review. You can click to copy the code, then paste it during registration or deposit at the casino. If a bonus shows 'No code needed,' it will be applied automatically when you click through our links."
  },
  {
    question: "How often do you update casino information and bonuses?",
    answer: "We update our casino database and bonus offers daily. Our team monitors changes in terms, new promotions, and casino performance continuously. If you notice outdated information, please contact us so we can verify and update it immediately. We strive to provide the most current and accurate information to help you make the best decisions."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to know about Bonusory and online casino gaming
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/5 bg-slate-900/40 overflow-hidden transition-all hover:border-amber-500/20"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-slate-800/50"
              >
                <span className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-5 h-5 text-amber-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 pt-0">
                  <p className="text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}

