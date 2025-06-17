import "./home.styles.scss";
import { useState } from "react";
import useMovies from "../../hooks/useMovies";
import Spinner from "../../components/Spinner/Spinner";
import LinearMovieList from "../../components/LinearMovieList/LinearMovieList";
import Landing from "../../components/Landing/Landing";
import { getRandomInt } from "../../config/lib";
import useNowPlaying from "../../hooks/useNowPlaying";
import useDiscovered from "../../hooks/useDiscovered";

// home
const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, error } = useMovies(pageNumber, selectedGenre);
  const { data: nowPlayingData } = useNowPlaying();
  const { data: discoveredData } = useDiscovered();

  if (isLoading) {
    return <Spinner />;
  }
  const bgIndex = getRandomInt();
  return (
    <div id="home">
      {/* landing */}
      <Landing url={data[bgIndex]?.backdrop_path} />
      {/* linear movie list */}
      <LinearMovieList title="Popular Movies" movies={data} />

      {/* now playing */}
      <LinearMovieList title="Now Playing" movies={nowPlayingData} />

      {/* up coming movies */}
      <LinearMovieList title="Up Coming Movies" movies={discoveredData} />
    </div>
  );
};

export default Home;
