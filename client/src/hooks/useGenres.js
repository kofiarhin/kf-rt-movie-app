import { useQuery } from "@tanstack/react-query";
import { apiKey } from "../config/lib";

const getGenres = async () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US
`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("something went wrong getting genres");
  }
  const data = await res.json();
  return data.genres;
};

const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
};

export default useGenres;
