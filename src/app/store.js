import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import bannerReducer from "../features/banner/bannerSlice";
import movieRowReducer from "../features/movieRow/movieRowSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    movieRow: movieRowReducer,
    auth: authReducer,
    user: userReducer,
  },
});
