import { useQuery } from "@tanstack/react-query";

import { apiKey } from "../config/lib";
const getActor = async (id) => {
  try {
    const name = id;
    const url = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}`;
    const searchUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(
      name
    )}`;

    const characterUrl = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${name}
`;
    const res = await fetch(searchUrl);
    if (!res.ok) {
      throw new Error("there was a problem fetching data from api");
    }
    const data = await res.json();
    console.log("xxxx", data);
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
};
const useActorQuery = (id) => {
  return useQuery({
    queryKey: ["actor", id],
    queryFn: () => getActor(id),
    enabled: !!id,
  });
};

export default useActorQuery;
