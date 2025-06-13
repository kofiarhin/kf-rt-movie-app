import Image from "../Image/Image";
import "./movieList.styles.scss";
import { Link } from "react-router-dom";

const MovieList = ({ data }) => {
  console.log(data[0]);
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <div className="movie-list">
      {data.map((movie) => {
        return (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className="movie-item"
          >
            <Image url={movie.poster_path} />
            <div>
              <h3>{movie.original_title}</h3>
              <p> Rating: {movie.vote_average} </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MovieList;
