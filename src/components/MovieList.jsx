import MovieCard from "./MovieCard";
import "./MovieList.css";

function MovieList({ movies = [] }) {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <div className="no-movies">No movies available</div>
      )}
    </div>
  );
}

export default MovieList;
