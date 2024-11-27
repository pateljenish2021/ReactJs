import React, { useState } from "react";
import Form from "./components/ReviewApp/ReviewApp";
import ReviewList from "./components/ReviewList/ReviewList";
import "./App.css"; 

const App = () => {
  const [reviews, setReviews] = useState([]);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="container">
      <Form addReview={addReview} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default App;