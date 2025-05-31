import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../redux/search/searchSlice";
import moviesReducer from "../redux/Movies/MoviesSlice";
import pageReducer from "../redux/Pages/pageSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    movies: moviesReducer,
    page: pageReducer,
    auth: authReducer,
  },
});

export default store;
