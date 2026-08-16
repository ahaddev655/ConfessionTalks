import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const MainLayout = () => {
  // ---- Variables ----
  const id = localStorage.getItem("cota_id");
  const navigate = useNavigate();

  // ---- UseStates ----
  const [loading, setLoading] = useState(true);

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
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      })
      .catch((error) => {
        toast.error(error?.response?.data.error || "Internal Server Error");
        setTimeout(() => {
          navigate("/");
        }, 2500);
      });
  }, []);

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
      {!loading ? (
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
      ) : (
        <div className="flex items-center justify-center h-screen gap-3">
          <div className="w-4 h-4 bg-brand-accent rounded-full animate-bounce animatep [animation-delay:-0.3s]" />
          <div className="w-4 h-4 bg-brand-accent rounded-full animate-bounce animatep [animation-delay:-0.15s]" />
          <div className="w-4 h-4 bg-brand-accent rounded-full animate-bounce animatep" />
        </div>
      )}
    </>
  );
};

export default MainLayout;
