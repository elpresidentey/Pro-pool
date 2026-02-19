import type { ProfessionalCard as ProfessionalCardType } from '../types';
import { CATEGORIES, LOCATIONS } from '../constants';
import { Link } from 'react-router-dom';

interface Props {
  professional: ProfessionalCardType;
}

export default function ProfessionalCard({ professional }: Props) {
  return (
    <Link to={`/professional/${professional.id}`} className="group">
      <div className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-electric-blue hover:shadow-lg transform hover:scale-105 flex flex-col">
        {/* Profile Image */}
        <div className="w-full h-48 bg-gray-200 overflow-hidden relative flex-shrink-0">
          <img
            src={professional.profile_image_url}
            alt={professional.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-charcoal text-lg group-hover:text-electric-blue transition-colors duration-300">
                {professional.name}
              </h3>
            </div>
            
            <div>
              <p className="text-sm font-medium text-electric-blue mb-1">
                {CATEGORIES[professional.category]}
              </p>
              <p className="text-sm text-text-secondary">
                {LOCATIONS[professional.location]}
              </p>
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
            <button className="w-full px-4 py-2.5 bg-electric-blue text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
