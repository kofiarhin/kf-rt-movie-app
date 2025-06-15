import "./linearMovieList.styles.scss";

const LinearMovieList = ({ movies }) => {
  console.log(movies);
  if (!movies?.length)
    return <p className="linear-movie-list-empty">No movies found.</p>;

  return (
    <div className="linear-movie-list">
      {movies.map((movie) => (
        <div className="movie-item" key={movie.id}>
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinearMovieList;
