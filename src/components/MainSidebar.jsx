import { Link, NavLink, useNavigate } from "react-router-dom";
import { PiHouse, PiHouseFill } from "react-icons/pi";
import { LuSquarePlay } from "react-icons/lu";
import { AiFillPlaySquare } from "react-icons/ai";
import { IoChatbubbleOutline, IoChatbubbleSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const MainSidebar = () => {
  const navigate = useNavigate();

  // Navigation Items
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
  ];

  // Log Out Handler
  const handleLogout = () => {
    localStorage.removeItem("ct_id");
    navigate("/");
  };

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
              src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
              alt="User avatar"
              className="object-cover transition-all rounded-full w-9 h-9 ring-2 ring-white/20 group-hover:ring-white/40"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-primary-dark" />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate transition-colors group-hover:text-white">
              Ahad Shaikh
            </span>
            <span className="text-xs truncate text-subtext">
              @ahad.shk.0
            </span>
          </div>
        </NavLink>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          type="button"
          className="flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 rounded-xl border bg-warning/10 border-warning/30 text-warning hover:bg-warning hover:text-white hover:border-warningale-[0.98] cursor-pointer"
        >
          <FiLogOut size={18} strokeWidth={2} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default MainSidebar;
