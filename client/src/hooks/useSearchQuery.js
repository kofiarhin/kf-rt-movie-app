import { useQuery } from "@tanstack/react-query";

const searchMovies = async (query, pageNumber) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=ca357c71903c409f2ce08d61e75700a6&language=en-US&page=${pageNumber}&include_adult=false`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("something weint wrong");
  }
  const data = await res.json();
  return data.results;
};

// use search
const useSearch = (query, pageNumber = 1) => {
  return useQuery({
    queryKey: ["search", pageNumber],
    queryFn: () => searchMovies(query, pageNumber),
    enabled: !!query && !!pageNumber,
  });
};

export default useSearch;
