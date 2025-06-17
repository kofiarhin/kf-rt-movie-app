import { searchActor } from "../config/services";
import { useQuery } from "@tanstack/react-query";

const useSearchActor = (query) => {
  return useQuery({
    queryKey: ["actors", query],
    queryFn: () => searchActor(query),
    enabled: !!query,
  });
};

export default useSearchActor;
