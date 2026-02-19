import type { ReactNode } from 'react';
import { Component } from 'react';
import Button from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-h1 text-charcoal mb-4">Oops! Something went wrong</h1>
            <p className="text-text-secondary mb-2">
              We're sorry for the inconvenience. Please try refreshing the page or contact support.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-4 p-4 bg-red-50 rounded-card text-left text-sm">
                <summary className="cursor-pointer font-medium text-red-700 mb-2">
                  Error Details
                </summary>
                <code className="text-red-600 whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                </code>
              </details>
            )}
            <div className="flex gap-4 mt-6 justify-center">
              <Button onClick={this.handleReset}>Try Again</Button>
              <Button
                variant="secondary"
                onClick={() => (window.location.href = '/')}
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
