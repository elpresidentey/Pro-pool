import { useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-electric-blue to-blue-600 text-white py-16 px-4">
        <div className="container-max">
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 text-white/80 hover:text-white transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/90 text-lg">Last updated: February 25, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Introduction</h2>
            <p className="text-text-secondary leading-relaxed">
              Pro Pool ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and mobile application.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Information We Collect</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex gap-3">
                <span className="text-electric-blue font-bold">•</span>
                <span><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site and when you choose to participate in various activities related to the Site.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-electric-blue font-bold">•</span>
                <span><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-electric-blue font-bold">•</span>
                <span><strong>Data From Contests, Giveaways, and Surveys:</strong> Personal and preference information you may provide when entering contests or giveaways and to better personalize web content, products, and services.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-electric-blue font-bold">•</span>
                <span><strong>Mobile Device Data:</strong> Device information, such as your mobile device ID, model, and manufacturer, and information about your location, depending on your mobile device settings.</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Use of Your Information</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="space-y-2 text-text-secondary list-disc list-inside">
              <li>Generate a personal profile about you so that future visits to the Site will be personalized as possible</li>
              <li>Increase the efficiency and operation of the Site</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site</li>
              <li>Notify you of updates to the Site</li>
              <li>Offer new products, services, and/or recommendations to you</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Disclosure of Your Information</h2>
            <p className="text-text-secondary leading-relaxed">
              We may share or disclose your information only in the situations described below:
            </p>
            <ul className="space-y-3 text-text-secondary mt-4">
              <li className="flex gap-3">
                <span className="text-electric-blue font-bold">•</span>
                <span><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to comply with the law.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-electric-blue font-bold">•</span>
                <span><strong>With Your Consent:</strong> We may disclose your personal information if you give us express consent to do so for a specific purpose.</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Security of Your Information</h2>
            <p className="text-text-secondary leading-relaxed">
              We use administrative, technical, and physical security measures to protect your personal information. However, perfect security on the Internet is not possible. We urge you to take steps to keep your personal information safe (such as by maintaining secrecy of your password).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Contact Us</h2>
            <p className="text-text-secondary leading-relaxed">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="font-semibold text-charcoal">Pro Pool</p>
              <p className="text-text-secondary">Email: support@propools.ng</p>
              <p className="text-text-secondary">Location: Nigeria</p>
            </div>
          </section>
        </div>

        <div className="flex justify-center mt-16">
          <Button size="md" variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
