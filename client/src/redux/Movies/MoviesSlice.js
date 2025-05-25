import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moviesData: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setMoviesData: (state, action) => {
      state.moviesData = action.payload;
    },
  },
});

export const { reset, setMoviesData } = moviesSlice.actions;
export default moviesSlice.reducer;
