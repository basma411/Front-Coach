import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetEvenement = createAsyncThunk('Evenement/get', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/Evenements/get');
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const deleteEvenement = createAsyncThunk('Evenement/delete', async ({ id }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`/api/Evenements/delete/${id}`, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetEvenement());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const AddEvenement = createAsyncThunk('Evenement/add', async (data, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.post("/api/Evenements", data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetEvenement());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const putEvenement = createAsyncThunk('Evenement/put', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.put(`/api/Evenements/Put/${id}`, data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetEvenement());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const    Evnt_OG = createAsyncThunk('Evenement/getById', async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/Evenement/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const EvenementSlice = createSlice({
  name: "Evenement",
  initialState: {
    Evenement: [],
    selectedEvenement: "",
    isLoading: false,
    error: null,
    token: localStorage.getItem("token1") || null,
    isAuth: localStorage.getItem("isAuth") === 'true',
  },
  reducers: {
    // Your synchronous reducers here
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
        state.error = action.payload;
      })
      .addCase(   Evnt_OG.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(   Evnt_OG.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.selectedEvenement = action.payload;
      })
      .addCase(   Evnt_OG.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(deleteEvenement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEvenement.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(deleteEvenement.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(AddEvenement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AddEvenement.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(AddEvenement.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(putEvenement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(putEvenement.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(putEvenement.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      });
  },
});

export default EvenementSlice.reducer;
