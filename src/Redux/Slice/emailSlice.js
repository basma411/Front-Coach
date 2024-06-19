import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// Async thunk to send email
export const sendEmail = createAsyncThunk(
  'email/send',
  async ({ email, subject, message }, { rejectWithValue }) => {
    try {
      // Example POST request to your email sending API
      const res = await axios.post('/api/send-email', { email, subject, message });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearEmailState(state) {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
        state.success = false;
      });
  },
});

export const { clearEmailState } = emailSlice.actions;

export default emailSlice.reducer;
