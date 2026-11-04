
import { useMemo, useState } from "react";

import {
  FileBarChart,
  TrendingUp,
  TrendingDown,
  Wallet,
  Download,
  Printer,
  CalendarDays,
  Receipt,
} from "lucide-react";

import useTransactions from "../../hooks/useTransactions";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

const getDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Reports = () => {
  const {
    transactions,
    loading,
    error,
    refetchTransactions,
  } = useTransactions();

  const today = new Date();

  const firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const [startDate, setStartDate] = useState(
    getDateString(firstDay)
  );

  const [endDate, setEndDate] = useState(
    getDateString(today)
  );

  // Filter transactions by selected date range
  const filteredTransactions = useMemo(() => {
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T23:59:59.999`);

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      if (Number.isNaN(transactionDate.getTime())) {
        return false;
      }

      return (
        transactionDate >= start &&
        transactionDate <= end
      );
    });
  }, [transactions, startDate, endDate]);

  // Financial calculations
  const totalIncome = filteredTransactions
    .filter((item) => item.type === "income")
    .reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

  const totalExpenses = filteredTransactions
    .filter((item) => item.type === "expense")
    .reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

  const netBalance = totalIncome - totalExpenses;

  // Category-wise expenses
  const categoryReport = useMemo(() => {
    const grouped = {};

    filteredTransactions
      .filter((item) => item.type === "expense")
      .forEach((item) => {
        const category = item.category || "Other";

        if (!grouped[category]) {
          grouped[category] = {
            name: category,
            amount: 0,
            count: 0,
          };
        }

        grouped[category].amount +=
          Number(item.amount || 0);

        grouped[category].count += 1;
      });

    return Object.values(grouped).sort(
      (a, b) => b.amount - a.amount
    );
  }, [filteredTransactions]);

  // CSV Export
  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      alert("No transactions available to export.");
      return;
    }

    const headers = [
      "Title",
      "Category",
      "Type",
      "Amount",
      "Date",
    ];

    const rows = filteredTransactions.map((item) => [
      item.title,
      item.category,
      item.type,
      item.amount,
      item.date
        ? new Date(item.date).toLocaleDateString("en-IN")
        : "",
    ]);

    const escapeCSV = (value) => {
      const safeValue = String(value ?? "").replace(/"/g, '""');
      return `"${safeValue}"`;
    };

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) =>
        row.map(escapeCSV).join(",")
      ),
    ].join("\r\n");

    const blob = new Blob(
      ["\uFEFF", csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `expenseflow-report-${startDate}-to-${endDate}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    refetchTransactions();
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400">
        Loading reports...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-500/20 dark:bg-rose-500/10">
        <p className="font-semibold text-rose-600 dark:text-rose-400">
          Unable to load reports
        </p>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {error}
        </p>

        <button
          type="button"
          onClick={handleRefresh}
          className="mt-4 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-7">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Financial Reports
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Review your financial activity and generate reports.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20"
          >
            <Download size={17} />
            Export CSV
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
          >
            <Printer size={17} />
            Print
          </button>
        </div>
      </div>

      {/* Date Range */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays
            size={19}
            className="text-violet-500"
          />

          <h3 className="font-semibold text-slate-900 dark:text-white">
            Report Period
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-500 dark:text-slate-400">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-500 dark:text-slate-400">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              min={startDate}
              max={getDateString(today)}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          {filteredTransactions.length} transactions found in selected period.
        </p>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Income
            </p>
            <TrendingUp className="text-emerald-500" size={21} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-emerald-500">
            {formatCurrency(totalIncome)}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Expenses
            </p>
            <TrendingDown className="text-rose-500" size={21} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-rose-500">
            {formatCurrency(totalExpenses)}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Net Balance
            </p>
            <Wallet className="text-blue-500" size={21} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(netBalance)}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Transactions
            </p>
            <Receipt className="text-violet-500" size={21} />
          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
            {filteredTransactions.length}
          </h2>
        </div>
      </section>

      {/* Category Report */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900 sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/10 p-3 text-violet-500">
            <FileBarChart size={21} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              Expense Category Report
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Spending breakdown for selected period
            </p>
          </div>
        </div>

        {categoryReport.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left">
              <thead className="bg-slate-100 dark:bg-slate-950">
                <tr className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Transactions</th>
                  <th className="px-4 py-4 text-right">
                    Amount
                  </th>
                  <th className="px-4 py-4 text-right">
                    Share
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {categoryReport.map((category) => {
                  const percentage =
                    totalExpenses > 0
                      ? (category.amount / totalExpenses) * 100
                      : 0;

                  return (
                    <tr key={category.name}>
                      <td className="px-4 py-4 text-sm font-semibold text-slate-800 dark:text-white">
                        {category.name}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {category.count}
                      </td>

                      <td className="px-4 py-4 text-right text-sm font-bold text-rose-500">
                        {formatCurrency(category.amount)}
                      </td>

                      <td className="px-4 py-4 text-right text-sm text-slate-600 dark:text-slate-300">
                        {percentage.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center">
            <FileBarChart
              size={30}
              className="mx-auto text-slate-400"
            />

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              No expense data found for this period.
            </p>
          </div>
        )}
      </section>

      {/* Transaction Details */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900 sm:p-6">
        <h3 className="mb-5 font-bold text-slate-900 dark:text-white">
          Transaction Details
        </h3>

        {filteredTransactions.length > 0 ? (
          <div className="space-y-3">
            {filteredTransactions
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.date) - new Date(a.date)
              )
              .map((transaction) => {
                const isIncome = transaction.type === "income";

                return (
                  <div
                    key={transaction._id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-950"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">
                        {transaction.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {transaction.category} ·{" "}
                        {transaction.date
                          ? new Date(transaction.date).toLocaleDateString("en-IN")
                          : "—"}
                      </p>
                    </div>

                    <p
                      className={`text-sm font-bold ${
                        isIncome
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                );
              })}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            No transactions available for this period.
          </p>
        )}
      </section>
    </div>
  );
};

export default Reports;
