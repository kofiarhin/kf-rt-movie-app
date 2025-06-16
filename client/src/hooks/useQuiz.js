import { useQuery } from "@tanstack/react-query";

const getQuiz = async (movie) => {
  try {
    const res = await fetch(
      "https://kf-ai-server.onrender.com/api/movie-quiz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie }),
      }
    );

    if (!res.ok) {
      throw new Error("There was a problem getting quiz from API");
    }

    const data = await res.json();
    return data.message;
  } catch (error) {
    console.error(error.message);
  }
};

const useQuiz = (movie) => {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: () => getQuiz(movie),
    enabled: !!movie,
  });
};

export default useQuiz;
