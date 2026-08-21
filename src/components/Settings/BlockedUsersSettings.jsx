import React from "react";

const BlockedUsersSettings = () => {
  return (
    <div className="w-full max-w-2xl">
      {/* Heading */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-heading-text">
          Blocked Users
        </h1>
        <p className="mt-1 text-xs text-subtext">
          You can block people anytime from their profiles.
        </p>
      </div>

      <hr className="my-5 border-border-color" />
      <div className="flex flex-col gap-1">
        {Array(2)
          .fill()
          .map((_, i) => (
            <>
              <div className="flex items-baseline justify-between" key={i}>
                {/* Avatar / Username / Name */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10">
                    <img
                      src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                      alt="ahad.shk.0"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-semibold leading-tight tracking-tight truncate cursor-pointer text-hover-blue hover:underline">
                      ahad.shk.0
                    </p>
                    <span className="text-xs text-subtext truncate mt-0.5">
                      Muhammad Ahad
                    </span>
                  </div>
                </div>

                {/* Action Buttons (Block & Unblock) */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="py-2 px-3 bg-warning hover:bg-warning-hover active:scale-[0.98] text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer w-18"
                  >
                    Block
                  </button>

                  <button
                    type="button"
                    className="py-2 px-3 bg-brand-accent hover:bg-hover-blue active:scale-[0.98] text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer w-18"
                  >
                    Unblock
                  </button>
                </div>
              </div>
              <hr className="my-1 border-gray-100" />
            </>
          ))}
      </div>
    </div>
  );
};

export default BlockedUsersSettings;
