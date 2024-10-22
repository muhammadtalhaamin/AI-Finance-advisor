import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5002/api/financial-goals';

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async (_, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Fetched goals:', response.data);
  return response.data;
});

export const addGoal = createAsyncThunk('goals/addGoal', async (goal, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.post(API_URL, goal, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Added goal:', response.data);
  return response.data;
});

export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (id, { getState }) => {
  const { token } = getState().auth;
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Deleted goal with id:', id);
  return id;
});

const initialState = {
  goals: [],
  loading: false,
  error: null,
};

export const updateGoal = createAsyncThunk('goals/updateGoal', async ({ id, updatedData }, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Updated goal:', response.data);
    return response.data;
  });
  
  const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchGoals.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchGoals.fulfilled, (state, action) => {
          state.loading = false;
          state.goals = action.payload;
        })
        .addCase(fetchGoals.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addGoal.fulfilled, (state, action) => {
          state.goals.push(action.payload);
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
          state.goals = state.goals.filter(goal => goal._id !== action.payload);
        })
        .addCase(updateGoal.fulfilled, (state, action) => {
          const index = state.goals.findIndex(goal => goal._id === action.payload._id);
          if (index !== -1) {
            state.goals[index] = action.payload;
          }
        });
    },
  });

  
export default goalSlice.reducer;