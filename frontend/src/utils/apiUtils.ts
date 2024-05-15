// frontend/src/utils/apiUtils.ts

import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Update with your backend URL

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const handleApiError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('API Error:', error.response.data);
    return error.response.data.message || 'Something went wrong';
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error:', error.request);
    return 'No response from server';
  } else {
    // Something happened in setting up the request that triggered an error
    console.error('API Error:', error.message);
    return error.message || 'Request failed';
  }
};
