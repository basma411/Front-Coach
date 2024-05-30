import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetPartenaire= createAsyncThunk('Partenaire/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/partenaires/get');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const deletePartenaire= createAsyncThunk('Partenaire/delete', async ({id,data}, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.delete(`/api/partenaires/delete/${id}`,{ headers: { token: localStorage.getItem('token1') } });
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
  reducers: {
    // Vos reducers synchrones ici
  },
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
      .addCase(deletePartenaire.fulfilled, (state, action) => {
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
      ;
  },
});

export default PartenaireSlice.reducer;
