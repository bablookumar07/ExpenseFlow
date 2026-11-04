
import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

import {
  Search,
  Plus,
  ArrowUpDown,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  TrendingUp,
  TrendingDown,
  Receipt,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import useTransactions from "../../hooks/useTransactions";

import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../services/transactionService";

import TransactionModal from "../widgets/TransactionModal";
import EditTransactionModal from "../widgets/EditTransactionModal";

const ITEMS_PER_PAGE = 8;

// Currency formatter
const formatCurrency = (amount, currency = "INR") => {
  const localeMap = {
    INR: "en-IN",
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
  };

  return new Intl.NumberFormat(localeMap[currency] || "en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
};

// Date formatter
const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Transactions = () => {
  const { currency } = useOutletContext();

  const {
    transactions,
    loading,
    error,
    refetchTransactions,
  } = useTransactions();

  // Search and filter states
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Summary calculations
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const totalExpenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const totalBalance = totalIncome - totalExpenses;

  // Dynamic categories
  const categories = useMemo(() => {
    return [
      ...new Set(
        transactions
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  // Search, filters and sorting
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((item) => {
        return (
          item.title?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query)
        );
      });
    }

    if (typeFilter !== "all") {
      result = result.filter(
        (item) => item.type === typeFilter
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter(
        (item) => item.category === categoryFilter
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });

    return result;
  }, [
    transactions,
    search,
    typeFilter,
    categoryFilter,
    sortOrder,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    filteredTransactions.length / ITEMS_PER_PAGE
  );

  const safePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;

  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleTypeFilter = (value) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (value) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setSortOrder("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    typeFilter !== "all" ||
    categoryFilter !== "all";

  // Refresh transactions
  const refreshTransactions = async () => {
    return await refetchTransactions();
  };

  // Add transaction
  const handleAddTransaction = async (data) => {
    try {
      await createTransaction(data);
      await refreshTransactions();

      setIsAddOpen(false);
      setCurrentPage(1);
    } catch (err) {
      console.error("Add transaction failed:", err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to add transaction."
      );
    }
  };

  // Open edit modal
  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditOpen(true);
  };

  // Update transaction
  const handleUpdateTransaction = async (data) => {
    try {
      if (!selectedTransaction?._id) {
        throw new Error("Transaction ID not found.");
      }

      await updateTransaction(
        selectedTransaction._id,
        data
      );

      await refreshTransactions();

      setIsEditOpen(false);
      setSelectedTransaction(null);
    } catch (err) {
      console.error("Update transaction failed:", err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to update transaction."
      );
    }
  };

  // Delete transaction
  const handleDeleteTransaction = async (id) => {
    if (!id) {
      alert("Transaction ID not found.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    try {
      await deleteTransaction(id);

      await refreshTransactions();

      setCurrentPage((page) => {
        const remainingCount = filteredTransactions.length - 1;
        const remainingPages = Math.ceil(
          remainingCount / ITEMS_PER_PAGE
        );

        return Math.max(
          1,
          Math.min(page, remainingPages || 1)
        );
      });
    } catch (err) {
      console.error("Delete transaction failed:", err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete transaction."
      );
    }
  };

  // Retry API request
  const handleRetry = () => {
    refreshTransactions();
  };

  return (
    <div className="space-y-7">

      {/* ========================================
          PAGE HEADER
      ======================================== */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Transactions
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage and track all your income and expenses.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-violet-500/30"
        >
          <Plus size={19} />
          Add Transaction
        </button>
      </div>

      {/* ========================================
          SUMMARY CARDS
      ======================================== */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Transactions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Transactions
            </p>

            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-500">
              <Receipt size={21} />
            </div>
          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
            {transactions.length}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            All recorded transactions
          </p>
        </div>

        {/* Total Income */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Income
            </p>

            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
              <TrendingUp size={21} />
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-emerald-500 sm:text-3xl">
            {formatCurrency(totalIncome, currency)}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Total recorded income
          </p>
        </div>

        {/* Total Expenses */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Expenses
            </p>

            <div className="rounded-xl bg-rose-500/10 p-3 text-rose-500">
              <TrendingDown size={21} />
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-rose-500 sm:text-3xl">
            {formatCurrency(totalExpenses, currency)}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Total recorded expenses
          </p>
        </div>

        {/* Total Balance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Balance
            </p>

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Wallet size={21} />
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {formatCurrency(totalBalance, currency)}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Income minus expenses
          </p>
        </div>
      </section>

      {/* ========================================
          TRANSACTIONS TABLE CARD
      ======================================== */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">

        {/* Search and Filters */}
        <div className="space-y-5 border-b border-slate-200 p-5 dark:border-white/10 sm:p-6">

          {/* Search */}
          <div className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/10 dark:border-white/10 dark:bg-slate-950">
            <Search
              size={19}
              className="shrink-0 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search transactions..."
              aria-label="Search transactions"
              className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:outline-none focus:ring-0 dark:text-white dark:placeholder:text-slate-500"
            />

            {search && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                aria-label="Clear search"
                className="shrink-0 text-slate-400 transition hover:text-slate-800 dark:hover:text-white"
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">

            <select
              value={typeFilter}
              onChange={(e) => handleTypeFilter(e.target.value)}
              aria-label="Filter by transaction type"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              aria-label="Filter by category"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
            >
              <option value="all">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() =>
                setSortOrder((previous) =>
                  previous === "newest" ? "oldest" : "newest"
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-violet-500 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300"
            >
              <ArrowUpDown size={16} />
              {sortOrder === "newest" ? "Newest" : "Oldest"}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-rose-500 transition hover:bg-rose-500/10"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Result Count */}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredTransactions.length} matching transactions
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center text-sm text-slate-500 dark:text-slate-400">
            Loading transactions...
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
              <Receipt size={26} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
              Unable to load transactions
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <>
            {paginatedTransactions.length > 0 ? (
              <div className="overflow-x-auto">

               <table className="transactions-table w-full min-w-[780px] border-collapse text-left">

                  {/* Explicit theme styling on header */}
                  <thead className="bg-slate-100 dark:!bg-slate-950">
                    <tr className="border-b border-slate-200 bg-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:!bg-slate-950 dark:!text-slate-400">

                      <th className="bg-slate-100 px-6 py-4 dark:!bg-slate-950">
                        Transaction
                      </th>

                      <th className="bg-slate-100 px-6 py-4 dark:!bg-slate-950">
                        Category
                      </th>

                      <th className="bg-slate-100 px-6 py-4 dark:!bg-slate-950">
                        Date
                      </th>

                      <th className="bg-slate-100 px-6 py-4 dark:!bg-slate-950">
                        Type
                      </th>

                      <th className="bg-slate-100 px-6 py-4 text-right dark:!bg-slate-950">
                        Amount
                      </th>

                      <th className="bg-slate-100 px-6 py-4 text-center dark:!bg-slate-950">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">

                    {paginatedTransactions.map((transaction) => {
                      const isIncome = transaction.type === "income";

                      return (
                        <tr
                          key={transaction._id || transaction.id}
                          className="transition hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                        >

                          {/* Transaction */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">

                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                  isIncome
                                    ? "bg-emerald-500/10 text-emerald-500"
                                    : "bg-rose-500/10 text-rose-500"
                                }`}
                              >
                                {isIncome ? (
                                  <ArrowDownLeft size={19} />
                                ) : (
                                  <ArrowUpRight size={19} />
                                )}
                              </div>

                              <span className="font-semibold text-slate-800 dark:text-white">
                                {transaction.title}
                              </span>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                            {transaction.category || "Other"}
                          </td>

                          {/* Date */}
                          <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
                            {formatDate(transaction.date)}
                          </td>

                          {/* Type */}
                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                isIncome
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                              }`}
                            >
                              {isIncome ? "Income" : "Expense"}
                            </span>
                          </td>

                          {/* Amount */}
                          <td
                            className={`whitespace-nowrap px-6 py-5 text-right text-sm font-bold ${
                              isIncome
                                ? "text-emerald-500"
                                : "text-slate-800 dark:text-white"
                            }`}
                          >
                            {isIncome ? "+" : "-"}
                            {formatCurrency(transaction.amount, currency)}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-5">
                            <div className="flex justify-center gap-2">

                              <button
                                type="button"
                                onClick={() =>
                                  handleEditTransaction(transaction)
                                }
                                aria-label={`Edit ${transaction.title}`}
                                title="Edit transaction"
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-500/10 hover:text-violet-500"
                              >
                                <Pencil size={17} />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteTransaction(
                                    transaction._id || transaction.id
                                  )
                                }
                                aria-label={`Delete ${transaction.title}`}
                                title="Delete transaction"
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-500"
                              >
                                <Trash2 size={17} />
                              </button>

                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
                  <Wallet size={30} />
                </div>

                <h3 className="mt-5 font-semibold text-slate-900 dark:text-white">
                  No transactions found
                </h3>

                <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                  No transactions match your current search or filters.
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 text-sm font-semibold text-violet-500 transition hover:text-violet-400"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {!loading && !error && filteredTransactions.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 px-5 py-4 dark:border-white/10 sm:flex-row sm:px-6">

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing {startIndex + 1}–
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredTransactions.length
              )}{" "}
              of {filteredTransactions.length}
            </p>

            <div className="flex items-center gap-3">

              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                aria-label="Previous page"
                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="min-w-12 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                {safePage} / {Math.max(totalPages, 1)}
              </span>

              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                aria-label="Next page"
                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
              >
                <ChevronRight size={18} />
              </button>

            </div>
          </div>
        )}
      </section>

      {/* Add Transaction Modal */}
      <TransactionModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddTransaction}
      />

      {/* Edit Transaction Modal */}
      <EditTransactionModal
        isOpen={isEditOpen}
        transaction={selectedTransaction}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedTransaction(null);
        }}
        onSubmit={handleUpdateTransaction}
      />

    </div>
  );
};

export default Transactions;
