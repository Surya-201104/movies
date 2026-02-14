import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCredits } from "../services/tmdb";
import StarRating from "../components/StarRating";
import "./Details.css";

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchMovieDetails(id)
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie:", error));
    fetchMovieCredits(id)
      .then((data) => setCredits(data.cast?.slice(0, 6) || []))
      .catch((error) => console.error("Error fetching credits:", error));
  }, [id]);

  if (!movie)
    return (
      <div className="loading-container">
        <h2>Loading...</h2>
      </div>
    );

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="details-page">
      <div
        className="backdrop-container"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="backdrop-overlay"></div>
        <Link to="/" className="back-button">
          ← Back
        </Link>
      </div>
      <div className="details-container">
        <div className="details-content">
          <div className="poster-section">
            <img
              src={poster}
              alt={movie.title}
              className="movie-poster-large"
            />
            <div className="rating-section">
              <div className="vote-average">
                <span className="vote-number">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="vote-max">/10</span>
              </div>
              <p className="vote-count">
                ({movie.vote_count.toLocaleString()} votes)
              </p>
            </div>
          </div>

          <div className="info-section">
            <h1>{movie.title}</h1>

            <div className="meta-info">
              {movie.release_date && (
                <span className="meta-item">
                  📅{" "}
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {movie.runtime && (
                <span className="meta-item">
                  ⏱️ {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
              {movie.budget > 0 && (
                <span className="meta-item">
                  💰 ${(movie.budget / 1000000).toFixed(1)}M
                </span>
              )}
            </div>

            {movie.genres?.length > 0 && (
              <div className="genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="overview-section">
              <h3>Synopsis</h3>
              <p className="overview">{movie.overview}</p>
            </div>

            {credits.length > 0 && (
              <div className="cast-section">
                <h3>Cast</h3>
                <div className="cast-list">
                  {credits.map((actor) => (
                    <div key={actor.id} className="cast-item">
                      {actor.profile_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          className="actor-image"
                        />
                      )}
                      <div className="actor-info">
                        <p className="actor-name">{actor.name}</p>
                        <p className="actor-role">{actor.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rating-input-section">
              <h3>Your Rating</h3>
              <StarRating rating={rating} setRating={setRating} />
              {rating > 0 && (
                <p className="user-rating">You rated: {rating}/5 ⭐</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
