const API_KEY = import.meta.env.VITE_API_KEY;

// Get users from custom backend
export const getUsers = async () => {
  try {
    const BASE_URL = "https://kf-ai-server.onrender.com";
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    return [];
  }
};

// Fetch popular movies from TMDB
export const fetchPopularMovies = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!res.ok) {
      throw new Error(`TMDB popular movies failed: ${res.status}`);
    }

    const data = await res.json();
    return data.results;
  } catch {
    return [];
  }
};

// Fetch now playing movies from TMDB
export const fetchNowPlayingMovies = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!res.ok) {
      throw new Error(`TMDB now playing failed: ${res.status}`);
    }

    const data = await res.json();
    return data.results;
  } catch {
    return [];
  }
};

// Fetch popular series from TMDB
export const fetchPopularSeries = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!res.ok) {
      throw new Error(`TMDB popular series failed: ${res.status}`);
    }

    const data = await res.json();
    return data.results;
  } catch {
    return [];
  }
};

// Fetch a specific series by ID
export const fetchSeriesById = async (seriesId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${API_KEY}&language=en-US`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch series with ID ${seriesId}: ${res.status}`
      );
    }

    return await res.json();
  } catch {
    return null;
  }
};

// Fetch related/similar series
export const fetchRelatedSeries = async (seriesId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch related series for ID ${seriesId}: ${res.status}`
      );
    }

    const data = await res.json();
    return data.results;
  } catch {
    return [];
  }
};

// Search for TV series by query
export const searchSeries = async (query) => {
  if (!query) return [];

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1`
    );

    if (!res.ok) {
      throw new Error(`Failed to search series: ${res.status}`);
    }

    const data = await res.json();
    return data.results;
  } catch {
    return [];
  }
};

// Fetch series genres
export const fetchSeriesGenres = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch series genres: ${res.status}`);
    }

    const data = await res.json();
    return data.genres; // array of { id, name }
  } catch {
    return [];
  }
};

// Fetch series by genre ID
export const fetchSeriesByGenre = async (genreId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc&page=1`
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch series for genre ID ${genreId}: ${res.status}`
      );
    }

    const data = await res.json();
    return data.results;
  } catch {
    return [];
  }
};
