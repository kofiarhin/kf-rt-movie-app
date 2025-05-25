import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./components/Header/Header";
import "./App.styles.scss";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Movie from "./Pages/Movie/Movie";
import SearchPage from "./Pages/Search/SearchPage";
// app
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/search/:query/:pageNumber" element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
