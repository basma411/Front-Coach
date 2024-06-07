import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getdomaine = createAsyncThunk('/get-domaine', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/Domaine/get', data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const AddDomaine = createAsyncThunk('Domaine/add', async (data, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.post("/api/Domaine", data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(getdomaine())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const delDomaine = createAsyncThunk('Domaine/del', async ({ id,data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`/api/Domaine/delete/${id}`, { headers: { token: localStorage.getItem('token1') } });
    dispatch(getdomaine());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const putDomaine = createAsyncThunk('Domaine/put', async ({ id,data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.put(`/api/Domaine/update/${id}`,data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(getdomaine())
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
const DomaineSlice = createSlice({
    name: "domaine",
    initialState: {
      domaines:[],
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
        .addCase(getdomaine.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getdomaine.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
       
          state.domaines = action.payload.Domaine;
         
        })
        .addCase(getdomaine.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload.error;
        })
        .addCase(AddDomaine.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(AddDomaine.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
       
          state.domaines = action.payload.Domaine;
         
        })
        .addCase(AddDomaine.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload.error;
        })
        .addCase(delDomaine.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(delDomaine.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
       
         
        })
        .addCase(delDomaine.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload.error;
        })
        .addCase(putDomaine.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(putDomaine.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
       
         
        })
        .addCase(putDomaine.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload.error;
        })
        ;
    },
  });
  export default DomaineSlice.reducer;
