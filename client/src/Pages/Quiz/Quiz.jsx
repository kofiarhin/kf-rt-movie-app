import { useParams } from "react-router-dom";
import useQuiz from "../../hooks/useQuiz";
import Spinner from "../../components/Spinner/Spinner";
import QuizComponent from "../../components/QuizComponent/QuizComponent";
import "./quiz.styles.scss";

const Quiz = () => {
  const { movie } = useParams();
  const { data: quizData, isLoading } = useQuiz(movie);

  if (isLoading) {
    return <Spinner />;
  }

  console.log("xxxxx", quizData);
  return (
    <div id="quiz">
      <h1 className="heading center">Take a {movie} </h1>
      {quizData && <QuizComponent questions={quizData} />}
    </div>
  );
};

export default Quiz;
