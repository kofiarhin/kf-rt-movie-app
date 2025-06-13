import { useState, useEffect } from "react";
import "./movie_carousel.styles.scss";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

const MovieCarousel = ({ movies, interval = 4000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(current);
      setCurrent((prev) => (prev + 1) % movies.length);
    }, interval);
    return () => clearInterval(id);
  }, [movies.length, interval]);

  if (!movies || movies.length === 0) return <div>No movies to display</div>;

  const movie = movies[current];

  return (
    <div className="movie-carousel">
      <div className="image-wrapper">
        <div className="overlay">ipsum!</div>
        <img
          className="backdrop"
          src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="info-wrapper">
        <div className="poster-wrapper">
          <img
            className="poster"
            src={`${IMAGE_BASE_URL}${movie.poster_path || movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="text-wrapper">
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;
