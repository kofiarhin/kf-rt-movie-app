import { useState, useEffect } from "react";
import "./movie_carousel.styles.scss";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

const MovieCarousel = ({ movies, interval = 4000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, interval);
    return () => clearInterval(id);
  }, [movies.length, interval]);

  if (!movies || movies.length === 0) return <div>No movies to display</div>;

  const movie = movies[current];

  return (
    <div className="carousel">
      <Link to={`/movies/${movie.id}`} className="image-wrapper">
        <div className="overlay"></div>
        <img
          className="backdrop"
          src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <div className="info-wrapper">
        <Link to={`/movies/${movie.id}`} className="poster-wrapper">
          <img
            className="poster"
            src={`${IMAGE_BASE_URL}${movie.poster_path || movie.poster_path}`}
            alt={movie.title}
          />
        </Link>
        <div className="text-wrapper">
          <Link to={`/movies/${movie.id}`}>
            <h2>{movie.title}</h2>
          </Link>
          <p>{movie.release_date}</p>
          <p>
            {" "}
            {movie.overview.substring(0, 150)}..
            <Link to={`/movies/${movie.id}`}>Read more</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;
