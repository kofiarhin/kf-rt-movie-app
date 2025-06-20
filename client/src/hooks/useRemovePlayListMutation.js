import { useMutation } from "@tanstack/react-query";
import { env, baseurl } from "../config/lib";
import { useQueryClient } from "@tanstack/react-query";

const removeItem = async (data) => {
  const { movieId, token, userId } = data;
  const prefix = `/api/play_list`;
  const url = env === "production" ? `${baseurl}${prefix}` : prefix;
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
    body: JSON.stringify({ movieId, token, userId }),
  });
  return { data: "remove item" };
};

const useRemovePlayListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["playlist"],
    mutationFn: (data) => removeItem(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["playlist"]);
    },
  });
};

export default useRemovePlayListMutation;
