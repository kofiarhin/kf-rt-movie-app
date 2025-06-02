import { useQuery } from "@tanstack/react-query";
import { apiKey } from "../config/lib";

const getCredits = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("somethign went wrong");
  }

  const data = await res.json();
  return data.cast;
};

const useCredits = (movieId) => {
  return useQuery({
    queryKey: ["credits", movieId],
    queryFn: () => getCredits(movieId),
    enabled: !!movieId,
  });
};

export default useCredits;
