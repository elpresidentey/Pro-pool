import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { resetPassword } from '../utils/auth';
import { ErrorMessage, SuccessMessage } from '../components/States';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setLoading(true);
    const result = await resetPassword(email);
    setLoading(false);
    if (!result.success) {
      setError(result.error || 'Failed to send reset email');
    } else {
      setSuccess(result.message || 'Password reset email sent!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-card shadow-card p-8">
        <h1 className="text-h2 text-charcoal mb-2 text-center">Reset Password</h1>
        <p className="text-text-secondary text-center mb-8">
          Enter your email to receive a password reset link
        </p>

        {error && <ErrorMessage error={error} />}
        {success && <SuccessMessage message={success} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Email
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

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-text-secondary">
            Remember your password?{' '}
            <Link to="/login" className="text-electric-blue font-medium hover:text-blue-700 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
