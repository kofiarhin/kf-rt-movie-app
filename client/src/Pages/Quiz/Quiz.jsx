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

  return (
    <div id="quiz">
      <h1 className="heading center">{movie}</h1>
      {quizData && <QuizComponent questions={quizData} />}
    </div>
  );
};

export default Quiz;
