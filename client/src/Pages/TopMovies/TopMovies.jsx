import "./top_movies.styles.scss";
import { useState } from "react";
import "../../hooks/useCustomMoviesQuery";
import useCustomMoviesQuery from "../../hooks/useCustomMoviesQuery";
import Spinner from "../../components/Spinner/Spinner";
import MovieList from "../../components/MovieList/MovieList";

// top movies
const TopMovies = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useCustomMoviesQuery("top movies", pageNumber);

  if (isLoading) {
    return <Spinner />;
  }

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
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
