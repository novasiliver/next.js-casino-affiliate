import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Cookie Policy</h1>
          
          <div className="prose prose-invert prose-slate max-w-none space-y-8">
            <section>
              <p className="text-slate-300 leading-relaxed mb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Cookies</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We use cookies to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Remember your preferences</li>
                <li>Analyze website traffic and usage</li>
                <li>Improve website functionality</li>
                <li>Provide personalized content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Types of Cookies We Use</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                <strong>Essential Cookies:</strong> These are necessary for the website to function properly.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                <strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Managing Cookies</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can impact your user experience.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

