import Image from "../Image/Image";
import "./movieList.styles.scss";
import { Link } from "react-router-dom";

const MovieList = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <div className="movie-list">
      {data.map((movie) => {
        return (
          <div key={movie.id} className="movie-item">
            <Image url={movie.poster_path} />
            <h3>{movie.original_title}</h3>
            <p> {movie.overview.substring(0, 200)}... </p>
            <p> Rating: {movie.vote_average} </p>
            <Link to={`/movies/${movie.id}`}> View More</Link>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
