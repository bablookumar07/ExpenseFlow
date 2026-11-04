
import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  getToken,
  updateUserProfile,
  changeUserPassword,
  deleteUserAccount,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("expenseflow-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => getToken());
  const [loading, setLoading] = useState(false);

  // Sync user state
  const saveUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem(
      "expenseflow-user",
      JSON.stringify(updatedUser)
    );
  };

  // Login
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      setToken(response.token);
      saveUser(response.user);
      return response;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await registerUser(userData);
      setToken(response.token);
      saveUser(response.user);
      return response;
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    const response = await updateUserProfile(profileData);
    saveUser(response.user);
    return response;
  };

  // Change password
  const changePassword = async (passwordData) => {
    return await changeUserPassword(passwordData);
  };

  // Delete account
  const deleteAccount = async (password) => {
    const response = await deleteUserAccount(password);
    logout();
    return response;
  };

  // Logout
  const logout = () => {
    logoutUser();
    localStorage.removeItem("expenseflow-user");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    updateProfile,
    changePassword,
    deleteAccount,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
