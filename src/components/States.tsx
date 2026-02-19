// Loading component for full-page loading
export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-electric-blue mb-4"></div>
        <p className="text-text-secondary">Loading...</p>
      </div>
    </div>
  );
}

// Loading spinner for inline use
export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-b-2 border-electric-blue ${sizeClasses[size]}`}></div>
  );
}

// Error message component
export function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-button flex items-start gap-3">
      <span className="flex-shrink-0">❌</span>
      <span className="flex-1">{error}</span>
    </div>
  );
}

// Success message component
export function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-button flex items-start gap-3">
      <span className="flex-shrink-0">✅</span>
      <span className="flex-1">{message}</span>
    </div>
  );
}

// Warning message component
export function WarningMessage({ message }: { message: string }) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-button flex items-start gap-3">
      <span className="flex-shrink-0">⚠️</span>
      <span className="flex-1">{message}</span>
    </div>
  );
}

// Input error message
export function InputError({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="text-red-600 text-sm mt-1">{error}</p>;
}

// Form loading state overlay
export function FormLoadingOverlay({ loading }: { loading: boolean }) {
  if (!loading) return null;
  return (
    <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-card">
      <Spinner size="lg" />
    </div>
  );
}
