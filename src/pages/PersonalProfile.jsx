import { useEffect, useState } from "react";
import { Bookmark, Grid3x3, Link2, SquarePlay } from "lucide-react";
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

  // ---- API Configuration ----
  const getDetails = () => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((response) => {
        const data = response?.data?.user_details;

        setUserData({
          fname: data?.fname || "",
          lname: data?.lname || "",
          username: data?.username || "",
          email: data?.email || "",
          profilePic: data?.profilePic?.startsWith("data:image")
            ? data?.profilePic
            : data?.profilePic
              ? `data:image/png;base64,${data?.profilePic}`
              : "",
          gender: data?.gender || "",
          description: data?.description || "",
          links: (() => {
            let raw = data?.links;
            if (typeof raw === "string") {
              try {
                raw = JSON.parse(raw);
              } catch {
                raw = [];
              }
            }
            return Array.isArray(raw)
              ? raw.map((item, index) =>
                  typeof item === "string" ? { id: index, url: item } : item,
                )
              : [];
          })(),
        });
      })
      .catch((error) => {
        console.error("Error fetching profile details:", error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      });
  };

  // ---- Counts ----
  const postsCount = userData?.posts?.length || 0;
  const followersCount = userData?.followers?.length || 0;
  const followingCount = userData?.following?.length || 0;

  // ---- UseEffects ----
  useEffect(() => {
    if (id) {
      getDetails();
    }
  }, [id]);

  return (
    <div className="flex items-start justify-center w-full min-h-screen bg-slate-50">
      {/* Profile Container */}
      <div className="flex flex-col items-center w-full max-w-2xl">
        {/* Profile Card */}
        <div className="flex flex-col items-center w-full gap-4 p-4 text-center bg-white border shadow-sm sm:p-6 sm:flex-row sm:items-start sm:gap-6 sm:text-left rounded-2xl border-slate-200">
          {/* Avatar Section */}
          <div className="shrink-0">
            {loading ? (
              <div className="w-20 h-20 mx-auto rounded-full sm:w-28 sm:h-28 bg-slate-200 animate-pulse" />
            ) : (
              <div className="w-20 h-20 mx-auto overflow-hidden border rounded-full sm:w-28 sm:h-28 border-slate-200 ring-2 ring-slate-100">
                <img
                  src={
                    userData?.profilePic ||
                    "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                  }
                  alt={userData?.username || "User profile"}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between flex-1 w-full min-w-0 pt-1 pb-2">
            {/* Identity */}
            <div className="flex flex-col items-center sm:items-start">
              {loading ? (
                <div className="w-40 h-6 rounded bg-slate-200 animate-pulse" />
              ) : (
                <h1 className="text-lg font-bold tracking-tight truncate sm:text-2xl text-slate-900">
                  {userData?.username || "unknown"}
                </h1>
              )}

              {loading ? (
                <div className="w-32 h-4 mt-2 rounded bg-slate-200 animate-pulse" />
              ) : (
                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                  {userData ? `${userData.fname} ${userData.lname}` : "Unknown"}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-around w-full gap-4 py-3 my-3 sm:justify-start sm:gap-6 sm:my-4 border-y border-slate-100">
              <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-1.5">
                {loading ? (
                  <div className="w-12 h-5 rounded bg-slate-200 animate-pulse" />
                ) : (
                  <>
                    <span className="text-sm font-bold sm:text-base text-slate-900">
                      {postsCount}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      posts
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-1.5">
                {loading ? (
                  <div className="w-12 h-5 rounded bg-slate-200 animate-pulse" />
                ) : (
                  <>
                    <span className="text-sm font-bold sm:text-base text-slate-900">
                      {followersCount}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      followers
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-1.5">
                {loading ? (
                  <div className="w-12 h-5 rounded bg-slate-200 animate-pulse" />
                ) : (
                  <>
                    <span className="text-sm font-bold sm:text-base text-slate-900">
                      {followingCount}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      following
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {loading ? (
              <div className="w-full h-12 my-1 rounded bg-slate-200 animate-pulse" />
            ) : userData?.description ? (
              <div className="text-xs leading-relaxed sm:text-sm text-slate-700">
                <p className={!isExpanded ? "line-clamp-2" : ""}>
                  {userData.description}
                </p>
                {userData.description.length > 150 && (
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
              <p className="text-xs italic sm:text-sm text-slate-400">
                No description available.
              </p>
            )}

            <div className="w-full h-px my-3 bg-slate-100" />

            {/* Links Section */}
            {loading ? (
              <div className="w-3/4 h-5 rounded bg-slate-200 animate-pulse" />
            ) : Array.isArray(userData?.links) && userData.links.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                {userData.links.map((link, i) => {
                  const url = typeof link === "string" ? link : link?.url;
                  return (
                    <Link
                      key={link?.id || i}
                      to={url}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline truncate max-w-50 sm:max-w-xs transition-colors duration-150"
                    >
                      <Link2 size={14} className="shrink-0 text-slate-500" />
                      <span className="truncate">{url}</span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs italic sm:text-sm text-slate-400">
                No links added.
              </p>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between w-full mt-6 border-b sm:mt-8 border-slate-200">
          {navigation_tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tabToggle === tab.key;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTabToggle(tab.key)}
                className={`flex-1 pb-3 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                  isActive
                    ? "text-blue-600 border-blue-600 font-semibold"
                    : "text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2 : 1.75}
                  className="shrink-0"
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="flex justify-center w-full mt-4 sm:mt-6">
          {tabToggle === "posts" && <Posts />}
          {tabToggle === "reels" && <Reels />}
          {tabToggle === "saved" && <BookMarks />}
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
