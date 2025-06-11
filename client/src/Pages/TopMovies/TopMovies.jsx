import "./top_movies.styles.scss";
import "../../hooks/useCustomMoviesQuery";
import useCustomMoviesQuery from "../../hooks/useCustomMoviesQuery";
import Spinner from "../../components/Spinner/Spinner";
import MovieList from "../../components/MovieList/MovieList";
const TopMovies = () => {
  const { data, isLoading } = useCustomMoviesQuery("top movies");

  if (isLoading) {
    return <Spinner />;
  }

  const handleLoadMore = () => {
    console.log("load more");
  };
  return (
    <div id="top-movies">
      <h1 className="heading">Top Movies</h1>
      <MovieList data={data} />
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default TopMovies;
