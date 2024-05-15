// frontend/src/services/authService.ts

import axios, { AxiosError } from 'axios';

const BASE_URL = 'http://localhost:5000'; // Update with your backend URL

interface AuthResponse {
  message: string;
  // Add any additional fields in the response data
}

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>(`${BASE_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<AuthResponse>;
    throw err.response?.data.message || 'Something went wrong';
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>(`${BASE_URL}/auth/register`, { username, password });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<AuthResponse>;
    throw err.response?.data.message || 'Something went wrong';
  }
};
