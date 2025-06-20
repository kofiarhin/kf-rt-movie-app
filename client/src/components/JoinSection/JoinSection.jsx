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
        <button className="signupButton" onClick={() => navigate("/login")}>
          Sign Up
        </button>
        <ul className="features">
          <li>Enjoy TMDB ad free</li>
          <li>Maintain a personal watchlist</li>
          <li>
            Filter by your subscribed streaming services and find something to
            watch
          </li>
          <li>Log the movies and TV shows you’ve seen</li>
          <li>Build custom lists</li>
          <li>Contribute to and improve our database</li>
        </ul>
      </div>
    </section>
  );
};

export default JoinSection;
