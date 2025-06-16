import "./quiz_page.styles.scss";
import { useState } from "react";
import useMovies from "../../hooks/useMovies";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState(null);
  const { data, isLoading } = useMovies();

  console.log(movieTitle);

  if (isLoading) {
    return <Spinner />;
  }

  const handleChange = (e) => {
    setMovieTitle(e.target.value);
  };

  const handleStart = () => {
    navigate(`/quiz/${movieTitle}`);
  };
  return (
    <div id="quiz-page">
      <div className="quiz-wrapper">
        <h1 className="heading center">Take A Quiz</h1>
        <select name="" id="" onChange={handleChange}>
          <option>--Select Movie --</option>
          {data?.map((item) => {
            return (
              <option value={item.original_title}>
                {" "}
                {item.original_title}{" "}
              </option>
            );
          })}
        </select>
        <button onClick={handleStart}> Start Quiz </button>
      </div>
    </div>
  );
};

export default QuizPage;
