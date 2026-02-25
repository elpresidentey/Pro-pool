import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, CATEGORIES } from '../constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const categories = Object.entries(CATEGORIES).slice(0, 5);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribeStatus('loading');
    try {
      // Simulate subscription (in a real app, this would call an API)
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    } catch {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-gradient-to-b from-charcoal via-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="container-max py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 group mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg transition-transform group-hover:scale-110 duration-300">
                P
              </div>
              <span className="text-xl font-bold group-hover:text-electric-blue transition-colors duration-300">{APP_NAME}</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Connecting you with trusted professionals in your area. Quality services, verified experts, and reliable support.
            </p>
            <div className="flex gap-3">
              <button onClick={() => openLink('https://facebook.com')} className="w-10 h-10 bg-electric-blue/20 hover:bg-electric-blue rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button onClick={() => openLink('https://twitter.com')} className="w-10 h-10 bg-electric-blue/20 hover:bg-electric-blue rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 002.856-3.58 9.99 9.99 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button onClick={() => openLink('https://instagram.com')} className="w-10 h-10 bg-electric-blue/20 hover:bg-electric-blue rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.521h-11.042V6.479h11.042v11.042zm-5.5-9.6a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2zm3.6-1.2a.84.84 0 11-.001 1.679.84.84 0 01.001-1.679z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd"></path>
              </svg>
              Services
            </h3>
            <ul className="space-y-3">
              {categories.map(([key, value]) => (
                <li key={key}>
                  <Link to={`/search?category=${key}`} className="text-gray-400 hover:text-electric-blue transition-colors duration-300 text-sm font-medium">
                    {value}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/search" className="text-electric-blue hover:text-white transition-colors duration-300 text-sm font-bold flex items-center gap-1">
                  View All <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-electric-blue transition-colors duration-300 text-sm font-medium">Home</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-electric-blue transition-colors duration-300 text-sm font-medium">Browse</Link></li>
              <li><Link to="/signup" className="text-gray-400 hover:text-electric-blue transition-colors duration-300 text-sm font-medium">Join as Pro</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-electric-blue transition-colors duration-300 text-sm font-medium">About</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
              </svg>
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link to="/support" className="text-gray-400 hover:text-electric-blue transition-colors duration-300 text-sm font-medium">Help Center</Link></li>
              <li><button onClick={() => window.location.href = 'mailto:support@propools.ng'} className="text-gray-400 hover:text-electric-blue transition-colors duration-300 text-sm font-medium">Contact Us</button></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-electric-blue transition-colors duration-300 text-sm font-medium">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-electric-blue transition-colors duration-300 text-sm font-medium">Terms</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">Get updates on new professionals near you.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-electric-blue transition-colors"
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                className="w-full px-4 py-2.5 bg-electric-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribeStatus === 'loading' ? 'Subscribing...' : subscribeStatus === 'success' ? '✓ Subscribed!' : 'Subscribe'}
              </button>
              {subscribeStatus === 'success' && (
                <p className="text-green-400 text-xs text-center">Check your email to confirm!</p>
              )}
              {subscribeStatus === 'error' && (
                <p className="text-red-400 text-xs text-center">Something went wrong. Try again.</p>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} {APP_NAME}. All rights reserved. Made with ❤️ in Nigeria.
          </p>
          <div className="flex gap-8 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-electric-blue transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-electric-blue transition-colors duration-300">Terms of Service</Link>
            <button onClick={() => window.location.href = 'mailto:support@propools.ng'} className="text-gray-400 hover:text-electric-blue transition-colors duration-300">Contact Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
