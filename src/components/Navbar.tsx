import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';

export default function Navbar() {
  return (
    <>
      <nav className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="container-max flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-electric-blue to-blue-600 rounded-lg flex items-center justify-center font-bold text-white transition-transform group-hover:scale-110 group-hover:shadow-lg duration-300">
              P
            </div>
            <span className="text-lg font-semibold text-charcoal group-hover:text-electric-blue transition-colors duration-300">{APP_NAME}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className="px-4 py-2 text-charcoal font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/search" 
              className="px-4 py-2 text-charcoal font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 relative group"
            >
              Find Professionals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/search" 
              className="px-4 py-2 text-charcoal font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 relative group"
            >
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="px-5 py-2 text-charcoal font-medium rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-electric-blue text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Join as a Pro
            </Link>
          </div>
        </div>
      </nav>
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
        nav {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
