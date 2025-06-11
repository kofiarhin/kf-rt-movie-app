import { useQuery } from "@tanstack/react-query";
import { apiKey } from "../config/lib";

const getCustomMovies = async (query = "top movies", pageNumber = 1) => {
  console.log(query);
  try {
    let url;
    const topMoviesTUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=vote_average.desc&vote_count.gte=2000&page=${pageNumber}
`;
    const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageNumber}
`;
    console.log(query);
    switch (query) {
      case "top movies":
        url = topMoviesTUrl;
        break;
      case "popular movies":
        url = popularMoviesUrl;
        break;

      default:
        url = topMoviesTUrl;
        break;
    }
    const res = await fetch(url);
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

const useCustomMoviesQuery = (query, pageNumber = 1) => {
  return useQuery({
    queryKey: ["custom movies", pageNumber],
    queryFn: () => getCustomMovies(query),
    enabled: !!query,
  });
};

export default useCustomMoviesQuery;
