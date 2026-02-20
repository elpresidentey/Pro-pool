import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Button from '../components/Button';
import { CATEGORIES, LOCATIONS } from '../constants';
import type { Professional } from '../types';
import { professionals } from '../utils/supabase';
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

  const [professional, setProfessional] = useState<Professional | null>(null);
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessional = async () => {
      if (!id) {
        setError('No professional ID provided');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await professionals.getById(id);
        if (error) {
          setError(error.message);
        } else if (data) {
          setProfessional(data);
          setPortfolio(data.portfolio?.map((p: any) => p.image_url) || []);
          setReviews(data.reviews || []);
        }
      } catch (err: any) {
        setError(err instanceof Error ? err.message : 'Failed to load professional');
      } finally {
        setLoading(false);
      }
    };

    fetchProfessional();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">Error: {error}</div>
    </div>
  );

  if (!professional) return <Navigate to="/search" replace />;

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 4.8;

  return (
    <div className="bg-white min-h-screen">
      <div className="container-max py-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Profile Image */}
          <div>
            <div className="rounded-card overflow-hidden shadow-card mb-4">
              <img
                src={professional.profile_image_url}
                alt={professional.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${professional.phone}`}
                className="w-full"
              >
                <Button className="w-full h-12 flex items-center justify-center">Call</Button>
              </a>
              <a
                href={`https://wa.me/${professional.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full h-12 flex items-center justify-center">WhatsApp</Button>
              </a>
            </div>
          </div>

          {/* Info Section */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h1 className="text-h1 text-charcoal mb-2">{professional.name}</h1>
              <p className="text-lg text-text-secondary">
                {CATEGORIES[professional.category]}
              </p>
              <p className="text-text-secondary mb-4">
                {LOCATIONS[professional.location]}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < Math.floor(avgRating) ? 'text-electric-blue' : 'text-border-color'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-charcoal">
                  {avgRating} ({reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-gray-50 rounded-card p-6">
              <h2 className="font-semibold text-charcoal mb-3">About</h2>
              <p className="text-text-primary leading-relaxed">{professional.bio}</p>
            </div>

            {/* Instagram Link */}
            {professional.instagram_link && (
              <div className="mt-4">
                <a
                  href={professional.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-blue hover:underline"
                >
                  Follow on Instagram
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Portfolio Section */}
        <section className="mb-12">
          <h2 className="text-h2 text-charcoal mb-6">Portfolio</h2>

          {portfolio.length > 0 ? (
            <div>
              <div className="mb-4 rounded-card overflow-hidden shadow-card">
                <img
                  src={portfolio[selectedImage]}
                  alt={`Portfolio ${selectedImage + 1}`}
                  className="w-full h-96 object-cover"
                />
              </div>

              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {portfolio.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-card overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-electric-blue shadow-lg'
                        : 'border-border-color hover:border-electric-blue'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-card p-12 text-center">
              <p className="text-text-secondary">No portfolio images yet</p>
            </div>
          )}
        </section>

        {/* Reviews Section */}
        <section>
          <h2 className="text-h2 text-charcoal mb-6">Client Reviews</h2>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 rounded-card p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-charcoal">Anonymous</p>
                      <p className="text-sm text-text-secondary">Recent</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < review.rating ? 'text-electric-blue' : 'text-border-color'
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-text-primary">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-card p-12 text-center">
              <p className="text-text-secondary">No reviews yet</p>
            </div>
          )}

          {/* Add Review Button */}
          <div className="mt-8">
            <Button>Write a Review</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
