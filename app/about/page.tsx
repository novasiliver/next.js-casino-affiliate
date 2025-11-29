import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About PrimeBet</h1>
          
          <div className="prose prose-invert prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                PrimeBet is dedicated to providing players with honest, comprehensive reviews of online casinos. We prioritize safety, fairness, and player protection in all our recommendations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">What We Do</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Our team of experienced reviewers tests each casino thoroughly, evaluating:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Security and licensing</li>
                <li>Game variety and quality</li>
                <li>Bonus terms and conditions</li>
                <li>Withdrawal speeds and limits</li>
                <li>Customer support quality</li>
                <li>Mobile compatibility</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Our Standards</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We only recommend casinos that meet our strict criteria for safety, fairness, and player experience. Every casino on our site has been personally tested by our team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Transparency</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                PrimeBet is an affiliate website. We receive compensation from casinos when players sign up through our links. However, this never influences our reviews or rankings. We maintain editorial independence and only recommend casinos we genuinely believe offer the best experience.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

