import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { signIn } from '../utils/auth';
import { validateLoginForm } from '../utils/validation';
import { ErrorMessage as ErrorState, SuccessMessage } from '../components/States';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    setSuccess(false);

    // Validate form
    const validationErrors = validateLoginForm(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const result = await signIn(email, password);
      
      if (!result.success) {
        console.error('Login error:', result.error);
        setGeneralError(result.error || 'Login failed');
        setLoading(false);
        return;
      }
      setSuccess(true);
      // Give it a moment for session to persist and show success message
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1500);
    } catch (err) {
      console.error('Sign in error:', err);
      setGeneralError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-16 px-4">
      <div className="w-full max-w-md bg-white rounded-card shadow-card p-10">
        <h1 className="text-h2 text-charcoal mb-3 text-center">Welcome Back</h1>
        <p className="text-text-secondary text-center mb-10">
          Sign in to your Pro Pool account
        </p>

        {success && <SuccessMessage message="Login successful! Redirecting..." />}
        {generalError && <ErrorState error={generalError} />}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-electric-blue'
              }`}
              required
              disabled={loading}
            />
            {errors.email && <ErrorMessage message={errors.email} className="mt-2" />}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-electric-blue'
              }`}
              required
              disabled={loading}
            />
            {errors.password && <ErrorMessage message={errors.password} className="mt-2" />}
          </div>

          <Button
            type="submit"
            size="md"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="text-electric-blue font-medium hover:text-blue-700 transition-colors">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-border-color text-center">
          <p className="text-text-secondary text-sm mb-4">
            Or sign in as
          </p>
          <div className="flex gap-4">
            <button className="flex-1 px-4 py-2 border border-border-color rounded-button hover:bg-secondary transition-colors">
              Google
            </button>
            <button className="flex-1 px-4 py-2 border border-border-color rounded-button hover:bg-secondary transition-colors">
              Phone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
