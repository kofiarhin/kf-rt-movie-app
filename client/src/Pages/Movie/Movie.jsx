import "./movie.styles.scss";
import { useParams } from "react-router-dom";
import useMovie from "../../hooks/useMovie";
import Spinner from "../../components/Spinner/Spinner";
import Image from "../../components/Image/Image";

const Movie = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useMovie(id);
  if (error)
    return (
      <div>
        <h1 className="heading error"> Movei not found</h1>
      </div>
    );
  if (isLoading) return <Spinner />;
  return (
    <div className="movie">
      <h1 className="heading center"> {data.original_title} </h1>
      <Image url={data.backdrop_path} />
      <p> {data.overview} </p>
    </div>
  );
};

export default Movie;
