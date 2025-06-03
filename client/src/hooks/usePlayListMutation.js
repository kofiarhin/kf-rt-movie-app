import { useMutation } from "@tanstack/react-query";

const addToPlayList = async (data) => {
  const url = `http://localhost:5000/api/dev`;
  console.log(url);
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};
const usePlayListMutation = () => {
  return useMutation({
    mutationFn: (data) => addToPlayList(data),
    mutationKey: ["playList"],
    onSuccess: (data) => {
      console.log("yyy", data);
    },
    onError: (data) => {
      console.log(data);
    },
  });
};

export default usePlayListMutation;
