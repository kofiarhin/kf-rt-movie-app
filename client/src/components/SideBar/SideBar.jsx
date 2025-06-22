import "./sideBar.styles.scss";
import { useDispatch } from "react-redux";
import { toggleSideNav } from "../../redux/navigation/navigationSlice";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";

const SideBar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.navigation);
  const { user } = useSelector((state) => state.auth);

  const handleToggle = () => {
    dispatch(toggleSideNav());
  };
  return (
    <div id="sideBar" className={`${isOpen ? "active" : ""}`}>
      <div className="top-section">
        <Link to="/" onClick={handleToggle}>
          <h1>Kflix</h1>
        </Link>

        <FaTimes onClick={handleToggle} className="close" />
      </div>
      <div className="search-wrapper">
        <SearchForm />
      </div>
      <div className="menu-wrapper">
        <div className="menu-unit">
          {user ? (
            <>
              <Link to="/profile" className="nav-link" onClick={handleToggle}>
                Profile
              </Link>
              <Link to="/for_you" className="nav-link" onClick={handleToggle}>
                For You
              </Link>

              <Link to="/play_list" className="nav-link" onClick={handleToggle}>
                Playlist
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={handleToggle}>
                Login
              </Link>
              <Link to="/register" className="nav-link" onClick={handleToggle}>
                Register
              </Link>
            </>
          )}
        </div>
        <div className="menu-unit">
          <Link
            to="/popular_movies"
            className="nav-link"
            onClick={handleToggle}
          >
            Popluar Movies
          </Link>

          <Link to="/actors" className="nav-link" onClick={handleToggle}>
            Popular Actors
          </Link>
          <Link to="/" className="nav-link" onClick={handleToggle}>
            Top 100 Movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
