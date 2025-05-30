import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import useSearchQuery from "../../hooks/useSearchQuery";
import SearchForm from "../SearchForm/SearchForm";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          KofiFlix
        </Link>
        <SearchForm />
      </div>
      <div className="header-right">
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
