
import * as XLSX from "xlsx";

export const getDateKey = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getExportRangeLabel = (options) => {
  const labels = {
    all: "All Transactions",
    month: "This Month",
    lastMonth: "Last Month",
    year: "This Year",
    custom: `${options.startDate} to ${options.endDate}`,
  };

  return labels[options.dateRange] || "All Transactions";
};

export const filterTransactionsByDateRange = (
  transactions,
  options
) => {
  const { dateRange, startDate, endDate } = options;
  const now = new Date();

  if (dateRange === "all") {
    return [...transactions];
  }

  if (dateRange === "custom") {
    return transactions.filter((transaction) => {
      const dateKey = getDateKey(transaction.date);

      return (
        dateKey &&
        dateKey >= startDate &&
        dateKey <= endDate
      );
    });
  }

  let from;
  let to;

  if (dateRange === "month") {
    from = new Date(now.getFullYear(), now.getMonth(), 1);
    to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  } else if (dateRange === "lastMonth") {
    from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    to = new Date(now.getFullYear(), now.getMonth(), 0);
  } else if (dateRange === "year") {
    from = new Date(now.getFullYear(), 0, 1);
    to = new Date(now.getFullYear(), 11, 31);
  } else {
    return [...transactions];
  }

  const fromKey = getDateKey(from);
  const toKey = getDateKey(to);

  return transactions.filter((transaction) => {
    const dateKey = getDateKey(transaction.date);

    return dateKey && dateKey >= fromKey && dateKey <= toKey;
  });
};

const getSortedTransactions = (transactions) =>
  [...transactions].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

const getTotals = (transactions, convertAmount) => {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce(
      (total, item) =>
        total + convertAmount(Number(item.amount) || 0),
      0
    );

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce(
      (total, item) =>
        total + convertAmount(Number(item.amount) || 0),
      0
    );

  return {
    income,
    expenses,
    balance: income - expenses,
  };
};

// Excel export
export const exportTransactionsToExcel = ({
  transactions,
  options,
  currency,
  convertAmount,
  userName,
}) => {
  const filtered = filterTransactionsByDateRange(
    transactions,
    options
  );

  if (!filtered.length) {
    throw new Error(
      "No transactions found for the selected date range."
    );
  }

  const totals = getTotals(filtered, convertAmount);

  const summaryData = [
    ["EXPENSEFLOW - FINANCIAL REPORT"],
    [],
    ["Account Holder", userName || "ExpenseFlow User"],
    ["Report Date", new Date().toLocaleDateString("en-IN")],
    ["Selected Date Range", getExportRangeLabel(options)],
    ["Currency", currency],
    [],
    ["FINANCIAL SUMMARY"],
    ["Total Income", totals.income],
    ["Total Expenses", totals.expenses],
    ["Net Balance", totals.balance],
    ["Total Transactions", filtered.length],
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);

  summarySheet["!cols"] = [
    { wch: 28 },
    { wch: 32 },
  ];

  const rows = getSortedTransactions(filtered).map((item) => [
    item.title || "Untitled",
    convertAmount(Number(item.amount) || 0),
    item.type === "income" ? "Income" : "Expense",
    item.category || "Other",
    item.date
      ? new Date(item.date).toLocaleDateString("en-IN")
      : "",
  ]);

  const transactionSheet = XLSX.utils.aoa_to_sheet([
    ["Title", `Amount (${currency})`, "Type", "Category", "Date"],
    ...rows,
  ]);

  transactionSheet["!cols"] = [
    { wch: 28 },
    { wch: 20 },
    { wch: 14 },
    { wch: 20 },
    { wch: 18 },
  ];

  transactionSheet["!autofilter"] = {
    ref: `A1:E${rows.length + 1}`,
  };

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    summarySheet,
    "Summary"
  );

  XLSX.utils.book_append_sheet(
    workbook,
    transactionSheet,
    "Transactions"
  );

  workbook.Props = {
    Title: "ExpenseFlow Financial Report",
    Subject: "Personal Transaction Report",
    Author: "ExpenseFlow",
    CreatedDate: new Date(),
  };

  const dateStamp = new Date().toISOString().slice(0, 10);

  XLSX.writeFile(
    workbook,
    `ExpenseFlow_Report_${dateStamp}.xlsx`,
    { compression: true }
  );

  return filtered.length;
};

// CSV export
const escapeCsvValue = (value) => {
  let text = String(value ?? "");

  // Prevent spreadsheet formula injection
  if (/^[\s]*[=+\-@\t\r]/.test(text)) {
    text = `'${text}`;
  }

  return `"${text.replace(/"/g, '""')}"`;
};

export const exportTransactionsToCSV = ({
  transactions,
  options,
  currency,
  convertAmount,
}) => {
  const filtered = filterTransactionsByDateRange(
    transactions,
    options
  );

  if (!filtered.length) {
    throw new Error(
      "No transactions found for the selected date range."
    );
  }

  const headers = [
    "Title",
    `Amount (${currency})`,
    "Type",
    "Category",
    "Date",
  ];

  const rows = getSortedTransactions(filtered).map((item) => [
    item.title || "Untitled",
    convertAmount(Number(item.amount) || 0).toFixed(2),
    item.type === "income" ? "Income" : "Expense",
    item.category || "Other",
    item.date
      ? new Date(item.date).toLocaleDateString("en-IN")
      : "",
  ]);

  const csvContent = [
    headers.map(escapeCsvValue).join(","),
    ...rows.map((row) => row.map(escapeCsvValue).join(",")),
  ].join("\r\n");

  // BOM helps Excel open UTF-8 CSV correctly
  const blob = new Blob(
    ["\uFEFF", csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `ExpenseFlow_Transactions_${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  return filtered.length;
};
