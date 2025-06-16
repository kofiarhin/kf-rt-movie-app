import { Link } from "react-router-dom";
import "./linearMovieList.styles.scss";

const LinearMovieList = ({ movies, title }) => {
  if (!movies?.length)
    return <p className="linear-movie-list-empty">No movies found.</p>;

  return (
    <div className="linear-movies-container">
      <h2> {title} </h2>
      <div className="linear-movie-list">
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            className="movie-item"
            key={movie.id}
          >
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LinearMovieList;
