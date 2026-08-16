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

  // ---- Arrays ----
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
    // {
    //   id: 4,
    //   key: "remix",
    //   icon: RefreshCw,
    //   label: "Remix",
    // },
  ];

  // ---- API Configuration ----
  const getDetails = () => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((response) => {
        setUserData(response?.data.user_details); // adding data to the state
      })
      .catch((error) => {
        alert(error?.response.data.error);
      });
  };

  // ---- Counts ----
  const postsCount = Array.isArray(userData?.posts)
    ? userData.posts.length
    : Object.keys(userData?.posts || {}).length;

  const followersCount = Array.isArray(userData?.followers)
    ? userData.followers.length
    : Object.keys(userData?.followers || {}).length;

  const followingCount = Array.isArray(userData?.following)
    ? userData.following.length
    : Object.keys(userData?.following || {}).length;

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl p-6 mx-auto">
      {/* Profile */}
      <div className="flex items-start max-w-2xl gap-6 mx-auto rounded-2xl">
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 overflow-hidden border rounded-full border-border-color">
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

        {/* Profile Details */}
        <div className="flex-1 min-w-0">
          {/* User Identity */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight truncate text-heading-text">
              {userData?.userName || "Unknown"}
            </h1>
            <p className="text-sm font-medium text-subtext">
              {userData?.fullName || "Unknown"}
            </p>
          </div>

          {/* Profile Stats */}
          <div className="mt-4 flex items-center gap-6 border-y border-border-color py-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-heading-text">
                {postsCount || 0}
              </span>
              <span className="text-xs font-medium text-subtext">posts</span>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-heading-text">
                {followersCount || 0}
              </span>
              <span className="text-xs font-medium text-subtext">
                followers
              </span>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-heading-text">
                {followingCount || 0}
              </span>
              <span className="text-xs font-medium text-subtext">
                following
              </span>
            </div>
          </div>

          {/* Expandable Description */}
          {userData?.description ? (
            <div className="mt-3 text-sm text-body-text">
              <p
                className={`leading-relaxed ${!isExpanded ? "line-clamp-2" : ""}`}
              >
                {userData?.description}
              </p>

              {userData?.description.length > 150 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-1 text-xs font-semibold transition-colors text-brand-accent hover:text-hover-blue"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          ) : (
            <div className="mt-3 text-sm text-body-text">No description.</div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      {/* <div className="flex items-center justify-between w-full gap-3 border-b-2 border-b-border-color">
        {navigation_tabs.map((tab) => (
          <div
            onClick={() => setTabToggle(tab.key)}
            className={`mt-6 border-b-2 w-full pb-1.5 flex items-center justify-center gap-1.5 cursor-pointer transition-colors duration-200 ${tabToggle === tab.key ? "text-brand-accent border-brand-accent" : "text-heading-text border-transparent"}`}
            key={tab.id}
          >
            <tab.icon strokeWidth={1.25} size={25} />
            <span>{tab.label}</span>
          </div>
        ))}
      </div> */}

      {/* Content */}
      {/* <div className="mt-3">
        {tabToggle === "posts" ? (
          <Posts />
        ) : tabToggle === "reels" ? (
          <Reels />
        ) : tabToggle === "saved" ? (
          <BookMarks />
        ) : (
          ""
        )}
      </div> */}
    </div>
  );
};

export default PersonalProfile;
