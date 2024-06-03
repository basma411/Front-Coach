import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetVedio= createAsyncThunk('Vedio/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/vedio/get');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const deleteVedio= createAsyncThunk('vedio/delete', async ({id,data}, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.delete(`/api/Vedio/delete/${id}`,{ headers: { token: localStorage.getItem('token1') } });
    dispatch(GetVedio())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const addVedio= createAsyncThunk('vedio/add', async (data, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.post('/api/Vedio',data,{ headers: { token: localStorage.getItem('token1') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const putVedio= createAsyncThunk('vedio/put', async ({id,data}, { rejectWithValue }) => {
  try {
    const res = await axios.put(`/api/vedio/put/${id}`,data,{ headers: { token: localStorage.getItem('token1') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
const VedioSlice = createSlice({
  name: "Vedio",
  initialState: {
    Vedio: [],
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
      .addCase(GetVedio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetVedio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.Vedio = action.payload.vedio;
     
      })
      .addCase(GetVedio.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(deleteVedio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteVedio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(deleteVedio.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(addVedio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addVedio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(addVedio.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(putVedio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(putVedio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(putVedio.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      ;
  },
});

export default VedioSlice.reducer;
