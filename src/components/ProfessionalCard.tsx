import type { ProfessionalCard as ProfessionalCardType } from '../types';
import { CATEGORIES, LOCATIONS } from '../constants';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import VerificationBadge from './VerificationBadge';
import Button from './Button';

interface Props {
  professional: ProfessionalCardType;
}

export default function ProfessionalCard({ professional }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(professional.id);
  };

  return (
    <Link to={`/professional/${professional.id}`} className="group">
      <div className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-electric-blue hover:shadow-lg transform hover:scale-105 flex flex-col">
        {/* Profile Image with Favorite Button */}
        <div className="w-full aspect-square bg-gray-200 overflow-hidden relative flex-shrink-0">
          <img
            src={professional.profile_image_url}
            alt={professional.name}
            className="image-card transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          
          {/* Favorite Button */}
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite(professional.id)
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
              }`}
              title={isFavorite(professional.id) ? 'Remove from favorites' : 'Add to favorites'}
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill={isFavorite(professional.id) ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-charcoal text-lg group-hover:text-electric-blue transition-colors duration-300">
                {professional.name}
              </h3>
              <p className="text-xs text-gray-500 mt-2">Professional ID: {professional.id}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-electric-blue mb-2">
                {CATEGORIES[professional.category]}
              </p>
              <p className="text-sm text-text-secondary">
                {LOCATIONS[professional.location]}
              </p>
            </div>

            {/* Verification Badges */}
            <div className="pt-2">
              <VerificationBadge isVerified={true} topRated={professional.rating >= 4.8} />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-transform duration-300 ${
                      i < Math.floor(professional.rating)
                        ? 'bg-electric-blue'
                        : 'bg-gray-200'
                    } group-hover:scale-125`}
                    style={{ transitionDelay: `${i * 30}ms` }}
                  ></div>
                ))}
              </div>
              <span className="text-xs font-medium text-text-secondary whitespace-nowrap">
                {professional.rating.toFixed(1)} ({professional.review_count})
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button size="sm" className="w-full font-medium">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
