import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatedButton } from '../components/AnimatedContainer';

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-bold gradient-text leading-none">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            The anime page you're looking for seems to have wandered off into another dimension. 
            Maybe it's exploring the multiverse or just taking a break?
          </p>
        </motion.div>

        {/* Fun Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl"
            >
              🎬
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <AnimatedButton
            onClick={goBack}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            ← Go Back
          </AnimatedButton>
          
          <Link to="/" className="w-full sm:w-auto">
            <AnimatedButton className="w-full">
              🏠 Back to Home
            </AnimatedButton>
          </Link>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="mt-12 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50"
        >
          <h3 className="text-lg font-semibold text-white mb-3">
            🚀 Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <Link 
              to="/search" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              🔍 Search for Anime
            </Link>
            <Link 
              to="/favorites" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              ❤️ View Favorites
            </Link>
            <Link 
              to="/history" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              📚 Watch History
            </Link>
            <Link 
              to="/login" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              👤 Login/Register
            </Link>
          </div>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="mt-8 text-slate-400 text-sm"
        >
          <p>💡 Fun Fact: In anime, characters often get lost in other dimensions too!</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
