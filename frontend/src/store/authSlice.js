import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    const serializedToken = localStorage.getItem('token');
    if (serializedUser && serializedToken) {
      return {
        user: JSON.parse(serializedUser),
        token: serializedToken
      };
    }
  } catch (err) {
    console.error('Error loading user from storage:', err);
  }
  return { user: null, token: null };
};

const initialState = loadUserFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    updateOnboardingStatus: (state, action) => {
      if (state.user) {
        state.user.onboardingCompleted = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, updateOnboardingStatus, logout } = authSlice.actions;

export default authSlice.reducer;