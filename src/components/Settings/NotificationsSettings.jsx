import React, { useState } from "react";

const NotificationsSettings = () => {
  // ---- UseStates ----
  const [notificationsData, setNotificationsData] = useState({
    news: false,
    support: false,
    product: false,
    reminder: false,
  });

  // ---- Arrays ----
  const notifications = [
    {
      id: notificationsData.news,
      key: "news",
      label: "News Emails",
      description: "Learn about new ConfessionTalks features.",
    },
    {
      id: notificationsData.support,
      key: "support",
      label: "Support Emails",
      description:
        "Get updates on reports and violations of our Community Standards.",
    },
    {
      id: notificationsData.product,
      key: "product",
      label: "Product Emails",
      description: "Get tips and resources about Instagram's tools.",
    },
    {
      id: notificationsData.reminder,
      key: "reminder",
      label: "Reminder Emails",
      description: "Get notifications you may have missed.",
    },
  ];

  // ---- Handler ----
  const handleCheckInput = (key) => {
    setNotificationsData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <div className="w-full max-w-2xl">
      {/* Heading */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-heading-text">
          Notifications
        </h1>
        <p className="mt-1 text-xs text-subtext">
          Manage your notifications with your will here.
        </p>
      </div>

      <hr className="my-5 border-border-color" />

      {/* Content */}
      <div>
        {/* Notifications Container */}
        <div className="flex flex-col w-full gap-1">
          {notifications.map((notification, i) => (
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-semibold text-heading-text">
                  {notification.label}
                </p>
                <p className="text-xs text-subtext">
                  {notification.description}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={notification.id}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
                  notification.id ? "bg-brand-accent" : "bg-slate-300"
                }`}
                onClick={() => handleCheckInput(notification.key)}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                    notification.id ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-5 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition-all duration-200 active:scale-95"
          >
            Reset Defaults
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-brand-accent hover:bg-hover-blue rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;
