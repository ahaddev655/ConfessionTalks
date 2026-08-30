import React from "react";
import {
  Ban,
  Bell,
  LifeBuoy,
  Lock,
  Shield,
  User,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SettingsSidebar = () => {
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
    <div className="flex flex-col justify-between h-full p-2 bg-white border-r select-none sm:p-3 w-fit shrink-0 rounded-l-xl md:w-65 border-slate-200/80">
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

        <div className="hidden w-full h-px mb-2 bg-slate-100 md:block" />

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
                      <span className="absolute left-0 w-1 h-4 -translate-y-1/2 bg-blue-600 rounded-r-full top-1/2" />
                    )}

                    <div className="flex items-center justify-center min-w-0 gap-3 mx-auto md:justify-start md:mx-0">
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
        </nav>
      </div>

      {/* Footer Branding */}
      <div className="hidden px-3 py-2 mt-auto border-t border-slate-100 md:block">
        <span className="text-[11px] font-medium text-slate-400">
          ConfessionTalks v1.0
        </span>
      </div>
    </div>
  );
};

export default SettingsSidebar;
