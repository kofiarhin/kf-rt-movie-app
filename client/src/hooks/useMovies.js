import { useQuery } from "@tanstack/react-query";
import { apiKey } from "../config/lib";

const getMovies = async (pageNumber = 1) => {
  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  const moviesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`;
  const res = await fetch(moviesUrl);

  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const data = await res.json();
  return data.results;
  return { message: "get movies" };
};
const useMovies = (pageNumber = 1) => {
  return useQuery({
    queryKey: ["movies", pageNumber],
    queryFn: () => getMovies(pageNumber),
    enabled: !!pageNumber,
  });
};

export default useMovies;
