import { PiHouse, PiHouseFill, PiBellLight } from "react-icons/pi";
import { FaBell } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuSquarePlay, LuUser } from "react-icons/lu";
import {
  IoChatbubbleSharp,
  IoSearchOutline,
  IoSearchSharp,
  IoChatbubbleOutline,
} from "react-icons/io5";
import { AiFillPlaySquare } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

const MainSidebar = () => {
  // --- Variables ----
  const navigate = useNavigate();

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
    // {
    //   path: "/en/notifications",
    //   icon: PiBellLight,
    //   filledIcon: FaBell,
    //   label: "Notifications",
    // },
  ];

  // ---- Log Out Handler ----
  const handleLogout = () => {
    localStorage.removeItem("ct_id");
    navigate("/");
  };

  return (
    <aside className="flex-col hidden w-full h-full px-4 py-4 md:flex max-w-65 shrink-0 bg-primary-dark">
      <h1 className="text-2xl font-black tracking-tight text-center text-white whitespace-nowrap">
        Confession<span className="text-brand-accent">Talks</span>
      </h1>

      <div className="w-full h-px my-3 bg-white/20" />

      {/* Links */}
      <ul className="space-y-1">
        {links.map((item, i) => {
          return (
            <li key={i}>
              <NavLink
                end
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "text-white bg-hover-blue"
                      : "text-subtext hover:text-white hover:bg-hover-blue"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <item.filledIcon size={18} strokeWidth={2.5} />
                    ) : (
                      <item.icon size={18} strokeWidth={1.5} />
                    )}
                    <span className="text-sm font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
        <li>
          <Link
            to={"/en/profile"}
            className="flex items-center gap-3 p-3 transition-colors duration-200 rounded-lg text-subtext hover:text-white hover:bg-hover-blue"
          >
            <img
              src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
              alt="User avatar"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium">Profile</span>
          </Link>
        </li>
      </ul>

      <div className="pt-4 mt-auto">
        <button
          onClick={handleLogout}
          type="button"
          className="flex items-center justify-center w-full gap-2 p-3 font-medium transition-colors border rounded-lg bg-warning-hover/15 border-warning text-warning-hover hover:bg-warning-hover/20"
        >
          <FiLogOut size={18} strokeWidth={1.5} />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default MainSidebar;
