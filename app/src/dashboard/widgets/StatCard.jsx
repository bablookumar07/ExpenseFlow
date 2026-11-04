
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from "lucide-react";

const StatCard = ({
  title = "Total Balance",
  amount = "₹0",
  change = "0%",
  description = "Compared to last month",
  icon: Icon = Wallet,
  variant = "violet",
  trend = "up",
}) => {
  const styles = {
    violet: {
      icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      glow: "hover:border-violet-300 dark:hover:border-violet-500/40",
    },
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      glow: "hover:border-emerald-300 dark:hover:border-emerald-500/40",
    },
    rose: {
      icon: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      glow: "hover:border-rose-300 dark:hover:border-rose-500/40",
    },
    blue: {
      icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      glow: "hover:border-blue-300 dark:hover:border-blue-500/40",
    },
  };

  const selectedStyle = styles[variant] || styles.violet;
  const isPositive = trend === "up";

  return (
    <div
      className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900 dark:hover:shadow-black/20 ${selectedStyle.glow}`}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${selectedStyle.icon}`}>
          <Icon size={21} />
        </div>
      </div>

      {/* Amount */}
      <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        {amount}
      </h3>

      {/* Trend */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {change}
        </span>

        <span className="text-xs text-slate-400 dark:text-slate-500">
          {description}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
