import React, { useState } from "react";
import StarRating from "../StarRating/StarRating";
import "./ReviewList.css";

const ReviewList = ({ reviews }) => {
  const [isOffCanvasOpen, setOffCanvasOpen] = useState(false);

  const toggleOffCanvas = () => {
    setOffCanvasOpen(!isOffCanvasOpen);
  };

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <>
          <div className="review-card">
            <h3>{reviews[0].username}</h3>
            <p>{reviews[0].review}</p>
            <StarRating rating={reviews[0].rating} readOnly />
          </div>

          {reviews.length > 1 && (
            <button className="view-more-btn" onClick={toggleOffCanvas}>
              View {reviews.length - 1} More Reviews
            </button>
          )}

          {isOffCanvasOpen && <div className="overlay" onClick={toggleOffCanvas}></div>}

          <div className={`off-canvas ${isOffCanvasOpen ? "open" : ""}`}>
            <div className="off-canvas-content">
              <button className="close-btn" onClick={toggleOffCanvas}>
                Close
              </button>
              {reviews.slice(1).map((review, index) => (
                <div key={index} className="review-card">
                  <h3>{review.username}</h3>
                  <p>{review.review}</p>
                  <StarRating rating={review.rating} readOnly />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="no-reviews">No reviews yet. Be the first to leave one!</p>
      )}
    </div>
  );
};

export default ReviewList;