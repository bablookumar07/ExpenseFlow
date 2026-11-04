import { useState, useEffect, useCallback, useRef } from "react";
import { getTransactions } from "../services/transactionService";

const useTransactions = (initialParams = {}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Initial filters ko first render par preserve karo
  const initialParamsRef = useRef(initialParams);

  const fetchTransactions = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError("");

      const response = await getTransactions(params);
      const fetchedTransactions = response?.data || [];

      setTransactions(fetchedTransactions);

      return fetchedTransactions;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch transactions";

      setError(errorMessage);
      console.error("Fetch transactions error:", errorMessage);

      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // First API call selected month/year ke according hogi
  useEffect(() => {
    fetchTransactions(initialParamsRef.current);
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    refetchTransactions: fetchTransactions,
  };
};

export default useTransactions;