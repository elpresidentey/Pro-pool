import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Button from '../components/Button';
import { CATEGORIES, LOCATIONS } from '../constants';
import { getProfessional } from '../utils/professionals';
import { validateReview } from '../utils/validation';

const mockPortfolios: { [key: string]: string[] } = {
  '1': [
    'https://images.unsplash.com/photo-1600329026971-e92caaf16b5e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560066169-b0a93b10f66a?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522335153905-7eb1e1b15b30?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
  ],
  '2': [
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581092162392-8c88416e8ae8?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581092918692-8d1d08905c33?w=300&h=300&fit=crop',
  ],
  '3': [
    'https://images.unsplash.com/photo-1455849318169-8c3cee8cb033?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=300&fit=crop',
  ],
  '4': [
    'https://images.unsplash.com/photo-1581092916550-e323be2ae537?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581092162392-40801cb342b8?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581092918692-8d1d08905c33?w=300&h=300&fit=crop',
  ],
  '5': [
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1536718499f88-9405dc1deaa4?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1514613535308-eb5b8b8aa4d0?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
  ],
  '6': [
    'https://images.unsplash.com/photo-1599351948728-f119bed183e0?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1599351951056-8235022aa208?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1635273243651-e6bef3b3a5aa?w=300&h=300&fit=crop',
  ],
};

const mockReviewsDatabase: { [key: string]: any[] } = {
  '1': [
    {
      id: '1',
      user: 'Amina M.',
      rating: 5,
      comment: 'Amazing service! My makeup looked beautiful. Highly recommended.',
      date: '2024-01-10',
    },
    {
      id: '2',
      user: 'Fola O.',
      rating: 5,
      comment: 'Professional and friendly. Worth every naira!',
      date: '2024-01-08',
    },
    {
      id: '3',
      user: 'Linda A.',
      rating: 4,
      comment: 'Great work but a bit expensive.',
      date: '2024-01-05',
    },
  ],
  '2': [
    {
      id: '1',
      user: 'Derrick O.',
      rating: 5,
      comment: 'Fixed my entire plumbing system. Very professional and quick.',
      date: '2024-01-12',
    },
    {
      id: '2',
      user: 'Chidinma T.',
      rating: 4.5,
      comment: 'Excellent work. Would hire again.',
      date: '2024-01-09',
    },
  ],
  '3': [
    {
      id: '1',
      user: 'Victor U.',
      rating: 5,
      comment: 'Perfect content for my blog. Very engaging and SEO friendly.',
      date: '2024-01-11',
    },
    {
      id: '2',
      user: 'Sandra O.',
      rating: 5,
      comment: 'Professionalism at its best. Delivered before deadline.',
      date: '2024-01-15',
    },
    {
      id: '3',
      user: 'Ade K.',
      rating: 4,
      comment: 'Good quality. Minor revisions needed.',
      date: '2024-01-20',
    },
  ],
  '4': [
    {
      id: '1',
      user: 'James I.',
      rating: 5,
      comment: 'Installed solar panels professionally. Very knowledgeable.',
      date: '2024-01-14',
    },
    {
      id: '2',
      user: 'Blessing M.',
      rating: 5,
      comment: 'Fixed all electrical issues. Highly recommend!',
      date: '2024-01-18',
    },
  ],
  '5': [
    {
      id: '1',
      user: 'Toyin B.',
      rating: 5,
      comment: 'My wedding dress turned out perfect! Excellent tailor.',
      date: '2024-01-13',
    },
    {
      id: '2',
      user: 'Nkechi O.',
      rating: 5,
      comment: 'Best alterations I\'ve had. Very precise work.',
      date: '2024-01-16',
    },
    {
      id: '3',
      user: 'Grace E.',
      rating: 4.5,
      comment: 'Beautiful designs. A bit pricey but worth it.',
      date: '2024-01-19',
    },
  ],
  '6': [
    {
      id: '1',
      user: 'Chukwu D.',
      rating: 5,
      comment: 'Best fade I\'ve gotten. Very skilled barber.',
      date: '2024-01-17',
    },
    {
      id: '2',
      user: 'Seun L.',
      rating: 5,
      comment: 'Clean shop and professional service. Will return.',
      date: '2024-01-21',
    },
  ],
};

