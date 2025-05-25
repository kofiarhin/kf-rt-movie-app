import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../redux/search/searchSlice";
import moviesReducer from "../redux/Movies/MoviesSlice";
import pageReducer from "../redux/Pages/pageSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    movies: moviesReducer,
    page: pageReducer,
  },
});

export default store;
