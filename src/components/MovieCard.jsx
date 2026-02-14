import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const poster = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="movie-image-container">
          <img src={poster} alt={movie.title} className="movie-poster" />
          <div className="movie-overlay">
            <button className="view-details-btn">View Details</button>
          </div>
        </div>
        <div className="movie-info">
          <h4 className="movie-title">{movie.title}</h4>
          <div className="movie-rating">
            <span className="stars">⭐</span>
            <span className="rating-value">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="rating-max">/10</span>
          </div>
          {movie.release_date && (
            <p className="release-year">
              {new Date(movie.release_date).getFullYear()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
