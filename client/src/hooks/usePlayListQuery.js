import { useQuery } from "@tanstack/react-query";

const getPlayList = async (user) => {
  const res = await fetch("/api/play_list", {
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
