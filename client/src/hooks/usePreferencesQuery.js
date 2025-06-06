import { useQuery } from "@tanstack/react-query";
import { apiKey } from "../config/lib";

const getPreferences = async (data) => {
  // first request url

  const result = await Promise.all(
    data?.actors?.map(async (actor) => {
      const url = `https://api.themoviedb.org/3/person/${actor.id}/movie_credits?api_key=${apiKey}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("something went wrong getting movies for you");
      }

      const resData = await res.json();
      return resData.cast;
    })
  );

  const flatArray = result.flat();
  const uniqueArray = Array.from(
    new Map(flatArray.map((item) => [item.id, item])).values()
  );
  const sortedByRating = uniqueArray.sort(
    (a, b) => b.vote_average - a.vote_average
  );
  console.log(sortedByRating);

  return sortedByRating;
};

const usePreferenceQuery = (data) => {
  return useQuery({
    queryKey: ["prefdrences", data],
    queryFn: () => getPreferences(data),
    enabled: !!data,
  });
};

export default usePreferenceQuery;
