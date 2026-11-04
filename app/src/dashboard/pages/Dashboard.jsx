
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

import DashboardHeader from "../widgets/DashboardHeader";
import DashboardFilters from "../widgets/DashboardFilters";
import StatCard from "../widgets/StatCard";
import DashboardChart from "../widgets/DashboardChart";
import CategoryBreakdown from "../widgets/CategoryBreakdown";
import TransactionList from "../widgets/TransactionList";
import TransactionModal from "../widgets/TransactionModal";
import EditTransactionModal from "../widgets/EditTransactionModal";

import useTransactions from "../../hooks/useTransactions";

import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../services/transactionService";

import {
  convertCurrency,
  formatCurrency as formatMoney,
} from "../../utils/currencyUtils";

// Get saved filters
const getInitialFilters = () => {
  const currentDate = new Date();

  const defaultFilters = {
    month: String(currentDate.getMonth() + 1),
    year: String(currentDate.getFullYear()),
  };

  try {
    const saved = localStorage.getItem("expenseflow-filters");

    if (saved) {
      const parsed = JSON.parse(saved);

      return {
        month: parsed.month ? String(parsed.month) : "",
        year: parsed.year ? String(parsed.year) : "",
      };
    }

    return defaultFilters;
  } catch (error) {
    console.error("Failed to load saved filters:", error);
    return defaultFilters;
  }
};

const Dashboard = () => {
  const {
    currency,
    exchangeRates,
    ratesDate,
    ratesLoading,
    ratesError,
  } = useOutletContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Selected filters
  const [activeFilters, setActiveFilters] = useState(getInitialFilters);

  // Convert filters into API parameters
  const getFilterParams = (filters) => ({
    month: filters.month ? Number(filters.month) : undefined,
    year: filters.year ? Number(filters.year) : undefined,
  });

  // Initial API request also uses selected filters
  const {
    transactions,
    loading,
    error,
    refetchTransactions,
  } = useTransactions(getFilterParams(activeFilters));

  // Refresh transactions using active filters
  const refreshTransactions = async (filters = activeFilters) => {
    return await refetchTransactions(getFilterParams(filters));
  };

  // Add Transaction
  const handleAddTransaction = async (newTransaction) => {
    try {
      await createTransaction(newTransaction);
      await refreshTransactions();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to create transaction:", err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to add transaction. Please try again."
      );
    }
  };

  // Delete Transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      await refreshTransactions();
    } catch (err) {
      console.error("Failed to delete transaction:", err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete transaction. Please try again."
      );
    }
  };

  // Open Edit Modal
  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  // Update Transaction
  const handleUpdateTransaction = async (updatedData) => {
    try {
      if (!selectedTransaction?._id) {
        throw new Error("Transaction ID not found.");
      }

      await updateTransaction(
        selectedTransaction._id,
        updatedData
      );

      await refreshTransactions();

      setIsEditModalOpen(false);
      setSelectedTransaction(null);
    } catch (err) {
      console.error("Failed to update transaction:", err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to update transaction. Please try again."
      );
    }
  };

  // Month / Year Filter
  const handleFilterChange = async (filters) => {
    const updatedFilters = {
      month: filters?.month ? String(filters.month) : "",
      year: filters?.year ? String(filters.year) : "",
    };

    setActiveFilters(updatedFilters);

    try {
      await refreshTransactions(updatedFilters);
    } catch (err) {
      console.error("Failed to apply filters:", err);
    }
  };

  // Check whether selected currency rate is available
  const canConvert =
    currency === "INR" ||
    (typeof exchangeRates?.[currency] === "number" &&
      Number.isFinite(exchangeRates[currency]));

  // Convert and format an INR amount
  const formatAmount = (amount) => {
    if (!canConvert) return "—";

    return formatMoney(amount, currency, exchangeRates);
  };

  // Dashboard chart demo data (original values are INR)
 // Dynamic chart data from actual transactions
