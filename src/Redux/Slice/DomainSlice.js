import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getdomaine = createAsyncThunk('/get-domaine', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/Domaine/get', data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});


const DomaineSlice = createSlice({
    name: "domaine",
    initialState: {
      domaines:[],
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
        .addCase(getdomaine.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getdomaine.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
       
          state.domaines = action.payload.Domaine;
         
        })
        .addCase(getdomaine.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload.error;
        });
    },
  });
  export default DomaineSlice.reducer;
