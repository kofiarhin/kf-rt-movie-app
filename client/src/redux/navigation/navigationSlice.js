import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleSideNav: (state, action) => {
      console.log(action.payload);
      state.isOpen = !state.isOpen;
    },
    closeSideNav: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleSideNav, closeSideNav } = navigationSlice.actions;
export default navigationSlice.reducer;
