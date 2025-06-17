import "./quiz_component.styles.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizComponent = ({ questions }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = questions[step];

  const handleSelect = (option) => {
    setSelected(option);
    setShowAnswer(true);
    if (option === current.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowAnswer(false);
    if (step + 1 < questions.length) {
      setStep((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    navigate("/quiz");
  };
  if (!questions || questions.length === 0)
    return <div className="quiz-container">No questions available.</div>;

  if (finished) {
    return (
      <div className="quiz-container">
        <h2 className="quiz-title">Quiz Complete!</h2>
        <p className="quiz-score">
          Your score: {score} / {questions.length}
        </p>
        <div className="quiz-restart-wrapper">
          <button onClick={handleRestart}>Restart</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h3 className="quiz-question">{current.question}</h3>
      <ul className="quiz-options">
        {current.options.map((option, idx) => (
          <li
            key={idx}
            className={`quiz-option ${
              showAnswer && option === current.answer
                ? "correct"
                : showAnswer && option === selected
                ? "incorrect"
                : ""
            }`}
            onClick={() => !showAnswer && handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      {showAnswer && (
        <button className="quiz-button" onClick={handleNext}>
          {step + 1 === questions.length ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
};

export default QuizComponent;
