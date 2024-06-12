import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const Getvideo= createAsyncThunk('video/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/vedio/get');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const deletevideo= createAsyncThunk('video/delete', async ({id,data}, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.delete(`/api/Vedio/delete/${id}`,{ headers: { token: localStorage.getItem('token1') } });
    dispatch(Getvideo())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const addvideo= createAsyncThunk('video/add', async (data, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.post('/api/Vedio',data,{ headers: { token: localStorage.getItem('token1') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const putvideo= createAsyncThunk('video/put', async ({id,data}, { rejectWithValue }) => {
  try {
    const res = await axios.put(`/api/vedio/put/${id}`,data,{ headers: { token: localStorage.getItem('token1') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
const videoSlice = createSlice({
  name: "video",
  initialState: {
    video: [],
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
      .addCase(Getvideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Getvideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.video = action.payload.vedio;
     
      })
      .addCase(Getvideo.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(deletevideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletevideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(deletevideo.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(addvideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addvideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(addvideo.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(putvideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(putvideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(putvideo.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      ;
  },
});

export default videoSlice.reducer;
