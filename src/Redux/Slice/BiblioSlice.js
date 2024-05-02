import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetBiblio= createAsyncThunk('Biblio/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/get-biblios');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const  BiblioSlice = createSlice({
  name: " Biblio",
  initialState: {
    Biblios: [],
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
      .addCase(GetBiblio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetBiblio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.Biblios = action.payload.Biblios;
     
      })
      .addCase(GetBiblio.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      });
  },
});

export default BiblioSlice.reducer;
