import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    Logout(state, action) {
      state.isLoggedIn = false;
      state.user = {};
    },
    UpdateUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { Login, UpdateUser, Logout } = userSlice.actions;

export default userSlice.reducer;
