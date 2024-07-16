import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetList = createAsyncThunk(
  'List/get',
  async ({ id, entreprise }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/pub-List/get/${id}`, {
        params: { entreprise },
        headers: { token: localStorage.getItem('token1') }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data?.message || error.message,
      });
    }
  }
);


export const AddList = createAsyncThunk('List/add', async ({ data, id }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`/api/pub-List/${id}`, data);
    return res.data;
  } catch (error) {
    return rejectWithValue({
      error: error.response?.data?.message || error.message,
    });
  }
});

export const delAtelier = createAsyncThunk(
  'Atelier/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/delete-atelier/${id}`, {
        headers: { token: localStorage.getItem('token1') },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data?.message || error.message,
      });
    }
  }
);

const ListSlice = createSlice({
  name: "List",
  initialState: {
    Lists: [],
    isLoading: false,
    error: null,
    token: localStorage.getItem
    ("token") || null,
    isAuth: localStorage.getItem("isAuth") || false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(GetList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(GetList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuth = true;
      state.Lists = action.payload.Lists; // Check payload structure
    })
    .addCase(GetList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error; // Ensure action.payload.error is defined
      state.token = null;
      state.isAuth = false;
    })
      .addCase(AddList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AddList.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(AddList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.token = null;
        state.isAuth = false;
      })
      .addCase(delAtelier.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delAtelier.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(delAtelier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        // Update other state fields if necessary
      });
  },
});

export default ListSlice.reducer;
