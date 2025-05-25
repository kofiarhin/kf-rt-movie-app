import useMovies from "../../hooks/useMovies";
import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { setMoviesData } from "../../redux/Movies/MoviesSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state.search);
  const [pageNumber, setPageNumber] = useState(1);
  const { data: moviesData, isLoading: isMoviesLoading } =
    useMovies(pageNumber);

  useEffect(() => {
    console.log(searchData);
  }, [pageNumber]);

  const handleLoadMore = async () => {
    setPageNumber((prev) => prev + 1);
    console.log(pageNumber);
  };

  if (isMoviesLoading) {
    return <h1>Loading.....</h1>;
  }
  return (
    <div classNeme="home">
      <h1 className="heading center">Home</h1>
      {/* {moviesData && <MovieList data={moviesData} />} */}
      {searchData && searchData.length > 0 ? (
        <MovieList data={searchData} />
      ) : (
        <MovieList data={moviesData} />
      )}
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default Home;
