import { useEffect, useState } from "react";
import { X, Pencil } from "lucide-react";

const EditTransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  transaction,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
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

  // Load selected transaction into form
  useEffect(() => {
    if (isOpen && transaction) {
      setFormData({
        title: transaction.title || "",
        amount: transaction.amount ?? "",
        type: transaction.type || "expense",
        category: transaction.category || "",
        date: transaction.date
          ? new Date(transaction.date).toISOString().split("T")[0]
          : "",
      });

      setError("");
    }
  }, [isOpen, transaction]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
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
  };

  if (!isOpen || !transaction) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-transaction-title"
        className="my-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900 sm:p-8"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Pencil size={20} />
            </div>

            <div>
              <h2
                id="edit-transaction-title"
                className="text-xl font-bold text-slate-900 dark:text-white"
              >
                Edit Transaction
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Update your transaction details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-white/10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Transaction Type */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Transaction Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              {["expense", "income"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setFormData((previous) => ({
                      ...previous,
                      type,
                      category: "",
                    }))
                  }
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition ${
                    formData.type === type
                      ? type === "income"
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600"
                        : "border-rose-500 bg-rose-500/10 text-rose-600"
                      : "border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="edit-title"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Transaction Title
            </label>

            <input
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Grocery Shopping"
              maxLength={100}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 dark:border-white/10 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="edit-amount"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Amount (₹)
            </label>

            <input
              id="edit-amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 dark:border-white/10 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="edit-category"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Category
            </label>

            <select
              id="edit-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 dark:border-white/10 dark:bg-slate-800 dark:text-white"
            >
              <option value="">Select Category</option>

              {categories[formData.type].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="edit-date"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Transaction Date
            </label>

            <input
              id="edit-date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 dark:border-white/10 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-600 dark:text-rose-400">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90"
            >
              Update Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;