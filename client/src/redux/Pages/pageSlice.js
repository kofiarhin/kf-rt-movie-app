import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 1,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    reset: (state) => {
      state.pageNumber = 1;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    increasePageNumber: (state) => {
      state.pageNumber = state.pageNumber + 1;
    },
  },
});

export const { reset, setPageNumber, increasePageNumber } = pageSlice.actions;
export default pageSlice.reducer;
