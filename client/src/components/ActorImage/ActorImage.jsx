const ActorImage = ({ url }) => {
  return (
    <>
      {" "}
      <img src={`https://image.tmdb.org/t/p/w185${url}`} alt="" />
    </>
  );
};

export default ActorImage;
