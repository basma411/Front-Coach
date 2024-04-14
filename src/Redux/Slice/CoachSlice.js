import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('coach/login', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/login', data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const getCoach = createAsyncThunk('coach/get', async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/getCoach',{headers:{token:localStorage.getItem('token')}});
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  });
  const coachSlice = createSlice({
    name: "coach",
    initialState: {
      coachdata: {},
      isLoading: false,
      error: null,
      token: localStorage.getItem("token") || null,
      isAuth: localStorage.getItem("isAuth") || false,
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
        })
        .addCase(getCoach.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getCoach.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.isAuth = true;
          state.coachdata = action.payload.coach;
    
        })
        .addCase(getCoach.rejected, (state, action) => {
          state.isLoading = false;
          state.token = null;
          state.isAuth = false;
          state.error = action.payload.error;
        });
    },
  });
  
  export default coachSlice.reducer;
  
