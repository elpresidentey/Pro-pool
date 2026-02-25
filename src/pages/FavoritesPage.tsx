import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfessionalCard from '../components/ProfessionalCard';
import Button from '../components/Button';
import { useFavorites } from '../hooks/useFavorites';
import { loadProfessionalCards } from '../utils/professionals';
import type { ProfessionalCard as ProfessionalCardType } from '../types';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const [favoritesProfessionals, setFavoritesProfessionals] = useState<ProfessionalCardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const allProfessionals = loadProfessionalCards();
    const filteredFavorites = allProfessionals.filter((p) =>
      favorites.includes(p.id)
    );
    setFavoritesProfessionals(filteredFavorites);
    setLoading(false);
  }, [favorites]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container-max py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-electric-blue font-semibold mb-6 sm:mb-8 hover:gap-3 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-charcoal mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              My Favorites
            </h1>
            <p className="text-base sm:text-lg text-text-secondary">
              {favoritesProfessionals.length} professional{favoritesProfessionals.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        ) : favoritesProfessionals.length === 0 ? (
          <div className="text-center py-12 sm:py-24">
            <div className="inline-block mb-6 sm:mb-8">
              <div className="w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-red-50 to-pink-50 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 sm:w-16 h-12 sm:h-16 text-red-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-2">No Favorites Yet</h2>
            <p className="text-base sm:text-lg text-text-secondary mb-8 sm:mb-10 max-w-md mx-auto px-4">
              Start saving your favorite professionals to keep them handy. Click the heart icon on any professional card to add them here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button size="md" onClick={() => navigate('/search')} className="flex items-center justify-center gap-2 w-full sm:w-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Professionals
              </Button>
              <Button size="md" variant="secondary" onClick={() => navigate('/')} className="w-full sm:w-auto">
                Back to Home
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-text-secondary mb-8 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Here are your saved professionals
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritesProfessionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
