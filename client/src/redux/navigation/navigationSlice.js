import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleSideNav: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSideNav } = navigationSlice.actions;
export default navigationSlice.reducer;
