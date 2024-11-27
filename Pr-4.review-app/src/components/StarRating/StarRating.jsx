import React from "react";
import "./StarRating.css";

const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={rating >= star ? "star filled" : "star"}
          onClick={() => !readOnly && onRatingChange(star)}
        >
          {rating >= star ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRating;