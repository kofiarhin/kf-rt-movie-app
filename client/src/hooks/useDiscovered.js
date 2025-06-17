import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingMovies } from "../config/services";

const useDiscovered = () => {
  return useQuery({
    queryKey: ["discovered"],
    queryFn: () => fetchUpcomingMovies(),
  });
};

export default useDiscovered;
