import { Fragment, useEffect, useRef, useState } from "react";
import DummyImage from "../../assets/Screenshot 2026-08-11 225421.png";
import DummyVideo from "../../assets/sample2.mp4";
import { Eye, Heart, SquarePlay, SquaresSubtract, X } from "lucide-react";
import { Link } from "react-router-dom";
import { HiSquare2Stack } from "react-icons/hi2";
import { AiFillPlaySquare } from "react-icons/ai";

const formatCount = (count) => {
  if (count === undefined || count === null) return "0";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
};

const BookMarks = () => {
  // ---- UseStates ----
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [videoShow, setVideoShow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [bookmarks, setBookmarks] = useState(null);

  // Mock comments array to prevent render errors if empty
  const comments = [
    {
      id: 1,
      user: "ahad.shk.0",
      comment: "Saved this for reference!",
      likes: "12.1K",
    },
  ];

  // ---- Refs ----
  const videoRef = useRef(null);

  // ---- Functions ----
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleClosePopup = () => {
    setPopUpToggle(false);
    setVideoShow(false);
    setIsMuted(true);
    setIsPlaying(false);
    setSelectedVideo(null);
  };

  // ---- UseEffects ----
  useEffect(() => {
    let showTimeout;
    let muteTimeout;

    if (popUpToggle && selectedVideo?.video) {
      showTimeout = setTimeout(() => {
        setVideoShow(true);
        setIsPlaying(true);
      }, 1000);

      muteTimeout = setTimeout(() => {
        setIsMuted(false);
      }, 1500);
    }

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(muteTimeout);
    };
  }, [popUpToggle, selectedVideo]);

  useEffect(() => {
    if (!popUpToggle && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [popUpToggle]);

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

          {selectedVideo && (
            <>
              {/* Media Container (Left Side) */}
              <div className="h-2/5 sm:h-full w-full sm:w-[45%] shrink-0 bg-slate-950 flex items-center justify-center">
                {videoShow ? (
                  <video
                    ref={videoRef}
                    src={selectedVideo.video}
                    className="object-cover w-full h-full cursor-pointer"
                    loop
                    autoPlay
                    muted={isMuted}
                    onClick={togglePlayPause}
                  />
                ) : (
                  <img
                    src={selectedVideo.thumbnail}
                    alt="Bookmark preview"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>

              {/* Content / Comments Container (Right Side) */}
              <div className="w-full sm:w-[55%] h-3/5 sm:h-full pt-4 flex flex-col min-h-0 bg-white">
                {/* Header Profile Bar */}
                <div className="flex items-center gap-3 px-5 pb-3 border-b border-slate-100 shrink-0">
                  <div className="bg-slate-100 rounded-full shrink-0 w-10 h-10 overflow-hidden ring-1 ring-slate-200">
                    <img
                      src={
                        selectedVideo?.user_details?.avatar ||
                        "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                      }
                      alt="Avatar"
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h1 className="flex items-center gap-2 text-sm font-semibold text-slate-900 truncate">
                      {selectedVideo?.user_details?.username || "ahad.shk.0"}
                      <span className="text-slate-300">•</span>
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline text-xs"
                      >
                        Follow
                      </button>
                    </h1>
                    <p className="text-xs text-slate-500 truncate">
                      Original Audio —{" "}
                      {selectedVideo?.user_details?.username || "ahad.shk.0"}
                    </p>
                  </div>
                </div>

                {/* Comments List Area */}
                <div className="flex-1 min-h-0 px-5 py-4 overflow-y-auto space-y-4">
                  {comments.map((commentItem, i) => (
                    <Fragment key={i}>
                      <div className="flex items-start gap-3">
                        <Link to={`/en/@ahad.shk.0`} className="shrink-0">
                          <img
                            src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                            alt="User avatar"
                            className="object-cover w-9 h-9 rounded-full ring-1 ring-slate-200 hover:ring-blue-600 transition-all"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/en/@ahad.shk.0`}
                              className="text-xs font-semibold text-slate-900 truncate hover:underline"
                            >
                              @{commentItem.user}
                            </Link>
                          </div>

                          <p className="mt-1 text-sm text-slate-700 leading-snug wrap-break-word">
                            {commentItem.comment}
                          </p>

                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                            <span>{commentItem.likes} likes</span>
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
            </>
          )}
        </div>
      </div>

      {/* Bookmarks Grid / Empty State */}
      {bookmarks && bookmarks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
          {bookmarks.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square w-full cursor-pointer rounded-xl overflow-hidden group border border-slate-200 bg-slate-100"
              onClick={() => {
                setSelectedVideo(item);
                setSelectedItem(item);
                setPopUpToggle(true);
              }}
            >
              <img
                src={item.thumbnail || DummyImage}
                alt="Bookmark item"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />

              {/* Type Badge */}
              <div className="absolute top-2.5 right-2.5 drop-shadow-md">
                {item.video ? (
                  <AiFillPlaySquare fill="white" size={24} />
                ) : (
                  <HiSquare2Stack size={24} fill="white" />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-sm font-medium text-slate-500">
            You haven't saved any posts or reels yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookMarks;
