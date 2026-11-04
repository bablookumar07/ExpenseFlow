
import { useOutletContext } from "react-router-dom";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { Tags } from "lucide-react";

import { formatCurrency } from "../../utils/currencyUtils";

const CategoryBreakdown = ({ data = [] }) => {
  const { currency, exchangeRates } = useOutletContext();

  const total = data.reduce(
    (sum, category) => sum + Number(category.amount || 0),
    0
  );

  const rateAvailable =
    currency === "INR" ||
    (typeof exchangeRates?.[currency] === "number" &&
      Number.isFinite(exchangeRates[currency]));

  const formatAmount = (amount) => {
    if (!rateAvailable) return "—";

    return formatCurrency(amount, currency, exchangeRates);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Expense Categories
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Where your money goes
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
          <Tags size={20} />
        </div>
      </div>

      {/* Doughnut Chart */}
      {data.length > 0 && total > 0 ? (
        <>
          <div className="relative mt-5 h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  stroke="none"
                >
                  {data.map((category) => (
                    <Cell
                      key={category.name}
                      fill={category.color || "#8B5CF6"}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => formatAmount(value)}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total Expenses
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                {formatAmount(total)}
              </p>
            </div>
          </div>

          {/* Category List */}
          <div className="mt-5 space-y-4">
            {data.map((category) => {
              const percentage = (category.amount / total) * 100;

              return (
                <div key={category.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor: category.color || "#8B5CF6",
                        }}
                      />

                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {category.name}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {formatAmount(category.amount)}
                      </span>

                      <span className="ml-2 text-xs text-slate-400">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: category.color || "#8B5CF6",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <Tags size={30} className="text-slate-400" />

          <p className="mt-3 font-semibold text-slate-700 dark:text-slate-300">
            No expenses available
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Add expenses to see your category breakdown.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryBreakdown;
