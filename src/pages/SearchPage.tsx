import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProfessionalCard from '../components/ProfessionalCard';
import Button from '../components/Button';
import { CATEGORIES, LOCATIONS, CATEGORY_LIST, LOCATION_LIST } from '../constants';
import type { ProfessionalCard as ProfessionalCardType } from '../types';

// Mock data - replace with Supabase queries
const mockProfessionals: ProfessionalCardType[] = [
  {
    id: '1',
    name: 'Chioma Okonkwo',
    category: 'beautician',
    location: 'lekki',
    profile_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
    review_count: 24,
  },
  {
    id: '2',
    name: 'Tunde Adeleke',
    category: 'plumber',
    location: 'yaba',
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 4.5,
    review_count: 18,
  },
  {
    id: '3',
    name: 'Zainab Hassan',
    category: 'writer',
    location: 'ikeja',
    profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 5,
    review_count: 32,
  },
  {
    id: '4',
    name: 'Kunle Oladele',
    category: 'electrician',
    location: 'surulere',
    profile_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 4.8,
    review_count: 28,
  },
  {
    id: '5',
    name: 'Amara Nwosu',
    category: 'tailor',
    location: 'VI',
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 4.9,
    review_count: 41,
  },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<ProfessionalCardType[]>(mockProfessionals);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    // Simulate search
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = mockProfessionals;

      if (searchQuery) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (category) {
        filtered = filtered.filter((p) => p.category === category);
      }

      if (location) {
        filtered = filtered.filter((p) => p.location === location);
      }

      setResults(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, category, location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (category) params.set('category', category);
    if (location) params.set('location', location);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container-max py-8">
        <h1 className="text-h1 text-charcoal mb-8">Search Professionals</h1>

        {/* Filter Section */}
        <div className="bg-gray-50 rounded-card p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Name or keyword..."
                  className="w-full px-4 py-2 border border-border-color rounded-button focus:outline-none focus:ring-2 focus:ring-electric-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-border-color rounded-button focus:outline-none focus:ring-2 focus:ring-electric-blue"
                >
                  <option value="">All Categories</option>
                  {CATEGORY_LIST.map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORIES[cat]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-border-color rounded-button focus:outline-none focus:ring-2 focus:ring-electric-blue"
                >
                  <option value="">All Locations</option>
                  {LOCATION_LIST.map((loc) => (
                    <option key={loc} value={loc}>
                      {LOCATIONS[loc]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit">Search</Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setSearchQuery('');
                  setCategory('');
                  setLocation('');
                  setSearchParams({});
                }}
              >
                Clear Filters
              </Button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue"></div>
            <p className="text-text-secondary mt-4">Searching...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">
              No professionals found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <>
            <p className="text-text-secondary mb-6">
              Found <strong>{results.length}</strong> professional{results.length !== 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
