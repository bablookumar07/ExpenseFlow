
import api from "./api";

// Fetch all transactions
export const getTransactions = async (params = {}) => {
  const response = await api.get("/transactions", { params });
  return response.data;
};

// Create transaction
export const createTransaction = async (transactionData) => {
  const response = await api.post("/transactions", transactionData);
  return response.data;
};

// Update transaction
export const updateTransaction = async (id, transactionData) => {
  const response = await api.put(`/transactions/${id}`, transactionData);
  return response.data;
};

// Delete transaction
export const deleteTransaction = async (id) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};

// Fetch category-wise expense summary
export const getCategorySummary = async (params = {}) => {
  const response = await api.get("/transactions/summary/categories", {
    params,
  });
  return response.data;
};
