import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetArticle= createAsyncThunk('article/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/ArticleVisible/get');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const ArticleSlice = createSlice({
  name: "articles",
  initialState: {
    Articles: [],
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
      .addCase(GetArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.Articles = action.payload.articles;
     
      })
      .addCase(GetArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      });
  },
});

export default ArticleSlice.reducer;
