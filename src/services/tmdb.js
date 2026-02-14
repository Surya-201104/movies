const BASE_URL = "https://api.themoviedb.org/3";

const getOptions = () => {
  const token = process.env.REACT_APP_TMDB_TOKEN;

  if (!token) {
    throw new Error(
      "TMDB API token not found. Please add REACT_APP_TMDB_TOKEN to your .env file",
    );
  }

  return {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchPopularMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=1`,
    getOptions(),
  );

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${query}&language=en-US&page=1`,
    getOptions(),
  );

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const fetchMovieDetails = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?language=en-US`,
    getOptions(),
  );
  return res.json();
};

export const fetchMovieCredits = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?language=en-US`,
    getOptions(),
  );
  return res.json();
};
