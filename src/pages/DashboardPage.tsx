import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { CATEGORIES, LOCATIONS } from '../constants';
import { useCurrentUser, signOut } from '../utils/auth';
import { supabase } from '../utils/supabase';
import { validateProfileForm } from '../utils/validation';
import ImageUpload from '../components/ImageUpload';
import { ErrorMessage, LoadingScreen, SuccessMessage } from '../components/States';
import type { Professional } from '../types';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, loading: userLoading } = useCurrentUser();

  const [professional, setProfessional] = useState<Professional | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState<File[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    category: 'beautician',
    location: 'lekki',
    phone: '',
    whatsapp: '',
    bio: '',
  });

  const [reviews, setReviews] = useState<any[]>([]);
  const [avgRating, setAvgRating] = useState<number>(0);

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    loadProfessionalProfile();
  }, [user, userLoading, navigate]);

  const loadProfessionalProfile = async () => {
    if (!user) return;

    try {
      setProfileLoading(true);
      setError(null);

      // Fetch professional profile
      const { data: prof, error: profError } = await supabase
        .from('professionals')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profError && profError.code !== 'PGRST116') {
        throw profError;
      }

      if (prof) {
        setProfessional(prof);
        setFormData({
          name: prof.name,
          category: prof.category,
          location: prof.location,
          phone: prof.phone,
          whatsapp: prof.whatsapp,
          bio: prof.bio,
        });

        // Fetch portfolio
        const { data: portfolioData } = await supabase
          .from('portfolio')
          .select('*')
          .eq('professional_id', prof.id);

        setPortfolio(portfolioData || []);

        // Fetch reviews
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('*')
          .eq('professional_id', prof.id);

        setReviews(reviewsData || []);

        if (reviewsData && reviewsData.length > 0) {
          const avg = reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length;
          setAvgRating(Math.round(avg * 10) / 10);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!professional || !user) return;

    setSaving(true);
    setError(null);

    try {
      const validationErrors = validateProfileForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setError(Object.values(validationErrors)[0] as string);
        setSaving(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('professionals')
        .update({
          name: formData.name,
          category: formData.category,
          location: formData.location,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          bio: formData.bio,
        })
        .eq('id', professional.id);

      if (updateError) throw updateError;

      // Upload portfolio images if any
      if (portfolioImages.length > 0) {
        for (const image of portfolioImages) {
          const fileName = `${professional.id}-portfolio-${Date.now()}-${Math.random()}`;
          const { error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(fileName, image);

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage
              .from('portfolio')
              .getPublicUrl(fileName);

            await supabase.from('portfolio').insert([
              {
                professional_id: professional.id,
                image_url: publicUrlData.publicUrl,
              },
            ]);
          }
        }
        setPortfolioImages([]);
      }

      setSuccess(true);
      setProfessional({ ...professional, name: formData.name, category: formData.category as any, location: formData.location as any, phone: formData.phone, whatsapp: formData.whatsapp, bio: formData.bio });
      setIsEditing(false);
      
      await loadProfessionalProfile();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  if (userLoading || profileLoading) return <LoadingScreen />;

  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </div>

        {error && <ErrorMessage error={error} />}
        {success && <SuccessMessage message="Profile updated successfully!" />}

        {!professional ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">No Professional Profile</h2>
            <p className="text-gray-600 mb-6">
              You need to create a professional profile to get started.
            </p>
            <Button onClick={() => navigate('/setup-profile')}>
              Create Profile
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-lg shadow p-6 sticky top-20">
                {professional.profile_image_url && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={professional.profile_image_url}
                      alt="Profile"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                )}

                {/* Rating */}
                {avgRating > 0 && (
                  <div className="mb-4 pb-4 border-b">
                    <p className="text-sm font-medium text-gray-900 mb-2">Rating</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-yellow-500">{avgRating}</span>
                      <span className="text-sm text-gray-600">({reviews.length} reviews)</span>
                    </div>
                  </div>
                )}

                {/* Approval Status */}
                <div className="mb-4 pb-4 border-b">
                  <p className="text-sm font-medium text-gray-900 mb-2">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${professional.is_approved ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-sm text-gray-600">
                      {professional.is_approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {professional.is_approved
                      ? 'Your profile is visible to clients'
                      : 'Admin is reviewing your profile'}
                  </p>
                </div>

                {/* Category & Location */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Category</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{professional.category}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Location</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{professional.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? 'primary' : 'secondary'}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Email (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(CATEGORIES).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Location
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(LOCATIONS).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Portfolio Upload */}
                {isEditing && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Add Portfolio Images
                    </label>
                    <ImageUpload 
                      onFileSelect={(file) => setPortfolioImages(prev => [...prev, file])}
                    />
                  </div>
                )}

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="secondary"
                      onClick={() => {
                        setIsEditing(false);
                        setPortfolioImages([]);
                      }}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Portfolio Section */}
        {professional && portfolio.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {portfolio.map((item) => (
                <img
                  key={item.id}
                  src={item.image_url}
                  alt="Portfolio"
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        {professional && reviews.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews</h3>
            <div className="space-y-4">
              {reviews.slice(0, 5).map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-gray-700">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
