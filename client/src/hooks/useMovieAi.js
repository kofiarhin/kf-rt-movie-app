import { useQuery } from "@tanstack/react-query";

const getCharacterDetails = async (query) => {
  console.log(query);
  const url = `https://kf-ai-server.onrender.com/api/character/${query}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("someting went wrong with ai");
  }
  const data = await res.json();
  return data;
};

const useMovieAi = (query) => {
  return useQuery({
    queryKey: ["ai_character"],
    queryFn: () => getCharacterDetails(query),
    enabled: !!query,
    enabled: !!query,
  });
};

export default useMovieAi;
