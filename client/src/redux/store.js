import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../redux/search/searchSlice";
import moviesReducer from "../redux/Movies/MoviesSlice";
import pageReducer from "../redux/Pages/pageSlice";
import authReducer from "./auth/authSlice";
import navigationReducer from "./navigation/navigationSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    movies: moviesReducer,
    page: pageReducer,
    auth: authReducer,
    navigation: navigationReducer,
  },
});

export default store;
