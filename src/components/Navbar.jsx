
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ onShowInfo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-400/25 transition-all duration-300">
              <span className="text-white text-xl font-bold">M</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-wide text-white group-hover:text-cyan-400 transition-colors duration-300">
              my𝘼nime
            </span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/favorites" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`
              }
            >
              Favorites
            </NavLink>
            <NavLink 
              to="/history" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`
              }
            >
              History
            </NavLink>
            <NavLink 
              to="/login" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`
              }
            >
              Login
            </NavLink>
            
            {/* Info Button */}
            <button
              onClick={onShowInfo}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              aria-label="About this app"
              title="About this app"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-slate-700/50 rounded-xl border border-slate-600/50 py-2 space-y-1">
            <NavLink 
              to="/" 
              className={({ isActive }) =>
                `block px-4 py-3 mx-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink 
              to="/favorites" 
              className={({ isActive }) =>
                `block px-4 py-3 mx-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`
              }
              onClick={closeMenu}
            >
              Favorites
            </NavLink>
            <NavLink 
              to="/history" 
              className={({ isActive }) =>
                `block px-4 py-3 mx-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`
              }
              onClick={closeMenu}
            >
              History
            </NavLink>
            <NavLink 
              to="/login" 
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`
              }
              onClick={closeMenu}
            >
              Login
            </NavLink>
            
            {/* Mobile Info Button */}
            <button
              onClick={onShowInfo}
              className="w-full text-left px-4 py-3 mx-2 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
            >
              About This App
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
