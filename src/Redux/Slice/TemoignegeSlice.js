import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to get visible articles
export const GetTemoignageV = createAsyncThunk('temoignages/getVisible', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/get-temoignages-Visible');
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to get invisible articles
export const GetTemoignageIn = createAsyncThunk('temoignages/getInvisible', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/get-temoignages-Invisible', { headers: { token: localStorage.getItem('token1') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to add an article
export const AddTemoignages = createAsyncThunk('temoignages/add', async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/add-temoignages', formData);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to delete a visible article
export const delTemoignageV = createAsyncThunk('temoignages/deleteVisible', async ({ id }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`/api/delete-temoignages/${id}`, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetTemoignageV());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to delete an invisible article
export const delTemoignageIn= createAsyncThunk('temoignages/deleteInisible', async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`/api/delete-temoignages/${id}`, { headers: { token: localStorage.getItem('token1') } });
      dispatch(GetTemoignageIn());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

// Thunk to update an invisible article
export const PutTemoignagesInv = createAsyncThunk('temoignages/updateInvisible', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.put(`/api/put-temoignages/${id}`, data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetTemoignageIn());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const PutTemoignagesV= createAsyncThunk('temoignages/update', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.put(`/api/put-temoignages/${id}`, data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetTemoignageV());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
// Article slice
const TemoignegeSlice = createSlice({
  name: "articles",
  initialState: {
    TemoignegeV: [],
    TemoignegeIv: [],
    isLoading: false,
    error: null,
    token: localStorage.getItem("token") || null,
    isAuth: localStorage.getItem("isAuth") || false,
  },
  reducers: {
    // Synchronous reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTemoignageV.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetTemoignageV.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.TemoignegeV = action.payload.Témoignages;
      })
      .addCase(GetTemoignageV.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(GetTemoignageIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetTemoignageIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.TemoignegeIv = action.payload.Témoignages;
      })
      .addCase(GetTemoignageIn.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(AddTemoignages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AddTemoignages.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(AddTemoignages.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(delTemoignageV.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delTemoignageV.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(delTemoignageV.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(delTemoignageIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delTemoignageIn.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(delTemoignageIn.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(PutTemoignagesInv.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PutTemoignagesInv.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(PutTemoignagesInv.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(PutTemoignagesV.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PutTemoignagesV.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(PutTemoignagesV.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      ;
  },
});

export default TemoignegeSlice.reducer;
