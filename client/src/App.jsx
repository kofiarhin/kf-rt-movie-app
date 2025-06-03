import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./components/Header/Header";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Movie from "./Pages/Movie/Movie";
import SearchPage from "./Pages/Search/SearchPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Playground from "./Pages/Playground/Playground";
import CharacterMovies from "./Pages/CharacterMovies/CharacterMovies";

// app
const App = () => {
  // useEffect(() => {
  //   fetch("/api/users")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/character_movies" element={<CharacterMovies />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
