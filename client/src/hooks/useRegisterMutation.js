import { Mutation, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { baseurl, env } from "../config/lib";

const registerUser = async (userData) => {
  try {
    const url =
      env === "production"
        ? `${baseurl}/api/auth/register`
        : "http://localhost:5000/api/auth/register";

    const res = await fetch(url, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

const useRegisterMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: "register",
    mutationFn: (userData) => registerUser(userData),
    onSuccess: (data) => {
      navigate("/login?q=success");
    },
    onError: (data) => {
      console.log("yyy", data);
    },
  });
};

export default useRegisterMutation;
