
import { Plus, CalendarDays, Download } from "lucide-react";

const DashboardHeader = ({ onAddTransaction, onExport }) => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      {/* Welcome Message */}
      <div>
        <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
          Welcome back!
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          Financial Overview
        </h2>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <CalendarDays size={16} />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-violet-400"
        >
          <Download size={17} />
          Export
        </button>

        <button
          type="button"
          onClick={onAddTransaction}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/40"
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
