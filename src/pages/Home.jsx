import { useEffect, useState } from "react";
import { fetchPopularMovies, searchMovies } from "../services/tmdb";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPopularMovies()
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setSearchQuery(query);
    try {
      if (!query) {
        const data = await fetchPopularMovies();
        setMovies(data.results);
        setSearchQuery("");
      } else {
        const data = await searchMovies(query);
        setMovies(data.results || []);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const isSearching = searchQuery.trim() !== "";
  const hasResults = movies.length > 0;

  return (
    <div className="home">
      <div className="hero-section">
        <h1>🎬 CINEMATIC</h1>
        <p className="tagline">Discover Your Next Favorite Film</p>
      </div>
      <div className="container">
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <div className="loading">Loading movies...</div>
        ) : isSearching && !hasResults ? (
          <div className="not-found-container">
            <div className="not-found-animation">
              <div className="film-reel">🎬</div>
              <h2>No Movies Found</h2>
              <p>We couldn't find any movies matching "{searchQuery}"</p>
              <p className="try-again">Try searching with different keywords</p>
              <button className="reset-btn" onClick={() => handleSearch("")}>
                Show Popular Movies
              </button>
            </div>
          </div>
        ) : (
          <MovieList movies={movies} />
        )}
      </div>
    </div>
  );
}

export default Home;
