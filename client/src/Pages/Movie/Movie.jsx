import "./movie.styles.scss";
import { useParams } from "react-router-dom";
import useMovie from "../../hooks/useMovie";
import Spinner from "../../components/Spinner/Spinner";
import Image from "../../components/Image/Image";
import useCredits from "../../hooks/useCredits";
import Cast from "../../components/Cast/Cast";
import LazyImage from "../../components/Lazy/LazyImage";
import useTrailer from "../../hooks/useTrailer";
import { Link } from "react-router-dom";
import Trailer from "../../components/Trailer/Trailer";

const Movie = () => {
  const { id } = useParams();
  // const { data: creditsData } = useCredits(id);
  const { data, isLoading, error } = useMovie(id);
  // const { data: trailerData } = useTrailer(id);

  let movieData, trailerData, castData, trailerKey;
  if (data) {
    movieData = data[0];
    castData = data[1].cast;
    trailerData = data[2].results[0];
    trailerKey = trailerData.key;
  }

  if (error)
    return (
      <div>
        <h1 className="heading error"> Movei not found</h1>
      </div>
    );
  if (isLoading) return <Spinner />;
  return (
    <div id="movie">
      <div className="content-wrapper">
        <Image url={movieData.poster_path} className="poster" />
        <div className="details-wrapper">
          <h1 className="heading"> {movieData.original_title} </h1>
          <p> {movieData.overview} </p>
          <p>
            Genere:{" "}
            {movieData.genres.map((g) => (
              <span key={g.name}> {g.name} </span>
            ))}{" "}
          </p>
        </div>
      </div>

      <Cast data={castData} />

      {/* "63f011fc52497800dc42bac5" */}
      {/* 8hP9D6kZseM" */}
      <h2>Trailer</h2>
      <Trailer trailerKey={trailerKey} />
    </div>
  );
};

export default Movie;
