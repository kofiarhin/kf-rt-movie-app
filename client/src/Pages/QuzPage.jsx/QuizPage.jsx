import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL_QUIZ } from "../../constants/constants";
import { apiKey } from "../../config/lib";
import QuizComponent from "../../components/QuizComponent/QuizComponent";
import "./quiz_page.styles.scss";

const QuizPage = () => {
  const { movie } = useParams();
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    if (movie) {
      const getQuiz = async () => {
        try {
          const res = await fetch(
            "https://kf-ai-server.onrender.com/api/movie-quiz",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey, // include only if your API expects it
              },
              body: JSON.stringify({ movie }),
            }
          );

          if (!res.ok) {
            throw new Error("There was a problem getting quiz from API");
          }

          const data = await res.json();
          setQuizData(data.message);
        } catch (error) {
          console.error(error.message);
        }
      };

      getQuiz();
    }
  }, [movie]);

  return (
    <div id="quiz">
      <h1 className="heading center">Quiz for {movie} </h1>
      {quizData && quizData.length > 0 && (
        <QuizComponent questions={quizData} />
      )}
    </div>
  );
};

export default QuizPage;
