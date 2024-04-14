import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('admin/login', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/admin/login', data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admindata: {},
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
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.token = action.payload.token;
        localStorage.setItem("isAuth", state.isAuth);
        localStorage.setItem("token", state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      });
  },
});

export default adminSlice.reducer;
