import { useParams } from "react-router-dom";
import useMovie from "../../hooks/useMovie";
import Image from "../../components/Image/Image";
import Cast from "../../components/Cast/Cast";
import "./movie.styles.scss";
import Trailer from "../../components/Trailer/Trailer";
// movie
const Movie = () => {
  const { id } = useParams();
  const { data } = useMovie(id);

  if (!data) return <h1>Movie Not found</h1>;
  const movieData = data.movie;
  const castData = data.cast.cast;
  const trailerKey = data.trailer.results[0]?.key;

  return (
    <div id="movie">
      <div className="content-wrapper">
        <div className="image-wrapper">
          <Image url={movieData.poster_path} alt="" />
        </div>
        <div className="details-wrapper">
          <h1> {movieData.title} </h1>
          <h2>Overview</h2>
          <p>{movieData.overview} </p>
          <p>Genres</p>
          <p>
            {movieData.genres.map((g) => (
              <span key={g}> {g.name} </span>
            ))}{" "}
          </p>
          <p> Rating: {movieData.vote_average}.0 </p>
        </div>
      </div>
      <h2>Cast</h2>
      <Cast data={castData} />

      <h2>Traler</h2>
      <Trailer trailerKey={trailerKey} />
    </div>
  );
};

export default Movie;
