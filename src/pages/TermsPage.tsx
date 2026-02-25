import { useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-white/90 text-lg">Last updated: February 25, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Agreement to Terms</h2>
            <p className="text-text-secondary leading-relaxed">
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Pro Pool, a Nigerian-based platform ("Company," "we," "us," or "our"), concerning your access to and use of the Pro Pool website and mobile application.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">User Representations</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              By using Pro Pool, you represent and warrant that:
            </p>
            <ul className="space-y-2 text-text-secondary list-disc list-inside">
              <li>You have the legal capacity and you agree to comply with these Terms of Service</li>
              <li>You are not under the age of 18</li>
              <li>You will not access the platform through automated or non-human means</li>
              <li>You will not use the platform for any illegal or unauthorized purpose</li>
              <li>Your use of the platform will not violate any applicable law or regulation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">User Registration</h2>
            <p className="text-text-secondary leading-relaxed">
              If you create an account on Pro Pool, you are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password. You must notify us immediately of any unauthorized uses of your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Prohibited Activities</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              You may not access or use Pro Pool for any purpose other than that for which we make the platform available. The platform may not be used in connection with any commercial endeavors except those specifically endorsed or approved by us.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              Prohibited behavior includes:
            </p>
            <ul className="space-y-2 text-text-secondary list-disc list-inside">
              <li>Harassing or causing distress or inconvenience to any person</li>
              <li>Disrupting the normal flow of dialogue within our platform</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Creating fraudulent accounts or impersonating others</li>
              <li>Posting offensive or defamatory content</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">User-Generated Content</h2>
            <p className="text-text-secondary leading-relaxed">
              Pro Pool does not claim ownership of any content you submit, post, or display on or through the platform. By submitting, posting, or displaying content on Pro Pool, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such content in any media or medium and for any purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Disclaimer of Warranties</h2>
            <p className="text-text-secondary leading-relaxed">
              Pro Pool is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the platform or the information, content, materials, or products included on the platform. To the fullest extent permissible pursuant to applicable law, Pro Pool disclaims all warranties, expressed or implied.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Limitation of Liability</h2>
            <p className="text-text-secondary leading-relaxed">
              In no event shall Pro Pool or its suppliers be liable for any damages including, without limitation, direct, indirect, incidental, punitive, special, or consequential damages arising out of or relating to these Terms or your use of, or inability to use, the platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Indemnification</h2>
            <p className="text-text-secondary leading-relaxed">
              You agree to defend, indemnify, and hold harmless Pro Pool and its officers, directors, employees, agents, and successors and assigns from and against any claims, damages, losses, costs, and expenses (including reasonable attorney's fees) arising from or relating to your use of the platform or your violation of these Terms of Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Modifications to Terms</h2>
            <p className="text-text-secondary leading-relaxed">
              We may revise these Terms of Service for our platform at any time without notice to you. By continuing to access or use Pro Pool after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">Contact Information</h2>
            <p className="text-text-secondary leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
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
