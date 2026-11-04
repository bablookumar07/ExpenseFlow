
import { useState } from "react";
import {
  X,
  FileSpreadsheet,
  FileText,
  Printer,
  FileDown,
  CalendarDays,
  Download,
} from "lucide-react";

const formats = [
  {
    id: "excel",
    name: "Excel",
    description: "Spreadsheet with summary",
    icon: FileSpreadsheet,
    color: "text-emerald-500",
  },
  {
    id: "pdf",
    name: "PDF",
    description: "Professional financial report",
    icon: FileText,
    color: "text-red-500",
  },
  {
    id: "print",
    name: "Print",
    description: "Print or save as PDF",
    icon: Printer,
    color: "text-blue-500",
  },
  {
    id: "csv",
    name: "CSV",
    description: "Simple spreadsheet data",
    icon: FileDown,
    color: "text-violet-500",
  },
];

const ExportModal = ({
  isOpen,
  onClose,
  onExport,
  isExporting = false,
}) => {
  const [format, setFormat] = useState("excel");
  const [dateRange, setDateRange] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      dateRange === "custom" &&
      (!startDate || !endDate || startDate > endDate)
    ) {
      return;
    }

    await onExport({
      format,
      dateRange,
      startDate: dateRange === "custom" ? startDate : null,
      endDate: dateRange === "custom" ? endDate : null,
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  const selectedFormat = formats.find(
    (item) => item.id === format
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (
          e.target === e.currentTarget &&
          !isExporting
        ) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-7">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <Download size={22} />
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Export Transactions
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Download or print your financial records.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isExporting}
            aria-label="Close export modal"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Range */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white">
              <CalendarDays size={17} />
              Select Date Range
            </label>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              disabled={isExporting}
              className={inputClass}
            >
              <option value="all">All Transactions</option>
              <option value="month">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Date Range</option>
            </select>

            {dateRange === "custom" && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={startDate}
                    max={endDate || undefined}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    disabled={isExporting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    End Date
                  </label>

                  <input
                    type="date"
                    value={endDate}
                    min={startDate || undefined}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    disabled={isExporting}
                    className={inputClass}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Format */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-800 dark:text-white">
              Choose Export Format
            </label>

            <div className="grid grid-cols-2 gap-3">
              {formats.map((item) => {
                const Icon = item.icon;
                const selected = format === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={isExporting}
                    onClick={() => setFormat(item.id)}
                    aria-pressed={selected}
                    className={`rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-violet-500 bg-violet-50 ring-2 ring-violet-500/10 dark:bg-violet-500/10"
                        : "border-slate-200 hover:border-violet-300 dark:border-slate-700"
                    }`}
                  >
                    <Icon size={23} className={item.color} />

                    <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>

                    {selected && (
                      <p className="mt-2 text-xs font-semibold text-violet-600 dark:text-violet-400">
                        Selected
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isExporting}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isExporting}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Download size={17} />

              {isExporting
                ? "Preparing..."
                : format === "print"
                  ? "Open Print"
                  : `Download ${selectedFormat?.name}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExportModal;
