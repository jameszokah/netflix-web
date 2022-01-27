import { createSlice } from "@reduxjs/toolkit";
import NavAvatar from "../../img/pirple-avatar.jpg";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    defaultAvatar: NavAvatar,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
