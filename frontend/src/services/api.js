import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

export const login = async (email, password) => {
  try {
    console.log('Sending login request to:', `${API_URL}/auth/login`);
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error in api.js:', error);
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const register = async (username, email, password) => {
  try {
    console.log('Sending registration request to:', `${API_URL}/users`);
    const response = await axios.post(`${API_URL}/users`, { username, email, password });
    console.log('Full axios response:', response);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    console.log('Response data:', response.data);
    
    if (response.data && response.data.user && response.data.token) {
      return response.data;
    } else {
      console.error('Unexpected response structure:', response.data);
      throw new Error('Invalid response structure from server');
    }
  } catch (error) {
    console.error('Registration error in api.js:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw new Error('An unexpected error occurred during registration');
  }
};

export const completeOnboarding = async (onboardingData, token) => {
  try {
    console.log('Sending onboarding/profile update data to:', `${API_URL}/onboarding/complete`);
    const response = await axios.put(
      `${API_URL}/onboarding/complete`,
      onboardingData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log('Onboarding/profile update response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Onboarding/profile update error in api.js:', error);
    handleApiError(error);
  }
};

const handleApiError = (error) => {
  if (error.response) {
    console.error('Error response:', error.response.data);
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    console.error('No response received. Request:', error.request);
    throw new Error('No response received from server. Please check if the server is running.');
  } else {
    console.error('Error setting up the request:', error.message);
    throw new Error('Error setting up the request: ' + error.message);
  }
};  

export const updateFinancialInfo = async (financialData, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/financial-info`,
      financialData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Financial info update error:', error);
    handleApiError(error);
  }
};

export const getFinancialAdvice = async (question, area) => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token being sent with request:', token);
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await axios.post(
      `${API_URL}/financial-advice`,
      { question, area },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getFinancialAdvice:', error);
    throw error;
  }
};