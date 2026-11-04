
import { useState } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
  Wallet,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  CheckCircle2,
  Filter,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "Transaction Added",
    message: "Your transaction 'Grocery Shopping' was added successfully.",
    type: "success",
    date: "Today",
    time: "10:30 AM",
    read: false,
  },
  {
    id: 2,
    title: "Expense Alert",
    message: "Your monthly expense has reached 75% of your planned budget.",
    type: "warning",
    date: "Today",
    time: "09:15 AM",
    read: false,
  },
  {
    id: 3,
    title: "Income Recorded",
    message: "Your salary transaction has been recorded successfully.",
    type: "income",
    date: "Yesterday",
    time: "04:20 PM",
    read: true,
  },
  {
    id: 4,
    title: "Transaction Updated",
    message: "Your transaction 'Electricity Bill' was updated.",
    type: "info",
    date: "Yesterday",
    time: "01:45 PM",
    read: true,
  },
  {
    id: 5,
    title: "Expense Recorded",
    message: "A new expense transaction has been added to your account.",
    type: "expense",
    date: "2 days ago",
    time: "11:10 AM",
    read: true,
  },
];

const iconStyles = {
  success: {
    icon: CheckCircle2,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-500 bg-amber-500/10",
  },
  income: {
    icon: TrendingUp,
    color: "text-emerald-500 bg-emerald-500/10",
  },
  expense: {
    icon: TrendingDown,
    color: "text-rose-500 bg-rose-500/10",
  },
  info: {
    icon: Info,
    color: "text-blue-500 bg-blue-500/10",
  },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("All");

  const unreadCount = notifications.filter((item) => !item.read).length;

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "Unread") return !item.read;
    if (activeFilter === "Read") return item.read;
    return true;
  });

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen space-y-7 p-4 text-slate-900 dark:text-white sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <Bell size={20} />
            <span className="text-sm font-semibold">Activity Center</span>
          </div>

          <h1 className="text-3xl font-bold">Notifications</h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Stay updated with your ExpenseFlow activities.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium transition hover:border-purple-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700"
          >
            <CheckCheck size={17} />
            Mark all as read
          </button>

          <button
            type="button"
            onClick={clearAll}
            disabled={notifications.length === 0}
            className="flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-3 text-sm font-medium text-rose-500 transition hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-40 dark:border-rose-500/20"
          >
            <Trash2 size={17} />
            Clear all
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Notifications
            </p>
            <Bell className="text-purple-500" size={20} />
          </div>
          <h2 className="mt-3 text-3xl font-bold">
            {notifications.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Unread
            </p>
            <Info className="text-blue-500" size={20} />
          </div>
          <h2 className="mt-3 text-3xl font-bold">{unreadCount}</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Read
            </p>
            <CheckCircle2 className="text-emerald-500" size={20} />
          </div>
          <h2 className="mt-3 text-3xl font-bold">
            {notifications.length - unreadCount}
          </h2>
        </div>
      </div>

      {/* Notification List */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your latest account updates and alerts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={17} className="text-slate-400" />
            {["All", "Unread", "Read"].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  activeFilter === filter
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => {
              const Icon = iconStyles[item.type].icon;

              return (
                <div
                  key={item.id}
                  className={`flex gap-4 p-5 transition hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                    !item.read ? "bg-purple-50/40 dark:bg-purple-500/5" : ""
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconStyles[item.type].color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{item.title}</h3>

                      {!item.read && (
                        <span className="h-2 w-2 rounded-full bg-purple-500" />
                      )}
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {item.message}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {item.date} · {item.time}
                    </p>
                  </div>

                  {!item.read && (
                    <button
                      type="button"
                      onClick={() => markAsRead(item.id)}
                      className="shrink-0 self-center rounded-lg px-3 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-500/10 dark:text-purple-400"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="rounded-2xl bg-purple-500/10 p-5 text-purple-500">
                <Wallet size={30} />
              </div>
              <h3 className="mt-4 font-semibold">No notifications found</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                You're all caught up. Nothing to show here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
