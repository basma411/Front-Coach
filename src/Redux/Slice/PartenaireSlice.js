import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetPartenaire = createAsyncThunk('Partenaire/get', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/partenaires/get');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deletePartenaire = createAsyncThunk('Partenaire/delete', async ({ id }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`/api/partenaires/delete/${id}`, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetPartenaire());
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const AddPartenaire = createAsyncThunk('Partenaire/add', async (data, { rejectWithValue ,dispatch}) => {
  try {
    const res = await axios.post("/api/Partenaire", data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetPartenaire())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const PartenaireSlice = createSlice({
  name: "Partenaire",
  initialState: {
    Partenaire: [],
    isLoading: false,
    error: null,
    token: localStorage.getItem("token") || null,
    isAuth: localStorage.getItem("isAuth") || false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPartenaire.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetPartenaire.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.Partenaire = action.payload.partenaires;
      })
      .addCase(GetPartenaire.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(deletePartenaire.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePartenaire.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(deletePartenaire.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(AddPartenaire.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AddPartenaire.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(AddPartenaire.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      });
  },
});

export default PartenaireSlice.reducer;
