import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-electric-blue mb-4">404</h1>
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg
              className="w-full h-full text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-charcoal mb-3">Page Not Found</h2>
        <p className="text-text-secondary text-lg mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="space-y-3">
          <Button
            size="md"
            onClick={() => navigate('/')}
            className="w-full"
          >
            Return to Home
          </Button>
          <Button
            size="md"
            variant="secondary"
            onClick={() => navigate('/search')}
            className="w-full"
          >
            Browse Professionals
          </Button>
        </div>

        <p className="text-text-secondary text-sm mt-8">
          Need help? <a href="mailto:support@propool.com" className="text-electric-blue hover:underline font-medium">Contact support</a>
        </p>
      </div>
    </div>
  );
}
