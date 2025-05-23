import { Link } from "react-router-dom";
import "./header.styles.scss";

const Header = () => (
  <header className="app-header">
    <div className="logo">
      {" "}
      <Link to="/">MovieApp </Link>{" "}
    </div>
    <nav className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  </header>
);

export default Header;
