import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
          
          <div className="prose prose-invert prose-slate max-w-none space-y-8">
            <section>
              <p className="text-slate-300 leading-relaxed mb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Acceptance of Terms</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                By accessing and using PrimeBet, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Use License</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on PrimeBet&apos;s website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Disclaimer</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                The materials on PrimeBet&apos;s website are provided on an &apos;as is&apos; basis. PrimeBet makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Limitations</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                In no event shall PrimeBet or its suppliers be liable for any damages arising out of the use or inability to use the materials on PrimeBet&apos;s website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Gambling Disclaimer</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                PrimeBet is an affiliate website. We do not provide gambling services. All gambling activities are conducted by third-party casinos. Please gamble responsibly.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

