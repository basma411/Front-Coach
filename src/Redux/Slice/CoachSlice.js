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

export const getCoach = createAsyncThunk('coach/get', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/getCoach', { headers: { token: localStorage.getItem('token') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updatePassword = createAsyncThunk('coach/updatePassword', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const { id, oldPassword, newPassword, newEmail } = payload;

    const res = await axios.put(`/api/coach/edit/${id}`, { oldPassword, newPassword, newEmail }, { headers: { token: localStorage.getItem('token') } });
    dispatch(getCoach()); 
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});


export const UpdateCoach = createAsyncThunk('coach/update', async ({ id, formData }, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.put(`/api/putCoach/${id}`, formData, { 
      headers: { 
        token: localStorage.getItem('token'),
      } 
    });
    dispatch(getCoach()); 

    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});


const coachSlice = createSlice({
  name: "coach",
  initialState: {
    coachdata: {},
    // Photo:"",
    isLoading: false,
    error: null,
    token: localStorage.getItem("token") || null,
    isAuth: localStorage.getItem("isAuth") || false,
  },
  reducers: {},
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
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; 
      })
      .addCase(UpdateCoach.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateCoach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(UpdateCoach.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
   
    
  },
});

export default coachSlice.reducer;