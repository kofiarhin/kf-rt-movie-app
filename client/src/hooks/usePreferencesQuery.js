import { apiKey } from "../config/lib";
import { useQuery } from "@tanstack/react-query";

const getPReferences = async (preferences) => {
  try {
    const { genres, actors } = preferences;
    let genreString, actorsString, testUrl, url, finalUrl;
    if (genres) {
      genreString = genres.join(",");
    }
    if (actors) {
      actorsString = actors.join(",");
    }

    const actorsUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_cast=${actorsString}&with_original_language=en&vote_average.gte=3&sort_by=popularity.desc&page=1`;
    const genresUrl = `https://api.themoviedb.org/3/discover/movie?api_key=ca357c71903c409f2ce08d61e75700a6&with_genres=${genreString}&with_original_language=en&vote_average.gte=3&sort_by=popularity.desc&page=1
    
    `;

    const recommendedUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=en&vote_average.gte=7&sort_by=popularity.desc`;

    const res = await fetch(genresUrl);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

const usePreferencesQuery = (preferences) => {
  return useQuery({
    queryKey: ["preferences", preferences],
    queryFn: () => getPReferences(preferences),
  });
};

export default usePreferencesQuery;
