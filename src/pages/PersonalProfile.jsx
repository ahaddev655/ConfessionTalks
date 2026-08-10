import { useState } from "react";
import { Bookmark, Grid3x3, RefreshCw, SquarePlay } from "lucide-react";
import Reels from "./../components/Profile/Reels";
import Posts from "./../components/Profile/Posts";
import BookMarks from "./../components/Profile/BookMarks";
import Remix from "./../components/Profile/Remix";
const PersonalProfile = () => {
  // ---- UseStates ----
  const [isExpanded, setIsExpanded] = useState(false);
  const [tabToggle, setTabToggle] = useState("posts");
  const [userData, setUserData] = useState({
    fullname: "Muhammad Ahad",
    username: "ahad.shk.0",
    following: 72,
    followers: 113,
    posts: 22,
    description:
      "I move in silence; depth in my eyes. Mystery guards my mind, attitude sets limits; some stories are felt, not explained. Not everyone can control me.",
  });

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
    {
      id: 4,
      key: "remix",
      icon: RefreshCw,
      label: "Remix",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl p-6 mx-auto">
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
              alt={userData?.username || "User profile"}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex-1 min-w-0">
          {/* User Identity */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight truncate text-heading-text">
              {userData?.username || "Username"}
            </h1>
            <p className="text-sm font-medium text-subtext">
              {userData?.fullname}
            </p>
          </div>

          {/* Profile Stats */}
          <div className="mt-4 flex items-center gap-6 border-y border-border-color py-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-heading-text">
                {userData?.posts ? userData.posts.toLocaleString() : 0}
              </span>
              <span className="text-xs font-medium text-subtext">posts</span>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-heading-text">
                {userData?.followers ? userData.followers.toLocaleString() : 0}
              </span>
              <span className="text-xs font-medium text-subtext">
                followers
              </span>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-heading-text">
                {userData?.following ? userData.following.toLocaleString() : 0}
              </span>
              <span className="text-xs font-medium text-subtext">
                following
              </span>
            </div>
          </div>

          {/* Expandable Description */}
          {userData?.description && (
            <div className="mt-3 text-sm text-body-text">
              <p
                className={`leading-relaxed ${!isExpanded ? "line-clamp-2" : ""}`}
              >
                {userData.description}
              </p>

              {userData.description.length > 150 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-1 text-xs font-semibold transition-colors text-brand-accent hover:text-hover-blue"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between w-full gap-3 border-b-2 border-b-border-color">
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
      </div>

      {/* Content */}
      <div className="mt-3">
        {tabToggle === "posts" ? (
          <Posts />
        ) : tabToggle === "reels" ? (
          <Reels />
        ) : tabToggle === "saved" ? (
          <BookMarks />
        ) : (
          <Remix />
        )}
      </div>
    </div>
  );
};

export default PersonalProfile;
