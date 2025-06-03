import { useParams } from "react-router-dom";
import useMovie from "../../hooks/useMovie";
import Image from "../../components/Image/Image";
import { useSelector } from "react-redux";
import Cast from "../../components/Cast/Cast";
import "./movie.styles.scss";
import Trailer from "../../components/Trailer/Trailer";
import usePlayListMutation from "../../hooks/usePlayListMutation";
import MovieList from "../../components/MovieList/MovieList";

// movie
const Movie = () => {
  const { id } = useParams();
  const { data } = useMovie(id);
  const { user } = useSelector((state) => state.auth);
  const { mutate } = usePlayListMutation();

  if (!data) return <h1>Movie Not found</h1>;
  const movieData = data.movie;
  const castData = data.cast.cast;
  const trailerKey = data.trailer.results[0]?.key;
  const recommendedData = data.recommended.results.splice(0, 3);
  console.log(recommendedData);

  const handleSave = async () => {
    mutate({ userId: user._id, movieId: movieData.id });
  };

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
          {user && <button onClick={handleSave}>Save to WatchList</button>}
        </div>
      </div>
      <h2>Trailer</h2>
      <Trailer trailerKey={trailerKey} />
      <Cast data={castData} />
      <h2>Related Movies</h2>
      <MovieList data={recommendedData} />
    </div>
  );
};

export default Movie;
