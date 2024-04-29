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
      });
  },
});

export default IconSlice.reducer;
