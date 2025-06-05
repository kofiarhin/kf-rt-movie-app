import { useQuery } from "@tanstack/react-query";
import { apiKey } from "../config/lib";

const getActors = async () => {
  try {
    const url = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=1
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

const useActors = () => {
  return useQuery({
    queryKey: ["actors"],
    queryFn: getActors,
  });
};

export default useActors;
