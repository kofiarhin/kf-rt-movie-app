import "./profile.styles.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGenres from "../../hooks/useGenres";
import Spinner from "../../components/Spinner/Spinner";
import useUserGenres from "../../hooks/useUserGenres";
import { useNavigate } from "react-router-dom";
import useActorsQuery from "../../hooks/useActorsQuery";
import LazyImage from "../../components/Lazy/LazyImage";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data: genresData = [], isLoading: isGenreLoading } = useGenres();
  const { data: userGenres = [] } = useUserGenres(user);
  const { data: actorsData = [], isLoading: isActorsLoading } =
    useActorsQuery();

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);

  useEffect(() => {
    if (Array.isArray(userGenres)) {
      setSelectedGenres(userGenres);
    }
  }, [userGenres]);

  if (isGenreLoading || isActorsLoading) {
    return <Spinner />;
  }

  const toggleActor = (actor) => {
    setSelectedActors((prev) =>
      prev.includes(actor.id)
        ? prev.filter((id) => id !== actor.id)
        : [...prev, actor.id]
    );
  };

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre.id)
        ? prev.filter((id) => id !== genre.id)
        : [...prev, genre.id]
    );
  };

  const handleSaveGenre = async () => {
    localStorage.setItem("genres", JSON.stringify(selectedGenres));
    navigate("/for_you");
  };

  const handleSaveActors = async () => {
    localStorage.setItem("actors", JSON.stringify(selectedActors));
    navigate("/for_you");
  };

  const handleReset = async () => {
    const fields = ["genres", "actors"];
    fields.forEach((f) => {
      localStorage.removeItem(f);
    });
    navigate("/for_you");
  };

  return (
    <div id="profile">
      <h1 className="heading">
        Welcome <span>{user.name}</span>
      </h1>

      <h2>Preferences</h2>

      {/* Genres */}
      <section id="genres">
        <h2>Genres</h2>
        <div className="genres-wrapper">
          {genresData.map((g) => {
            const isSelected = selectedGenres.includes(g.id);
            return (
              <div
                key={g.id}
                className={`genre-unit ${isSelected ? "selected" : ""}`}
                onClick={() => toggleGenre(g)}
              >
                {g.name}
              </div>
            );
          })}
        </div>
        <button onClick={handleSaveGenre}>Save Genres</button>
      </section>

      {/* Actors */}
      <section id="actors">
        <h2>Actors</h2>
        <div className="actors-wrapper">
          {actorsData.map((actor) => {
            const isSelectedActor = selectedActors.includes(actor.id);
            return (
              <div
                key={actor.id}
                className={`actor-unit ${
                  isSelectedActor ? "selected-actor" : ""
                }`}
                onClick={() => toggleActor(actor)}
              >
                <LazyImage
                  src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                />
                <p>{actor.name}</p>
              </div>
            );
          })}
        </div>
        <button onClick={handleSaveActors}>Save Changes</button>

        {/* Reset */}
        <section>
          <h2>Reset Preferences</h2>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </section>
      </section>
    </div>
  );
};

export default Profile;
