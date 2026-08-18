import { useEffect, useState } from "react";
import { Bookmark, Grid3x3, Link2, RefreshCw, SquarePlay } from "lucide-react";
import Reels from "./../components/Profile/Reels";
import Posts from "./../components/Profile/Posts";
import BookMarks from "./../components/Profile/BookMarks";
import axios from "axios";
import { Link } from "react-router-dom";

const PersonalProfile = () => {
  // ---- UseStates ----
  const [isExpanded, setIsExpanded] = useState(false);
  const [tabToggle, setTabToggle] = useState("posts");
  const [loading, setLoading] = useState(false);

  // ---- UseState Arrays ----
  const [userData, setUserData] = useState(null);

  // ---- Variables ----
  const id = localStorage.getItem("cota_id");

  // ---- Navigation Tabs ----
  const navigation_tabs = [
    {
      id: 1,
      key: "posts",
      icon: Grid3x3,
      label: "Posts",
    },
    {
      id: 2,
      key: "reels",
      icon: SquarePlay,
      label: "Reels",
    },
    {
      id: 3,
      key: "saved",
      icon: Bookmark,
      label: "Saved",
    },
  ];

  const links = [
    "https://pakdeals.vercel.app",
    "https://wechat-ahaddev655.vercel.app/",
    "https://z-coins.vercel.app/auth",
    "https://gitinsight-one.vercel.app/",
  ];

  // ---- API Configuration ----
  const getDetails = () => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((response) => {
        setUserData(response?.data.user_details);
      })
      .catch((error) => {
        // alert(error?.response?.data?.error || "Error fetching details");
      });
  };

  // ---- Counts ----
  const postsCount = userData?.posts?.length || 0;
  const followersCount = userData?.followers?.length || 0;
  const followingCount = userData?.following?.length || 0;

  // ---- UseEffects ----
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="flex items-start justify-center w-full py-6 bg-slate-50">
      {/* Profile Container */}
      <div className="flex flex-col items-center w-full max-w-2xl">
        {/* Profile Card */}
        <div className="items-start w-full p-6 text-center bg-white border shadow-sm gap-3.5 sm:text-start sm:flex rounded-2xl border-slate-200">
          {/* Avatar Section */}
          <div className="shrink-0">
            <div className="w-24 h-24 mx-auto overflow-hidden border rounded-full sm:mx-0 sm:w-28 sm:h-28 border-slate-200 ring-2 ring-slate-100">
              <img
                src={
                  userData?.profilePic ||
                  "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                }
                alt={userData?.userName || "User profile"}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between flex-1 min-w-0 pt-1 pb-4">
            {/* Identity */}
            <div>
              <h1 className="text-xl font-bold tracking-tight truncate sm:text-2xl text-slate-900">
                {userData?.userName || "ahad.shk.0"}
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-0.5">
                {userData?.fullName || "Muhammad Ahad"}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 py-3 my-4 sm:justify-start border-y border-slate-100">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-slate-900">
                  {postsCount}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  posts
                </span>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-slate-900">
                  {followersCount}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  followers
                </span>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-slate-900">
                  {followingCount}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  following
                </span>
              </div>
            </div>

            {/* Description */}
            {userData?.description ? (
              <div className="text-sm leading-relaxed text-slate-700">
                <p className={!isExpanded ? "line-clamp-2" : ""}>
                  {userData?.description}
                </p>
                {userData?.description.length > 150 && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-1 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            ) : (
              <p className="text-sm italic text-slate-400">
                No description available.
              </p>
            )}

            <div className="h-[0.5px] my-3 bg-slate-100" />

            {/* Links Section */}
            {links && links.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                {links.map((link, i) => {
                  return (
                    <Link
                      key={i}
                      to={link}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline truncate max-w-xs transition-colors duration-150"
                    >
                      <Link2 size={14} color="#64748b" />
                      <span className="truncate">{link}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between w-full mt-8 border-b border-slate-200">
          {navigation_tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tabToggle === tab.key;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTabToggle(tab.key)}
                className={`flex-1 pb-3 flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                  isActive
                    ? "text-blue-600 border-blue-600 font-semibold"
                    : "text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2 : 1.75} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="flex justify-center w-full mt-6">
          {tabToggle === "posts" && <Posts />}
          {tabToggle === "reels" && <Reels />}
          {tabToggle === "saved" && <BookMarks />}
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
