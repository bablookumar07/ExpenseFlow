
import { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  ChartNoAxesCombined,
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  RefreshCw,
} from "lucide-react";

import {
  getTransactions,
  getCategorySummary,
} from "../../services/transactionService";

const CATEGORY_COLORS = [
  "#8B5CF6",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EC4899",
  "#06B6D4",
  "#F97316",
  "#6366F1",
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

const formatCompactCurrency = (amount) => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }

  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}k`;
  }

  return `₹${amount}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-slate-800">
      <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-white">
        {label}
      </p>

      {payload.map((item) => (
        <p
          key={item.dataKey}
          className="text-xs font-medium"
          style={{ color: item.color }}
        >
          {item.name}: {formatCurrency(item.value)}
        </p>
      ))}
    </div>
  );
};

const Analytics = () => {
  const [transactions, setTransactions] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch real data from backend
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const [transactionResponse, categoryResponse] =
        await Promise.all([
          getTransactions(),
          getCategorySummary(),
        ]);

      setTransactions(
        Array.isArray(transactionResponse?.data)
          ? transactionResponse.data
          : []
      );

      setCategorySummary(
        Array.isArray(categoryResponse?.data)
          ? categoryResponse.data
          : []
      );
    } catch (err) {
      console.error("Analytics fetch failed:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load analytics data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Financial calculations
  const totalIncome = useMemo(() => {
    return transactions
      .filter((item) => item.type === "income")
      .reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      );
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((item) => item.type === "expense")
      .reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      );
  }, [transactions]);

  const totalBalance = totalIncome - totalExpenses;

  const savingsRate =
    totalIncome > 0
      ? Math.max(
          0,
          Math.min(
            100,
            (totalBalance / totalIncome) * 100
          )
        )
      : 0;

  // Generate the latest 6 months from actual transactions
  const monthlyData = useMemo(() => {
    const today = new Date();

    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth() - i,
        1
      );

      months.push({
        month: date.toLocaleDateString("en-IN", {
          month: "short",
        }),
        monthNumber: date.getMonth(),
        year: date.getFullYear(),
        income: 0,
        expenses: 0,
      });
    }

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);

      if (Number.isNaN(date.getTime())) return;

      const monthData = months.find(
        (item) =>
          item.monthNumber === date.getMonth() &&
          item.year === date.getFullYear()
      );

      if (!monthData) return;

      const amount = Number(transaction.amount) || 0;

      if (transaction.type === "income") {
        monthData.income += amount;
      } else if (transaction.type === "expense") {
        monthData.expenses += amount;
      }
    });

    return months;
  }, [transactions]);

  // Category breakdown from backend aggregation
  const categoryData = useMemo(() => {
    return categorySummary.map((item, index) => ({
      name: item.category || "Other",
      value: Number(item.totalAmount) || 0,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      count: item.transactionCount || 0,
    }));
  }, [categorySummary]);

  const highestSpendingCategory = categoryData.length
    ? categoryData.reduce((highest, item) =>
        item.value > highest.value ? item : highest
      )
    : null;

  // Empty state
  const hasTransactions = transactions.length > 0;

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <RefreshCw
            size={30}
            className="mx-auto animate-spin text-violet-500"
          />
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Loading financial analytics...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-500/20 dark:bg-rose-500/10">
        <p className="font-semibold text-rose-600 dark:text-rose-400">
          Unable to load analytics
        </p>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {error}
        </p>

        <button
          type="button"
          onClick={fetchAnalytics}
          className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-7">

      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Understand your financial performance and spending patterns.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchAnalytics}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
        >
          <RefreshCw size={16} />
          Refresh Analytics
        </button>
      </div>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Income */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Income
            </p>

            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
              <TrendingUp size={21} />
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-emerald-500">
            {formatCurrency(totalIncome)}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            All recorded income
          </p>
        </div>

        {/* Expenses */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Expenses
            </p>

            <div className="rounded-xl bg-rose-500/10 p-3 text-rose-500">
              <TrendingDown size={21} />
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-rose-500">
            {formatCurrency(totalExpenses)}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            All recorded expenses
          </p>
        </div>

        {/* Balance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Net Balance
            </p>

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <Wallet size={21} />
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(totalBalance)}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Income minus expenses
          </p>
        </div>

        {/* Savings Rate */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Savings Rate
            </p>

            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-500">
              <PiggyBank size={21} />
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
            {savingsRate.toFixed(1)}%
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Remaining balance / income
          </p>
        </div>
      </section>

      {/* No Data Message */}
      {!hasTransactions && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-slate-900">
          <ChartNoAxesCombined
            size={34}
            className="mx-auto text-violet-500"
          />

          <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
            No financial data yet
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add some income and expense transactions to see your analytics.
          </p>
        </div>
      )}

      {/* Charts */}
      {hasTransactions && (
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Monthly Income vs Expenses */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900 sm:p-7 xl:col-span-2">
            <div className="mb-7">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Income vs Expenses
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Actual financial activity over the last 6 months
              </p>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="analyticsIncomeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#8B5CF6"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="#8B5CF6"
                        stopOpacity={0}
                      />
                    </linearGradient>

                    <linearGradient
                      id="analyticsExpenseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#3B82F6"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="#3B82F6"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#94A3B8"
                    opacity={0.2}
                  />

                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tickFormatter={formatCompactCurrency}
                    tick={{ fill: "#94A3B8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <Legend />

                  <Area
                    type="monotone"
                    dataKey="income"
                    name="Income"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    fill="url(#analyticsIncomeGradient)"
                  />

                  <Area
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    fill="url(#analyticsExpenseGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900 sm:p-7">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Expense Breakdown
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Actual spending by category
              </p>
            </div>

            {categoryData.length > 0 ? (
              <>
                <div className="h-[230px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        stroke="none"
                      >
                        {categoryData.map((entry) => (
                          <Cell
                            key={entry.name}
                            fill={entry.color}
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        formatter={(value) => formatCurrency(value)}
                      />

                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 space-y-3">
                  {categoryData.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor: category.color,
                          }}
                        />

                        <span className="truncate text-slate-600 dark:text-slate-300">
                          {category.name}
                        </span>
                      </div>

                      <span className="shrink-0 font-semibold text-slate-900 dark:text-white">
                        {formatCurrency(category.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex h-[230px] items-center justify-center text-center text-sm text-slate-500 dark:text-slate-400">
                No expense category data available.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Spending Insight */}
      {hasTransactions && (
        <section className="rounded-2xl border border-violet-200/60 bg-gradient-to-r from-violet-50 to-blue-50 p-6 dark:border-violet-500/20 dark:from-violet-500/10 dark:to-blue-500/10 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-600 dark:text-violet-400">
              <ChartNoAxesCombined size={23} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Your Financial Insight
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {highestSpendingCategory
                  ? `${highestSpendingCategory.name} is your highest recorded expense category, with spending of ${formatCurrency(highestSpendingCategory.value)}.`
                  : "Add expense transactions to discover your highest spending category."}
              </p>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default Analytics;
