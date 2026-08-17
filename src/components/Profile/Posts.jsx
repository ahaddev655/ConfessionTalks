import dummyImage from "../../assets/Screenshot 2026-08-11 225421.png";
import { Link } from "react-router-dom";
import { Eye, Heart, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  // ---- UseStates ----
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState(null);

  // ---- Variables ----
  const id = localStorage.getItem("cota_id");

  // ---- Functions ----
  const getDetails = () => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((response) => {
        const data = response?.data.user_details;
        setPosts(data?.posts || []);
      })
      .catch((error) => {
        alert(error?.response?.data?.error || "Failed to fetch posts.");
      });
  };

  const handleClosePopup = () => {
    setPopUpToggle(false);
    setSelectedPost(null);
  };

  // ---- UseEffects ----
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Modal Popup */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-slate-900/40 backdrop-blur-sm transition-opacity duration-200 ${
          popUpToggle
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClosePopup}
      >
        <div
          className="relative flex flex-col sm:flex-row items-center w-full max-w-4xl h-[85vh] max-h-175 border rounded-2xl shadow-2xl bg-white border-slate-200 overflow-hidden mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClosePopup}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Post Image Container */}
          <div className="h-2/5 sm:h-full w-full sm:w-[45%] shrink-0 bg-slate-950 flex items-center justify-center">
            <img
              src={selectedPost?.post || dummyImage}
              alt="Post media"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Side: Details & Comments Area */}
          <div className="w-full sm:w-[55%] h-3/5 sm:h-full pt-4 flex flex-col min-h-0 bg-white">
            {/* Profile Header */}
            <div className="flex items-center gap-3 px-5 pb-3 border-b border-slate-100 shrink-0">
              <div className="bg-slate-100 rounded-full shrink-0 w-10 h-10 overflow-hidden ring-1 ring-slate-200">
                <img
                  src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                  alt="Avatar"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="flex items-center gap-2 text-sm font-semibold text-slate-900 truncate">
                  {selectedPost?.userName || "ahad.shk.0"}
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline text-xs"
                  >
                    Follow
                  </button>
                </h1>
                <p className="text-xs text-slate-500 truncate">
                  Original Audio — {selectedPost?.userName || "ahad.shk.0"}
                </p>
              </div>
            </div>

            {/* Comments List Area */}
            <div className="flex-1 min-h-0 px-5 py-4 overflow-y-auto space-y-4">
              {Array(8)
                .fill(null)
                .map((_, i) => (
                  <Fragment key={i}>
                    <div className="flex items-start gap-3">
                      <Link to={`/en/@ahad.shk.0`} className="shrink-0">
                        <img
                          src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                          alt="Commenter avatar"
                          className="object-cover w-9 h-9 rounded-full ring-1 ring-slate-200 hover:ring-blue-600 transition-all"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/en/@ahad.shk.0`}
                            className="text-xs font-semibold text-slate-900 truncate hover:underline"
                          >
                            @ahad.shk.0
                          </Link>
                        </div>

                        <p className="mt-1 text-sm text-slate-700 leading-snug wrap-break-word">
                          Hello World
                        </p>

                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                          <span>12.1K likes</span>
                        </div>
                      </div>

                      <button className="text-slate-400 hover:text-red-500 transition-colors p-1">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="border-b border-slate-100 my-2" />
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid Layout */}
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
          {posts.map((post, i) => (
            <div
              key={post?.id || i}
              className="relative aspect-square w-full cursor-pointer rounded-xl overflow-hidden group border border-slate-200 bg-slate-100"
              onClick={() => {
                setSelectedPost(post);
                setPopUpToggle(true);
              }}
            >
              <img
                src={post?.post || dummyImage}
                alt="User post"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />

              {/* Hover Overlay with Stats */}
              <div className="absolute inset-0 z-10 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-200">
                <div className="flex items-center gap-1.5 text-white font-semibold text-sm">
                  <Eye className="w-5 h-5" />
                  <span>{post?.views || 0}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold text-sm">
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{post?.likes || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-12 text-center">
          <p className="text-sm font-medium text-slate-500">
            You haven't shared any posts yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Posts;
