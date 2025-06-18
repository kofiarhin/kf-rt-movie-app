import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { baseurl, env } from "../config/lib";

// Async function to register a user
const registerUser = async (userData) => {
  const url =
    env === "production"
      ? `${baseurl}/api/auth/register`
      : "http://localhost:5000/api/auth/register";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) {
    // Throw a meaningful error message
    throw new Error(data.error || "Registration failed");
  }

  return data;
};

// Custom hook using useMutation
const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["register"], // use array for consistency
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("✅ Registration successful:", data);
      navigate("/login");
      // Example: redirect to login page with success query param
      // navigate("/login?q=success");
    },
    onError: (error) => {
      console.log("xxxx", error);
      // error.message will contain the server error
    },
  });
};

export default useRegisterMutation;
