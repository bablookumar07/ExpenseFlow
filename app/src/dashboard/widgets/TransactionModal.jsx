
import { useState } from "react";
import { X, Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";

const TransactionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [error, setError] = useState("");

  const categories = {
    expense: [
      "Food",
      "Shopping",
      "Transport",
      "Bills",
      "Entertainment",
      "Healthcare",
      "Education",
      "Other",
    ],
    income: [
      "Salary",
      "Freelance",
      "Business",
      "Investment",
      "Gift",
      "Other",
    ],
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleTypeChange = (type) => {
    setFormData((previous) => ({
      ...previous,
      type,
      category: "",
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = Number(formData.amount);

    if (!formData.title.trim()) {
      setError("Please enter a transaction title.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    if (!formData.date) {
      setError("Please select a transaction date.");
      return;
    }

    onSubmit?.({
      ...formData,
      title: formData.title.trim(),
      amount,
    });

    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });

    setError("");
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-modal-title"
        className="my-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900 sm:p-8"
      >
        {/* Header */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Wallet size={22} />
            </div>

            <h2
              id="transaction-modal-title"
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              Add Transaction
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Enter your income or expense details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-white/10"
          >
            <X size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Transaction Type */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Transaction Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleTypeChange("expense")}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  formData.type === "expense"
                    ? "border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-400"
                    : "border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400"
                }`}
              >
                <ArrowUpRight size={18} />
                Expense
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange("income")}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  formData.type === "income"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-600 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400"
                }`}
              >
                <ArrowDownLeft size={18} />
                Income
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="transaction-title"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Transaction Title
            </label>

            <input
              id="transaction-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={100}
              placeholder="e.g. Grocery Shopping"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="transaction-amount"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Amount (₹)
            </label>

            <input
              id="transaction-amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {/* Category and Date */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="transaction-category"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Category
              </label>

              <select
                id="transaction-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-400 dark:border-white/10 dark:bg-slate-950 dark:text-white"
              >
                <option value="">Select category</option>

                {categories[formData.type].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="transaction-date"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                Date
              </label>

              <input
                id="transaction-date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-400 dark:border-white/10 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>

          {/* Validation Error */}
          {error && (
            <p role="alert" className="text-sm font-medium text-rose-500">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
