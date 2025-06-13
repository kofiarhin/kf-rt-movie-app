import { useState } from "react";
import useMovies from "../../hooks/useMovies";
import Spinner from "../../components/Spinner/Spinner";
import MovieList from "../../components/MovieList/MovieList";
import useGenres from "../../hooks/useGenres";
import "./home.styles.scss";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";

// home
const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, error } = useMovies(pageNumber, selectedGenre);
  const { data: genreData } = useGenres();

  if (isLoading) {
    return <Spinner />;
  }

  const handleLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div id="home">
      {/* filter */}
      <MovieCarousel movies={data} />
      <select
        name="genre"
        id="genre"
        value={selectedGenre}
        onChange={handleGenreChange}
      >
        <option value="">-- Select Genre --</option>
        {genreData?.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
      {/* list of movies */}
      <div> {data && <MovieList data={data} />} </div>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default Home;
