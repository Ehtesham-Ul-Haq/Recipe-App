import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (value) => {
    onRatingChange(value);
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={starValue}
              onClick={() => handleClick(starValue)}
              style={{ display: 'none' }}
            />
            <FaStar
              className="star"
              color={(hoverRating || rating) >= starValue ? '#ff01a1' : '#e4e5e9'}
              size={20}
              onMouseOver={() => handleMouseOver(starValue)}
              onMouseLeave={handleMouseLeave}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
