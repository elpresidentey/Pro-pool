import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Button from '../components/Button';
import ProfessionalCard from '../components/ProfessionalCard';
import { loadProfessionalCards } from '../utils/professionals';
import type { ProfessionalCard as ProfessionalCardType } from '../types';

export default function HomePage() {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState<ProfessionalCardType[]>([]);

  // Load professionals from localStorage on mount
  useEffect(() => {
    const allProfessionals = loadProfessionalCards();
    // Show first 6 professionals, prioritizing newly created ones
    setProfessionals(allProfessionals.slice(0, 6));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Professionals */}
      <section className="py-12 md:py-20">
        <div className="container-max">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-h2 text-charcoal">Featured Professionals</h2>
            <Button size="md" variant="secondary">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="container-max">
          <h2 className="text-h2 text-charcoal mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-base sm:text-lg mb-3">Search</h3>
              <p className="text-text-secondary text-sm sm:text-base">
                Browse professionals by category and location to find the perfect match for your needs.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">View Profile</h3>
              <p className="text-text-secondary">
                Check out their portfolio, reviews, and ratings from other clients.
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Contact</h3>
              <p className="text-text-secondary">
                Get in touch directly via phone or WhatsApp to discuss your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-charcoal text-white">
        <div className="container-max text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Get Started?</h2>
          <p className="text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto text-gray-100">
            Join thousands of professionals already on Pro Pool or find the perfect professional for your next project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="md"
              className="bg-electric-blue hover:bg-electric-blue-hover"
              onClick={() => navigate('/signup')}
            >
              Join as a Professional
            </Button>
            <Button 
              size="md"
              variant="secondary"
              onClick={() => navigate('/search')}
            >
              Hire a Professional
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
