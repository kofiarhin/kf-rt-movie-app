// hooks/useLoginMutation.js
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

  console.log(url);

  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return await res.json();
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
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export default useLoginMutation;
