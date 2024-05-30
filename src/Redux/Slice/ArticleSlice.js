import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to get visible articles
export const GetArticle = createAsyncThunk('article/getVisible', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/ArticleVisible/get');
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to get invisible articles
export const GetArticleInvi = createAsyncThunk('article/getInvisible', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/ArticleInvisible/get', { headers: { token: localStorage.getItem('token1') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to add an article
export const AddArticle = createAsyncThunk('article/add', async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/Article', formData);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to delete a visible article
export const delArticle = createAsyncThunk('article/deleteVisible', async ({ id }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`/api/Article/delete/${id}`, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetArticle());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to delete an invisible article
export const delArticleInv = createAsyncThunk('article/deleteInvisible', async ({ id }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`/api/Article/delete/${id}`, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetArticleInvi());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to update an invisible article
export const PutArticleInv = createAsyncThunk('article/updateInvisible', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.put(`/api/Article/put/${id}`, data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetArticleInvi());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const PutArticle = createAsyncThunk('article/update', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.put(`/api/Article/put/${id}`, data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetArticle());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
// Article slice
const ArticleSlice = createSlice({
  name: "articles",
  initialState: {
    Articles: [],
    ArticlesInv: [],
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
      .addCase(GetArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.Articles = action.payload.articlesVisib;
      })
      .addCase(GetArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(GetArticleInvi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetArticleInvi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.ArticlesInv = action.payload.articlesInvi;
      })
      .addCase(GetArticleInvi.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(AddArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AddArticle.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(AddArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(delArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delArticle.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(delArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(delArticleInv.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delArticleInv.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(delArticleInv.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(PutArticleInv.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PutArticleInv.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(PutArticleInv.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(PutArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PutArticle.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(PutArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload;
      })
      ;
  },
});

export default ArticleSlice.reducer;
