import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewsLetter= createAsyncThunk('NewsLetter/POST', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/Newsletter',data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const NewsLetterSlice = createSlice({
  name: "NewsLetter",
  initialState: {
    NewsLetter: [],
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
      .addCase(addNewsLetter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewsLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
     
      })
      .addCase(addNewsLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});

export default NewsLetterSlice.reducer;
