import useMovie from "../../hooks/useMovie";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import usePlayListQuery from "../../hooks/usePlayListQuery";
import Trailer from "../../components/Trailer/Trailer";
import Cast from "../../components/Cast/Cast";
import "./movie.styles.scss";
import MovieList from "../../components/MovieList/MovieList";
import usePlayListMutation from "../../hooks/usePlayListMutation";
import useRemovePlayListMutation from "../../hooks/useRemovePlayListMutation";

const Movie = () => {
  const { id: movieId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: movieData, isLoading } = useMovie(movieId);
  const { data: playListData } = usePlayListQuery(user);
  const { mutate, isLoading: isSaving } = usePlayListMutation();
  const { mutate: removeMutate } = useRemovePlayListMutation();

  if (isLoading) {
    return <Spinner />;
  }

  if (isSaving) {
    return <Spinner />;
  }

  const handleSave = async () => {
    console.log("add to play list");
    mutate({
      userId: user._id,
      movieId: movieData.movie.id,
      token: user.token,
      poster_path: movieData.movie.poster_path,
      backdrop_path: movieData.backdrop_path,
      overview: movieData.movie.overview,
      runtime: movieData.movieruntime,
      original_title: movieData.movie.original_title,
      vote_rating: movieData.movie.vote_rating,
      imdb_id: movieData.movie.imdb_id,
    });
  };

  const handleRemove = async (movieId, token, userId) => {
    const data = {
      movieId,
      token,
      userId,
    };

    removeMutate(data);
    console.log("remove item from playlist");
  };

  const renderButton = (data, id) => {
    const found = data.find((d) => d.movieId === parseInt(id));

    if (found) {
      return (
        <button
          className="remove"
          onClick={() => handleRemove(movieId, user.token, user._id)}
        >
          {" "}
          Remove From Play list
        </button>
      );
    }
    return <button onClick={handleSave}>Add To PlayList</button>;
  };

  return (
    <div id="movie">
      <h1> {movieData.movie.original_title} </h1>
      {movieData && movieData.trailerKey && (
        <Trailer trailerKey={movieData.trailerKey} />
      )}
      {user && playListData && renderButton(playListData, movieId)}

      {/* details */}
      <div className="movie-details">
        <p> {movieData.movie.overview} </p>
      </div>

      {/* cast */}
      <div>
        <h2>Cast</h2>
        <Cast data={movieData.cast.cast} />
      </div>

      {/* recomended */}
      <div>
        <h2>Related Movies</h2>
        <MovieList data={movieData.recommended.slice(1, 5)} />
      </div>
    </div>
  );
};

export default Movie;
