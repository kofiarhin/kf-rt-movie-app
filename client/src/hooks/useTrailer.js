import { useQuery } from "@tanstack/react-query";

import { apiKey } from "../config/lib";

const getTrailer = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch trailer");
  }

  const data = await response.json();

  // Get first YouTube trailer
  const trailer = data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return trailer || null;
};

const useTrailer = (movieId) => {
  return useQuery({
    queryKey: ["trailer", movieId],
    queryFn: () => getTrailer(movieId),
    enabled: !!movieId,
  });
};

export default useTrailer;
