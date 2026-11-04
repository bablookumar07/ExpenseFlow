
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Wallet,
  LayoutDashboard,
  ArrowLeftRight,
  ChartNoAxesCombined,
  Tags,
  FileBarChart,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    title: "MAIN MENU",
    items: [
      { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
      { name: "Transactions", icon: ArrowLeftRight, path: "/dashboard/transactions" },
      { name: "Analytics", icon: ChartNoAxesCombined, path: "/dashboard/analytics" },
      { name: "Categories", icon: Tags, path: "/dashboard/categories" },
      { name: "Reports", icon: FileBarChart, path: "/dashboard/reports" },
    ],
  },
  {
    title: "PREFERENCES",
    items: [
      { name: "Settings", icon: Settings, path: "/dashboard/settings" },
    ],
  },
];

const Sidebar = ({ activePage = "Overview", theme = "light" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const isDark = theme === "dark";

  return (
    <aside
      className={`relative flex h-screen shrink-0 flex-col border-r transition-all duration-300 ${
        isDark
          ? "border-white/10 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-900"
      } ${collapsed ? "w-[88px]" : "w-[260px]"}`}
    >
      {/* Brand */}
      <div
        className={`flex h-20 items-center justify-between border-b px-5 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 shadow-lg shadow-violet-500/20">
            <Wallet size={22} className="text-white" />
          </div>

          {!collapsed && (
            <span className="whitespace-nowrap text-xl font-bold tracking-tight">
              Expense<span className="text-violet-500">Flow</span>
            </span>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`hidden rounded-lg p-2 transition lg:block ${
            isDark
              ? "text-slate-400 hover:bg-white/10 hover:text-white"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-7">
        {navigation.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <p
                className={`mb-4 px-3 text-[10px] font-bold tracking-[0.18em] ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {group.title}
              </p>
            )}

            <div className="space-y-2">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.name;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => navigate(item.path)}
                    title={collapsed ? item.name : undefined}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-violet-500/10 text-violet-500 dark:bg-gradient-to-r dark:from-violet-600/20 dark:to-blue-600/10 dark:text-violet-300"
                        : isDark
                          ? "text-slate-400 hover:bg-white/5 hover:text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    } ${collapsed ? "justify-center" : ""}`}
                  >
                    {isActive && (
                      <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-violet-500" />
                    )}

                    <Icon size={20} className="shrink-0" />

                    {!collapsed && (
                      <>
                        <span>{item.name}</span>

                        {isActive && (
                          <ChevronRight
                            size={16}
                            className="ml-auto text-violet-500"
                          />
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Bottom */}
      <div
        className={`border-t p-4 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div
          className={`rounded-xl bg-gradient-to-br p-4 ${
            isDark
              ? "from-violet-600/20 to-blue-600/10"
              : "from-violet-100 to-blue-100"
          } ${collapsed ? "flex justify-center" : ""}`}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/20 text-violet-500">
            <Wallet size={19} />
          </div>

          {!collapsed && (
            <>
              <p className="mt-3 text-sm font-semibold">
                Manage your money
              </p>

              <p
                className={`mt-1 text-xs leading-5 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Track your finances in one place.
              </p>
            </>
          )}
        </div>

        {!collapsed && (
          <p
            className={`mt-4 text-center text-[10px] ${
              isDark ? "text-slate-600" : "text-slate-400"
            }`}
          >
            ExpenseFlow © {new Date().getFullYear()}
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
