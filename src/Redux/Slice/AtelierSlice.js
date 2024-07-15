import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAtelier= createAsyncThunk('Atelier/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/get-atelier',{ headers: { token: localStorage.getItem('token1') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addAtelier= createAsyncThunk('Atelier/add', async ({id, data}, { rejectWithValue ,dispatch}) => {
  try {
    const res = await axios.post("/api/add-atelier", data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetAtelier())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});


const AtelierSlice = createSlice({
  name: "icon",
  initialState: {
    ateliers: [],
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
      .addCase(GetAtelier.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetAtelier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.ateliers = action.payload.ateliers;
      })
      .addCase(GetAtelier.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(addAtelier.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addAtelier.fulfilled, (state, action) => {
        state.isLoading = false;
        // Mettre à jour le token si nécessaire
        state.token = action.payload.token; // ou peut-être action.payload.token1 selon votre logique
        state.error = null;
        state.isAuth = true;
      })
      .addCase(addAtelier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        // Mettre à jour d'autres champs du state si nécessaire
      })
     
  },
});

export default AtelierSlice.reducer;
