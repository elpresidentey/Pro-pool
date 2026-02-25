import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProfessionalCard from '../components/ProfessionalCard';
import Button from '../components/Button';
import { CATEGORIES, LOCATIONS, CATEGORY_LIST, LOCATION_LIST } from '../constants';
import { loadProfessionalCards } from '../utils/professionals';
import type { ProfessionalCard as ProfessionalCardType } from '../types';

// Helper function to safely access category/location names
const getCategoryName = (cat: string) => (CATEGORIES as Record<string, string>)[cat] || cat;
const getLocationName = (loc: string) => (LOCATIONS as Record<string, string>)[loc] || loc;

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProfessionals, setAllProfessionals] = useState<ProfessionalCardType[]>([]);
  const [results, setResults] = useState<ProfessionalCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [minRating, setMinRating] = useState(searchParams.get('rating') ? parseFloat(searchParams.get('rating')!) : 0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  // Load professionals on mount
  useEffect(() => {
    const professionals = loadProfessionalCards();
    setAllProfessionals(professionals);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Simulate search
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = allProfessionals;

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

      if (minRating > 0) {
        filtered = filtered.filter((p) => p.rating >= minRating);
      }

      // Apply sorting
      const sorted = [...filtered];
      if (sortBy === 'rating_high') {
        sorted.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'rating_low') {
        sorted.sort((a, b) => a.rating - b.rating);
      } else if (sortBy === 'reviews') {
        sorted.sort((a, b) => b.review_count - a.review_count);
      }
      // 'newest' is default (original order)

      setResults(sorted);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, category, location, minRating, allProfessionals, sortBy]);

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
      <div className="container-max py-12 md:py-16">
        <h1 className="text-3xl sm:text-h1 text-charcoal mb-10 sm:mb-12">Search Professionals</h1>

        {/* Filter Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 sm:p-10 mb-12 border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-lg sm:text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Find Your Perfect Professional
          </h2>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-1">
                  <svg className="w-4 h-4 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M19.129 5.129a9 9 0 00-14.128 0L2.06 11.999l2.94 2.94a9 9 0 0012.128 0l2.94-2.94-2.94-2.94zM10 14a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Name or skill..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-electric-blue focus:ring-0 focus:shadow-lg transition-all duration-300 hover:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-1">
                  <svg className="w-4 h-4 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.797l.291 1.45a1 1 0 00.822.773l1.41.355a1 1 0 01.5 1.758l-1.08 1.08c.009.086.009.172 0 .258A5.002 5.002 0 0112 13a5.002 5.002 0 01-4.826-3.338 1 1 0 00-1.757.5l-.355 1.41a1 1 0 00.773.822l1.45.291a1 1 0 01.797.986v2.153a1 1 0 01-1 1h-2.153a1 1 0 01-.986-.797l-.291-1.45a1 1 0 00-.822-.773l-1.41-.355a1 1 0 01-.5-1.758l1.08-1.08a6.002 6.002 0 010-.516A5.002 5.002 0 014 7a5.002 5.002 0 014.826-3.338 1 1 0 001.757-.5l.355-1.41a1 1 0 00-.773-.822l-1.45-.291A1 1 0 004.153 2H2z" />
                  </svg>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-electric-blue focus:ring-0 focus:shadow-lg transition-all duration-300 hover:border-gray-300 cursor-pointer"
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
                <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-1">
                  <svg className="w-4 h-4 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-electric-blue focus:ring-0 focus:shadow-lg transition-all duration-300 hover:border-gray-300 cursor-pointer"
                >
                  <option value="">All Locations</option>
                  {LOCATION_LIST.map((loc) => (
                    <option key={loc} value={loc}>
                      {LOCATIONS[loc]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2 flex items-center gap-1">
                  <svg className="w-4 h-4 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Sort
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-electric-blue focus:ring-0 focus:shadow-lg transition-all duration-300 hover:border-gray-300 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="rating_high">Highest Rating</option>
                  <option value="rating_low">Lowest Rating</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" size="md" className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </Button>
              <Button
                type="button"
                size="md"
                variant="secondary"
                onClick={() => {
                  setShowAdvanced(!showAdvanced);
                }}
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                {showAdvanced ? 'Hide' : 'Show'} More
              </Button>
            </div>

            {/* Advanced Filters Section */}
            {showAdvanced && (
              <div className="border-t-2 border-gray-200 pt-8 mt-8">
                <h3 className="text-sm font-semibold text-charcoal mb-4">Advanced Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Minimum Rating: <span className="text-electric-blue font-bold">{minRating.toFixed(1)} ★</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={minRating}
                      onChange={(e) => setMinRating(parseFloat(e.target.value))}
                      className="w-full h-3 bg-gradient-to-r from-gray-300 to-electric-blue rounded-lg appearance-none cursor-pointer accent-electric-blue"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>0.0 ★</span>
                      <span>5.0 ★</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {(searchQuery || category || location || minRating > 0) && (
              <div className="border-t-2 border-gray-200 pt-6 mt-6">
                <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Active Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <div className="inline-flex items-center gap-2 bg-electric-blue/10 border border-electric-blue/30 text-electric-blue px-3 py-1.5 rounded-full text-sm font-medium">
                      <span>🔍 {searchQuery}</span>
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="hover:opacity-70 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {category && (
                    <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      <span>📁 {getCategoryName(category)}</span>
                      <button
                        type="button"
                        onClick={() => setCategory('')}
                        className="hover:opacity-70 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {location && (
                    <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-300 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      <span>📍 {getLocationName(location)}</span>
                      <button
                        type="button"
                        onClick={() => setLocation('')}
                        className="hover:opacity-70 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {minRating > 0 && (
                    <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 text-yellow-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      <span>⭐ {minRating.toFixed(1)}+</span>
                      <button
                        type="button"
                        onClick={() => setMinRating(0)}
                        className="hover:opacity-70 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => {
                  setSearchQuery('');
                  setCategory('');
                  setLocation('');
                  setMinRating(0);
                  setSortBy('newest');
                  setSearchParams({});
                }}
                className="flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 1119.9 7h-1.9a5 5 0 10-9.9-3V9a1 1 0 11-2 0V3a1 1 0 011-1h5a1 1 0 011 1v2h-1V3H4z" clipRule="evenodd" />
                </svg>
                Reset All Filters
              </Button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="space-y-6 mt-12">
            <div className="h-20 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-xl animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-200 to-gray-100"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-full"></div>
                      <div className="h-3 bg-gray-100 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-2">No professionals found</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We couldn't find any professionals matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setCategory('');
                setLocation('');
                setMinRating(0);
                setSortBy('newest');
                setSearchParams({});
              }}
            >
              Clear Filters & Browse All
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-8 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-gray-100">
              <div>
                <p className="text-lg font-semibold text-charcoal">
                  Found <span className="text-electric-blue text-xl">{results.length}</span>{' '}
                  <span className="text-text-secondary">professional{results.length !== 1 ? 's' : ''}</span>
                </p>
                <p className="text-sm text-text-secondary mt-2">
                  {category && `in ${getCategoryName(category)}`}
                  {location && ` • ${getLocationName(location)}`}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Sorted by {sortBy === 'newest' ? 'Newest' : sortBy === 'rating_high' ? 'Highest Rating' : sortBy === 'rating_low' ? 'Lowest Rating' : 'Most Reviews'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
