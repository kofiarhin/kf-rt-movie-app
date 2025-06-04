import { useMutation } from "@tanstack/react-query";
import { env, baseurl } from "../config/lib";
import { useNavigate } from "react-router-dom";

const addToPlayList = async (data) => {
  const prefix = `/api/play_list`;
  const url = env === "production" ? `${baseurl}${prefix}` : prefix;

  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${data.token}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("there was a problem saving to playlist");
  }

  const resData = await res.json();

  return resData;
};
const usePlayListMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data) => addToPlayList(data),
    mutationKey: ["playList"],
    onSuccess: (data) => {
      navigate("/play_list");
    },
    onError: (data) => {
      console.log(data);
    },
  });
};

export default usePlayListMutation;
