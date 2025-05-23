import { apiKey } from "../config/lib";
import { useQuery } from "@tanstack/react-query";

const getMovie = async (movieId) => {
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
  const res = await fetch(movieUrl);
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const data = await res.json();
  return data;
};

const useMovie = (id) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
    enabled: !!id,
  });
};

export default useMovie;