const monthlyTotals = transactions.reduce((acc, item) => {
  const transactionDate = new Date(item.date);

  if (Number.isNaN(transactionDate.getTime())) {
    return acc;
  }

  const year = transactionDate.getFullYear();
  const month = transactionDate.getMonth();

  const key = `${year}-${month}`;

  if (!acc[key]) {
    acc[key] = {
      year,
      month,
      income: 0,
      expense: 0,
    };
  }

  const amount = Number(item.amount) || 0;

  if (item.type === "income") {
    acc[key].income += amount;
  } else if (item.type === "expense") {
    acc[key].expense += amount;
  }

  return acc;
}, {});

const chartData = Object.values(monthlyTotals)
  .sort((a, b) => a.year - b.year || a.month - b.month)
  .map((item) => ({
    month: new Date(item.year, item.month).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    }),
    income: canConvert
      ? convertCurrency(item.income, currency, exchangeRates)
      : 0,
    expense: canConvert
      ? convertCurrency(item.expense, currency, exchangeRates)
      : 0,
  }));
  // Category demo data (original values are INR)
  const categoryColors = [
  "#8B5CF6",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EC4899",
  "#06B6D4",
  "#F97316",
  "#6366F1",
];

const categoryTotals = transactions
  .filter((item) => item.type === "expense")
  .reduce((acc, item) => {
    const categoryName = item.category?.trim() || "Other";

    acc[categoryName] =
      (acc[categoryName] || 0) + Number(item.amount || 0);

    return acc;
  }, {});

const categoryData = Object.entries(categoryTotals)
  .map(([name, amount], index) => ({
    name,
    amount,
    color: categoryColors[index % categoryColors.length],
  }))
  .sort((a, b) => b.amount - a.amount);

  // Export
  const handleExport = () => {
    console.log("Export clicked");
  };

  // Calculate dashboard statistics from original INR transactions
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + Number(item.amount || 0), 0);

  const totalExpenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + Number(item.amount || 0), 0);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        onAddTransaction={() => setIsModalOpen(true)}
        onExport={handleExport}
      />

      {/* Exchange Rate Status */}
      {currency !== "INR" && (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-900">
          {ratesLoading ? (
            <p className="text-slate-500 dark:text-slate-400">
              Loading exchange rates...
            </p>
          ) : ratesError || !canConvert ? (
            <p className="text-rose-500">
              Exchange rates unavailable. Converted amounts cannot be displayed.
            </p>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">
              Currency: {currency}
              {ratesDate && ` • Exchange rates dated ${ratesDate}`}
            </p>
          )}
        </div>
      )}

      {/* Filters */}
      <DashboardFilters onFilterChange={handleFilterChange} />

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Balance"
          amount={formatAmount(totalBalance)}
          change="Live"
          description="Income minus expenses"
          icon={Wallet}
          variant="violet"
          trend="up"
        />

        <StatCard
          title="Total Income"
          amount={formatAmount(totalIncome)}
          change="Live"
          description="Total recorded income"
          icon={TrendingUp}
          variant="emerald"
          trend="up"
        />

        <StatCard
          title="Total Expenses"
          amount={formatAmount(totalExpenses)}
          change="Live"
          description="Total recorded expenses"
          icon={TrendingDown}
          variant="rose"
          trend="down"
        />

        <StatCard
          title="Total Savings"
          amount={formatAmount(totalBalance)}
          change="Live"
          description="Current remaining balance"
          icon={PiggyBank}
          variant="blue"
          trend="up"
        />
      </section>

      {/* Loading State */}
      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
          Loading transactions...
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
          <p className="font-semibold">
            Unable to load transactions
          </p>

          <p className="mt-1 text-sm">{error}</p>

          <button
            onClick={() => refreshTransactions()}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DashboardChart data={chartData} />
        </div>

        <div>
          <CategoryBreakdown data={categoryData} />
        </div>
      </section>

      {/* Recent Transactions */}
      <section>
        {!loading && !error && (
          <TransactionList
            transactions={transactions.slice(0, 5)}
            onViewAll={() =>
              console.log("View all transactions")
            }
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={handleEditTransaction}
          />
        )}
      </section>

      {/* Add Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
      />

      {/* Edit Transaction Modal */}
      <EditTransactionModal
        isOpen={isEditModalOpen}
        transaction={selectedTransaction}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTransaction(null);
        }}
        onSubmit={handleUpdateTransaction}
      />
    </div>
  );
};

export default Dashboard;
