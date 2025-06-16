import "./landing.styles.scss";
import { BASE_IMAGE_URL } from "../../constants/constants";
import SearchForm from "../../components/SearchForm/SearchForm";
const Landing = ({ url }) => {
  const bgUrl = `${BASE_IMAGE_URL}${url}`;

  return (
    <div id="landing">
      <div
        className="overlay"
        style={{
          backgroundImage: `url(${bgUrl})`,
        }}
      >
        <h1>Welcome</h1>
        <h2>
          Millions of movies, TV shows and people to discover. Explore now.
        </h2>
        <SearchForm />
      </div>
    </div>
  );
};

export default Landing;
