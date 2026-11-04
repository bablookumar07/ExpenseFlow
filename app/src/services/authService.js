
import api from "./api";

// Register a new user
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  if (response.data.token) {
    localStorage.setItem("expenseflow-token", response.data.token);
  }

  return response.data;
};

// Login existing user
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  if (response.data.token) {
    localStorage.setItem("expenseflow-token", response.data.token);
  }

  return response.data;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("expenseflow-token");
};

// Get stored authentication token
export const getToken = () => {
  return localStorage.getItem("expenseflow-token");
};
