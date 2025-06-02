import { apiKey } from "../config/lib";
import { useQuery } from "@tanstack/react-query";

const getMovie = async (movieId) => {
  const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

  const urls = [movieUrl, castUrl, trailerUrl];

  const [movie, cast, trailer] = await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url);
      return await res.json();
    })
  );

  console.log("xxxx", movie);

  return { movie, cast, trailer };
};

const useMovie = (movieId) => {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(movieId),
  });
};

export default useMovie;
