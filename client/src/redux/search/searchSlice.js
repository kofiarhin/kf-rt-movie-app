import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  searchData: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.iserror = false;
      (state.search = ""), (state.searchData = []);
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

export const { reset, setSearch, setSearchData } = searchSlice.actions;
export default searchSlice.reducer;
