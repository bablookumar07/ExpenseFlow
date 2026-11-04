
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/70 bg-white/70 text-slate-700 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-yellow-400 dark:hover:bg-white/10"
    >
      {isDark ? (
        <Sun size={19} />
      ) : (
        <Moon size={19} />
      )}
    </button>
  );
};

export default ThemeToggle;
