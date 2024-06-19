import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFaq = createAsyncThunk('/get-domaine', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/get-faq');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const addFaq = createAsyncThunk('faq/add', async (data, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.post("/api/add-faq", data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(getFaq())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});


const FaqSlice = createSlice({
    name: "Faq",
    initialState: {
        Faqs:[],
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
        .addCase(getFaq.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getFaq.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
       
          state.Faqs = action.payload.FAQs;
         
        })
        .addCase(getFaq.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload.error;
        })
        .addCase(addFaq.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(addFaq.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
       
          state.Faqs = action.payload.FAQs;
         
        })
        .addCase(addFaq.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload.error;
        })
       
        ;
    },
  });
  export default FaqSlice.reducer;
