// interfaceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  interfaceData: {}, // Renamed from 'interface' to 'interfaceData'
  loading: false,
  error: null,
};

export const fetchInterface= createAsyncThunk('Partenaire/get', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/get-interfaces');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const putInterface= createAsyncThunk('Partenaire/put', async ({id,data}, { rejectWithValue ,dispatch}) => {
  try {
    const res = await axios.put(`/api/put-interfaces/${id}`,data, { headers: { token: localStorage.getItem('token1') } });
   dispatch(fetchInterface())
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// Create a slice
const InterfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterface.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInterface.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          interfaceData: action.payload.Interfaces
        };
      })
      
      .addCase(fetchInterface.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    
  },
});

export default InterfaceSlice.reducer;

