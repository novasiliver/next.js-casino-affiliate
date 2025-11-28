import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MobileAppsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Mobile Casino Apps</h1>
          
          <div className="prose prose-invert prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Play on the Go</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                All casinos listed on PrimeBet are fully optimized for mobile devices. Whether you&apos;re using an iPhone, Android, or tablet, you can enjoy the full casino experience on the go.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Mobile Browser vs. Apps</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Most casinos offer both mobile browser access and dedicated apps. Mobile browser versions are instant to access and work across all devices, while dedicated apps may offer additional features like push notifications and faster loading times.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">iOS Compatibility</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                All recommended casinos are compatible with iOS devices running iOS 12 or later. Simply visit the casino website in Safari or your preferred browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Android Compatibility</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Android users can access casinos through Chrome, Firefox, or other mobile browsers. Some casinos also offer APK downloads for dedicated apps.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Features Available on Mobile</h2>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Full game library access</li>
                <li>Live dealer games</li>
                <li>Secure banking and withdrawals</li>
                <li>Customer support via live chat</li>
                <li>Bonus claiming and promotions</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

