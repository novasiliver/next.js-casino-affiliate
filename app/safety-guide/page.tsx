import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SafetyGuidePage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Safety Guide</h1>
          
          <div className="prose prose-invert prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">How We Ensure Casino Safety</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                At PrimeBet, we take casino safety seriously. Every casino listed on our platform undergoes a rigorous vetting process to ensure they meet the highest standards of security, fairness, and player protection.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">License Verification</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We only list casinos that hold valid licenses from reputable gaming authorities such as:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Malta Gaming Authority (MGA)</li>
                <li>UK Gambling Commission (UKGC)</li>
                <li>Curacao eGaming</li>
                <li>Gibraltar Regulatory Authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">SSL Encryption</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                All recommended casinos use SSL encryption to protect your personal and financial information. Look for the padlock icon in your browser&apos;s address bar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Fair Play Audits</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We verify that casinos use Random Number Generators (RNG) that are regularly audited by independent testing agencies like eCOGRA, iTechLabs, and GLI.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Responsible Gaming</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                All listed casinos must provide responsible gaming tools including deposit limits, self-exclusion options, and links to gambling support organizations.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

