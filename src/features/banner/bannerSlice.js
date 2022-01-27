import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import netflix from "../../services/apiConfig";
import request from "../../services/Request";
import { randomize } from "../../utils/randomize";

export const getBanner = createAsyncThunk("banner/getBanner", async () => {
  const resp = await netflix.get(request.fetchTrendingAll);
  return resp?.data?.results[randomize(resp?.data?.results)];
});

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banner: {},
    pending: null,
    error: false,
  },
  extraReducers: {
    [getBanner.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [getBanner.fulfilled]: (state, action) => {
      state.pending = false;
      state.banner = action.payload;
      state.error = false;
    },
    [getBanner.rejected]: (state) => {
      state.payload = false;
      state.error = true;
    },
  },
});

export default bannerSlice.reducer;
