import { useParams } from "react-router-dom";
import useMovie from "../../hooks/useMovie";
import Image from "../../components/Image/Image";
import { useSelector } from "react-redux";
import Cast from "../../components/Cast/Cast";
import "./movie.styles.scss";
import Trailer from "../../components/Trailer/Trailer";
import usePlayListMutation from "../../hooks/usePlayListMutation";
import MovieList from "../../components/MovieList/MovieList";
import usePlayListQuery from "../../hooks/usePlayListQuery";
import Spinner from "../../components/Spinner/Spinner";

// movie
const Movie = () => {
  const { id } = useParams();
  const { data } = useMovie(id);
  const { user } = useSelector((state) => state.auth);
  const { mutate } = usePlayListMutation();
  const movieData = data.movie;
  const castData = data.cast.cast;
  const trailerKey = data.trailer.results[0]?.key;
  const recommendedData = data.recommended.results.splice(0, 6);

  const handleSave = async () => {
    mutate({
      userId: user._id,
      movieId: movieData.id,
      token: user.token,
      poster_path: movieData.poster_path,
      backdrop_path: movieData.backdrop_path,
      overview: movieData.overview,
      runtime: movieData.runtime,
      original_title: movieData.original_title,
      vote_rating: movieData.vote_rating,
      imdb_id: movieData.imdb_id,
    });
  };

  const renderButton = (data, id) => {
    return <button>SAve to play list</button>;
    // const found = data.find((d) => d.movieId === parseInt(id));
    // if (found) {
    //   return <button> Remove From PlayList </button>;
    // }
    // return (
    //   <button onClick={() => console.log("add to play list")}>
    //     {" "}
    //     Add to PlayList{" "}
    //   </button>
    // );
  };

  return (
    <div id="movie">
      <h2>Trailer</h2>
      <Trailer trailerKey={trailerKey} />
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
          {user && <button>Save</button>}
        </div>
      </div>

      <Cast data={castData} />
      <h2>Related Movies</h2>
      <MovieList data={recommendedData} />
    </div>
  );
};

export default Movie;
