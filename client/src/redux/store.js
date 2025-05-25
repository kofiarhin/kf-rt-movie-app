import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../redux/search/searchSlice";
import moviesReducer from "../redux/Movies/MoviesSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    movies: moviesReducer,
  },
});

export default store;
