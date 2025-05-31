import { Mutation, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const registerUser = async (userData) => {
  try {
    const res = await fetch("/api/auth/register", {
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
