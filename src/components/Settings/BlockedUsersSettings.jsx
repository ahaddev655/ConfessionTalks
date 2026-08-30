import React, { useState } from "react";

const BlockedUsersSettings = () => {
  // ---- Mock Data State ----
  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: 1,
      username: "ahad.shk.0",
      fullName: "Muhammad Ahad",
      avatar:
        "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
    },
    {
      id: 2,
      username: "sarah_dev",
      fullName: "Sarah Jenkins",
      avatar:
        "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
    },
  ]);

  // ---- Handlers ----
  const handleUnblock = (userId) => {
    setBlockedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId),
    );
  };

  return (
    <div className="w-full max-w-2xl px-4 py-6 mx-auto sm:px-6">
      {/* Heading */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-heading-text">
          Blocked Users
        </h1>
        <p className="text-xs sm:text-sm text-subtext">
          You can block people anytime from their profile or manage them here.
        </p>
      </div>

      <hr className="my-5 border-border-color" />

      {/* User List Container */}
      <div className="flex flex-col w-full divide-y divide-gray-100">
        {blockedUsers.length > 0 ? (
          blockedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-3 py-3"
            >
              {/* Avatar / Username / Name */}
              <div className="flex items-center min-w-0 gap-3 pr-2">
                <div className="w-10 h-10 shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="object-cover w-full h-full rounded-full ring-1 ring-slate-200"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-semibold leading-tight truncate cursor-pointer text-hover-blue hover:underline">
                    {user.username}
                  </p>
                  <span className="text-xs text-subtext truncate mt-0.5">
                    {user.fullName}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => handleUnblock(user.id)}
                  className="py-1.5 px-3 sm:px-4 text-xs font-semibold rounded-lg shadow-sm transition-all duration-200 active:scale-95 bg-brand-accent hover:bg-hover-blue text-white"
                >
                  Unblock
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="py-8 text-center">
            <p className="text-xs sm:text-sm text-subtext">
              You haven't blocked any users yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockedUsersSettings;
