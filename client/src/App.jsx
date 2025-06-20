import "./App.styles.scss";

// External libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// Pages
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Movie from "./Pages/Movie/Movie";
import SearchPage from "./Pages/Search/SearchPage";
import Playground from "./Pages/Playground/Playground";
import CharacterMovies from "./Pages/CharacterMovies/CharacterMovies";
import PlayListPage from "./Pages/PlayListPage/PlayListPage";
import Profile from "./Pages/Profile/Profile";
import ForYou from "./Pages/ForYou/ForYou";
import TopMovies from "./Pages/TopMovies/TopMovies";
import PopularMovies from "./Pages/PopularMovies/PopularMovies";
import Actors from "./Pages/Actors/Actors";
import Actor from "./Pages/Actor/Actor";
import Movies from "./Pages/Movies/Movies";
import QuizPage from "./Pages/QuizPage/QuizPage";
import Quiz from "./Pages/Quiz/Quiz";

// App component
const App = () => {
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
          <Route path="/top_movies" element={<TopMovies />} />
          <Route path="/popular_movies" element={<PopularMovies />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/actors/:query" element={<Actor />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/:movie" element={<Quiz />} />

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/play_list" element={<PlayListPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/for_you" element={<ForYou />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
