import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Change this to your actual API URL

// Register User
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login User and get JWT token
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    const { token } = response.data;
    localStorage.setItem('token', token); // Save the JWT token to localStorage
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default header for subsequent requests
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get authenticated user
export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Logout user and remove JWT token
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
