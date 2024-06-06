import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetSlides = createAsyncThunk('Slide/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/get-slide');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const PutSlider= createAsyncThunk('slider/put', async ({id, data}, { rejectWithValue ,dispatch}) => {
  try {
    const res = await axios.put(`/api/update-slide/${id}`, data, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetSlides());

    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const deleteSlider = createAsyncThunk('slider/delete', async ({ id }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`/api/delete-slide/${id}`, { headers: { token: localStorage.getItem('token1') } });
    dispatch(GetSlides());
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const addSlider = createAsyncThunk('slider/add', async (data, { rejectWithValue ,dispatch}) => {
  try {
    const res = await axios.post("/api/add-slide",data,{ headers: { token: localStorage.getItem('token1') } });
   dispatch(GetSlides())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const SlidesSlice = createSlice({
  name: "Slide",
  initialState: {
    Slide: [],
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
      .addCase(GetSlides.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetSlides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.Slide = action.payload.Slide;
     
      })
      .addCase(GetSlides.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(PutSlider.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(PutSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(PutSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(deleteSlider.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(deleteSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(addSlider.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(addSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      ;
  },
});

export default SlidesSlice.reducer;
