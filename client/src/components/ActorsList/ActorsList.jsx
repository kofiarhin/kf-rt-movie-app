import "./actors_list.styles.scss";

const ActorsList = ({ data }) => {
  if (!data) {
    return <h2> No Actors found</h2>;
  }
  return (
    <div className="actors-list-wrapper">
      {data?.map((actor) => {
        return (
          <div className="actors-unit" key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              alt=""
            />
            <h3> {actor.name} </h3>
          </div>
        );
      })}
    </div>
  );
};

export default ActorsList;
