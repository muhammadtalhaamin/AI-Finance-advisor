import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5002/api/chat';

export const sendMessage = createAsyncThunk('chat/sendMessage', async (message, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.post(`${API_URL}/send`, { message }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data.message;
});

export const getChatHistory = createAsyncThunk('chat/getChatHistory', async (_, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.get(`${API_URL}/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data.chatHistory;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({ role: 'user', content: action.meta.arg });
        state.messages.push({ role: 'assistant', content: action.payload });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export default chatSlice.reducer;
