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
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("somethign went wrong");
  }

  const data = await res.json();

  return data;
};

// useLoginMutation
const useLoginmutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationKey: "login",
    mutationFn: (userData) => loginUser(userData),
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));
      navigate("/dashboard");
    },
    onError: (data) => {
      console.log("error", data);
    },
  });
};

export default useLoginmutation;
