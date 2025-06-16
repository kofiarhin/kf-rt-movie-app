import "./movies.styles.scss";
import MovieList from "../../components/MovieList/MovieList";
import useMovies from "../../hooks/useMovies";
import Spinner from "../../components/Spinner/Spinner";
import SearchForm from "../../components/SearchForm/SearchForm";

const Movies = () => {
  const { data, isLoading } = useMovies();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div id="movies">
      <SearchForm />
      <h1 className="heading">Movies</h1>
      <MovieList data={data} />
    </div>
  );
};

export default Movies;
