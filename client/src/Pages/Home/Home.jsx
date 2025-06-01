import { useState } from "react";
import useMovies from "../../hooks/useMovies";
import Spinner from "../../components/Spinner/Spinner";
import MovieList from "../../components/MovieList/MovieList";
import "./home.styles.scss";

// home
const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, error } = useMovies(pageNumber);

  if (isLoading) {
    return <Spinner />;
  }

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  return (
    <div id="home">
      {/* list of movies */}
      <div> {data && <MovieList data={data} />} </div>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default Home;
