import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
  sprint: {
    startingwords: 0,
    endWords: 0,
  },
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
    updateSprint(state, action) {
      state.sprint = action.payload;
    },

    UpdateUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { Login, UpdateUser, updateSprint, Logout } = userSlice.actions;

export default userSlice.reducer;
