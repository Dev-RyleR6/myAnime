import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated entrance for page content
export const AnimatedPage = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Animated entrance for grid items (staggered)
export const AnimatedGrid = ({ children, className = "" }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Animated grid item
export const AnimatedGridItem = ({ children, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1 }
    }}
    whileHover={{ 
      y: -5, 
      scale: 1.02,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.98 }}
    className={className}
  >
    {children}
  </motion.div>
);

// Animated card with hover effects
export const AnimatedCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.4, 
      delay: delay,
      ease: "easeOut"
    }}
    whileHover={{ 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.98 }}
    className={`transform transition-all duration-200 ${className}`}
  >
    {children}
  </motion.div>
);

// Animated button with ripple effect
export const AnimatedButton = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  disabled = false 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "px-6 py-3 font-medium rounded-xl transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-cyan-500 hover:bg-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/25",
    secondary: "bg-slate-700/50 hover:bg-slate-700/70 text-white border border-slate-600/50 hover:border-cyan-500/50",
    danger: "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-500/50"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {children}
    </motion.button>
  );
};

// Animated modal backdrop
export const AnimatedModal = ({ isOpen, onClose, children, className = "" }) => (
  <AnimatePresence>
    {isOpen && (
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
          className={`bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 max-w-2xl w-full ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Animated list item
export const AnimatedListItem = ({ children, className = "", index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ 
      duration: 0.3, 
      delay: index * 0.1,
      ease: "easeOut"
    }}
    whileHover={{ x: 5 }}
    className={`transition-all duration-200 ${className}`}
  >
    {children}
  </motion.div>
);

// Animated search results
export const AnimatedSearchResults = ({ children, isVisible, className = "" }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

// Simple loading spinner (no infinite animation)
export const AnimatedSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div className={`${sizeClasses[size]} border-2 border-cyan-500 border-t-transparent rounded-full animate-spin ${className}`} />
  );
};

// Animated progress bar
export const AnimatedProgressBar = ({ progress, className = "" }) => (
  <div className={`w-full bg-slate-700/50 rounded-full h-2 overflow-hidden ${className}`}>
    <motion.div
      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  </div>
);
