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

  if (isLoading || isSaving) {
    return <Spinner />;
  }

  if (!movieData?.movie) {
    return <p className="error">Movie not found or invalid data.</p>;
  }

  const handleSave = async () => {
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
    const found = data?.find((d) => d.movieId === parseInt(id));

    if (found) {
      return (
        <button
          className="remove"
          onClick={() => handleRemove(movieId, user.token, user._id)}
        >
          Remove From Playlist
        </button>
      );
    }

    return <button onClick={handleSave}>Add To Playlist</button>;
  };

  return (
    <div id="movie">
      <h2>{movieData.movie.original_title}</h2>

      {movieData.trailerKey && <Trailer trailerKey={movieData.trailerKey} />}

      <div className="cta-wrapper">
        {user && playListData && renderButton(playListData, movieId)}
      </div>

      <div className="movie-details">
        <p>{movieData.movie.overview}</p>
      </div>

      {movieData.cast?.cast?.length > 0 && (
        <div className="movie-cast-wrapper">
          <h2>Cast</h2>
          <Cast data={movieData.cast.cast} />
        </div>
      )}

      {movieData.recommended?.length > 1 && (
        <div>
          <h2>Related Movies</h2>
          <MovieList data={movieData.recommended.slice(1, 5)} />
        </div>
      )}
    </div>
  );
};

export default Movie;
