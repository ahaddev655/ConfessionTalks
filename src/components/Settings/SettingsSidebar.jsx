import React, { useState } from "react";
import {
  Ban,
  Bell,
  LifeBuoy,
  Lock,
  Shield,
  User,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const SettingsSidebar = () => {
  const [activeTab, setActiveTab] = useState("profile");

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

  return (
    <div className="flex flex-col justify-between w-full h-full p-3 bg-white border-r select-none rounded-l-xl max-w-65 border-slate-200/80">
      <div>
        {/* Sidebar Header */}
        <div className="px-3 py-2.5 mb-2">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your account preferences
          </p>
        </div>

        <div className="w-full h-px mb-2 bg-slate-100" />

        {/* Navigation List mapped from configuration */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <Link to={item.link}>
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`group relative flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 outline-none ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center min-w-0 gap-3">
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.2 : 1.75}
                      className={`shrink-0 transition-colors duration-200 ${
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <ChevronRight
                    size={14}
                    className={`shrink-0 transition-transform duration-200 ${
                      isActive
                        ? "text-blue-600 translate-x-0.5"
                        : "text-slate-300 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Branding */}
      <div className="px-3 py-2 mt-auto border-t border-slate-100">
        <span className="text-[11px] font-medium text-slate-400">
          ConfessionTalks v1.0
        </span>
      </div>
    </div>
  );
};

export default SettingsSidebar;
