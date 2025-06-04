import { useQuery } from "@tanstack/react-query";

// https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&titles=Tom_Cruise&format=json&origin=*

const getInfo = async (query) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&titles=Tom_Cruise&format=json&origin=*
`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("something went wrong geting info from wiki");
  }
  const data = await res.json();
  console.log(data.query);
  return { data: "get query info" };
};
const useWikipedia = (query) => {
  return useQuery({
    queryKey: ["wiki", query],
    queryFn: () => getInfo(query),
    enabled: !!query,
  });
};

export default useWikipedia;
