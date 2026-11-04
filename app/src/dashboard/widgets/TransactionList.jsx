
import { ArrowRight, Receipt } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import TransactionItem from "./TransactionItem";

const TransactionList = ({
  transactions = [],
  onViewAll,
  onDeleteTransaction,
  onEditTransaction,
}) => {
  const { dateFormat = "DD/MM/YYYY" } = useOutletContext();

  const recentTransactions = transactions.slice(0, 5);

  // Format transaction date using saved user preference
  const formatTransactionDate = (date) => {
    if (!date) return "Today";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid Date";
    }

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    switch (dateFormat) {
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`;

      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`;

      case "DD/MM/YYYY":
      default:
        return `${day}/${month}/${year}`;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Recent Transactions
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your latest financial activity
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-violet-600 transition hover:gap-2 dark:text-violet-400"
        >
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Transaction Items */}
      {recentTransactions.length > 0 ? (
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {recentTransactions.map((transaction) => (
            <TransactionItem
              key={transaction._id || transaction.id}
              title={transaction.title}
              category={transaction.category}
              date={formatTransactionDate(transaction.date)}
              amount={transaction.amount}
              type={transaction.type}
              onDelete={() =>
                onDeleteTransaction?.(
                  transaction._id || transaction.id
                )
              }
              onEdit={() => onEditTransaction?.(transaction)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
            <Receipt size={26} />
          </div>

          <h4 className="mt-4 font-semibold text-slate-800 dark:text-white">
            No transactions yet
          </h4>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Your recent transactions will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
