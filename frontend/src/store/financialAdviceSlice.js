import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFinancialAdvice } from '../services/api';

export const fetchFinancialAdvice = createAsyncThunk(
  'financialAdvice/fetchAdvice',
  async ({ question, area }, { rejectWithValue }) => {
    try {
      const response = await getFinancialAdvice(question, area);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while fetching advice');
    }
  }
);

const financialAdviceSlice = createSlice({
  name: 'financialAdvice',
  initialState: {
    advice: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinancialAdvice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinancialAdvice.fulfilled, (state, action) => {
        state.loading = false;
        state.advice = action.payload.advice || action.payload;
      })
      .addCase(fetchFinancialAdvice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const selectAdvice = (state) => state.financialAdvice;

export default financialAdviceSlice.reducer;