export default function ProfessionalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    rating: 5,
    comment: '',
    userName: '',
  });
  const [reviewErrors, setReviewErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  const professional = id ? getProfessional(id) : null;
  const mockPortfolio = id ? mockPortfolios[id] || [] : [];
  
  // Initialize reviews from mock database
  if (reviews.length === 0 && id) {
    setReviews(mockReviewsDatabase[id] || []);
  }
  
  const mockReviews = reviews;

  if (!professional) {
    return <Navigate to="/search" replace />;
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewErrors({});

    // Validate review form
    const errors = validateReview(reviewFormData.userName, reviewFormData.comment, reviewFormData.rating);
    if (Object.keys(errors).length > 0) {
      setReviewErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReview = {
        id: String(mockReviews.length + 1),
        user: reviewFormData.userName,
        rating: reviewFormData.rating,
        comment: reviewFormData.comment,
        date: new Date().toISOString().split('T')[0],
      };
      
      setReviews([...mockReviews, newReview]);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      // Reset form
      setReviewFormData({
        rating: 5,
        comment: '',
        userName: '',
      });
      setIsReviewModalOpen(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 500);
  };

  const avgRatingNumber = mockReviews.length > 0 
    ? mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length
    : 4.8;
  
  const avgRating = avgRatingNumber.toFixed(1);

  return (
    <div className="bg-white min-h-screen">
      <div className="container-max py-12 md:py-16">
        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-card text-green-700 font-medium">
            ✓ Your review has been successfully submitted!
          </div>
        )}
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Profile Image */}
          <div>
            <div className="rounded-2xl overflow-hidden shadow-lg mb-6 border-4 border-electric-blue/10 hover:shadow-xl transition-shadow duration-300">
              <img
                src={professional.profile_image_url}
                alt={professional.name}
                className="image-profile w-full"
              />
            </div>
            <div className="space-y-3">
              <a
                href={`tel:${professional.phone}`}
                className="w-full block"
              >
                <Button size="md" className="w-full flex items-center justify-center font-semibold shadow-md hover:shadow-lg transition-shadow rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.999 1.986 3.644 3.604 5.262 1.618-1.618 3.269-2.817 4.262-3.604l.773 1.548a1 1 0 001.06.54l4.435-.74a1 1 0 01.836.986v2.153a1 1 0 01-1 1h-2C5.897 19 2 15.103 2 10V3z"></path>
                  </svg>
                  Call Now
                </Button>
              </a>
              <a
                href={`https://wa.me/${professional.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                <Button variant="secondary" size="md" className="w-full flex items-center justify-center font-semibold rounded-lg border-2 hover:border-electric-blue transition-all">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-.36.221-.698.437-.997.662-.207.15-.371.356-.441.571-.06.186.026.345.191.472.141.12.352.189.572.189h.003c.282 0 .631-.08.993-.236 1.782-.721 3.666-1.086 5.61-1.086 4.187 0 7.591 3.404 7.591 7.591 0 4.187-3.404 7.591-7.591 7.591-1.759 0-3.434-.604-4.776-1.7-.31-.264-.547-.557-.684-.851-.125-.275-.157-.518-.157-.755 0-.372.056-.744.21-1.08.24-.532.635-1.03 1.166-1.378l1.523-1.086c.28-.199.437-.551.437-.925v-.443c0-.823-.671-1.494-1.494-1.494-.823 0-1.494.671-1.494 1.494v.443c0 .374.157.726.437.925l1.523 1.086c.531.348.926.846 1.166 1.378.154.336.21.708.21 1.08 0 .237-.032.48-.157.755-.137.294-.374.587-.684.851-1.342 1.096-3.017 1.7-4.776 1.7-4.187 0-7.591-3.404-7.591-7.591 0-4.187 3.404-7.591 7.591-7.591z"/>
                  </svg>
                  Message
                </Button>
              </a>
            </div>
          </div>

          {/* Info Section */}
          <div className="md:col-span-2">
            <div className="mb-8 pb-8 border-b-2 border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-5xl font-bold text-charcoal mb-2">{professional.name}</h1>
                  <p className="text-2xl font-semibold text-electric-blue mb-2">
                    {CATEGORIES[professional.category]}
                  </p>
                  <p className="text-lg text-gray-600 flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    {LOCATIONS[professional.location]}
                  </p>
                </div>
              </div>

              {/* Rating Section - Enhanced */}
              <div className="flex items-center gap-6 bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-3xl ${
                          i < Math.floor(avgRatingNumber) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-charcoal">
                      {avgRating}
                    </p>
                    <p className="text-sm text-gray-600">
                      {mockReviews.length} {mockReviews.length === 1 ? 'review' : 'reviews'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section - Enhanced */}
            <div className="bg-gradient-to-br from-electric-blue/5 to-blue-50 border-2 border-electric-blue/10 rounded-2xl p-8 mb-8">
              <h2 className="font-bold text-charcoal mb-4 text-xl flex items-center gap-2">
                <svg className="w-6 h-6 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd"></path>
                </svg>
                About
              </h2>
              <p className="text-text-primary leading-relaxed text-lg">{professional.bio}</p>
            </div>

            {/* Instagram Link */}
            {professional.instagram_link && (
              <div className="mb-6">
                <a
                  href={professional.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-electric-blue font-semibold bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 border-2 border-electric-blue/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.894 9.797c.003.157.003.316.003.476 0 4.837-3.679 10.412-10.411 10.412-2.065 0-3.989-.605-5.608-1.644.288.033.581.05.88.05 1.714 0 3.289-.585 4.543-1.566-1.601-.032-2.95-1.087-3.414-2.542.224.032.453.05.687.05.334 0 .658-.042.97-.124-1.676-.337-2.938-1.814-2.938-3.589v-.046c.493.274 1.056.44 1.659.46-.983-.657-1.631-1.777-1.631-3.047 0-.67.18-1.298.495-1.838 1.807 2.217 4.51 3.674 7.556 3.827-.063-.267-.095-.544-.095-.83 0-2.01 1.631-3.641 3.641-3.641 1.047 0 1.991.442 2.655 1.15.827-.162 1.606-.463 2.31-.878-.27.844-.843 1.55-1.587 1.996.736-.085 1.437-.283 2.088-.574-.487.729-1.102 1.369-1.81 1.881z"></path>
                  </svg>
                  Follow on Instagram
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Portfolio Section */}
        <section className="mb-12">
          <h2 className="text-h2 text-charcoal mb-6">Portfolio</h2>

          {mockPortfolio.length > 0 ? (
            <div>
              <div className="mb-4 rounded-card overflow-hidden shadow-card">
                <img
                  src={mockPortfolio[selectedImage]}
                  alt={`Portfolio ${selectedImage + 1}`}
                  className="image-portfolio-main"
                />
              </div>

              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {mockPortfolio.map((image, index) => (
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
                      className="image-portfolio-thumb"
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
        <section className="bg-gradient-to-b from-white via-blue-50/30 to-white py-12">
          <h2 className="text-4xl font-bold text-charcoal mb-8">Client Reviews</h2>

          {mockReviews.length > 0 ? (
            <div className="space-y-4 mb-8">
              {mockReviews.map((review) => (
                <div 
                  key={review.id} 
                  className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:border-electric-blue/30 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-lg font-bold text-charcoal">{review.user}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a2 2 0 012 2v2a2 2 0 01-2 2H2a2 2 0 01-2-2V9a2 2 0 012-2h4z" clipRule="evenodd"></path>
                        </svg>
                        {review.date}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-2xl ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-text-primary text-lg leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-16 text-center border-2 border-dashed border-gray-300 mb-8">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd"></path>
              </svg>
              <p className="text-gray-500 text-lg font-medium">No reviews yet</p>
              <p className="text-gray-400 mt-2">Be the first to share your experience!</p>
            </div>
          )}

          {/* Add Review Button */}
          <div className="flex justify-center">
            <Button 
              size="md"
              onClick={() => setIsReviewModalOpen(true)}
              className="px-8 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM15.657 14.243a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM11 17a1 1 0 102 0v-1a1 1 0 10-2 0v1zM5.757 15.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zM5.757 4.343a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707z"></path>
              </svg>
              Write a Review
            </Button>
          </div>
        </section>

        {/* Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border-2 border-gray-100 animate-slideDown max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6 gap-3">
                <h3 className="text-xl sm:text-2xl font-bold text-charcoal">Share Your Experience</h3>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="text-gray-400 hover:text-charcoal transition-colors rounded-full hover:bg-gray-100 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-700 font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Thank you! Your review is live.
                </div>
              )}
              
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-3">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={reviewFormData.userName}
                    onChange={(e) =>
                      setReviewFormData({ ...reviewFormData, userName: e.target.value })
                    }
                    placeholder="Enter your name"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-lg ${
                      reviewErrors.userName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-200 focus:ring-electric-blue focus:border-electric-blue'
                    }`}
                  />
                  {reviewErrors.userName && <p className="text-red-500 text-sm mt-2 font-medium">{reviewErrors.userName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-charcoal mb-3">
                    Your Rating *
                  </label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setReviewFormData({ ...reviewFormData, rating: star })
                        }
                        className={`text-4xl transition-transform duration-200 transform hover:scale-125 ${
                          star <= reviewFormData.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  {reviewErrors.rating && <p className="text-red-500 text-sm mt-2 font-medium">{reviewErrors.rating}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-charcoal mb-3">
                    Your Comment *
                  </label>
                  <textarea
                    value={reviewFormData.comment}
                    onChange={(e) =>
                      setReviewFormData({ ...reviewFormData, comment: e.target.value })
                    }
                    placeholder="Share your experience..."
                    required
                    rows={5}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none text-lg ${
                      reviewErrors.comment
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-200 focus:ring-electric-blue focus:border-electric-blue'
                    }`}
                  />
                  {reviewErrors.comment && <p className="text-red-500 text-sm mt-2 font-medium">{reviewErrors.comment}</p>}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="flex-1 px-6 py-3 text-charcoal font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-electric-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:bg-gray-400 transform hover:scale-105"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Review'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
