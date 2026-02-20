import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { signIn } from '../utils/auth';
import { ErrorMessage, SuccessMessage } from '../components/States';
import { supabase } from '../utils/supabase';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const result = await signIn(email, password);
      
      if (!result.success) {
        console.error('Login error:', result.error);
        setError(result.error || 'Login failed');
        setLoading(false);
        return;
      }

      console.log('Login successful');
      setSuccess('Login successful! Redirecting to dashboard...');
      // Give it a moment for session to persist
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 500);
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-card shadow-card p-8">
        <h1 className="text-h2 text-charcoal mb-2 text-center">Welcome Back</h1>
        <p className="text-text-secondary text-center mb-8">
          Sign in to your Pro Pool account
        </p>

        {error && <ErrorMessage error={error} />}

        {success && <SuccessMessage message={success} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              <Mail className="w-4 h-4 inline mr-2" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              <Lock className="w-4 h-4 inline mr-2" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
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
            <button onClick={handleGoogleLogin} className="flex-1 px-4 py-2 border border-border-color rounded-button hover:bg-secondary transition-colors">
              Continue with Google
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
