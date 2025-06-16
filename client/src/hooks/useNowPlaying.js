import { useQuery } from "@tanstack/react-query";
import { fetchNowPlayingMovies } from "../config/services";

const useNowPlaying = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchNowPlayingMovies,
  });
};

export default useNowPlaying;
