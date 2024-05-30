import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetEvenement= createAsyncThunk('Evenement/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/Evenements/get');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const deleteEvenement= createAsyncThunk('Evenement/delete', async ({id,data}, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.delete(`/api/Evenements/delete/${id}`,{ headers: { token: localStorage.getItem('token1') } });
    dispatch(GetEvenement())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
const EvenementSlice = createSlice({
  name: "Evenement",
  initialState: {
    Evenement: [],
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
      .addCase(GetEvenement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetEvenement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.Evenement = action.payload.Evenements;
     
      })
      .addCase(GetEvenement.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(deleteEvenement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEvenement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(deleteEvenement.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      ;
  },
});

export default EvenementSlice.reducer;
