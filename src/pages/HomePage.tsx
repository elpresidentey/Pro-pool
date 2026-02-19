import Hero from '../components/Hero';
import Button from '../components/Button';
import ProfessionalCard from '../components/ProfessionalCard';
import { CATEGORIES, CATEGORY_LIST } from '../constants';

// Mock data - replace with real API calls later
const mockProfessionals = [
  {
    id: '1',
    name: 'Chioma Okonkwo',
    category: 'beautician' as const,
    location: 'lekki' as const,
    profile_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
    review_count: 24,
  },
  {
    id: '2',
    name: 'Tunde Adeleke',
    category: 'plumber' as const,
    location: 'yaba' as const,
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 4.5,
    review_count: 18,
  },
  {
    id: '3',
    name: 'Zainab Hassan',
    category: 'writer' as const,
    location: 'ikeja' as const,
    profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 5,
    review_count: 32,
  },
  {
    id: '4',
    name: 'Kunle Oladele',
    category: 'electrician' as const,
    location: 'surulere' as const,
    profile_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 4.8,
    review_count: 28,
  },
  {
    id: '5',
    name: 'Amara Nwosu',
    category: 'tailor' as const,
    location: 'VI' as const,
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 4.9,
    review_count: 41,
  },
  {
    id: '6',
    name: 'Samuel Okoro',
    category: 'beautician' as const,
    location: 'agege' as const,
    profile_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 4.7,
    review_count: 15,
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-secondary">
        <div className="container-max">
          <h2 className="text-h2 text-charcoal mb-8">Browse Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORY_LIST.map((category) => (
              <div
                key={category}
                className="card-hover p-6 text-center"
              >
                <h3 className="font-semibold text-text-primary">
                  {CATEGORIES[category]}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-16">
        <div className="container-max">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-h2 text-charcoal">Featured Professionals</h2>
            <Button variant="secondary">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-secondary">
        <div className="container-max">
          <h2 className="text-h2 text-charcoal mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Search</h3>
              <p className="text-text-secondary">
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
      <section className="py-16 bg-charcoal text-white">
        <div className="container-max text-center">
          <h2 className="text-h2 text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals already on Pro Pool or find the perfect professional for your next project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-electric-blue hover:bg-electric-blue-hover">
              Join as a Professional
            </Button>
            <Button variant="secondary">
              Hire a Professional
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
