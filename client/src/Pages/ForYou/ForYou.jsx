import usePreferenceQuery from "../../hooks/usePreferencesQuery";
import useActorsQuery from "../../hooks/useActorsQuery";
import Spinner from "../../components/Spinner/Spinner";
import MovieList from "../../components/MovieList/MovieList";
import "./forYou.styles.scss";

function getRandomSlice(data) {
  const max = data.length;
  if (max === 0) return [];

  const start = Math.floor(Math.random() * max);
  const range = Math.floor(Math.random() * 3) + 1; // 1 to 3
  const end = Math.min(start + range, max);

  return data.slice(start, end);
}

const ForYou = () => {
  const { data: actorsData } = useActorsQuery();
  const { data: preferenceData = [], isLoading } = usePreferenceQuery({
    actors: actorsData ? getRandomSlice(actorsData) : [],
  });

  if (isLoading) return <Spinner />;

  return (
    <div id="for-you">
      <h2>For you</h2>
      <div className="for-you-wrapper">
        {preferenceData && <MovieList data={preferenceData} />}
      </div>
    </div>
  );
};

export default ForYou;
