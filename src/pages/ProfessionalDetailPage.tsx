import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Button from '../components/Button';
import { CATEGORIES, LOCATIONS } from '../constants';
import type { Professional } from '../types';

// Mock database - replace with Supabase queries
const mockProfessionals: { [key: string]: Professional } = {
  '1': {
    id: '1',
    user_id: 'user-1',
    name: 'Chioma Okonkwo',
    category: 'beautician',
    location: 'lekki',
    phone: '+2348012345678',
    whatsapp: '+2348012345678',
    bio: 'Professional makeup and hair beautician with over 5 years of experience. Specialized in bridal makeup, weaving, and nails. I deliver quality services with premium products.',
    profile_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/chioma_makeup',
    is_approved: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  '2': {
    id: '2',
    user_id: 'user-2',
    name: 'Tunde Adeleke',
    category: 'plumber',
    location: 'yaba',
    phone: '+2348023456789',
    whatsapp: '+2348023456789',
    bio: 'Expert plumber with 8 years of experience. Specialized in residential and commercial plumbing. Fast response time and professional service guaranteed.',
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/tunde_plumbing',
    is_approved: true,
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
  },
  '3': {
    id: '3',
    user_id: 'user-3',
    name: 'Zainab Hassan',
    category: 'writer',
    location: 'ikeja',
    phone: '+2348034567890',
    whatsapp: '+2348034567890',
    bio: 'Content writer and SEO specialist with 6 years experience. I create engaging, informative content for blogs, websites, and social media. Fluent in English and Hausa.',
    profile_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/zainab_writes',
    is_approved: true,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
  },
  '4': {
    id: '4',
    user_id: 'user-4',
    name: 'Kunle Oladele',
    category: 'electrician',
    location: 'surulere',
    phone: '+2348045678901',
    whatsapp: '+2348045678901',
    bio: 'Licensed electrician with 10 years of experience. Expert in residential wiring, solar installation, and electrical repairs. Licensed and insured professional.',
    profile_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/kunle_electric',
    is_approved: true,
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z',
  },
  '5': {
    id: '5',
    user_id: 'user-5',
    name: 'Amara Nwosu',
    category: 'tailor',
    location: 'VI',
    phone: '+2348056789012',
    whatsapp: '+2348056789012',
    bio: 'High-end fashion tailor specializing in traditional and contemporary wear. 12 years experience with celebrity clients. Expert in alterations and custom designs.',
    profile_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/amara_designs',
    is_approved: true,
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z',
  },
  '6': {
    id: '6',
    user_id: 'user-6',
    name: 'Samuel Okoro',
    category: 'beautician',
    location: 'agege',
    phone: '+2348067890123',
    whatsapp: '+2348067890123',
    bio: 'Professional barber and grooming specialist. Expert in contemporary cuts, fades, and traditional shaving. Premium products used for all services.',
    profile_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
    instagram_link: 'https://instagram.com/samuel_barber',
    is_approved: true,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
  },
};

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

  const professional = id ? mockProfessionals[id] : null;
  const mockPortfolio = id ? mockPortfolios[id] || [] : [];
  const mockReviews = id ? mockReviewsDatabase[id] || [] : [];

  if (!professional) {
    return <Navigate to="/search" replace />;
  }

  const avgRating = mockReviews.length > 0 
    ? (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1)
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
                  {avgRating} ({mockReviews.length} reviews)
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

          {mockPortfolio.length > 0 ? (
            <div>
              <div className="mb-4 rounded-card overflow-hidden shadow-card">
                <img
                  src={mockPortfolio[selectedImage]}
                  alt={`Portfolio ${selectedImage + 1}`}
                  className="w-full h-96 object-cover"
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

          {mockReviews.length > 0 ? (
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-card p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-charcoal">{review.user}</p>
                      <p className="text-sm text-text-secondary">{review.date}</p>
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
