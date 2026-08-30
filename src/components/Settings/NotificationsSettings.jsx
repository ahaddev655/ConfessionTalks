import React, { useState } from "react";

const NotificationsSettings = () => {
  // ---- Initial State ----
  const defaultSettings = {
    news: false,
    support: false,
    product: false,
    reminder: false,
  };

  // ---- UseStates ----
  const [notificationsData, setNotificationsData] = useState(defaultSettings);

  // ---- Notifications Array Configuration ----
  const notifications = [
    {
      isChecked: notificationsData.news,
      key: "news",
      label: "News Emails",
      description: "Learn about new ConfessionTalks features.",
    },
    {
      isChecked: notificationsData.support,
      key: "support",
      label: "Support Emails",
      description:
        "Get updates on reports and violations of our Community Standards.",
    },
    {
      isChecked: notificationsData.product,
      key: "product",
      label: "Product Emails",
      description: "Get tips and resources about ConfessionTalks tools.",
    },
    {
      isChecked: notificationsData.reminder,
      key: "reminder",
      label: "Reminder Emails",
      description: "Get notifications you may have missed.",
    },
  ];

  // ---- Handlers ----
  const handleCheckInput = (key) => {
    setNotificationsData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleResetDefaults = () => {
    setNotificationsData(defaultSettings);
  };

  return (
    <div className="w-full max-w-2xl px-4 py-6 mx-auto sm:px-6">
      {/* Heading */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-heading-text">
          Notifications
        </h1>
        <p className="text-xs sm:text-sm text-subtext">
          Manage your email notification preferences here.
        </p>
      </div>

      <hr className="my-5 border-border-color" />

      {/* Content */}
      <div className="space-y-6">
        {/* Notifications Container */}
        <div className="flex flex-col w-full divide-y divide-border-color/50">
          {notifications.map((notification) => (
            <div key={notification.key} className="py-4 space-y-1.5">
              {/* Header & Toggle Row */}
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-heading-text">
                  {notification.label}
                </p>

                {/* Toggle Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={notification.isChecked}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
                    notification.isChecked ? "bg-brand-accent" : "bg-slate-300"
                  }`}
                  onClick={() => handleCheckInput(notification.key)}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                      notification.isChecked ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Separate Description */}
              <div>
                <p className="text-xs leading-relaxed text-subtext">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="w-full px-5 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition-all duration-200 active:scale-95 sm:w-auto"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            className="w-full px-5 py-2.5 text-xs font-semibold text-white bg-brand-accent hover:bg-hover-blue rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;
