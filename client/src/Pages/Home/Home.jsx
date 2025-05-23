import { useEffect, useState } from "react";
import "./home.styles.scss";
import MovieList from "../../components/MovieList/MovieList";
import Spinner from "../../components/Spinner/Spinner";
import { useQueryClient } from "@tanstack/react-query";
export const apiKey = import.meta.env.VITE_API_KEY;
import useMovies from "../../hooks/useMovies";

// app
const Home = () => {
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: movies, isLoading } = useMovies(pageNumber);

  const handleLoadMore = async () => {
    setPageNumber((prev) => prev + 1);
    queryClient.invalidateQueries([{ queryKey: "movies" }]);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="app">
      <h1>Movies App</h1>
      {movies && movies?.length > 0 && <MovieList data={movies} />}
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default Home;
