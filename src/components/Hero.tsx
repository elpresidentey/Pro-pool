import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { CATEGORIES, CATEGORY_LIST } from '../constants';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (category === 'allServices') {
      navigate('/search');
    } else {
      navigate(`/search?category=${category}`);
    }
  };

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
      <div className="py-10 md:py-16 border-b border-gray-100 overflow-hidden bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-white opacity-50 pointer-events-none"></div>
        <div className="container-max relative z-10">
          <div className="max-w-4xl animate-hero-fade-in">
            <p className="text-xs sm:text-sm font-bold text-electric-blue tracking-widest uppercase mb-3 animate-hero-fade-in-delay-1 letter-spacing-wide flex items-center gap-2">
              <span className="text-base sm:text-lg">✨</span> Professional Services Platform
            </p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight mb-4 sm:mb-5 animate-hero-fade-in-delay-2 tracking-tight">
              Find Trusted <br className="hidden sm:block" />
              Professionals <span className="text-electric-blue bg-gradient-to-r from-electric-blue to-blue-500 bg-clip-text text-transparent">Near You</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-lg text-text-secondary max-w-2xl mb-7 sm:mb-8 leading-relaxed animate-hero-fade-in-delay-3 font-normal">
              Connect with verified professionals in your area. Beauticians, plumbers, writers, electricians, tailors, and more. Quality services you can trust.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-7 sm:mb-8 animate-hero-fade-in-delay-4 group">
              <input
                type="text"
                placeholder="Search professionals by name or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 border-2 border-gray-200 rounded-lg sm:rounded-xl text-charcoal placeholder-text-secondary focus:outline-none focus:border-electric-blue focus:ring-0 focus:shadow-lg transition-all duration-300 group-hover:border-gray-300 group-hover:shadow-md text-sm sm:text-base"
              />
              <Button type="submit" size="lg" className="whitespace-nowrap px-6 sm:px-8 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base py-3 sm:py-3.5">
                Search
              </Button>
            </form>

            {/* Secondary CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-hero-fade-in-delay-5">
              <button
                onClick={() => navigate('/search')}
                className="text-electric-blue font-semibold text-base sm:text-lg hover:text-electric-blue-hover transition-all duration-300 inline-flex items-center gap-2 group px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M6.5 10.5L15.5 1.5M15.5 1.5h-4M15.5 1.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Browse all professionals
                <svg className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 md:py-20 border-b border-gray-100 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-30 pointer-events-none"></div>
        <div className="container-max relative z-10">
          <div className="mb-12 sm:mb-16 animate-section-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-2 sm:mb-3">Browse Services</h2>
            <p className="text-text-secondary text-sm sm:text-base md:text-lg font-normal">Find professionals in your favorite category</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORY_LIST.map((category, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(category)}
                className="group relative h-[50px] flex items-center justify-center px-3 py-2 border-2 border-gray-200 rounded-lg text-charcoal font-semibold text-xs hover:border-electric-blue hover:bg-blue-50 hover:shadow-lg transition-all duration-300 text-center animate-stagger-fade-in transform hover:scale-105 active:scale-95 overflow-hidden"
                style={{
                  animationDelay: `${idx * 50}ms`,
                  animationFillMode: 'both',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-electric-blue/0 group-hover:to-electric-blue/5 transition-all duration-300"></div>
                <span className="group-hover:text-electric-blue transition-colors duration-300 line-clamp-1 text-xs leading-tight font-semibold relative z-10 px-2">
                  {CATEGORIES[category]}
                </span>
              </button>
            ))}
            <button
              onClick={() => handleCategoryClick('allServices')}
              className="group relative h-[50px] flex items-center justify-center px-3 py-2 border-2 border-electric-blue bg-gradient-to-br from-electric-blue to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 text-center animate-stagger-fade-in transform hover:scale-105 active:scale-95 overflow-hidden"
              style={{
                animationDelay: `${CATEGORY_LIST.length * 50}ms`,
                animationFillMode: 'both',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 group-hover:to-white/20 transition-all duration-300"></div>
              <span className="text-xs font-semibold leading-tight relative z-10 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5h8v8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M18.5 1.5l-8.5 8.5M2.5 2.5h4v4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                All
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 md:py-20 border-b border-gray-100 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-transparent to-transparent opacity-40 pointer-events-none"></div>
        <div className="container-max relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-4 text-center animate-section-fade-in">Why Choose Pro Pool?</h2>
          <p className="text-text-secondary text-sm sm:text-base md:text-lg text-center mb-14 sm:mb-16 animate-section-fade-in font-normal">Join thousands of satisfied users on Nigeria's trusted professional platform</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="space-y-4 animate-stagger-fade-in p-10 rounded-2xl border-2 border-gray-100 hover:border-electric-blue hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-center relative overflow-hidden group"
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/0 to-electric-blue/0 group-hover:from-electric-blue/5 group-hover:to-electric-blue/10 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-electric-blue to-blue-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-text-secondary font-semibold mt-3">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12 md:py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50 via-transparent to-transparent opacity-40 pointer-events-none"></div>
        <div className="container-max relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-4 animate-section-fade-in text-center">What People Are Saying</h2>
          <p className="text-text-secondary text-sm sm:text-base md:text-lg text-center mb-14 sm:mb-16 animate-section-fade-in font-normal">Join thousands of satisfied clients and professionals on Pro Pool</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="space-y-5 p-10 border-2 border-gray-100 rounded-2xl hover:border-electric-blue hover:shadow-xl transition-all duration-300 animate-stagger-fade-in transform hover:scale-105 hover:bg-blue-50 relative overflow-hidden group"
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/0 to-electric-blue/0 group-hover:from-electric-blue/5 group-hover:to-electric-blue/10 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-electric-blue fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-charcoal text-base sm:text-lg leading-relaxed font-normal mb-4 italic">"{testimonial.text}"</p>
                  <p className="text-text-secondary text-sm sm:text-base font-semibold flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-electric-blue to-blue-600 flex-shrink-0"></span>
                    {testimonial.author}
                  </p>
                </div>
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
