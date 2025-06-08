import useCharacterMovies from "../../hooks/useCharacterMovies";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import MovieList from "../../components/MovieList/MovieList";
import LazyImage from "../../components/Lazy/LazyImage";
import "./characterMovies.styles.scss";
import useWikipedia from "../../hooks/useWikipedia";
import useMovieAi from "../../hooks/useMovieAi";

// character movies
const CharacterMovies = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); // returns '28' if URL is ?genre=28
  const { data: wikiData } = useWikipedia(query);
  const { data, isLoading } = useCharacterMovies(query);

  const { data: characeterData } = useMovieAi(query);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div id="character_movies">
      <div className="image-container">
        <LazyImage
          src={`https://image.tmdb.org/t/p/w185/${data.profile_path}.jpg`}
        />
      </div>

      <h2> {data.original_name} </h2>

      {characeterData && <p> {characeterData?.message} </p>}

      <h2>Featured Movies</h2>
      <div>{data && <MovieList data={data.known_for} />}</div>
    </div>
  );
};

export default CharacterMovies;
