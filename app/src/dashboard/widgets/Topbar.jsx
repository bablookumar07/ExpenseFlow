
import { useEffect, useRef, useState } from "react";

import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  UserRound,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Topbar = ({
  theme = "light",
  toggleTheme,
  onMenuClick,
  title = "Overview",
}) => {
  const isDark = theme === "dark";

  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const userName = user?.name || "User";

  const userInitial = userName.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Notifications
  const handleNotifications = () => {
    if (location.pathname === "/dashboard/notifications") {
      navigate(location.state?.from || "/dashboard");
    } else {
      navigate("/dashboard/notifications", {
        state: { from: location.pathname },
      });
    }
  };

  // Navigate to profile settings
  const handleProfile = () => {
    setDropdownOpen(false);
    navigate("/dashboard/settings");
  };

  // Logout
  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/70 bg-white/80 px-5 backdrop-blur-xl sm:px-8 dark:border-white/10 dark:bg-slate-900/80">

      {/* Left: Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-white/10"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>

          <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
            Welcome back! Here's your financial overview.
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Search */}
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 md:flex dark:border-white/10 dark:bg-white/5">
          <Search size={17} className="text-slate-400" />

          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search dashboard"
            className="w-36 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 lg:w-48 dark:text-white"
          />

          <kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400 dark:border-white/10">
            /
          </kbd>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-yellow-400 dark:hover:bg-white/10"
        >
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={handleNotifications}
          aria-label="Open notifications"
          title="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-purple-600 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-purple-400"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500 dark:border-slate-900" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>

          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="User profile menu"
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100 dark:hover:bg-white/5"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-sm font-bold text-white">
              {userInitial}
            </div>

            {/* User Details */}
            <div className="hidden text-left sm:block">
              <p className="max-w-[120px] truncate text-sm font-semibold text-slate-800 dark:text-white">
                {userName}
              </p>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Personal Account
              </p>
            </div>

            <ChevronDown
              size={15}
              className={`hidden text-slate-400 transition-transform duration-200 sm:block ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30"
            >
              {/* Profile Option */}
              <button
                type="button"
                role="menuitem"
                onClick={handleProfile}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-purple-50 dark:hover:bg-purple-500/10"
              >
                <UserRound
                  size={18}
                  className="text-slate-500 dark:text-slate-400"
                />

                <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Your Profile
                </span>

                <ArrowUpRight
                  size={16}
                  className="text-slate-400"
                />
              </button>

              <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

              {/* Logout Option */}
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <LogOut size={18} className="text-red-500" />

                <span className="flex-1 text-sm font-medium text-red-600 dark:text-red-400">
                  Logout
                </span>

                <ArrowUpRight
                  size={16}
                  className="text-red-400"
                />
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;
