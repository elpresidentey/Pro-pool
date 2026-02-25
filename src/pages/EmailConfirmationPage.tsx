import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import Button from '../components/Button';

export default function EmailConfirmationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Confirming your email...');

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the token from URL
        const token = searchParams.get('token_hash');
        const type = searchParams.get('type');

        if (!token || type !== 'email') {
          setStatus('error');
          setMessage('Invalid confirmation link. Please try signing up again.');
          return;
        }

        // Exchange token for session
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email',
        });

        if (error) {
          setStatus('error');
          setMessage(error.message || 'Email confirmation failed. Please try again.');
          return;
        }

        if (data) {
          setStatus('success');
          setMessage('✓ Email confirmed successfully!');
          
          // Get user's role to redirect appropriately
          setTimeout(() => {
            const userRole = data.user?.user_metadata?.role;
            if (userRole === 'professional') {
              navigate('/setup-profile', { replace: true });
            } else {
              navigate('/search', { replace: true });
            }
          }, 2000);
        }
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {status === 'loading' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-electric-blue animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-charcoal mb-3">Confirming your email</h1>
            <p className="text-text-secondary text-lg">{message}</p>
            <p className="text-text-secondary text-sm mt-4">This may take a few moments...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-charcoal mb-3">Email Confirmed!</h1>
            <p className="text-text-secondary text-lg mb-2">{message}</p>
            <p className="text-text-secondary text-sm mb-8">You're all set. Redirecting you to your account...</p>
            
            <Button 
              size="md"
              onClick={() => navigate('/search', { replace: true })}
              className="w-full"
            >
              Continue to Pro Pool
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-charcoal mb-3">Confirmation Failed</h1>
            <p className="text-text-secondary text-lg mb-8">{message}</p>
            
            <div className="space-y-3">
              <Button 
                size="md"
                onClick={() => navigate('/signup', { replace: true })}
                className="w-full"
              >
                Try Signing Up Again
              </Button>
              <Button 
                size="md"
                variant="secondary"
                onClick={() => navigate('/', { replace: true })}
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
