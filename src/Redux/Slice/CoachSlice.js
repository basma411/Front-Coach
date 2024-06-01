import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to set headers with token
const setHeaders = (tokenKey = 'token') => {
  const token = localStorage.getItem(tokenKey);
  return { headers: { token: token } };
};

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
    const res = await axios.get('/api/getCoach', setHeaders());
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updatePassword = createAsyncThunk('coach/updatePassword', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const { id, oldPassword, newPassword, newEmail } = payload;
    const res = await axios.put(`/api/coach/edit/${id}`, { oldPassword, newPassword, newEmail }, setHeaders());
    dispatch(getCoach()); 
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const UpdateCoach = createAsyncThunk('coach/update', async ({ id, formData }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.put(`/api/putCoach/${id}`, formData, setHeaders());
    dispatch(getCoach()); 
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const UpdateCoachAdmin = createAsyncThunk('coachAdmin/update', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.put(`/api/putCoachAdmin/${id}`, data, setHeaders('token1'));
    dispatch(getCoachInVisivble()); 
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const UpdateCoachVisibleAdmin = createAsyncThunk('coachVisibAdmin/update', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.put(`/api/putCoachAdmin/${id}`, data, setHeaders('token1'));
    dispatch(getCoachVisivble()); 
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const cherchecoach = createAsyncThunk('coach/cherchecoach', async (formData, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.post('/api/cherchecoach', formData);
    dispatch(getCoachVisivble());
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

export const addCoach = createAsyncThunk('coach/add', async (data, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.post('/api/registre', data);
    dispatch(getCoachInVisivble());
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const delCoachVisible = createAsyncThunk('coachvisib/delete', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`/api/deletecoach/${id}`, { ...setHeaders('token1'), data: data });
    dispatch(getCoachVisivble());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const getCoachInVisivble = createAsyncThunk('coachesInvisible/get', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('/api/coachesInvisible', setHeaders('token1'));
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const delCoachInvisible = createAsyncThunk('coachinvisib/delete', async ({ id, data }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.delete(`/api/deletecoach/${id}`, { ...setHeaders('token1') });
    dispatch(getCoachInVisivble());
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const coachSlice = createSlice({
  name: "coach",
  initialState: {
    coachdata: {},
    coachfiltre: [], 
    coachVisible: [], 
    coacheInvisible: [],
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
      .addCase(delCoachVisible.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delCoachVisible.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(delCoachVisible.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(delCoachInvisible.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delCoachInvisible.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(delCoachInvisible.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(UpdateCoachAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateCoachAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(UpdateCoachAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      .addCase(UpdateCoachVisibleAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateCoachVisibleAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(UpdateCoachVisibleAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.token = null;
        state.isAuth = false;
        state.error = action.payload.error;
      })
      ;
  },
});

export default coachSlice.reducer;
