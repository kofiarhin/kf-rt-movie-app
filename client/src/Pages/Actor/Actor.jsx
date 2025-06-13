import "./actor.styles.scss";
import { useParams } from "react-router-dom";
import useActorQuery from "../../hooks/useActorQuery";
import Spinner from "../../components/Spinner/Spinner";
import MovieList from "../../components/MovieList/MovieList";
import ActorImage from "../../components/ActorImage/ActorImage";
import useMovieAi from "../../hooks/useMovieAi";

const Actor = () => {
  const { query } = useParams();
  const { data, isLoading } = useActorQuery(query);
  const { data: movieAiData, isLoading: movieAiIsLoading } = useMovieAi(query);
  console.log(movieAiData);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div id="actor">
      <div className="actor-wrapper">
        <div className="image-wrapper">
          <ActorImage url={data.profile_path} />
        </div>
        <div className="details-wrapper">
          <h1 className="heading">Actorid: {query} </h1>
          <p> {movieAiData?.message} </p>
        </div>
      </div>

      <h2>Known For:</h2>
      <MovieList data={data.known_for} />
    </div>
  );
};

export default Actor;
