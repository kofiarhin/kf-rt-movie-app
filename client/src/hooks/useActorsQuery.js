import { useQuery } from "@tanstack/react-query";
import { apiKey } from "../config/lib";

const getActors = async (pageNumber = 1) => {
  try {
    const url = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}
`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("there was a problem getting actors");
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

// use actors
const useActors = (pageNumber = 1) => {
  console.log("xxx", pageNumber);
  return useQuery({
    queryKey: ["actors", pageNumber],
    queryFn: () => getActors(pageNumber),
    enabled: !!pageNumber,
  });
};

export default useActors;
