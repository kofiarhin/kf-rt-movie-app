import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.styles.scss";
import useSearchQuery from "../../hooks/useSearchQuery";
import SearchForm from "../SearchForm/SearchForm";
import useAuth from "../../hooks/useAuth";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  const toggleSideNav = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <Link to="/" className="logo">
            KFlix
          </Link>
        </div>

        <SearchForm className="search" />

        <div className={`header-right ${isOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/for_you" className="nav-link">
                For You
              </Link>
              <Link to="/profile" className="nav-link">
                Preferences
              </Link>
              <Link to="/play_list" className="nav-link">
                Playlist
              </Link>

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
        <FaBars className="menu" color="white" onClick={toggleSideNav} />
      </div>
    </header>
  );
};

export default Header;
