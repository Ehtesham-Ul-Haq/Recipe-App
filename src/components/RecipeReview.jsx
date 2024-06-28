import React, { useState, useEffect } from 'react';
import { addReview, getReviews } from '../api/api';
import StarRating from './StarRating'; // Assuming the StarRating component is in the same directory

function RecipeReview({ recipeId, currentUser }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews(recipeId);
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [recipeId]);

  const handleAddReview = async () => {
    if (newReview.trim() === '' || rating === 0) {
      alert('Please provide both a rating and a review.');
      return;
    }

    try {
      const review = {
        userId: currentUser.id,
        rating,
        comment: newReview,
      };

      await addReview(recipeId, review);
      setReviews([...reviews, review]);
      setNewReview('');
      setRating(0);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };



  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4 border-b">Reviews</h3>
      {loading ? (
        <div>Loading reviews...</div>
      ) : (
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="font-semibold text-gray-800">{review.userId.name}</div>
                    <div className="text-gray-500">- {formatDate(review.timestamp)}</div>
                  </div>
                  <div className="flex items-center">
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-gray-800">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      )}
      {currentUser && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2 border-b">Add a Review</h4>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <label className="font-semibold">Your Rating:</label>
              <StarRating rating={rating} onRatingChange={(value) => setRating(value)} />
            </div>
            <div className='flex items-center space-x-4'>
              <label className="font-semibold">Your Review:</label>
              <textarea
                className="border border-gray-300 rounded-md p-2"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                rows="4"
              ></textarea>
            </div>
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white py-2 px-4 rounded-md transition duration-300"
              onClick={handleAddReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeReview;
