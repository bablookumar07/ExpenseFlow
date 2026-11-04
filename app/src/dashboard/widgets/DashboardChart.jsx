
import { useOutletContext } from "react-router-dom";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DashboardChart = ({ data = [] }) => {
  const { currency } = useOutletContext();

  const localeMap = {
    INR: "en-IN",
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
  };

  // Format already-converted chart values
  const formatAmount = (value) =>
    new Intl.NumberFormat(localeMap[currency] || "en-IN", {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(Number(value) || 0);

  const chartData = data.length
    ? data.map((item) => ({
        ...item,
        expenses: item.expenses ?? item.expense ?? 0,
      }))
    : [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-slate-800">
        <p className="mb-3 text-sm font-semibold text-slate-800 dark:text-white">
          {label}
        </p>

        {payload.map((item) => (
          <p
            key={item.dataKey}
            className="mt-1 text-xs font-medium"
            style={{ color: item.color }}
          >
            {item.name}: {formatAmount(item.value)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900">

      {/* Chart Header */}
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Income vs Expenses
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track your monthly financial activity
          </p>
        </div>

        <span className="w-fit rounded-lg bg-violet-500/10 px-3 py-2 text-xs font-semibold text-violet-600 dark:text-violet-400">
          Monthly Overview
        </span>
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="dashboardIncomeGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>

              <linearGradient
                id="dashboardExpenseGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#94A3B8"
              opacity={0.2}
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              tickFormatter={formatAmount}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", paddingBottom: "20px" }}
            />

            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#8B5CF6"
              strokeWidth={3}
              fill="url(#dashboardIncomeGradient)"
              activeDot={{ r: 6 }}
            />

            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#dashboardExpenseGradient)"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
