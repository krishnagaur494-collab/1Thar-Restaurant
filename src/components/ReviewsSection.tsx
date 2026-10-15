import React, { useState } from 'react';
import { Star, MessageCircle, Plus, Check } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  onAddReview: (review: Omit<ReviewItem, 'id' | 'date'>) => void;
  reviewCount: number;
  averageRating: number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
  reviewCount,
  averageRating
}) => {
  const [showModal, setShowModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [tag, setTag] = useState('Dine-in Customer');
  const [success, setSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    onAddReview({
      author,
      rating,
      comment,
      tag
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowModal(false);
      setAuthor('');
      setComment('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="text-amber-400 text-xs font-bold uppercase tracking-widest">Customer Feedback</div>
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-stone-100">
              Loved by Foodies in Jaipur
            </h2>
            <p className="text-stone-400 text-sm sm:text-base max-w-xl">
              Read authentic experiences shared by our diners or share your own feedback about your visit to 1Thar Restaurant.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl flex items-center gap-4">
              <div className="text-3xl font-black font-serif text-amber-400">{averageRating}</div>
              <div className="space-y-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-xs text-stone-400">Based on {reviewCount} reviews</div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/10 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Write Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-900 border border-stone-800 p-8 rounded-2xl flex flex-col justify-between shadow-xl space-y-6 hover:border-amber-500/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(Math.floor(rev.rating))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-stone-500">{rev.date}</span>
                </div>
                <p className="text-stone-300 text-sm sm:text-base italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-800">
                {rev.avatar ? (
                  <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-black flex items-center justify-center">
                    {rev.author[0]}
                  </div>
                )}
                <div>
                  <div className="font-bold text-stone-100 text-sm">{rev.author}</div>
                  <div className="text-xs text-amber-400">{rev.tag || 'Dine-in Customer'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold font-serif text-stone-100">Share Your Experience</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-stone-400 hover:text-stone-200 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              {success ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-stone-100">Review Submitted Successfully!</h4>
                  <p className="text-stone-400 text-sm">Thank you for sharing your feedback with 1Thar Restaurant.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., Rohit Sharma"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-300">Rating (1-5)</label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value={4.5}>⭐⭐⭐⭐✨ (4.5/5)</option>
                        <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-300">Visitor Type</label>
                      <select
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                      >
                        <option value="Local Guide">Local Guide</option>
                        <option value="Family Dinner">Family Dinner</option>
                        <option value="Dine-in Customer">Dine-in Customer</option>
                        <option value="Food Delivery">Food Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-300">Your Feedback *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your food quality, service, ambiance..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg transition-all"
                  >
                    Post Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
