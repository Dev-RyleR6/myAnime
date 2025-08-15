import { motion, AnimatePresence } from 'framer-motion';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

export default function HelpModal({ isOpen, onClose }) {
  const { shortcuts } = useKeyboardShortcuts();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">🎮 Keyboard Shortcuts & Help</h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Navigation Shortcuts */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">🧭</span>
                  Navigation Shortcuts
                </h3>
                <div className="space-y-3">
                  {Object.entries(shortcuts).slice(0, 8).map(([key, description]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-300">{description}</span>
                      <kbd className="px-2 py-1 bg-slate-600 text-white text-sm rounded border border-slate-500">
                        {key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Player Shortcuts */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">🎬</span>
                  Video Player Shortcuts
                </h3>
                <div className="space-y-3">
                  {Object.entries(shortcuts).slice(8).map(([key, description]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-300">{description}</span>
                      <kbd className="px-2 py-1 bg-slate-600 text-white text-sm rounded border border-slate-500">
                        {key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-8 pt-8 border-t border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="mr-2">✨</span>
                App Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-cyan-400 text-lg mb-2">🔍</div>
                  <h4 className="font-medium text-white mb-1">Advanced Search</h4>
                  <p className="text-sm text-slate-400">Search by title, genre, studio, and more</p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-cyan-400 text-lg mb-2">🏆</div>
                  <h4 className="font-medium text-white mb-1">Top Anime</h4>
                  <p className="text-sm text-slate-400">Discover trending and highest-rated anime</p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-cyan-400 text-lg mb-2">📚</div>
                  <h4 className="font-medium text-white mb-1">Watch History</h4>
                  <p className="text-sm text-slate-400">Track your progress and continue watching</p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-cyan-400 text-lg mb-2">❤️</div>
                  <h4 className="font-medium text-white mb-1">Favorites</h4>
                  <p className="text-sm text-slate-400">Save your favorite anime for later</p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-cyan-400 text-lg mb-2">💬</div>
                  <h4 className="font-medium text-white mb-1">Reviews</h4>
                  <p className="text-sm text-slate-400">Read and write reviews for anime</p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-cyan-400 text-lg mb-2">📱</div>
                  <h4 className="font-medium text-white mb-1">Mobile Friendly</h4>
                  <p className="text-sm text-slate-400">Optimized for all devices</p>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="mt-8 pt-8 border-t border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="mr-2">💡</span>
                Pro Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                  <h4 className="font-medium text-cyan-400 mb-2">Quick Navigation</h4>
                  <p className="text-sm text-slate-300">Use single letter shortcuts (H, S, F, T, C, R) for instant navigation</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="font-medium text-purple-400 mb-2">Search Efficiency</h4>
                  <p className="text-sm text-slate-300">Press Ctrl/Cmd + K to quickly focus the search bar from anywhere</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                  <h4 className="font-medium text-green-400 mb-2">Video Controls</h4>
                  <p className="text-sm text-slate-300">Use arrow keys for seeking and volume control while watching</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                  <h4 className="font-medium text-yellow-400 mb-2">Responsive Design</h4>
                  <p className="text-sm text-slate-300">The app works perfectly on desktop, tablet, and mobile devices</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-700/50 bg-slate-800/50">
            <div className="text-center">
              <p className="text-slate-400 text-sm">
                Press <kbd className="px-2 py-1 bg-slate-600 text-white text-xs rounded border border-slate-500">Esc</kbd> to close this modal
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
