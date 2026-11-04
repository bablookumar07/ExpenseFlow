
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from "lucide-react";

const overviewCards = [
  {
    title: "Total Balance",
    amount: "₹84,250",
    change: "+12.8%",
    positive: true,
    icon: Wallet,
    iconStyle: "bg-violet-500/10 text-violet-500",
  },
  {
    title: "Total Income",
    amount: "₹1,25,000",
    change: "+8.2%",
    positive: true,
    icon: TrendingUp,
    iconStyle: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Total Expenses",
    amount: "₹40,750",
    change: "-4.5%",
    positive: true,
    icon: TrendingDown,
    iconStyle: "bg-rose-500/10 text-rose-500",
  },
  {
    title: "Savings Rate",
    amount: "67.4%",
    change: "+6.3%",
    positive: true,
    icon: PieChart,
    iconStyle: "bg-blue-500/10 text-blue-500",
  },
];

const monthlyData = [
  { month: "Jan", income: 65, expense: 40 },
  { month: "Feb", income: 78, expense: 48 },
  { month: "Mar", income: 70, expense: 43 },
  { month: "Apr", income: 90, expense: 55 },
  { month: "May", income: 82, expense: 46 },
  { month: "Jun", income: 100, expense: 58 },
];

const categories = [
  { name: "Housing", amount: "₹12,000", percent: 75, color: "bg-violet-500" },
  { name: "Food", amount: "₹8,500", percent: 55, color: "bg-blue-500" },
  { name: "Transport", amount: "₹5,200", percent: 35, color: "bg-emerald-500" },
  { name: "Shopping", amount: "₹4,000", percent: 25, color: "bg-amber-500" },
];

const LandingAnalytics = () => {
  return (
    <section
      id="analytics"
      className="relative overflow-hidden bg-slate-50 px-5 py-24 dark:bg-slate-950 sm:px-8 lg:px-10"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-600 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400">
            <BarChart3 size={16} />
            Smart Financial Insights
          </span>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Your Money,{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              Visualized Better.
            </span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
            Get a clear picture of your financial health. Track income,
            understand expenses and monitor savings with meaningful insights.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-violet-500/5 dark:border-white/10 dark:bg-slate-900 sm:p-7 lg:p-9">
          {/* Preview Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Financial Overview
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                A preview of your financial dashboard
              </p>
            </div>

            <span className="w-fit rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 dark:border-white/10 dark:text-slate-300">
              Sample Monthly Data
            </span>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {overviewCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-800/60"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {card.title}
                    </span>
                    <div className={`rounded-xl p-3 ${card.iconStyle}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h4 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                    {card.amount}
                  </h4>

                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-500">
                    <ArrowUpRight size={15} />
                    {card.change}
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      vs last month
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Income vs Expense Chart */}
            <div className="rounded-2xl border border-slate-200 p-5 dark:border-white/10 lg:col-span-3">
              <h4 className="font-bold text-slate-900 dark:text-white">
                Income vs Expenses
              </h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Monthly financial comparison
              </p>

              <div className="mt-8 flex h-52 items-end justify-around gap-3 border-b border-slate-200 dark:border-white/10">
                {monthlyData.map((item) => (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="flex h-[85%] w-full items-end justify-center gap-1">
                      <div
                        className="w-3 rounded-t-md bg-violet-500 sm:w-5"
                        style={{ height: `${item.income}%` }}
                      />
                      <div
                        className="w-3 rounded-t-md bg-blue-500 sm:w-5"
                        style={{ height: `${item.expense}%` }}
                      />
                    </div>
                    <span className="pb-2 text-xs text-slate-500">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-center gap-6">
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="h-2.5 w-2.5 rounded-sm bg-violet-500" />
                  Income
                </span>
                <span className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
                  Expenses
                </span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="rounded-2xl border border-slate-200 p-5 dark:border-white/10 lg:col-span-2">
              <h4 className="font-bold text-slate-900 dark:text-white">
                Spending Breakdown
              </h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Expenses by category
              </p>

              <div className="mt-8 space-y-6">
                {categories.map((category) => (
                  <div key={category.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-300">
                        {category.name}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {category.amount}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full ${category.color}`}
                        style={{ width: `${category.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
                <div className="flex items-center gap-2 text-sm font-semibold text-violet-700 dark:text-violet-300">
                  <ArrowDownRight size={17} />
                  Spending Insights
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  Understand where your money goes and make smarter financial
                  decisions.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            Illustrative dashboard preview — sample figures, not actual user data.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingAnalytics;
