import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for movies, actors, directors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          🔍 Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
