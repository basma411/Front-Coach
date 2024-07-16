import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetPublication = createAsyncThunk('Publication/get', async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/pub-ateliers/get');
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  });


export const AddPublic = createAsyncThunk('Publication/add', async ({data,id}, { rejectWithValue }) => {
  try {
    const res = await axios.post(`/api/pub-ateliers/${id}`, data, { headers: { token: localStorage.getItem('token1') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const delPublic = createAsyncThunk('Publication/delete', async ({data,id}, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.delete(`/api/pub/delete/${id}`,{
      headers: { token: localStorage.getItem('token1') },
    });
    dispatch(GetPublication())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const PutPublic = createAsyncThunk('Publication/put', async ({data,id}, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.put(`/api/pub-ateliers/put/${id}`,data,{
      headers: { token: localStorage.getItem('token1') },
    });
    dispatch(GetPublication())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const pubatelierSlice = createSlice({
  name: "pubatelier",
  initialState: {
    pubatelier: [],
    isLoading: false,
    error: null,
    token: localStorage.getItem("token") || null,
    isAuth: localStorage.getItem("isAuth") || false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPublication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetPublication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.pubatelier = action.payload.PubAteliers;
      })
      .addCase(GetPublication.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
     
      .addCase(AddPublic.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AddPublic.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(AddPublic.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      
      .addCase(delPublic.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delPublic.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(delPublic.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(PutPublic.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PutPublic.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(PutPublic.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      });
  },
});

export default pubatelierSlice.reducer;
