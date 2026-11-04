
import api from "./api";

// Register
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  if (response.data.token) {
    localStorage.setItem("expenseflow-token", response.data.token);
  }

  return response.data;
};

// Login
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  if (response.data.token) {
    localStorage.setItem("expenseflow-token", response.data.token);
  }

  return response.data;
};

// Update profile
export const updateUserProfile = async (profileData) => {
  const response = await api.put("/auth/profile", profileData);
  return response.data;
};

// Change password
export const changeUserPassword = async (passwordData) => {
  const response = await api.put("/auth/change-password", passwordData);
  return response.data;
};

// Delete account
export const deleteUserAccount = async (password) => {
  const response = await api.delete("/auth/delete-account", {
    data: { password },
  });

  return response.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("expenseflow-token");
};

// Get token
export const getToken = () => {
  return localStorage.getItem("expenseflow-token");
};
