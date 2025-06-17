import { useQuery } from "@tanstack/react-query";
import { fetchNowPlayingMovies } from "../config/services";

const useNowPlaying = () => {
  return useQuery({
    queryKey: ["now playing"],
    queryFn: fetchNowPlayingMovies,
  });
};

export default useNowPlaying;
