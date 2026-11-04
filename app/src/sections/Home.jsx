
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Wallet,
  MoreHorizontal,
  ShoppingBag,
  Coffee,
  Car,
} from "lucide-react";

import { Link } from "react-router-dom";

const Home = () => {
  const transactions = [
    {
      title: "Shopping",
      category: "Personal",
      date: "Today",
      amount: "-₹2,500",
      icon: ShoppingBag,
      color: "bg-pink-500/10 text-pink-500",
    },
    {
      title: "Coffee",
      category: "Food & Drinks",
      date: "Today",
      amount: "-₹250",
      icon: Coffee,
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "Transport",
      category: "Travel",
      date: "Yesterday",
      amount: "-₹500",
      icon: Car,
      color: "bg-blue-500/10 text-blue-500",
    },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-50 pb-16 pt-32 dark:bg-slate-950"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-500/15 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/15 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">

        {/* Left Content */}
        <div className="text-center lg:text-left">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-300">
            <span className="h-2 w-2 rounded-full bg-violet-500" />
            Smart Personal Finance Management
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Take Control of

            <span className="block bg-gradient-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Your Money.
            </span>

            Build Your Future.
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-400">
            Track your income, manage expenses and understand your spending
            habits with a simple and intelligent personal finance tracker.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">

            {/* Register Button */}
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-4 font-semibold text-white shadow-xl shadow-violet-500/20 transition hover:-translate-y-1 hover:shadow-violet-500/40"
            >
              Get Started

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            {/* Login Button */}
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-300 bg-white/70 px-7 py-4 font-semibold text-violet-700 transition hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-50 dark:border-violet-400/30 dark:bg-white/5 dark:text-violet-300 dark:hover:bg-violet-500/10"
            >
              Login
            </Link>

            {/* Explore Features */}
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-7 py-4 font-semibold text-slate-800 transition hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-violet-400"
            >
              Explore Features

              <ArrowUpRight size={18} />
            </a>

          </div>

          {/* Highlights */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 lg:justify-start dark:text-slate-400">
            <span>✓ Easy Expense Tracking</span>
            <span>✓ Visual Analytics</span>
            <span>✓ Smart Insights</span>
          </div>

        </div>

        {/* Right Dashboard Preview */}
        <div className="relative mx-auto w-full max-w-xl">

          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-2xl" />

          <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-7 dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/30">

            {/* Dashboard Header */}
            <div className="mb-7 flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Balance
                </p>

                <h2 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                  ₹48,250
                </h2>
              </div>

              <button
                aria-label="Dashboard options"
                className="rounded-xl border border-slate-200 p-2 text-slate-500 dark:border-white/10 dark:text-slate-300"
              >
                <MoreHorizontal size={22} />
              </button>

            </div>

            {/* Income & Expense */}
            <div className="mb-7 grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">

                <div className="mb-3 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <TrendingUp size={18} />
                  <span className="text-sm font-medium">Income</span>
                </div>

                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  ₹65,000
                </p>

              </div>

              <div className="rounded-2xl border border-rose-200/60 bg-rose-50 p-4 dark:border-rose-500/20 dark:bg-rose-500/10">

                <div className="mb-3 flex items-center gap-2 text-rose-600 dark:text-rose-400">
                  <TrendingDown size={18} />
                  <span className="text-sm font-medium">Expenses</span>
                </div>

                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  ₹16,750
                </p>

              </div>

            </div>

            {/* Spending Overview */}
            <div className="mb-7 rounded-2xl border border-slate-200 p-4 dark:border-white/10">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Spending Overview
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Your weekly activity
                  </p>
                </div>

                <span className="rounded-lg bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-400">
                  This Week
                </span>

              </div>

              <div className="flex h-28 items-end justify-between gap-3">
                {[45, 75, 55, 90, 60, 80, 40].map((height, index) => (
                  <div
                    key={index}
                    className="flex h-full flex-1 items-end"
                  >
                    <div
                      className={`w-full rounded-t-lg ${
                        index === 3
                          ? "bg-gradient-to-t from-violet-600 to-blue-500"
                          : "bg-violet-200 dark:bg-violet-500/30"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-400">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <span key={index}>{day}</span>
                ))}
              </div>

            </div>

            {/* Recent Transactions */}
            <div>

              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Recent Transactions
                </h3>

                <span className="text-xs font-medium text-violet-600 dark:text-violet-400">
                  View All
                </span>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => {
                  const Icon = transaction.icon;

                  return (
                    <div
                      key={transaction.title}
                      className="flex items-center justify-between"
                    >

                      <div className="flex items-center gap-3">

                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${transaction.color}`}
                        >
                          <Icon size={19} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white">
                            {transaction.title}
                          </p>

                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {transaction.category} · {transaction.date}
                          </p>
                        </div>

                      </div>

                      <p className="text-sm font-semibold text-slate-800 dark:text-white">
                        {transaction.amount}
                      </p>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Floating Badge */}
            <div className="absolute -right-3 -top-5 hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:flex dark:border-white/10 dark:bg-slate-800">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                <Wallet size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Financial Overview
                </p>

                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  All in one place
                </p>
              </div>

            </div>

            <div className="absolute -bottom-4 -left-3 hidden rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-xl sm:block dark:border-emerald-500/20 dark:bg-slate-800">

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly savings
              </p>

              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                +₹12,500
              </p>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Home;
