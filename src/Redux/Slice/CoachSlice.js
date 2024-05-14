import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('coach/login', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post('/api/login', data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getCoach = createAsyncThunk('coach/get', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/getCoach', { headers: { token: localStorage.getItem('token') } });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updatePassword = createAsyncThunk('coach/updatePassword', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const { id, oldPassword, newPassword, newEmail } = payload;

    const res = await axios.put(`/api/coach/edit/${id}`, { oldPassword, newPassword, newEmail }, { headers: { token: localStorage.getItem('token') } });
    dispatch(getCoach()); 
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});


export const UpdateCoach = createAsyncThunk('coach/update', async ({ id, formData }, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.put(`/api/putCoach/${id}`, formData, { 
      headers: { 
        token: localStorage.getItem('token'),
      } 
    });
    dispatch(getCoach()); 

    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const cherchecoach = createAsyncThunk('coach/cherchecoach', async ( formData , { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.post('/api/cherchecoach', formData);

    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const getCoachVisivble = createAsyncThunk('coachVisible/get', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/coachesVisible');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const getCoachInVisivble = createAsyncThunk('coachesInvisible/get', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/coachesInvisible');
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const addCoach = createAsyncThunk('coach/add', async (data, { rejectWithValue,dispatch }) => {
  try {
    const res = await axios.post('/api/registre',data);
    dispatch(getCoachInVisivble())

    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const coachSlice = createSlice({
  name: "coach",
  initialState: {
    coachdata: {},
    coachfiltre: [], 
    coachVisible: [], 
    coacheInvisible:[],
    isLoading: false,
    error: null,
    token: localStorage.getItem("token") || null,
    isAuth: localStorage.getItem("isAuth") || false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.token = action.payload.token;
        localStorage.setItem("isAuth", state.isAuth);
        localStorage.setItem("token", state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(getCoach.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCoach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuth = true;
        state.coachdata = action.payload.coach;
        state.coachfiltre = action.payload.coaches;

      })
      .addCase(getCoach.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; 
      })
      .addCase(UpdateCoach.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateCoach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(UpdateCoach.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(cherchecoach.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cherchecoach.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.coachfiltre = action.payload.coaches;
      })
      .addCase(cherchecoach.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getCoachVisivble.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCoachVisivble.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.coachVisible = action.payload.coachesVisible;

      })
      .addCase(getCoachVisivble.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
    .addCase(addCoach.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(addCoach.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;

    })
    .addCase(addCoach.rejected, (state, action) => {
      state.isLoading = false;
      state.token = null;
      state.isAuth = false;
      state.error = action.payload.error;
    })
  
    .addCase(getCoachInVisivble.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getCoachInVisivble.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.coacheInvisible = action.payload.coachesInviseble;

    })
    .addCase(getCoachInVisivble.rejected, (state, action) => {
      state.isLoading = false;
      state.token = null;
      state.isAuth = false;
      state.error = action.payload.error;
    })
  },
});

export default coachSlice.reducer;