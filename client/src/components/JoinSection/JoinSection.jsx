import "./joinSection.styles.scss";
import { useNavigate } from "react-router-dom";

const JoinSection = () => {
  const navigate = useNavigate();
  return (
    <section id="joinSection">
      <div className="overlay">
        <h2 className="title">Join Today</h2>
        <p className="description">
          Get access to maintain your own <em>custom personal lists</em>,{" "}
          <em>track what you’ve seen</em> and search and filter for{" "}
          <em>what to watch next</em>—regardless if it’s in theatres, on TV or
          available on popular streaming services like Netflix, Disney Plus,
          Amazon Prime Video, Apple TV+, and Rakuten TV.
        </p>
        <div className="button-wrapper">
          <button className="signupButton" onClick={() => navigate("/login")}>
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
