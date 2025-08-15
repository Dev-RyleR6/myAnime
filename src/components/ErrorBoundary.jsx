import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console (in production, you'd log to a service)
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚠️</span>
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                We encountered an unexpected error. Don't worry, it's not your fault!
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-slate-800/50 rounded-lg p-4 mb-6">
                  <summary className="text-cyan-400 cursor-pointer font-medium mb-2">
                    Error Details (Development)
                  </summary>
                  <pre className="text-red-400 text-sm overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={this.handleReload}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 w-full sm:w-auto"
              >
                🔄 Reload Page
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700/70 text-white font-medium rounded-xl border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-200 w-full sm:w-auto"
              >
                🏠 Go Home
              </button>
            </motion.div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="mt-12 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                🚀 Need Help?
              </h3>
              <div className="text-sm text-slate-400 space-y-2">
                <p>• Try refreshing the page</p>
                <p>• Check your internet connection</p>
                <p>• Clear your browser cache</p>
                <p>• If the problem persists, contact support</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
