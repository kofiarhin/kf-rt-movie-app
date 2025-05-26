import { useQuery } from "@tanstack/react-query";

const searchMovies = async (query, pageNumber) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=ca357c71903c409f2ce08d61e75700a6&language=en-US&page=${pageNumber}&include_adult=false`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const data = await res.json();
  return data.results;
};
// useSearchQuery
const useSearchQury = (query, pageNumber = 1) => {
  return useQuery({
    queryKey: ["search", query, pageNumber],
    queryFn: () => searchMovies(query, pageNumber),
  });
};

export default useSearchQury;
