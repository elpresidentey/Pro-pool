import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { useCurrentUser } from '../utils/auth';
import { validateProfileForm } from '../utils/validation';
import { saveProfessional } from '../utils/professionals';
import ImageUpload from '../components/ImageUpload';
import Button from '../components/Button';
import { CATEGORIES, LOCATIONS } from '../constants';
import { ErrorMessage, LoadingScreen, SuccessMessage } from '../components/States';

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const { user, loading: userLoading } = useCurrentUser();
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'beautician',
    location: 'lekki',
    phone: '',
    whatsapp: '',
    bio: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');
  const [portfolioPreview, setPortfolioPreview] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (userLoading) return <LoadingScreen />;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <ErrorMessage error="You must be logged in to set up your profile" />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleProfileImageUpload = (file: File) => {
    setProfileImage(file);
    const preview = URL.createObjectURL(file);
    setProfileImagePreview(preview);
  };

  const handlePortfolioImageUpload = (file: File) => {
    const preview = URL.createObjectURL(file);
    setPortfolioPreview(prev => [...prev, preview]);
  };

  const removePortfolioImage = (index: number) => {
    setPortfolioPreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validate form
      const validationErrors = validateProfileForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setError(Object.values(validationErrors)[0] as string);
        setLoading(false);
        return;
      }

      // Upload profile image if provided
      let profileImageUrl: string | null = null;
      if (profileImage) {
        const fileName = `${user.id}-profile-${Date.now()}`;
        const { error: uploadError } = await supabase.storage
          .from('profiles')
          .upload(fileName, profileImage, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Profile image upload failed: ${uploadError.message}. Make sure the 'profiles' bucket exists in Supabase Storage.`);
        }
        
        const { data: publicUrlData } = supabase.storage
          .from('profiles')
          .getPublicUrl(fileName);
        
        profileImageUrl = publicUrlData.publicUrl;
      }

      // Prepare professional data
      const professionalData = {
        user_id: user.id,
        name: formData.name.trim(),
        category: formData.category as any,
        location: formData.location as any,
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp.trim(),
        bio: formData.bio.trim(),
        profile_image_url: profileImageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
        instagram_link: '',
        is_approved: false,
      };

      // Save to localStorage (works offline)
      saveProfessional(professionalData);

      // Also try to save to Supabase (optional, for when backend is available)
      try {
        const { error: profError } = await supabase
          .from('professionals')
          .insert([professionalData])
          .select()
          .single();

        if (profError) {
          console.warn('Supabase profile creation warning:', profError.message);
          // Don't throw - we already saved locally
        } else {
          // Profile successfully saved to Supabase
        }
      } catch (err) {
        console.warn('Supabase sync warning:', err);
        // Continue anyway - localStorage is our primary storage
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create profile';
      console.error('Error in handleSubmit:', err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set Up Your Professional Profile</h1>
          <p className="text-gray-600 mb-8">Complete your profile to start accepting clients</p>

          {error && <ErrorMessage error={error} />}
          {success && <SuccessMessage message="Profile created successfully! Redirecting..." />}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Profile Picture
              </label>
              <div className="flex gap-4 items-start">
                <ImageUpload onFileSelect={handleProfileImageUpload} />
                {profileImagePreview && (
                  <img 
                    src={profileImagePreview} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Chioma Okonkwo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Professional Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+2348012345678"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Must be Nigerian number (e.g., +2348...)</p>
            </div>

            {/* WhatsApp */}
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="+2348012345678"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                Professional Bio *
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell clients about your experience, skills, and specialties..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">10–300 characters</p>
            </div>

            {/* Portfolio Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Portfolio Images (Optional)
              </label>
              <div className="mb-4">
                <ImageUpload onFileSelect={handlePortfolioImageUpload} />
              </div>
              {portfolioPreview.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {portfolioPreview.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={preview} 
                        alt={`Portfolio ${index + 1}`} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePortfolioImage(index)}
                        className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <span className="text-white text-sm">Remove</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                size="md"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Creating Profile...' : 'Create Profile'}
              </Button>
              <Button
                type="button"
                size="md"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
              >
                Skip for Now
              </Button>
            </div>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Your profile will need admin approval before appearing in search results
          </p>
        </div>
      </div>
    </div>
  );
}
