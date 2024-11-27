import React, { useState } from "react";
import StarRating from "../StarRating/StarRating";
import "./ReviewApp.css";

const Form = ({ addReview }) => {
  const [formData, setFormData] = useState({
    username: "",
    review: "",
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.review && formData.rating) {
      addReview(formData);
      setFormData({ username: "", review: "", rating: 0 });
    } else {
      alert("Please give Rating!!!");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} required/>
      </div>
      <div className="form-group">
        <label>Review:</label>
        <textarea name="review" value={formData.review} onChange={handleInputChange} rows="4" required></textarea>
      </div>
      <div className="star-form-group">
        <label>Rating:</label>
        <StarRating rating={formData.rating} onRatingChange={(rating) => setFormData({ ...formData, rating })}/>
      </div>
      <button type="submit" className="submit-btn">
        Submit Review
      </button>
    </form>
  );
};

export default Form;