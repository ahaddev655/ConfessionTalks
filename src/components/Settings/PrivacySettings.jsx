import React, { useEffect, useState } from "react";
import axios from "axios";

const PrivacySettings = () => {
  // ---- Variables ----
  const userId = localStorage.getItem("cota_id");

  // ---- UseStates ----
  const [isPrivate, setIsPrivate] = useState(true);

  // ---- Handlers ----
  const handleResetDefaults = () => {
    fetchPrivacySettings();
  };

  // ---- Functions ----
  const fetchPrivacySettings = () => {
    axios
      .get(`http://localhost:3000/api/user/${userId}`)
      .then((response) => {
        const data = response.data.user_details;

        setIsPrivate(Boolean(data?.privateAccount));
      })
      .catch((error) => {
        console.error("Error fetching privacy details:", error);
        alert(
          error?.response?.data?.error || "Error fetching privacy details.",
        );
      });
  };

  const updatePrivacySettings = () => {
    axios
      .put(`http://localhost:3000/api/user/update-privacy-settings/${userId}`, {
        isPrivate,
      })
      .then((response) => {
        console.log("Privacy settings updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating privacy settings:", error);
      });
  };
  // ---- useEffects ----
  useEffect(() => {
    fetchPrivacySettings();
  }, []);

  return (
    <div className="w-full max-w-2xl px-4 py-6 mx-auto sm:px-6">
      {/* Heading */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-heading-text">
          Account Privacy
        </h1>
        <p className="text-xs sm:text-sm text-subtext">
          Manage who can see your profile and content.
        </p>
      </div>

      <hr className="my-5 border-border-color" />

      {/* Main Content Container */}
      <div className="space-y-6">
        {/* Toggle Option Box */}
        <div className="py-2 space-y-3">
          {/* Header & Toggle Switch Row */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-heading-text">
              Private Account
            </p>

            <button
              type="button"
              role="switch"
              aria-checked={isPrivate}
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

          {/* Descriptive Information */}
          <div className="pt-1 space-y-3 text-xs leading-relaxed text-subtext">
            <p>
              When your account is public, your profile and posts can be seen by
              anyone, on or off ConfessionTalks, even if they don't have an
              account.
            </p>
            <p>
              When your account is private, only the followers you approve can
              see what you share, including your photos or videos on hashtag and
              location pages, and your followers and following lists. Certain
              info on your profile, like your profile picture and username,
              remains visible to everyone on and off ConfessionTalks.
            </p>
          </div>
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
            onClick={updatePrivacySettings}
            className="w-full px-5 py-2.5 text-xs font-semibold text-white bg-brand-accent hover:bg-hover-blue rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
