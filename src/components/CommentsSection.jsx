import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommentsSection({ animeId }) {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'AnimeFan2024',
      avatar: '👤',
      rating: 5,
      date: '2024-12-15',
      content: 'Absolutely incredible! The animation quality and story development are top-notch. This is definitely one of the best anime I\'ve ever watched.',
      likes: 24,
      replies: 3
    },
    {
      id: 2,
      user: 'OtakuMaster',
      avatar: '🎭',
      rating: 4,
      date: '2024-12-14',
      content: 'Great series overall. The character development is excellent and the plot twists keep you engaged. Would definitely recommend!',
      likes: 18,
      replies: 1
    },
    {
      id: 3,
      user: 'WeebLife',
      avatar: '⚡',
      rating: 5,
      date: '2024-12-13',
      content: 'Masterpiece! The emotional depth and action sequences are perfectly balanced. Can\'t wait for the next season!',
      likes: 31,
      replies: 5
    }
  ]);

  const [newComment, setNewComment] = useState({
    content: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.content.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const comment = {
        id: Date.now(),
        user: 'You',
        avatar: '😊',
        rating: newComment.rating,
        date: new Date().toISOString().split('T')[0],
        content: newComment.content,
        likes: 0,
        replies: 0
      };

      setComments(prev => [comment, ...prev]);
      setNewComment({ content: '', rating: 5 });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleLike = (commentId) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'rating':
        return b.rating - a.rating;
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const averageRating = comments.length > 0 
    ? (comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length).toFixed(1)
    : 0;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-slate-600'}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700/50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Reviews & Comments</h3>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <span>{comments.length} reviews</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <span>Average:</span>
              <div className="flex">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="ml-1">({averageRating})</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <label className="text-sm font-medium text-slate-300">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <option value="recent">Recent</option>
            <option value="rating">Rating</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>
      </div>

      {/* Add Comment Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30"
      >
        <h4 className="text-lg font-semibold text-white mb-4">Write a Review</h4>
        <form onSubmit={handleSubmitComment}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">Rating</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewComment(prev => ({ ...prev, rating: star }))}
                  className={`text-2xl transition-colors duration-200 ${
                    star <= newComment.rating ? 'text-yellow-400' : 'text-slate-600'
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="text-sm text-slate-400 ml-2">
                {newComment.rating}/5
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">Comment</label>
            <textarea
              value={newComment.content}
              onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your thoughts about this anime..."
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
              rows="4"
              maxLength="500"
            />
            <div className="text-right text-xs text-slate-400 mt-1">
              {newComment.content.length}/500
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!newComment.content.trim() || isSubmitting}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            {isSubmitting ? 'Posting...' : 'Post Review'}
          </button>
        </form>
      </motion.div>

      {/* Comments List */}
      <div className="space-y-6">
        <AnimatePresence>
          {sortedComments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30"
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-lg">
                    {comment.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-white">{comment.user}</div>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <div className="flex">
                        {renderStars(comment.rating)}
                      </div>
                      <span>•</span>
                      <span>{comment.date}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm">{comment.likes}</span>
                </button>
              </div>
              
              {/* Comment Content */}
              <p className="text-slate-300 leading-relaxed mb-3">
                {comment.content}
              </p>
              
              {/* Comment Actions */}
              <div className="flex items-center space-x-4 text-sm">
                <button className="text-slate-400 hover:text-cyan-400 transition-colors duration-200">
                  Reply
                </button>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">
                  {comment.replies} replies
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {comments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">No Reviews Yet</h4>
          <p className="text-slate-400">Be the first to share your thoughts about this anime!</p>
        </div>
      )}
    </div>
  );
}
