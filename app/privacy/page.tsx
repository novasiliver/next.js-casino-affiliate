import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
          
          <div className="prose prose-invert prose-slate max-w-none space-y-8">
            <section>
              <p className="text-slate-300 leading-relaxed mb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We collect information that you provide directly to us, such as when you subscribe to our newsletter or contact us through our contact form.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Send you newsletters and updates (with your consent)</li>
                <li>Respond to your inquiries</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Cookies</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We use cookies to enhance your browsing experience. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We may use third-party services that collect information used to identify you. Please review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                If you have questions about this Privacy Policy, please contact us at contact@primebet.com
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

