import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewsLetter= createAsyncThunk('NewsLetter/POST', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/Newsletter',data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const GetNewletter= createAsyncThunk('Newsletter/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/Newsletter/get',{ headers: { token: localStorage.getItem('token1') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const DeleteNewletter= createAsyncThunk('Newsletter/delete', async ({id,data}, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.delete(`/api/Newsletter/delete/${id}`,{ headers: { token: localStorage.getItem('token1') } });
    dispatch(GetNewletter())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
const NewsLetterSlice = createSlice({
  name: "NewsLetter",
  initialState: {
    NewsLetter: [],
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
      .addCase(addNewsLetter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewsLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
     
      })
      .addCase(addNewsLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      .addCase(GetNewletter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetNewletter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.NewsLetter = action.payload.Newsletters;

     
      })
      .addCase(DeleteNewletter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
        .addCase(DeleteNewletter.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteNewletter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

     
      })
      .addCase(GetNewletter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});

export default NewsLetterSlice.reducer;
