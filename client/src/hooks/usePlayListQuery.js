import { useQuery } from "@tanstack/react-query";
import { baseurl, env } from "../config/lib";

const getPlayList = async (user) => {
  const prefix = `/api/play_list`;
  const url = env === "production" ? `${baseurl}${prefix}` : prefix;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  if (!res.ok) {
    throw new Error("there was a problem getting playlist");
  }

  const data = await res.json();
  return data;
};

const usePlayListQuery = (user) => {
  return useQuery({
    queryKey: ["playlist", user?._id],
    queryFn: () => getPlayList(user),
    enabled: !!user?._id,
  });
};

export default usePlayListQuery;
