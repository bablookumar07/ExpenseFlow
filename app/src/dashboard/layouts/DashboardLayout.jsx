
import { useState, useEffect } from "react";
import {
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { X } from "lucide-react";

import Sidebar from "../widgets/Sidebar";
import Topbar from "../widgets/Topbar";

const DashboardLayout = ({
  theme,
  toggleTheme,
  currency,
  updateCurrency,
  exchangeRates,
  ratesDate,
  ratesLoading,
  ratesError,
  dateFormat,
  updateDateFormat,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getActivePage = () => {
    const path = location.pathname;

    if (path.endsWith("/transactions")) return "Transactions";
    if (path.endsWith("/analytics")) return "Analytics";
    if (path.endsWith("/categories")) return "Categories";
    if (path.endsWith("/reports")) return "Reports";
    if (path.endsWith("/settings")) return "Settings";
    if (path.endsWith("/notifications")) return "Notifications";

    return "Overview";
  };

  const activePage = getActivePage();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavigation = (page) => {
    const routes = {
      Overview: "/dashboard",
      Transactions: "/dashboard/transactions",
      Analytics: "/dashboard/analytics",
      Categories: "/dashboard/categories",
      Reports: "/dashboard/reports",
      Settings: "/dashboard/settings",
      Notifications: "/dashboard/notifications",
    };

    navigate(routes[page] || "/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigation}
          theme={theme}
        />
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <aside className="absolute inset-y-0 left-0">
            <div className="relative h-full">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute right-3 top-5 z-10 rounded-lg p-2 text-white hover:bg-white/10"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>

              <Sidebar
                activePage={activePage}
                onNavigate={handleNavigation}
                theme={theme}
              />
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-screen lg:pl-[260px]">
        <Topbar
          title={activePage}
          theme={theme}
          toggleTheme={toggleTheme}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet
              context={{
                theme,
                toggleTheme,
                currency,
                updateCurrency,
                exchangeRates,
                ratesDate,
                ratesLoading,
                ratesError,
                dateFormat,
                updateDateFormat,
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
