import useCustomMoviesQuery from "../../hooks/useCustomMoviesQuery";
import "./popular_movies.styles.scss";
import MovieList from "../../components/MovieList/MovieList";

// popular movies
const PopularMovies = () => {
  const { data } = useCustomMoviesQuery("popular movies");
  return (
    <div id="popular-movies">
      <h1 className="heading">Popular Movies</h1>
      <MovieList data={data} />
    </div>
  );
};

export default PopularMovies;
