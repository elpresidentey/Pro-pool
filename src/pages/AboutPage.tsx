import { useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Pro Pool</h1>
          <p className="text-white/90 text-lg">Connecting you with trusted professionals in your area</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max py-16 px-4">
        {/* Mission Section */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-charcoal mb-6">Our Mission</h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-4">
              At Pro Pool, we believe that finding a trusted professional shouldn't be complicated. We're dedicated to bridging the gap between clients seeking quality services and the skilled professionals ready to deliver them.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Our platform makes it easy to discover, connect with, and hire verified professionals across a wide range of service categories. Whether you're looking for home maintenance, beauty services, tech support, or any other specialized service, Pro Pool has you covered.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-charcoal mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="w-16 h-16 bg-electric-blue rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-2.77 3.066 3.066 0 00-3.58 3.03A3.066 3.066 0 006.267 3.455zm9.8 9.884c-1.993-4.038-7.967-6.03-11.89-4.08a3.066 3.066 0 00-3.582 3.03 3.066 3.066 0 00.76 2.023c.85.87 2.045 1.548 3.391 1.944l1.06 2.286c.59 1.266 1.79 2.07 3.155 2.07s2.565-.804 3.155-2.07l1.06-2.286c1.346-.396 2.541-1.074 3.391-1.944a3.066 3.066 0 00.76-2.023 3.066 3.066 0 00-3.581-3.03z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">Trust</h3>
              <p className="text-text-secondary">We verify every professional on our platform to ensure quality and reliability.</p>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="w-16 h-16 bg-electric-blue rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z"></path>
                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2V2a1 1 0 112 0v1a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1a2 2 0 01-2-2v-2H3a1 1 0 110-2h1V9H3a1 1 0 010-2h1V5a2 2 0 012-2v-1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">Quality</h3>
              <p className="text-text-secondary">We maintain high standards, ensuring only the best professionals join our community.</p>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="w-16 h-16 bg-electric-blue rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">Accessibility</h3>
              <p className="text-text-secondary">Making professional services accessible to everyone, regardless of location or background.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-charcoal mb-12 text-center">Why Choose Pro Pool?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center text-white font-bold">✓</div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">Verified Professionals</h3>
                  <p className="text-text-secondary">Every professional undergoes thorough verification to guarantee quality and trustworthiness.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center text-white font-bold">✓</div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">Real Reviews & Ratings</h3>
                  <p className="text-text-secondary">Transparent feedback from real clients helps you make informed decisions.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center text-white font-bold">✓</div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">Easy Booking</h3>
                  <p className="text-text-secondary">Simple, seamless booking process that gets you connected with professionals fast.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center text-white font-bold">✓</div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2">24/7 Support</h3>
                  <p className="text-text-secondary">Our support team is here to help whenever you need us.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-electric-blue to-blue-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're looking for a professional or wanting to offer your services, Pro Pool is the platform for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="md" 
              onClick={() => navigate('/search')}
              className="bg-white text-electric-blue hover:bg-gray-100 font-semibold"
            >
              Browse Professionals
            </Button>
            <Button 
              size="md" 
              variant="secondary"
              onClick={() => navigate('/signup')}
              className="border-white text-white hover:bg-white/10"
            >
              Join as Professional
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
