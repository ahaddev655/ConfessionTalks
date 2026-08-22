import { Link, NavLink, useNavigate } from "react-router-dom";
import { PiHouse, PiHouseFill } from "react-icons/pi";
import { LuSquarePlay } from "react-icons/lu";
import { AiFillPlaySquare } from "react-icons/ai";
import {
  IoChatbubbleOutline,
  IoChatbubbleSharp,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import {
  Menu,
  Settings,
  Moon,
  Bookmark,
  LogOut,
  ShieldAlert,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const MainSidebar = () => {
  // ---- Variables ----
  const navigate = useNavigate();
  const id = localStorage.getItem("cota_id");

  // ---- UseStates ----
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState(null);
  // ---- Functions ----
  const handleLogout = () => {
    localStorage.removeItem("ct_id");
    navigate("/");
  };

  // ---- Arrays ----
  const links = [
    { path: "/en", icon: PiHouse, filledIcon: PiHouseFill, label: "Home" },
    {
      path: "/reels",
      icon: LuSquarePlay,
      filledIcon: AiFillPlaySquare,
      label: "Reels",
    },
    {
      path: "/en/messages",
      icon: IoChatbubbleOutline,
      filledIcon: IoChatbubbleSharp,
      label: "Messages",
    },
    {
      path: "/en/create",
      icon: Plus,
      filledIcon: Plus,
      label: "Create",
    },
  ];

  const dropdownItems = [
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      onClick: () => navigate("/en/settings"),
    },
    {
      id: "saved",
      label: "Saved",
      icon: Bookmark,
      onClick: () => console.log("Saved clicked"),
    },
    {
      id: "report",
      label: "Report a Problem",
      icon: ShieldAlert,
      onClick: () => console.log("Report clicked"),
    },
    {
      id: "logout",
      label: "Log Out",
      icon: LogOut,
      danger: true,
      onClick: handleLogout,
    },
  ];

  // ---- API Configuration ----
  const getDetails = () => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((response) => {
        const data = response?.data.user_details;
        setUserData({
          fname: data.fname,
          lname: data.lname,
          username: data.username,
          profilePic: data.profilePic,
        });
      })
      .catch((error) => {});
  };

  // ---- useEffects ----
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <aside className="sticky top-0 flex-col hidden w-full h-screen px-4 py-6 border-r shadow-xl select-none md:flex max-w-65 shrink-0 bg-primary-dark border-white/10">
      {/* Brand Header */}
      <div className="px-2 pb-5">
        <Link to="/en" className="block">
          <h1 className="text-2xl font-black tracking-tight text-white transition-opacity whitespace-nowrap hover:opacity-90">
            Confession<span className="text-brand-accent">Talks</span>
          </h1>
        </Link>
      </div>

      <div className="w-full h-px mb-4 bg-white/10" />

      {/* Main Navigation Links */}
      <nav className="flex-1 space-y-1">
        {links.map((item, i) => {
          const Icon = item.icon;
          const FilledIcon = item.filledIcon;

          return (
            <NavLink
              key={i}
              end
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "text-white bg-hover-blue font-semibold shadow-sm"
                    : "text-subtext hover:text-white hover:bg-hover-blue/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Left Accent Bar for Active State */}
                  {isActive && (
                    <span className="absolute left-0 w-1 h-5 -translate-y-1/2 rounded-r-full top-1/2 bg-brand-accent" />
                  )}

                  {isActive ? (
                    <FilledIcon size={22} className="text-white shrink-0" />
                  ) : (
                    <Icon
                      size={22}
                      className="transition-colors shrink-0 text-subtext group-hover:text-white"
                    />
                  )}

                  <span className="text-sm font-medium tracking-wide">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
        <div className="relative w-full">
          {/* Pop-up Dropdown Menu positioned above the trigger button */}
          {toggle && (
            <div className="absolute top-12.5 left-0 mb-2 w-full min-w-50 p-1.5 bg-[#121927] border border-slate-800 rounded-2xl shadow-2xl z-50 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
              <div className="flex flex-col gap-0.5">
                {dropdownItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        item.onClick();
                        setToggle(false);
                      }}
                      className={`flex items-center w-full gap-3 px-3.5 py-2.5 text-xs font-medium rounded-xl transition-all duration-150 ${
                        item.danger
                          ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                          : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          item.danger ? "text-red-400" : "text-slate-400"
                        }
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Main Trigger Button */}
          <button
            type="button"
            className={`relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 w-full ${
              toggle
                ? "text-white bg-hover-blue font-semibold shadow-sm"
                : "text-subtext hover:text-white hover:bg-hover-blue/50"
            }`}
            onClick={() => setToggle(!toggle)}
          >
            <Menu size={20} />
            <span className="text-sm font-medium tracking-wide">More</span>
          </button>
        </div>
      </nav>

      {/* Footer Section */}
      <div className="pt-4 mt-auto space-y-3 border-t border-white/10">
        {/* Profile Card / Link */}
        <NavLink
          to="/en/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 group ${
              isActive ? "bg-white/10 ring-1 ring-white/20" : "hover:bg-white/5"
            }`
          }
        >
          <div className="relative shrink-0">
            <img
              src={
                userData?.profilePic ||
                "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
              }
              alt="User avatar"
              className="object-cover transition-all rounded-full w-9 h-9 ring-2 ring-white/20 group-hover:ring-white/40"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-primary-dark" />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate transition-colors group-hover:text-white">
              {userData?.fname + " " + userData?.lname || "Unkown"}
            </span>
            <span className="text-xs truncate text-subtext">
              @{userData?.username || "unknown"}
            </span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default MainSidebar;
