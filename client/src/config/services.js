const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_TMDB_URL = "https://api.themoviedb.org/3";

// Base fetch wrapper for TMDB
const fetchFromTMDB = async (endpoint) => {
  try {
    const res = await fetch(
      `${BASE_TMDB_URL}${endpoint}&api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!res.ok) throw new Error(`TMDB fetch failed: ${res.status}`);
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
};

// Fetch popular movies
export const fetchPopularMovies = async () => {
  const data = await fetchFromTMDB("/movie/popular?");
  return data?.results || [];
};

// Fetch now playing movies
export const fetchNowPlayingMovies = async () => {
  const data = await fetchFromTMDB("/movie/now_playing?");
  return data?.results || [];
};

// Fetch popular TV series
export const fetchPopularSeries = async () => {
  const data = await fetchFromTMDB("/tv/popular?");
  return data?.results || [];
};

// Fetch specific TV series by ID
export const fetchSeriesById = async (seriesId) => {
  try {
    const res = await fetch(
      `${BASE_TMDB_URL}/tv/${seriesId}?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok)
      throw new Error(`Failed to fetch series ID ${seriesId}: ${res.status}`);
    return await res.json();
  } catch {
    return null;
  }
};

// Fetch related/similar series
export const fetchRelatedSeries = async (seriesId) => {
  const data = await fetchFromTMDB(`/tv/${seriesId}/similar?`);
  return data?.results || [];
};

// Search TV series
export const searchSeries = async (query) => {
  if (!query) return [];
  try {
    const res = await fetch(
      `${BASE_TMDB_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1`
    );
    if (!res.ok) throw new Error(`Search failed: ${res.status}`);
    const data = await res.json();
    return data.results;
  } catch {
    return [];
  }
};

// Fetch TV series genres
export const fetchSeriesGenres = async () => {
  const data = await fetchFromTMDB("/genre/tv/list?");
  return data?.genres || [];
};

// Fetch series by genre ID
export const fetchSeriesByGenre = async (genreId) => {
  const data = await fetchFromTMDB(
    `/discover/tv?with_genres=${genreId}&sort_by=popularity.desc`
  );
  return data?.results || [];
};

// Search for actors (partial name match)
export const searchActor = async (query) => {
  if (!query) return [];
  try {
    const res = await fetch(
      `${BASE_TMDB_URL}/search/person?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1`
    );
    if (!res.ok) throw new Error(`Actor search failed: ${res.status}`);
    const data = await res.json();
    return data.results;
  } catch {
    return [];
  }
};

export const fetchTopRatedMoviesByYear = async (year = 2025) => {
  const data = await fetchFromTMDB(
    `/discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&vote_count.gte=50`
  );
  return data?.results || [];
};

export const fetchDefaultDiscoveredMovies = async () => {
  const data = await fetchFromTMDB(`/discover/movie?sort_by=popularity.desc`);
  return data?.results || [];
};

export const fetchTrendingMovies = async (timeWindow = "day") => {
  const data = await fetchFromTMDB(`/trending/movie/${timeWindow}?`);
  return data?.results || [];
};

export const fetchUpcomingMovies = async () => {
  const data = await fetchFromTMDB(`/movie/upcoming?`);
  return data?.results || [];
};
