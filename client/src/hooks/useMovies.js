import { useQuery } from "@tanstack/react-query";
import { apiKey } from "../config/lib";

const getMovies = async (pageNumber = 1, selectedGenre) => {
  const recentUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNumber}
`;
  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  const moviesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`;

  const withGenre = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&page=${pageNumber}`;
  const url = selectedGenre ? withGenre : trendingUrl;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const data = await res.json();
  return data.results;
  return { message: "get movies" };
};
const useMovies = (pageNumber = 1, selectedGenre) => {
  return useQuery({
    queryKey: ["movies", pageNumber, selectedGenre],
    queryFn: () => getMovies(pageNumber, selectedGenre),
    enabled: !!pageNumber,
  });
};

export default useMovies;
