
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function Navbar({ onShowInfo, onShowHelp }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, userProfile, signOut, isAuthenticated } = useAuthContext();
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/top-anime', label: 'Top Anime' },
    { path: '/seasonal', label: 'Seasonal' },
    { path: '/categories', label: 'Categories' },
    { path: '/favorites', label: 'Favorites' },
    { path: '/history', label: 'History' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/30 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-cyan-500/25">
                A
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                myAnime
              </span>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80 hover:shadow-md'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Help Button */}
            <button
              onClick={onShowHelp}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all duration-300 hover:shadow-md"
              title="Keyboard Shortcuts & Help"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Info Button */}
            <button
              onClick={onShowInfo}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all duration-300 hover:shadow-md"
              title="About myAnime"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all duration-300 hover:shadow-md"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {userProfile?.displayName?.[0] || user?.displayName?.[0] || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {userProfile?.displayName || user?.displayName || 'User'}
                  </span>
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-xl z-50">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all duration-300 hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/30 bg-slate-900/95 backdrop-blur-md">
            <div className="px-3 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80 hover:shadow-md'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Help Button */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onShowHelp();
                }}
                className="w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 text-slate-300 hover:text-white hover:bg-slate-800/80 hover:shadow-md"
              >
                🎮 Keyboard Shortcuts
              </button>

              {/* Mobile Auth Section */}
              {isAuthenticated ? (
                <>
                  <div className="border-t border-slate-700/30 pt-4 mt-4">
                    <div className="px-4 py-3 text-slate-400 text-sm">
                      Signed in as <span className="text-white font-medium">{userProfile?.displayName || user?.displayName || 'User'}</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 text-red-400 hover:text-red-300 hover:bg-red-500/20 hover:shadow-md"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
