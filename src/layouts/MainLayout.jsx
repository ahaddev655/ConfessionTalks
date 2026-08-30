import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const MainLayout = () => {
  // ---- Variables ----
  const id = localStorage.getItem("cota_id");
  const navigate = useNavigate();

  // ---- UseEffects ----
  useEffect(() => {
    if (!id || id === null) {
      toast.error("ID not found");
      setTimeout(() => {
        navigate("/");
      }, 2500);
      return;
    }

    axios
      .get(`http://localhost:3000/api/auth/verify/${id}`, {
        withCredentials: true,
      })
      .then((response) => {})
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Internal Server Error");
        navigate("/");
      });
  }, [id, navigate]);

  return (
    <>
      <ToastContainer
        autoClose={1500}
        theme="light"
        closeButton={false}
        hideProgressBar
        position="bottom-right"
        limit={5}
      />
      <div className="flex h-screen overflow-hidden">
        {/* Fixed Sidebar */}
        <MainSidebar />

        {/* Right Column: Main Content + Footer */}
        <div className="flex flex-col flex-1 h-screen min-w-0 overflow-auto">
          <main className="flex-1 w-full p-6 max-w-7xl">
            <Outlet />
          </main>
          <MainFooter />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
