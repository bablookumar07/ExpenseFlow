import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import useTheme from "./hooks/useTheme";
import { useAuth } from "./context/AuthContext";

import { getExchangeRates } from "./services/currencyService";

// Pages
import LandingPage from "./dashboard/pages/LandingPage";
import Login from "./dashboard/pages/Login";
import Register from "./dashboard/pages/Register";

// Dashboard Layout and Pages
import DashboardLayout from "./dashboard/layouts/DashboardLayout";
import Dashboard from "./dashboard/pages/Dashboard";
import Transactions from "./dashboard/pages/Transactions";
import AnalyticsPage from "./dashboard/pages/Analytics";
import Categories from "./dashboard/pages/Categories";
import Reports from "./dashboard/pages/Reports";
import Settings from "./dashboard/pages/Settings";
import Notifications from "./dashboard/pages/Notifications";

// Route Protection
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  // Currency
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("expenseflow-currency") || "INR";
  });

  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("expenseflow-currency", newCurrency);
  };

  // Date Format
  const [dateFormat, setDateFormat] = useState(() => {
    return localStorage.getItem("expenseflow-date-format") || "DD/MM/YYYY";
  });

  const updateDateFormat = (newDateFormat) => {
    setDateFormat(newDateFormat);
    localStorage.setItem("expenseflow-date-format", newDateFormat);
  };

  // Week Start
  const [weekStartsOn, setWeekStartsOn] = useState(() => {
    return localStorage.getItem("expenseflow-week-start") || "Monday";
  });

  const updateWeekStartsOn = (newValue) => {
    setWeekStartsOn(newValue);
    localStorage.setItem("expenseflow-week-start", newValue);
  };

  // Exchange Rates
  const [exchangeRates, setExchangeRates] = useState({ INR: 1 });
  const [ratesDate, setRatesDate] = useState(null);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesError, setRatesError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchRates = async () => {
      try {
        setRatesLoading(true);
        setRatesError("");

        const result = await getExchangeRates();

        if (isMounted) {
          setExchangeRates(result.rates);
          setRatesDate(result.date);
        }
      } catch (error) {
        console.error("Exchange rate error:", error);

        if (isMounted) {
          setRatesError(
            error.message || "Unable to fetch exchange rates."
          );
        }
      } finally {
        if (isMounted) {
          setRatesLoading(false);
        }
      }
    };

    fetchRates();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route
          path="/"
          element={
            <LandingPage
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        />

        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <DashboardLayout
                theme={theme}
                toggleTheme={toggleTheme}
                currency={currency}
                updateCurrency={updateCurrency}
                exchangeRates={exchangeRates}
                ratesDate={ratesDate}
                ratesLoading={ratesLoading}
                ratesError={ratesError}
                dateFormat={dateFormat}
                updateDateFormat={updateDateFormat}
                weekStartsOn={weekStartsOn}
                updateWeekStartsOn={updateWeekStartsOn}
                logout={logout}
              />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>

        {/* Unknown Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;