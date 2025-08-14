import { useState, useEffect } from 'react';

export default function WelcomeModal({ isOpen, onClose }) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if user has seen the modal before
    const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenModal) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShouldShow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Show modal if either it's the first visit OR if explicitly opened via info button
  const isModalOpen = shouldShow || isOpen;

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleClose = () => {
    setShouldShow(false);
    onClose?.();
    // Mark as seen in localStorage only if it's the first visit
    if (!localStorage.getItem('hasSeenWelcomeModal')) {
      localStorage.setItem('hasSeenWelcomeModal', 'true');
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 max-w-2xl w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Welcome to my𝘼nime!</h2>
              <p className="text-slate-300 text-sm">Your ad-free anime experience</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Personal Use Only</h3>
                <p className="text-slate-300 text-sm">This application is built for personal use and educational purposes only.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Legal Middleware</h3>
                <p className="text-slate-300 text-sm">This app acts as a middleware and fetches data via the Consumet API, which only accesses legally available anime content. No illegal streaming or downloads are provided.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Why I Built This</h3>
                <p className="text-slate-300 text-sm">I was tired of annoying ads and popups on anime streaming websites, so I decided to create my own clean, ad-free experience.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Disclaimer</h3>
                <p className="text-slate-300 text-sm">All content is sourced through legitimate APIs (Consumet). This app respects copyright and only provides access to legally available content.</p>
              </div>
            </div>
          </div>

          {/* Features preview */}
          <div className="bg-slate-700/30 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">What You'll Get:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                <span>Ad-free experience</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                <span>Clean interface</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                <span>Personal watchlist</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                <span>Watch history</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-700/30 p-6 border-t border-slate-700/50">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 hover:scale-105"
            >
              {!localStorage.getItem('hasSeenWelcomeModal') ? 'Get Started' : 'Got It'}
            </button>
          </div>
          <div className="mt-3 text-center space-y-2">
            <p className="text-slate-400 text-xs sm:text-sm">
              You can always view this information by clicking the info button in the navbar
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-500">
              <span>
                Developed by <span className="text-slate-300 font-medium">Ryle Anthony Gabotero</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>
                © 2025 <span className="text-slate-300 font-medium">my𝘼nime</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
