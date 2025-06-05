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
    const errorMessage = data?.message || "Login failed";
    throw new Error(errorMessage);
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
      dispatch(setUser(data));
      navigate("/play_list");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};

export default useLoginMutation;
