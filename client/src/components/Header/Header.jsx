import { useState } from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useSearchQuery from "../../hooks/useSearchQuery";
import SearchForm from "../SearchForm/SearchForm";
import useAuth from "../../hooks/useAuth";
import { FaBars, FaTimes } from "react-icons/fa";
import SideBar from "../SideBar/SideBar";
import { toggleSideNav } from "../../redux/navigation/navigationSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.navigation);

  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <>
      <SideBar />
      <header id="header">
        <div className="container">
          <div className="header-left">
            <Link to="/" className="logo">
              <h1>Kflix</h1>
            </Link>
            <FaBars
              className="menu"
              color="white"
              onClick={() => dispatch(toggleSideNav())}
            />
          </div>

          <div className={`header-right ${isOpen ? "active" : ""}`}>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/movies" className="nav-link">
              Movies
            </Link>
            {user ? (
              <>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
