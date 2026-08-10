import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <MainSidebar />

      {/* Right Column: Main Content + Footer */}
      <div className="flex flex-col flex-1 h-screen min-w-0 overflow-auto">
        <main className="flex-1 w-full max-w-7xl">
          <Outlet />
        </main>
        <MainFooter />
      </div>
    </div>
  );
};

export default MainLayout;
