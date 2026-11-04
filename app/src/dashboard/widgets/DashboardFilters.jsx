
import { useState } from "react";
import { CalendarDays, RotateCcw } from "lucide-react";

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const currentDate = new Date();

const getSavedFilters = () => {
  try {
    const saved = localStorage.getItem("expenseflow-filters");

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load saved filters:", error);
  }

  return {
    month: String(currentDate.getMonth() + 1),
    year: String(currentDate.getFullYear()),
  };
};

const DashboardFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState(getSavedFilters);

  const { month, year } = filters;

  const currentYear = currentDate.getFullYear();

  const years = Array.from(
    { length: 6 },
    (_, index) => currentYear - index
  );

  const applyFilters = (updatedFilters) => {
    setFilters(updatedFilters);

    localStorage.setItem(
      "expenseflow-filters",
      JSON.stringify(updatedFilters)
    );

    onFilterChange?.({
      month: updatedFilters.month
        ? Number(updatedFilters.month)
        : undefined,
      year: updatedFilters.year
        ? Number(updatedFilters.year)
        : undefined,
    });
  };

  const handleMonthChange = (value) => {
    applyFilters({
      ...filters,
      month: value,
    });
  };

  const handleYearChange = (value) => {
    applyFilters({
      ...filters,
      year: value,
    });
  };

  const handleReset = () => {
    applyFilters({
      month: "",
      year: "",
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-slate-900">

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
          <CalendarDays size={20} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Financial Period
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Filter your financial records
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Month */}
        <select
          value={month}
          onChange={(event) => handleMonthChange(event.target.value)}
          aria-label="Select month"
          className="min-w-32 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-slate-950 dark:text-white"
        >
          <option value="">All months</option>

          {months.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {/* Year */}
        <select
          value={year}
          onChange={(event) => handleYearChange(event.target.value)}
          aria-label="Select year"
          className="min-w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-slate-950 dark:text-white"
        >
          <option value="">All years</option>

          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Reset */}
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-violet-400"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default DashboardFilters;
