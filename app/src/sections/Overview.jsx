
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
} from "lucide-react";

const Overview = () => {
  const stats = [
    {
      title: "Total Balance",
      amount: "₹48,250",
      change: "+12.5%",
      description: "Compared to last month",
      icon: Wallet,
      color: "violet",
      positive: true,
    },
    {
      title: "Total Income",
      amount: "₹65,000",
      change: "+8.2%",
      description: "Compared to last month",
      icon: TrendingUp,
      color: "emerald",
      positive: true,
    },
    {
      title: "Total Expenses",
      amount: "₹16,750",
      change: "-4.3%",
      description: "Compared to last month",
      icon: TrendingDown,
      color: "rose",
      positive: true,
    },
    {
      title: "Monthly Savings",
      amount: "₹12,500",
      change: "+15.8%",
      description: "Compared to last month",
      icon: PiggyBank,
      color: "blue",
      positive: true,
    },
  ];

  const colorStyles = {
    violet: {
      icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      border: "hover:border-violet-300 dark:hover:border-violet-500/40",
    },
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      border: "hover:border-emerald-300 dark:hover:border-emerald-500/40",
    },
    rose: {
      icon: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      border: "hover:border-rose-300 dark:hover:border-rose-500/40",
    },
    blue: {
      icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      border: "hover:border-blue-300 dark:hover:border-blue-500/40",
    },
  };

  return (
    <section
      id="overview"
      className="relative overflow-hidden bg-white py-24 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
            <CalendarDays size={16} />
            Financial Overview
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Your Finances,
            <span className="block bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              At a Glance.
            </span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
            Get a clear picture of your financial health. Monitor your
            balance, income, expenses and savings from one simple dashboard.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const styles = colorStyles[stat.color];

            return (
              <div
                key={stat.title}
                className={`group rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/60 dark:hover:shadow-black/20 ${styles.border}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon}`}>
                    <Icon size={23} />
                  </div>

                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {stat.change}
                    {stat.positive ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                  </span>
                </div>

                <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {stat.amount}
                </h3>

                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Information */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-50 to-blue-50 p-7 dark:border-violet-500/20 dark:from-violet-500/10 dark:to-blue-500/10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <PiggyBank size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Your Savings Progress
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Monthly savings target
                </p>
              </div>
            </div>

            <div className="mt-7 flex items-end justify-between">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                ₹12,500
              </p>
              <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                62.5%
              </p>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-violet-200 dark:bg-white/10">
              <div className="h-full w-[62.5%] rounded-full bg-gradient-to-r from-violet-600 to-blue-500" />
            </div>

            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              ₹7,500 more to reach your ₹20,000 savings goal.
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-slate-950/60">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Financial Insight
              </p>

              <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                You're building better money habits!
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                Your sample spending is lower than the previous month.
                Keep tracking your expenses and stay consistent with your
                savings goals.
              </p>
            </div>

            <a
              href="#analytics"
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-violet-600 transition hover:gap-3 dark:text-violet-400"
            >
              Explore Analytics
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
