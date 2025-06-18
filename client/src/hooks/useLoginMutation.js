import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { baseurl, env } from "../config/lib";

const loginUser = async (userData) => {
  const url =
    env === "production"
      ? `${baseurl}/api/auth/login`
      : "http://localhost:5000/api/auth/login";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

const useLoginMutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      dispatch(setUser(data));
      navigate("/for_you");
    },
    onError: (error) => {
      console.log("error", error.message);
    },
  });
};

export default useLoginMutation;
