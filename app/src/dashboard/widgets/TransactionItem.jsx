
import { useOutletContext } from "react-router-dom";

import {
  ArrowDownLeft,
  ArrowUpRight,
  ShoppingBag,
  Coffee,
  Car,
  Wallet,
  Receipt,
  Trash2,
  Pencil,
} from "lucide-react";

import { formatCurrency } from "../../utils/currencyUtils";

const iconMap = {
  shopping: ShoppingBag,
  food: Coffee,
  transport: Car,
  salary: Wallet,
  default: Receipt,
};

const TransactionItem = ({
  title = "Transaction",
  category = "Other",
  date = "Today",
  amount = 0,
  type = "expense",
  icon = "default",
  onDelete,
  onEdit,
}) => {
  const { currency, exchangeRates } = useOutletContext();

  const isIncome = type === "income";
  const Icon = iconMap[icon] || iconMap.default;

  const rateAvailable =
    currency === "INR" ||
    (typeof exchangeRates?.[currency] === "number" &&
      Number.isFinite(exchangeRates[currency]));

  const formattedAmount = rateAvailable
    ? formatCurrency(
        Math.abs(Number(amount) || 0),
        currency,
        exchangeRates
      )
    : "—";

  const handleDelete = () => {
    if (typeof onDelete !== "function") return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (confirmed) {
      onDelete();
    }
  };

  return (
    <div className="group flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50 dark:hover:bg-white/5">

      {/* Transaction Information */}
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isIncome
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
          }`}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold text-slate-800 dark:text-white">
            {title}
          </h4>

          <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
            {category} · {date}
          </p>
        </div>
      </div>

      {/* Amount and Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="text-right">
          <p
            className={`flex items-center justify-end gap-1 text-sm font-bold ${
              isIncome
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-slate-800 dark:text-white"
            }`}
          >
            {isIncome ? (
              <ArrowDownLeft size={15} />
            ) : (
              <ArrowUpRight size={15} />
            )}

            {isIncome ? "+" : "-"}{formattedAmount}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            {isIncome ? "Income" : "Expense"}
          </p>
        </div>

        {/* Edit Button */}
        <button
          type="button"
          onClick={onEdit}
          disabled={!onEdit}
          aria-label={`Edit ${title}`}
          title="Edit transaction"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-500/10 hover:text-violet-500 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Pencil size={16} />
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={!onDelete}
          aria-label={`Delete ${title}`}
          title="Delete transaction"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
