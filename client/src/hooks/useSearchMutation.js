import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiKey } from "../config/lib";
import { useDispatch } from "react-redux";
import { setSearchData } from "../redux/search/searchSlice";

const searchMovies = async (query, pageNumber) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&language=en-US&page=${pageNumber}&include_adult=false`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const data = await res.json();
  return data.results;
};

const useSearchMutation = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [moviesData, setMoviesData] = useState(null);
  const { mutate, isLoading, error } = useMutation({
    mutationFn: (query, pageNumber = 1) => searchMovies(query, pageNumber),
    mutationKey: ["search"],
    onSuccess: (data) => {
      dispatch(setSearchData(data));
      // Update the 'movies' query cache with the search result
      queryClient.setQueryData(["movies"], data);

      // Optional: Invalidate to refetch if there are dependent queries
      //   queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
  return { data: moviesData, isLoading, error, mutate };
};

export default useSearchMutation;
