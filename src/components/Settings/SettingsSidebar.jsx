import React, { useState } from "react";
import {
  Ban,
  Bell,
  LifeBuoy,
  Lock,
  Shield,
  User,
  ChevronRight,
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SettingsSidebar = () => {
  // ---- Variables ----
  const id = localStorage.getItem("cota_id");
  const navigate = useNavigate();

  // ---- UseStates ----
  const [accountDelete, setAccountDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---- Arrays ----
  const navItems = [
    { id: "profile", label: "Edit Profile", icon: User, link: "/en/settings/" },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      link: "/en/settings/notifications",
    },
    {
      id: "privacy",
      label: "Account Privacy",
      icon: Lock,
      link: "/en/settings/privacy",
    },
    {
      id: "blocked",
      label: "Blocked Users",
      icon: Ban,
      link: "/en/settings/blocked",
    },
    {
      id: "help",
      label: "Help Center",
      icon: LifeBuoy,
      link: "/en/settings/help",
    },
    {
      id: "privacy-center",
      label: "Privacy Center",
      icon: Shield,
      link: "/en/settings/privacy-center",
    },
  ];

  // ---- Functions ----
  const handleAccDelete = () => {
    if (!id) {
      alert("ID not found");
      return;
    }

    axios
      .delete(
        `${import.meta.env.VITE_LOCAL_API_URL}/user/delete-account/${id}`,
        { withCredentials: true },
      )
      .then((response) => {
        setAccountDelete(false);
        navigate("/");
        localStorage.removeItem("cota_id");
      })
      .catch((error) => {
        alert(
          "Error: ",
          error?.response?.data?.error || "Internal Server Error",
        );
      });
  };

  return (
    <>
      {/* Main Content */}
      <div className="flex flex-col justify-between p-2 h-full bg-white rounded-l-xl border-r select-none sm:p-3 w-fit shrink-0 md:w-65 border-slate-200/80">
        <div>
          {/* Sidebar Header */}
          <div className="hidden px-3 py-2.5 mb-2 md:block">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Settings
            </h1>
            <p className="mt-0.5 text-xs text-slate-500">
              Manage your account preferences
            </p>
          </div>

          <div className="hidden mb-2 w-full h-px bg-slate-100 md:block" />

          {/* Navigation List mapped from configuration */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.link}
                  end={item.link === "/en/settings/"}
                  title={item.label}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between w-full p-2.5 md:px-3.5 md:py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 outline-none ${
                      isActive
                        ? "bg-blue-50 text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Left Active Accent Bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 w-1 h-4 bg-blue-600 rounded-r-full -translate-y-1/2" />
                      )}

                      <div className="flex gap-3 justify-center items-center mx-auto min-w-0 md:justify-start md:mx-0">
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2.2 : 1.75}
                          className={`shrink-0 transition-colors duration-200 ${
                            isActive
                              ? "text-blue-600"
                              : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        />
                        <span className="hidden truncate md:block">
                          {item.label}
                        </span>
                      </div>

                      <ChevronRight
                        size={14}
                        className={`shrink-0 hidden md:block transition-transform duration-200 ${
                          isActive
                            ? "text-blue-600 translate-x-0.5"
                            : "text-slate-300 opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
            <button
              onClick={() => setAccountDelete(true)}
              className="flex items-center w-full gap-3 px-3.5 py-2.5 text-xs font-medium rounded-xl transition-all duration-150 bg-red-500/10 text-red-400 shadow-sm mt-3"
            >
              <Ban
                size={18}
                strokeWidth={1.75}
                className="text-red-400 transition-colors duration-200 shrink-0"
              />
              <span className="hidden truncate md:block">Delete Account</span>
            </button>
          </nav>
        </div>

        {/* Footer Branding */}
        <div className="hidden px-3 py-2 mt-auto border-t border-slate-100 md:block">
          <span className="text-[11px] font-medium text-slate-400">
            ConfessionTalks v1.0
          </span>
        </div>
      </div>

      {/* Acc Delete Confirmation Modal */}
      {accountDelete && (
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4 backdrop-blur-sm bg-black/50 animate-fade-in">
          <div className="overflow-hidden relative w-full max-w-md bg-white rounded-2xl border shadow-2xl transition-all scale-100 border-slate-100">
            {/* Close Icon Button */}
            <button
              onClick={() => setAccountDelete(false)}
              type="button"
              className="absolute top-4 right-4 p-1 rounded-lg transition-colors text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X size={18} />
            </button>

            <div className="p-6">
              {/* Warning Icon Badge */}
              <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 text-red-600 bg-red-50 rounded-full border border-red-100">
                <AlertTriangle size={24} />
              </div>

              {/* Heading & Subtext */}
              <div className="space-y-2 text-center">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Delete Account
                </h2>
                <p className="mx-auto max-w-xs text-sm font-normal leading-relaxed text-slate-500">
                  Are you sure you want to delete your account? This action is
                  permanent and cannot be undone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 items-center mt-6">
                <button
                  type="button"
                  onClick={() => setAccountDelete(false)}
                  disabled={loading}
                  className="w-1/2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAccDelete}
                  disabled={loading}
                  className="w-1/2 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm hover:shadow shadow-red-500/20 transition-all duration-150 active:scale-95 disabled:opacity-50"
                >
                  <Trash2 size={15} />
                  {loading ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsSidebar;
