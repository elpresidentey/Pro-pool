import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { signUp } from '../utils/auth';
import { ErrorMessage, SuccessMessage } from '../components/States';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client' as 'client' | 'professional',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(formData.email, formData.password, formData.role);
      
      if (!result.success) {
        console.error('Signup error:', result.error);
        setError(result.error || 'Signup failed');
        setLoading(false);
        return;
      }

      console.log('Signup successful, redirecting...');
      setSuccess('Account created successfully! Redirecting...');
      // Redirect based on role after a short delay
      setTimeout(() => {
        if (formData.role === 'professional') {
          navigate('/setup-profile', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }, 500);
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-card shadow-card p-8">
        <h1 className="text-h2 text-charcoal mb-2 text-center">Join Pro Pool</h1>
        <p className="text-text-secondary text-center mb-8">
          Create your account in a few minutes
        </p>

        {error && <ErrorMessage error={error} />}

        {success && <SuccessMessage message={success} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-border-color rounded-button focus:outline-none focus:ring-2 focus:ring-electric-blue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              What brings you here?
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border-color rounded-button focus:outline-none focus:ring-2 focus:ring-electric-blue"
            >
              <option value="client">I want to hire professionals</option>
              <option value="professional">I want to work as a professional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-border-color rounded-button focus:outline-none focus:ring-2 focus:ring-electric-blue"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-border-color rounded-button focus:outline-none focus:ring-2 focus:ring-electric-blue"
              required
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1"
              required
            />
            <label htmlFor="terms" className="text-sm text-text-secondary">
              I agree to the{' '}
              <Link to="/terms" className="text-electric-blue">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-electric-blue">
                Privacy Policy
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-electric-blue font-medium hover:text-electric-blue-hover">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
