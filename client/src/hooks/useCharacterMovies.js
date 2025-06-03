import { useQuery } from "@tanstack/react-query";
import { apiKey } from "../config/lib";

const getCharacterMovies = async (query) => {
  const url = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${query}
`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("there was a problem getting data");
  }
  const data = await res.json();
  return data.results[0];

  return { data: "get charactter movies" };
};

const useCharacterMovies = (query) => {
  return useQuery({
    queryKey: ["character"],
    queryFn: () => getCharacterMovies(query),
    enabled: !!query,
  });
};

export default useCharacterMovies;
