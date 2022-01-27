import { createSlice } from "@reduxjs/toolkit";

// export const getMovieRow = createAsyncThunk(
//   "movieRow/getMovieRow",
//   async ({ fetchUrl }) => {
//     const res = await netflix.get(fetchUrl);

//     return res?.data?.results;
//   }
// );
const mediaType = JSON.parse(sessionStorage.getItem("mediaType"));
const video = JSON.parse(sessionStorage.getItem("video"));
const movieId = JSON.parse(sessionStorage.getItem("movieId"));

const movieRowSlice = createSlice({
  name: "movieRow",
  initialState: {
    movies: [],
    pending: null,
    error: false,
    mediaType: mediaType ? mediaType : null,
    video: video ? video : null,
    movieId: movieId ? movieId : null,
  },
  reducers: {
    getPendingStatus: (state) => {
      state.pending = true;
      state.error = false;
    },
    getMovieRow: (state, action) => {
      state.pending = false;
      state.movies = action.payload;
      state.error = false;
    },
    getErrorStatus: (state) => {
      state.pending = false;
      state.error = true;
    },
    getMediaType: (state, action) => {
      state.mediaType = action.payload;
      sessionStorage.setItem("mediaType", JSON.stringify(state.mediaType));
    },
    getVideo: (state, action) => {
      state.video = action.payload;
      sessionStorage.setItem("video", JSON.stringify(state.video));
    },
    getMovieId: (state, action) => {
      state.movieId = action.payload;
      sessionStorage.setItem("movieId", JSON.stringify(state.movieId));
    },
  },
});

export const { getMovieRow, getMediaType, getVideo, getMovieId } =
  movieRowSlice.actions;

export default movieRowSlice.reducer;
