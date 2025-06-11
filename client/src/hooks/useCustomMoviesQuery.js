import { useQuery } from "@tanstack/react-query";
import { apiKey } from "../config/lib";

const getCustomMovies = async (query) => {
  try {
    const topMoviesTUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=vote_average.desc&vote_count.gte=1000&page=1
`;
    const res = await fetch(topMoviesTUrl);
    if (!res.ok) {
      throw new Error("there was a problem data from api");
    }
    const data = await res.json();

    return data.results;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

const useCustomMoviesQuery = (query) => {
  return useQuery({
    queryKey: ["custom movies"],
    queryFn: () => getCustomMovies(query),
    enabled: !!query,
  });
};

export default useCustomMoviesQuery;
