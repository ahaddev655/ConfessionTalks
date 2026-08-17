import { useEffect, useState } from "react";
import { Bookmark, Grid3x3, RefreshCw, SquarePlay } from "lucide-react";
import Reels from "./../components/Profile/Reels";
import Posts from "./../components/Profile/Posts";
import BookMarks from "./../components/Profile/BookMarks";
import axios from "axios";

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

  // ---- API Configuration ----
  const getDetails = () => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((response) => {
        setUserData(response?.data.user_details);
      })
      .catch((error) => {
        alert(error?.response?.data?.error || "Error fetching details");
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
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      {/* Centered Profile Container */}
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Profile Card */}
        <div className="w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-6">
          {/* Avatar Section */}
          <div className="shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-slate-200 ring-2 ring-slate-100">
              <img
                src={
                  userData?.profilePic ||
                  "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                }
                alt={userData?.userName || "User profile"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
            {/* Identity */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate">
                {userData?.userName || "ahad.shk.0"}
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-0.5">
                {userData?.fullName || "Muhammad Ahad"}
              </p>
            </div>

            {/* Stats */}
            <div className="my-4 flex items-center gap-6 border-y border-slate-100 py-3">
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
              <div className="text-sm text-slate-700 leading-relaxed">
                <p className={!isExpanded ? "line-clamp-2" : ""}>
                  {userData?.description}
                </p>
                {userData?.description.length > 150 && (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">
                No description available.
              </p>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="w-full flex items-center justify-between border-b border-slate-200 mt-8">
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
        <div className="w-full mt-6 flex justify-center">
          {tabToggle === "posts" && <Posts />}
          {tabToggle === "reels" && <Reels />}
          {tabToggle === "saved" && <BookMarks />}
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
