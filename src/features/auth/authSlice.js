import { createSlice } from "@reduxjs/toolkit";

const isAuth = JSON.parse(sessionStorage.getItem("hasAuth"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    isAuth: isAuth ? isAuth : false,
    isEmail: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    authEmail: (state, action) => {
      state.email = action.payload;
      state.isEmail = true;
    },
    hasAuth: (state, action) => {
      state.isAuth = action.payload;
      sessionStorage.setItem("hasAuth", JSON.stringify(state.isAuth));
    },
    passwordError: (state, action) => {
      state.errorMessage = action.payload;
      state.isError = true;
    },
  },
});

export const { authEmail, hasAuth, passwordError } = authSlice.actions;

export default authSlice.reducer;
