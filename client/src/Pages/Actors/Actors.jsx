import "./actors.styles.scss";
import useActors from "../../hooks/useActorsQuery";
import ActorsList from "../../components/ActorsList/ActorsList";
import Spinner from "../../components/Spinner/Spinner";

const Actors = () => {
  const { data, isLoading } = useActors();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div id="actors">
      <h1 className="heading">Popular Actors</h1>
      {data && <ActorsList data={data} />}
    </div>
  );
};

export default Actors;
