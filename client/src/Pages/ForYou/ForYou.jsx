import useUserGenres from "../../hooks/useUserGenres";
import { useSelector } from "react-redux";
import usePreferencesQuery from "../../hooks/usePreferencesQuery";
import Spinner from "../../components/Spinner/Spinner";
import MovieList from "../../components/MovieList/MovieList";
import useActorsLocal from "../../hooks/useActorsLocal";

const ForYou = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: genreData } = useUserGenres(user);
  const { data: actorsData } = useActorsLocal(user);
  const {
    data: preferenceData,
    isLoading,
    error,
  } = usePreferencesQuery({
    genres: genreData,
    actors: actorsData,
  });

  console.log(error);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="heading">For you</h1>
      {preferenceData && <MovieList data={preferenceData} />}
    </div>
  );
};

export default ForYou;
