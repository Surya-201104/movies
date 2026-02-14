import { useState } from "react";
import "./StarRating.css";

function StarRating({ rating, setRating }) {
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState("");
  const [tempRating, setTempRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const handleStarClick = (star) => {
    setTempRating(star);
    setShowModal(true);
  };

  const handleSubmitReview = () => {
    if (tempRating > 0) {
      setRating(tempRating);
      const newReview = {
        id: Date.now(),
        rating: tempRating,
        text: review,
        timestamp: new Date().toLocaleDateString(),
      };
      setReviews([newReview, ...reviews]);
      setReview("");
      setShowModal(false);
    }
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <div className="star-rating-container">
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "active" : ""}`}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Share Your Review</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-rating">
                <p>Your Rating:</p>
                <div className="modal-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`modal-star ${star <= tempRating ? "active" : ""}`}
                      onClick={() => setTempRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <textarea
                className="review-textarea"
                placeholder="Write your review here... (optional)"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="5"
              ></textarea>

              <div className="modal-footer">
                <button
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="submit-btn"
                  onClick={handleSubmitReview}
                  disabled={tempRating === 0}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="reviews-section">
          <h4>Your Reviews ({reviews.length})</h4>
          <div className="reviews-list">
            {reviews.map((rev) => (
              <div key={rev.id} className="review-item">
                <div className="review-header">
                  <div className="review-rating">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i} className="review-star">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="review-date">{rev.timestamp}</span>
                  <button
                    className="delete-review-btn"
                    onClick={() => handleDeleteReview(rev.id)}
                  >
                    🗑️
                  </button>
                </div>
                {rev.text && <p className="review-text">{rev.text}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StarRating;
