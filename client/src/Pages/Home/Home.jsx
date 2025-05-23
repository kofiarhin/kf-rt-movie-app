import { useEffect, useState } from "react";
import "./home.styles.scss";
import MovieList from "../../components/MovieList/MovieList";
import Spinner from "../../components/Spinner/Spinner";
const apiKey = import.meta.env.VITE_API_KEY;

// app
const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMovies = async () => {
      const moviesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`;
      try {
        setIsLoading(true);
        const res = await fetch(moviesUrl);
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        const data = await res.json();
        setMovies(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMovies();
  }, [pageNumber]);

  const handleLoadMore = async () => {
    setPageNumber((prev) => prev + 1);
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
