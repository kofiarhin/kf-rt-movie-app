import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.styles.scss";
import useSearchQuery from "../../hooks/useSearchQuery";
import SearchForm from "../SearchForm/SearchForm";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          KFlix
        </Link>
        <SearchForm />
      </div>

      <div className="header-right">
        {user ? (
          <>
            <Link to="/for_you" className="nav-link">
              For You
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
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
    </header>
  );
};

export default Header;
