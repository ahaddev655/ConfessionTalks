import React from "react";
import SettingsSidebar from "./../components/Settings/SettingsSidebar";
import { Outlet } from "react-router-dom";

const SettingsLayout = () => {
  return (
    <div className="flex h-full max-w-4xl mx-auto border shadow-xl rounded-xl border-border-color">
      <SettingsSidebar />
      <main className="w-full p-6 bg-white rounded-r-xl">
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsLayout;
