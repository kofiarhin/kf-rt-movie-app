import "./actor.styles.scss";
import { useParams } from "react-router-dom";
import useActorQuery from "../../hooks/useActorQuery";
import Spinner from "../../components/Spinner/Spinner";

const Actor = () => {
  const { query } = useParams();
  const { data, isLoading } = useActorQuery(query);
  console.log(data);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div id="actor">
      <h1 className="heading">Actorid: {query} </h1>
    </div>
  );
};

export default Actor;
