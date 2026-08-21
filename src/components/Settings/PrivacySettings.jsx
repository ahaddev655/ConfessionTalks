import React, { useState } from "react";

const PrivacySettings = () => {
  const [isPrivate, setIsPrivate] = useState(true);
  return (
    <div className="">
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="text-sm font-semibold text-heading-text">
            Private Account
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={"private"}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
            isPrivate ? "bg-brand-accent" : "bg-slate-300"
          }`}
          onClick={() => setIsPrivate(!isPrivate)}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
              isPrivate ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xs text-subtext">
          When your account is public, your profile and posts can be seen by
          anyone, on or off ConfessionTalks, even if they don't have an ConfessionTalks
          account.
        </p>
        <p className="mt-3 text-xs text-subtext">
          When your account is private, only the followers you approve can see
          what you share, including your photos or videos on hashtag and
          location pages, and your followers and following lists. Certain info
          on your profile, like your profile picture and username, is visible to
          everyone on and off ConfessionTalks.
        </p>
      </div>
    </div>
  );
};

export default PrivacySettings;
