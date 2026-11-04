
import { useMemo, useState } from "react";

import {
  Search,
  Tags,
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
} from "lucide-react";

import useTransactions from "../../hooks/useTransactions";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

const categoryColors = [
  "bg-violet-500/10 text-violet-500",
  "bg-blue-500/10 text-blue-500",
  "bg-emerald-500/10 text-emerald-500",
  "bg-amber-500/10 text-amber-500",
  "bg-rose-500/10 text-rose-500",
  "bg-cyan-500/10 text-cyan-500",
];

const Categories = () => {
  const {
    transactions,
    loading,
    error,
    refetchTransactions,
  } = useTransactions();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Group transactions by category and type
  const categories = useMemo(() => {
    const grouped = {};

    transactions.forEach((transaction) => {
      const name = transaction.category?.trim() || "Other";
      const type = transaction.type;

      if (!grouped[name]) {
        grouped[name] = {
          name,
          income: 0,
          expense: 0,
          incomeCount: 0,
          expenseCount: 0,
        };
      }

      const amount = Number(transaction.amount) || 0;

      if (type === "income") {
        grouped[name].income += amount;
        grouped[name].incomeCount += 1;
      }

      if (type === "expense") {
        grouped[name].expense += amount;
        grouped[name].expenseCount += 1;
      }
    });

    return Object.values(grouped).map((category) => ({
      ...category,
      total:
        category.income + category.expense,
      transactionCount:
        category.incomeCount + category.expenseCount,
    }));
  }, [transactions]);

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

  const totalExpenses = transactions
    .filter((item) => item.type === "expense")
    .reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

  // Filter categories
  const filteredCategories = useMemo(() => {
    let result = [...categories];

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((category) =>
        category.name.toLowerCase().includes(query)
      );
    }

    if (typeFilter === "income") {
      result = result.filter(
        (category) => category.incomeCount > 0
      );
    }

    if (typeFilter === "expense") {
      result = result.filter(
        (category) => category.expenseCount > 0
      );
    }

    return result.sort((a, b) => b.total - a.total);
  }, [categories, search, typeFilter]);

  const totalCategoryTransactions = categories.reduce(
    (sum, category) => sum + category.transactionCount,
    0
  );

  const handleRefresh = () => {
    refetchTransactions();
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-500/20 dark:bg-rose-500/10">
        <p className="font-semibold text-rose-600 dark:text-rose-400">
          Unable to load categories
        </p>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {error}
        </p>

        <button
          onClick={handleRefresh}
          className="mt-4 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-7">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Categories
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Understand where your money comes from and where it goes.
        </p>
      </div>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Categories
            </p>
            <Tags className="text-violet-500" size={21} />
          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
            {categories.length}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Income and expense categories
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Income
            </p>
            <TrendingUp className="text-emerald-500" size={21} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-emerald-500">
            {formatCurrency(totalIncome)}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Across all income categories
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Expenses
            </p>
            <TrendingDown className="text-rose-500" size={21} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-rose-500">
            {formatCurrency(totalExpenses)}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Across all expense categories
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Transactions
            </p>
            <Receipt className="text-blue-500" size={21} />
          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
            {totalCategoryTransactions}
          </h2>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Transactions across categories
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900 sm:p-6">

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-slate-950">
            <Search
              size={19}
              className="shrink-0 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-white"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="income">Income Categories</option>
            <option value="expense">Expense Categories</option>
          </select>
        </div>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          Showing {filteredCategories.length} categories
        </p>
      </section>

      {/* Category Cards */}
      <section>
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredCategories.map((category, index) => {
              const color =
                categoryColors[index % categoryColors.length];

              const expensePercentage =
                totalExpenses > 0
                  ? (category.expense / totalExpenses) * 100
                  : 0;

              const incomePercentage =
                totalIncome > 0
                  ? (category.income / totalIncome) * 100
                  : 0;

              return (
                <article
                  key={category.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900 sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className={`rounded-xl p-3 ${color}`}>
                      <Wallet size={22} />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-400">
                      {category.transactionCount} transactions
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                    {category.name}
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Income
                      </p>

                      <p className="mt-1 text-sm font-bold text-emerald-500">
                        {formatCurrency(category.income)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Expense
                      </p>

                      <p className="mt-1 text-sm font-bold text-rose-500">
                        {formatCurrency(category.expense)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-4 dark:border-white/10">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Total transaction value
                      </span>

                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {formatCurrency(category.total)}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-slate-500 dark:text-slate-400">
                            Expense share
                          </span>

                          <span className="font-medium text-rose-500">
                            {expensePercentage.toFixed(1)}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className="h-full rounded-full bg-rose-500 transition-all"
                            style={{
                              width: `${expensePercentage}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-slate-500 dark:text-slate-400">
                            Income share
                          </span>

                          <span className="font-medium text-emerald-500">
                            {incomePercentage.toFixed(1)}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className="h-full rounded-full bg-emerald-500 transition-all"
                            style={{
                              width: `${incomePercentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center dark:border-white/10 dark:bg-slate-900">
            <Tags
              size={34}
              className="mx-auto text-violet-500"
            />

            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
              No categories found
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Add transactions or change your search and filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Categories;
