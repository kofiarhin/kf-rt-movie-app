import "./actors.styles.scss";
import { useState } from "react";
import useActors from "../../hooks/useActorsQuery";
import ActorsList from "../../components/ActorsList/ActorsList";
import Spinner from "../../components/Spinner/Spinner";
import LoadButton from "../../components/LoadButton/LoadButton";
import useSearchActor from "../../hooks/useSearchActor";

const Actors = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: actorsData, isLoading } = useActors(pageNumber);
  const [query, setQuery] = useState("dwayne johnson");
  const [inputQuery, setInputQuery] = useState(null);
  const { data: searchData } = useSearchActor(inputQuery);

  if (isLoading) {
    return <Spinner />;
  }

  let data = searchData && searchData?.length > 0 ? searchData : actorsData;

  const handleChange = (e) => {
    setInputQuery((prev) => (prev = e.target.value));
  };

  return (
    <div id="actors">
      <h1 className="heading">Popular Actors</h1>
      <div className="form-wrapper">
        <input
          type="text"
          placeholder="search actor..."
          value={inputQuery}
          onChange={handleChange}
        />
      </div>

      <ActorsList data={data} />
      {searchData && searchData.length > 0 ? (
        ""
      ) : (
        <LoadButton
          onSetPageNumber={() => setPageNumber((prev) => (prev += 1))}
        />
      )}
    </div>
  );
};

export default Actors;
