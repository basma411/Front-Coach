import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const addContact= createAsyncThunk('Contact/add', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/Contact',data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const GetContact= createAsyncThunk('Contact/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/Contact/get',{ headers: { token: localStorage.getItem('token1') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const DeleteContact= createAsyncThunk('Contact/delete', async ({id,data}, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.delete(`/api/Contact/delete/${id}`,{ headers: { token: localStorage.getItem('token1') } });
    dispatch(GetContact())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});const ContactSlice = createSlice({
  name: "Contact",
  initialState: {
    Contacts: [],
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
      .addCase(GetContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.Contacts = action.payload.Conts;
     
      })
      .addCase(GetContact.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(DeleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(DeleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
     
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      });
  },
});

export default ContactSlice.reducer;
