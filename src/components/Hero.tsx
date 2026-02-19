import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    'Beauty',
    'Plumbing',
    'Writing',
    'Electrical',
    'Tailoring',
    'All Services',
  ];

  const stats = [
    { number: '500+', label: 'Active Professionals' },
    { number: '5000+', label: 'Happy Clients' },
    { number: '4.8', label: 'Star Rating' },
  ];

  const testimonials = [
    { 
      text: 'Found the perfect professional in minutes. Highly recommend.',
      author: 'Sarah Mitchell'
    },
    { 
      text: 'Great platform to grow my business and connect with quality clients.',
      author: 'James Rodriguez'
    },
    { 
      text: 'Professional service every time. Exactly what I was looking for.',
      author: 'Emma Thompson'
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="py-20 md:py-32 border-b border-gray-200 overflow-hidden">
        <div className="container-max">
          <div className="max-w-4xl animate-hero-fade-in">
            <p className="text-sm font-medium text-electric-blue tracking-wide uppercase mb-4 animate-hero-fade-in-delay-1">
              Professional Services Platform
            </p>
            
            <h1 className="text-6xl md:text-7xl font-bold text-charcoal leading-tight mb-8 animate-hero-fade-in-delay-2">
              Find Trusted Professionals Near You
            </h1>
            
            <p className="text-xl text-text-secondary max-w-2xl mb-12 leading-relaxed animate-hero-fade-in-delay-3">
              Connect with verified professionals in your area. Beauticians, plumbers, writers, electricians, tailors, and more. Quality services you can trust.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mb-8 animate-hero-fade-in-delay-4 group">
              <input
                type="text"
                placeholder="Search professionals by name or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-5 py-4 border border-gray-300 rounded-lg text-charcoal placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-0 transition-all duration-300 group-hover:border-electric-blue group-hover:shadow-md"
              />
              <Button type="submit" className="px-8 transition-all duration-300 hover:shadow-lg active:scale-95">Search</Button>
            </form>

            {/* Secondary CTA */}
            <div className="flex items-center gap-8 animate-hero-fade-in-delay-5">
              <button
                onClick={() => navigate('/search')}
                className="text-electric-blue font-medium hover:text-charcoal transition-all duration-300 inline-flex items-center gap-2 group"
              >
                Browse all professionals
                <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 md:py-20 border-b border-gray-200">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-charcoal mb-10 animate-section-fade-in">Browse Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/search?category=${category}`)}
                className="px-6 py-4 border border-gray-200 rounded-lg text-charcoal font-medium hover:border-electric-blue hover:bg-blue-50 transition-all duration-300 text-center animate-stagger-fade-in transform hover:scale-105 hover:shadow-md"
                style={{
                  animationDelay: `${idx * 50}ms`,
                  animationFillMode: 'both',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 md:py-20 border-b border-gray-200">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="space-y-3 animate-stagger-fade-in p-6 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                <div className="text-5xl md:text-6xl font-bold text-electric-blue">
                  {stat.number}
                </div>
                <p className="text-lg text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 md:py-20">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-charcoal mb-12 animate-section-fade-in">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="space-y-4 p-8 border border-gray-200 rounded-lg hover:border-electric-blue hover:shadow-lg transition-all duration-300 animate-stagger-fade-in transform hover:scale-105"
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-4 h-4 bg-electric-blue rounded-full transform hover:scale-125 transition-transform duration-300" 
                      style={{ transitionDelay: `${i * 30}ms` }}
                    ></div>
                  ))}
                </div>
                <p className="text-charcoal text-lg leading-relaxed">"{testimonial.text}"</p>
                <p className="text-text-secondary font-medium">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sectionFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes staggerFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-hero-fade-in {
          animation: heroFadeIn 0.6s ease-out;
        }

        .animate-hero-fade-in-delay-1 {
          animation: heroFadeIn 0.6s ease-out 0.1s both;
        }

        .animate-hero-fade-in-delay-2 {
          animation: heroFadeIn 0.6s ease-out 0.2s both;
        }

        .animate-hero-fade-in-delay-3 {
          animation: heroFadeIn 0.6s ease-out 0.3s both;
        }

        .animate-hero-fade-in-delay-4 {
          animation: heroFadeIn 0.6s ease-out 0.4s both;
        }

        .animate-hero-fade-in-delay-5 {
          animation: heroFadeIn 0.6s ease-out 0.5s both;
        }

        .animate-section-fade-in {
          animation: sectionFadeIn 0.5s ease-out;
        }

        .animate-stagger-fade-in {
          animation: staggerFadeIn 0.5s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
