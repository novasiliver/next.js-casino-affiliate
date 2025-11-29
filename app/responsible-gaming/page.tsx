import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ResponsibleGamingPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Responsible Gaming</h1>
          
          <div className="prose prose-invert prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Gamble Responsibly</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Gambling should be fun and entertaining, not a way to make money or escape problems. At PrimeBet, we are committed to promoting responsible gaming practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Set Limits</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Before you start playing, set clear limits for yourself:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Set a budget and stick to it</li>
                <li>Set time limits for your gaming sessions</li>
                <li>Never chase losses</li>
                <li>Never gamble with money you can&apos;t afford to lose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Self-Exclusion Tools</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                All recommended casinos offer self-exclusion tools that allow you to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Set deposit limits</li>
                <li>Set loss limits</li>
                <li>Set session time limits</li>
                <li>Temporarily or permanently exclude yourself</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Get Help</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                If you feel you may have a gambling problem, help is available:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li><strong>Gamblers Anonymous:</strong> www.gamblersanonymous.org</li>
                <li><strong>GamCare:</strong> www.gamcare.org.uk</li>
                <li><strong>BeGambleAware:</strong> www.begambleaware.org</li>
                <li><strong>National Council on Problem Gambling:</strong> www.ncpgambling.org</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Age Restrictions</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                You must be 18 or older (21 in some jurisdictions) to gamble online. All casinos listed on PrimeBet verify the age of their players.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

