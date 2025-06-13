import "./actors.styles.scss";
import { useState } from "react";
import useActors from "../../hooks/useActorsQuery";
import ActorsList from "../../components/ActorsList/ActorsList";
import Spinner from "../../components/Spinner/Spinner";
import LoadButton from "../../components/LoadButton/LoadButton";

const Actors = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useActors(pageNumber);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div id="actors">
      <h1 className="heading">Popular Actors</h1>

      <ActorsList data={data} />
      <LoadButton
        onSetPageNumber={() => setPageNumber((prev) => (prev += 1))}
      />
    </div>
  );
};

export default Actors;
