import React from "react";
import SettingsSidebar from "./../components/Settings/SettingsSidebar";
import { Outlet } from "react-router-dom";

const SettingsLayout = () => {
  return (
    <div className="flex h-full">
      <SettingsSidebar />
      <main className="w-full px-6 bg-black rounded-r-xl">
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsLayout;
