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
    token1: localStorage.getItem("token1") || null,
    isAuthadmin: localStorage.getItem("isAuthadmin") === "true", 
  },
  reducers: {
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
        state.isAuthadmin = true;
        state.token1 = action.payload.token1;
        localStorage.setItem("isAuthadmin", "true"); 
        localStorage.setItem("token1", state.token1);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.token1 = null;
        state.isAuthadmin = false;
        state.error = action.payload.error;
        localStorage.setItem("isAuthadmin", "false");
        localStorage.removeItem("token1"); 
      });
  },
});


export default adminSlice.reducer;
