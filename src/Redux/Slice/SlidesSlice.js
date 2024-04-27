import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetSlides = createAsyncThunk('Slide/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/get-slide');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const SlidesSlice = createSlice({
  name: "Slide",
  initialState: {
    Slide: [],
    isLoading: false,
    error: null,
    token: localStorage.getItem("token") || null,
    isAuth: localStorage.getItem("isAuth") || false,
  },
  reducers: {
    // Vos reducers synchrones ici
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetSlides.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetSlides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.Slide = action.payload.Slide;
     
      })
      .addCase(GetSlides.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      });
  },
});

export default SlidesSlice.reducer;
