import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetIcon= createAsyncThunk('Icon/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/Icon/get');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const PutIcon = createAsyncThunk('Icon/put', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.put(`/api/Icon/update/${id}`, data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetIcon()); 
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const IconSlice = createSlice({
  name: "icon",
  initialState: {
    Icon: [],
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
      .addCase(GetIcon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetIcon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.Icon = action.payload.icon;
      })
      .addCase(GetIcon.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(PutIcon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PutIcon.fulfilled, (state, action) => {
        state.isLoading = false;
        // Mettre à jour le token si nécessaire
        state.token = action.payload.token; // ou peut-être action.payload.token1 selon votre logique
        state.error = null;
        state.isAuth = true;
      })
      .addCase(PutIcon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        // Mettre à jour d'autres champs du state si nécessaire
      });
  },
});

export default IconSlice.reducer;
