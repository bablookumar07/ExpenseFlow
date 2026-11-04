
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
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("expenseflow-user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => getToken());

  const [loading, setLoading] = useState(false);

  // Login
  const login = async (credentials) => {
    setLoading(true);

    try {
      const response = await loginUser(credentials);

      setToken(response.token);
      setUser(response.user);

      localStorage.setItem(
        "expenseflow-user",
        JSON.stringify(response.user)
      );

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
      setUser(response.user);

      localStorage.setItem(
        "expenseflow-user",
        JSON.stringify(response.user)
      );

      return response;
    } finally {
      setLoading(false);
    }
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
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
