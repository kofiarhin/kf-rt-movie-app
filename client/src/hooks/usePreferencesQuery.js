import { apiKey } from "../config/lib";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetch recommended movies from TMDB based on user preferences.
 * Prioritizes actors > genres > fallback (no filters).
 */
const getPreferences = async (preferences = {}) => {
  try {
    const genres = Array.isArray(preferences.genres) ? preferences.genres : [];
    const actors = Array.isArray(preferences.actors) ? preferences.actors : [];

    const genreString = genres.length ? genres.join(",") : null;
    const actorsString = actors.length ? actors.join(",") : null;

    let url;

    if (actorsString) {
      // Priority 1: Actor-based recommendation
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_cast=${actorsString}&with_original_language=en&vote_average.gte=7&sort_by=popularity.desc&page=1`;
    } else if (genreString) {
      // Priority 2: Genre-based recommendation
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreString}&with_original_language=en&vote_average.gte=7&sort_by=popularity.desc&page=1`;
    } else {
      // Priority 3: Fallback to popular movies
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1`;
    }

    const res = await fetch(url);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.status_message || "Failed to fetch movies.");
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("getPreferences error:", error.message);
    throw error;
  }
};

/**
 * React Query hook for getting recommended movies based on user preferences.
 */
const usePreferencesQuery = (preferences) => {
  return useQuery({
    queryKey: ["preferences", preferences],
    queryFn: () => getPreferences(preferences),
    enabled: !!preferences,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export default usePreferencesQuery;
