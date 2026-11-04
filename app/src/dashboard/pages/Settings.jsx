
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import {
  User,
  Palette,
  IndianRupee,
  Bell,
  ShieldCheck,
  Settings as SettingsIcon,
  Sun,
  Moon,
  Check,
  CalendarDays,
} from "lucide-react";

const sections = [
  {
    id: "account",
    title: "Account Settings",
    description: "Manage your personal account information.",
    icon: User,
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Customize your dashboard experience.",
    icon: Palette,
  },
  {
    id: "currency",
    title: "Currency",
    description: "Choose your preferred display currency.",
    icon: IndianRupee,
  },
  {
  id: "preferences",
  title: "Preferences",
  description: "Customize date, language and regional settings.",
  icon: CalendarDays,
},
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage your notification preferences.",
    icon: Bell,
  },
  {
    id: "security",
    title: "Privacy & Security",
    description: "Manage your account security.",
    icon: ShieldCheck,
  },
];

const Settings = () => {
  const {
    theme,
    toggleTheme,
    currency,
    updateCurrency,
  } = useOutletContext();

  const isDark = theme === "dark";

  const [activeSection, setActiveSection] = useState("account");

  const [notifications, setNotifications] = useState(
    () => localStorage.getItem("expenseflow-notifications") !== "false"
  );
  
  // Load saved preferences
const [dateFormat, setDateFormat] = useState(
  () => localStorage.getItem("expenseflow-date-format") || "DD/MM/YYYY"
);

const [weekStartsOn, setWeekStartsOn] = useState(
  () => localStorage.getItem("expenseflow-week-start") || "Monday"
);

const [language, setLanguage] = useState(
  () => localStorage.getItem("expenseflow-language") || "English"
);

  const [savedMessage, setSavedMessage] = useState("");

  // Save notification preferences
  // Save notification and general preferences
const handleSave = () => {
  if (activeSection === "notifications") {
    localStorage.setItem(
      "expenseflow-notifications",
      String(notifications)
    );

    setSavedMessage("Notification preferences saved successfully!");
  }

  if (activeSection === "preferences") {
    localStorage.setItem("expenseflow-date-format", dateFormat);
    localStorage.setItem("expenseflow-week-start", weekStartsOn);
    localStorage.setItem("expenseflow-language", language);

    setSavedMessage("Preferences saved successfully!");
  }

  setTimeout(() => {
    setSavedMessage("");
  }, 2500);
};

  // Settings content
  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <>
            <h2 className="text-lg font-semibold">Account Settings</h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage your personal account information.
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 p-5 dark:border-slate-800">
              <p className="font-medium">Personal Information</p>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Profile management will be available after connecting
                account authentication.
              </p>
            </div>
          </>
        );

      case "appearance":
        return (
          <>
            <h2 className="text-lg font-semibold">Appearance</h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Customize how ExpenseFlow looks on your device.
            </p>

            <div className="mt-6">
              <h3 className="mb-4 text-sm font-semibold">
                Choose Theme
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    if (isDark) toggleTheme();
                  }}
                  className={`rounded-xl border p-5 text-left transition ${
                    !isDark
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-500/10"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Sun size={25} className="text-amber-500" />

                    {!isDark && (
                      <Check size={19} className="text-purple-600" />
                    )}
                  </div>

                  <p className="mt-4 font-semibold">Light Mode</p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Clean and bright appearance.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!isDark) toggleTheme();
                  }}
                  className={`rounded-xl border p-5 text-left transition ${
                    isDark
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Moon size={25} className="text-violet-500" />

                    {isDark && (
                      <Check size={19} className="text-purple-500" />
                    )}
                  </div>

                  <p className="mt-4 font-semibold">Dark Mode</p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Comfortable dark appearance.
                  </p>
                </button>
              </div>

              <p className="mt-4 text-xs text-emerald-600 dark:text-emerald-400">
                Theme changes are applied immediately and saved automatically.
              </p>
            </div>
          </>
        );

      case "currency":
        return (
          <>
            <h2 className="text-lg font-semibold">Currency Settings</h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Select your preferred currency for ExpenseFlow.
            </p>

            <div className="mt-6">
              <label className="mb-3 block text-sm font-medium">
                Preferred Currency
              </label>

              <select
                value={currency}
                onChange={(e) => {
                  updateCurrency(e.target.value);
                  setSavedMessage("Currency preference updated!");
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="INR">INR - Indian Rupee (₹)</option>
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
              </select>

              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Your preference is saved automatically.
              </p>

              {savedMessage && (
                <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">
                  {savedMessage}
                </p>
              )}
            </div>
          </>
        );

        case "preferences":
  return (
    <>
      <h2 className="text-lg font-semibold">Preferences</h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Customize your regional and display preferences.
      </p>

      <div className="mt-6 space-y-6">
        {/* Date Format */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Date Format
          </label>

          <select
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        {/* Week Start */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Week Starts On
          </label>

          <select
            value={weekStartsOn}
            onChange={(e) => setWeekStartsOn(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="Monday">Monday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="English">English</option>
          </select>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            More languages will be available in future updates.
          </p>
        </div>
      </div>
    </>
  );

      case "notifications":
        return (
          <>
            <h2 className="text-lg font-semibold">Notifications</h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage your notification preferences.
            </p>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 p-5 dark:border-slate-800">
              <div>
                <p className="font-medium">
                  Application Notifications
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Enable or disable application notifications.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setNotifications((prev) => !prev);
                  setSavedMessage("");
                }}
                aria-label="Toggle notifications"
                aria-pressed={notifications}
                className={`relative h-6 w-11 rounded-full transition ${
                  notifications ? "bg-purple-600" : "bg-slate-400"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    notifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </>
        );

      case "security":
        return (
          <>
            <h2 className="text-lg font-semibold">
              Privacy & Security
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage your account privacy and security.
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 p-5 dark:border-slate-800">
              <p className="font-medium">Security Settings</p>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Password management and security features will be
                connected with backend authentication.
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const showSaveButton =
  activeSection === "notifications" ||
  activeSection === "preferences";

  return (
    <div className="min-h-screen space-y-8 p-4 text-slate-900 dark:text-white sm:p-6 lg:p-8">

      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <SettingsIcon size={20} />
          <span className="text-sm font-semibold">Preferences</span>
        </div>

        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage your account and customize your ExpenseFlow experience.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Settings Navigation */}
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  setActiveSection(section.id);
                  setSavedMessage("");
                }}
                aria-pressed={isActive}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  isActive
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-slate-200 bg-white hover:border-purple-400 dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <div className="rounded-xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                  <Icon size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">{section.title}</h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {section.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="min-h-[400px] rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">

          {renderContent()}

          {showSaveButton && (
            <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Save Preferences
              </button>

              {savedMessage && (
                <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">
                  {savedMessage}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
