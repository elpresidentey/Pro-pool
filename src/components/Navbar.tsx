import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { APP_NAME } from '../constants';
import { useCurrentUser, signOut } from '../utils/auth';

export default function Navbar() {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-100 py-3.5 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 shadow-sm">
        <div className="container-max flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-electric-blue to-blue-600 rounded-xl flex items-center justify-center font-bold text-white transition-all group-hover:scale-110 group-hover:shadow-lg duration-300">
              P
            </div>
            <span className="text-xl font-bold text-charcoal group-hover:text-electric-blue transition-colors duration-300 hidden sm:inline">{APP_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <Link 
              to="/" 
              className="px-4 py-2.5 text-charcoal font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 relative group whitespace-nowrap"
            >
              Home
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-electric-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link 
              to="/search" 
              className="px-4 py-2.5 text-charcoal font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 relative group whitespace-nowrap"
            >
              Find Professionals
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-electric-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link 
              to="/favorites" 
              className="px-4 py-2.5 text-charcoal font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 relative group flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Favorites</span>
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-electric-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <svg className={`w-6 h-6 text-charcoal transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {loading ? (
              <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
            ) : user ? (
              <>
                {user.role === 'professional' && (
                  <Link
                    to="/dashboard"
                    className="px-4 py-2.5 text-charcoal font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 whitespace-nowrap"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-charcoal truncate max-w-[160px]">{user.email?.split('@')[0]}</p>
                    <p className="text-xs text-gray-500 capitalize font-medium">{user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 text-charcoal font-medium rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-300 whitespace-nowrap"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-charcoal font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-electric-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap"
                >
                  Join as Pro
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-md animate-slideDown">
          <div className="container-max py-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-charcoal font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 text-base"
            >
              Home
            </Link>
            <Link 
              to="/search" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-charcoal font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 text-base"
            >
              Find Professionals
            </Link>
            <Link 
              to="/favorites" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-charcoal font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 text-base"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              My Favorites
            </Link>
            <div className="pt-2 border-t border-gray-200 space-y-2 mt-4">
              {loading ? (
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              ) : user ? (
                <>
                  {user.role === 'professional' && (
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-charcoal font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 text-base"
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="px-4 py-3 text-sm font-medium text-charcoal">
                    <p className="truncate font-semibold">{user.email?.split('@')[0]}</p>
                    <p className="text-xs text-gray-500 capitalize font-medium mt-0.5">{user.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-left text-charcoal font-medium rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-300 text-base"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-charcoal font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 text-center text-base"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-electric-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 text-center text-base"
                  >
                    Join as a Pro
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        nav {
          animation: slideIn 0.4s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
