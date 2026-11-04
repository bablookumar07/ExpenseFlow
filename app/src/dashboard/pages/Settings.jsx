
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  ShieldCheck,
  LockKeyhole,
  Trash2,
  Save,
  Eye,
  EyeOff,
  AlertTriangle,
  Loader2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const {
    user,
    updateProfile,
    changePassword,
    deleteAccount,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [deletePassword, setDeletePassword] = useState("");

  const [showPasswords, setShowPasswords] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [profileMessage, setProfileMessage] = useState({
    type: "",
    text: "",
  });

  const [passwordMessage, setPasswordMessage] = useState({
    type: "",
    text: "",
  });

  const [deleteMessage, setDeleteMessage] = useState("");

  // Keep form synchronized with authenticated user
  useEffect(() => {
    setProfile({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user]);

  const getErrorMessage = (error) =>
    error.response?.data?.message ||
    error.message ||
    "Something went wrong. Please try again.";

  // Update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    setProfileMessage({ type: "", text: "" });

    if (!profile.name.trim() || !profile.email.trim()) {
      setProfileMessage({
        type: "error",
        text: "Name and email are required.",
      });
      return;
    }

    try {
      setLoading(true);

      await updateProfile({
        name: profile.name.trim(),
        email: profile.email.trim(),
      });

      setProfileMessage({
        type: "success",
        text: "Profile updated successfully!",
      });
    } catch (error) {
      setProfileMessage({
        type: "error",
        text: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    setPasswordMessage({ type: "", text: "" });

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setPasswordMessage({
        type: "error",
        text: "Please fill in all password fields.",
      });
      return;
    }

    if (passwords.newPassword.length < 8) {
      setPasswordMessage({
        type: "error",
        text: "New password must contain at least 8 characters.",
      });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "New password and confirmation do not match.",
      });
      return;
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      setPasswordMessage({
        type: "success",
        text: "Password changed successfully. Please login again.",
      });

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // End the current session after password change
      setTimeout(() => {
        logout();
        navigate("/login", { replace: true });
      }, 1500);
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (!deletePassword) {
      setDeleteMessage("Please enter your password.");
      return;
    }

    const confirmed = window.confirm(
      "Are you absolutely sure? Your account and all transactions will be permanently deleted."
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setDeleteMessage("");

      await deleteAccount(deletePassword);

      navigate("/login", { replace: true });
    } catch (error) {
      setDeleteMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  const buttonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60";

  const messageClass = (type) =>
    `mt-4 rounded-xl px-4 py-3 text-sm ${
      type === "success"
        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
        : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
    }`;

  return (
    <div className="min-h-screen space-y-8 p-4 text-slate-900 dark:text-white sm:p-6 lg:p-8">

      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <ShieldCheck size={20} />
          <span className="text-sm font-semibold">Account Management</span>
        </div>

        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage your personal information and account security.
        </p>
      </div>

      {/* Account Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
            <UserRound size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold">Account Settings</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Update your personal information.
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              maxLength={50}
              required
              className={inputClass}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              required
              className={inputClass}
              placeholder="Enter your email address"
            />
          </div>

          <button type="submit" disabled={loading} className={buttonClass}>
            {loading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}
            Save Changes
          </button>

          {profileMessage.text && (
            <p className={messageClass(profileMessage.type)}>
              {profileMessage.text}
            </p>
          )}
        </form>
      </section>

      {/* Security Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <LockKeyhole size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold">Security Settings</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Keep your account secure by updating your password.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-5">
          {[
            {
              label: "Current Password",
              name: "currentPassword",
              placeholder: "Enter current password",
            },
            {
              label: "New Password",
              name: "newPassword",
              placeholder: "Enter new password",
            },
            {
              label: "Confirm New Password",
              name: "confirmPassword",
              placeholder: "Confirm new password",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-2 block text-sm font-medium">
                {field.label}
              </label>

              <div className="relative">
                <input
                  type={showPasswords ? "text" : "password"}
                  value={passwords[field.name]}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      [field.name]: e.target.value,
                    })
                  }
                  placeholder={field.placeholder}
                  autoComplete="off"
                  required
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  aria-label={
                    showPasswords ? "Hide passwords" : "Show passwords"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600"
                >
                  {showPasswords ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>
          ))}

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Your new password must contain at least 8 characters.
            You will be asked to login again after changing it.
          </p>

          <button type="submit" disabled={loading} className={buttonClass}>
            {loading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <LockKeyhole size={17} />
            )}
            Update Password
          </button>

          {passwordMessage.text && (
            <p className={messageClass(passwordMessage.type)}>
              {passwordMessage.text}
            </p>
          )}
        </form>
      </section>

      {/* Danger Zone */}
      <section className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm dark:border-red-500/30 dark:bg-slate-900 sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-red-100 p-3 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <AlertTriangle size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-red-600 dark:text-red-400">
              Danger Zone
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Permanently remove your account and associated data.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold">Delete Account</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              All your transactions will also be deleted.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowDeleteForm(!showDeleteForm);
              setDeleteMessage("");
              setDeletePassword("");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10"
          >
            <Trash2 size={17} />
            Delete Account
          </button>
        </div>

        {showDeleteForm && (
          <form
            onSubmit={handleDeleteAccount}
            className="mt-6 space-y-4 rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-500/20 dark:bg-red-500/5"
          >
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              This action is permanent and cannot be undone.
            </p>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm your password
              </label>

              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter your current password"
                required
                autoComplete="current-password"
                className={inputClass}
              />
            </div>

            {deleteMessage && (
              <p className={messageClass("error")}>{deleteMessage}</p>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Trash2 size={17} />
                )}
                Permanently Delete
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDeleteForm(false);
                  setDeletePassword("");
                  setDeleteMessage("");
                }}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default Settings;
