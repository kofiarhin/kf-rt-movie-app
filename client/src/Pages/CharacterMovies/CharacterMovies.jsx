import useCharacterMovies from "../../hooks/useCharacterMovies";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import MovieList from "../../components/MovieList/MovieList";
import LazyImage from "../../components/Lazy/LazyImage";
import "./characterMovies.styles.scss";

// character movies
const CharacterMovies = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); // returns '28' if URL is ?genre=28
  console.log(query);
  const { data, isLoading } = useCharacterMovies(query);
  console.log("zzzzz", data);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div id="character_movies">
      <LazyImage
        src={`https://image.tmdb.org/t/p/w185/${data.profile_path}.jpg`}
      />

      <h2> {data.original_name} </h2>

      <h2>Featured Movies</h2>
      <div>{data && <MovieList data={data.known_for} />}</div>
    </div>
  );
};

export default CharacterMovies;
