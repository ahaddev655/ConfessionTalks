import { Fragment, useEffect, useRef, useState } from "react";
import DummyImage from "../../assets/Screenshot 2026-08-11 225421.png";
import DummyVideo from "../../assets/sample2.mp4";
import { Eye, Heart, SquarePlay, SquaresSubtract } from "lucide-react";
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
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [videoShow, setVideoShow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [bookmarks, setBookmarks] = useState(null);

  // ---- Refs ----
  const videoRef = useRef(null);

  // ---- Arrays ----
  const bookmarksList = [
    {
      id: 1,
      thumbnail: DummyImage,
      description: "Hello World",
      type: "post",
      views: 128000,
      likes: 129000,
      user_details: {
        id: 1,
        username: "ahad.shk.0",
        avatar:
          "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
      },
      comments: [
        {
          id: 1,
          user: {
            username: "ahad.shk.0",
            avatar:
              "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
          },
          comment: "Hello, Nice Post",
        },
      ],
    },
    {
      id: 2,
      thumbnail: DummyImage,
      video: DummyVideo,
      description: "Hello World",
      type: "video",
      views: 128000,
      likes: 129000,
      user_details: {
        id: 1,
        username: "ahad.shk.0",
        avatar:
          "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
      },
      comments: [
        {
          id: 1,
          user: {
            username: "ahad.shk.0",
            avatar:
              "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
          },
          comment: "Hello, Nice Post",
        },
      ],
    },
  ];

  // ---- Derived Data ----
  const comments = selectedVideo?.comments || [];

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

  // Effect to reset video player time when modal closes
  useEffect(() => {
    if (!popUpToggle && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [popUpToggle]);

  return (
    <>
      {/* Modal */}
      <div
        className={`fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
          popUpToggle ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClosePopup}
      >
        <div
          className="flex items-center w-full h-full max-w-6xl max-h-[85vh] border rounded-lg shadow-md bg-card-bg border-border-color overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {selectedVideo && (
            <>
              <div className="h-full w-[40%] shrink-0">
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
                    alt="IMG"
                    className="object-cover w-full h-full rounded-l-lg"
                  />
                )}
              </div>

              {/* Right Side */}
              <div className="w-[60%] h-full pt-4 flex flex-col min-h-0">
                {/* Profile */}
                <div className="flex items-center gap-2.5 px-4 pb-3 border-b border-border-color shrink-0">
                  {/* Avatar */}
                  <div className="bg-black rounded-full shrink-0 w-11 h-11">
                    <img
                      src={selectedVideo?.user_details.avatar}
                      alt="IMG"
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <h1 className="flex items-center gap-2 text-sm font-semibold tracking-wide">
                      {selectedVideo?.user_details.username} <span>•</span>
                      <button
                        type="button"
                        className="transition-colors hover:underline text-brand-accent hover:text-hover-blue"
                      >
                        Follow
                      </button>
                    </h1>
                    <p className="text-xs tracking-wide text-subtext">
                      Original Audio — ahad.shk.0
                    </p>
                  </div>
                </div>

                {/* Comments Area */}
                <div className="flex-1 min-h-0 px-4 py-3 overflow-y-auto scrollbar-thin">
                  {comments.map((commentItem, i) => (
                    <Fragment key={i}>
                      <div className="flex items-center">
                        <div className="w-full">
                          <div className="flex items-start justify-between gap-3 w-full">
                            <Link to={`/en/@ahad.shk.0`} className="shrink-0">
                              <img
                                src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                                alt="IMG"
                                className="object-cover w-10 h-10 transition-all rounded-full ring-2 ring-transparent hover:ring-brand-accent"
                              />
                            </Link>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-baseline gap-2">
                                <Link
                                  to={`/en/@ahad.shk.0`}
                                  className="text-sm font-semibold truncate text-heading-text hover:underline"
                                >
                                  @ahad.shk.0
                                </Link>
                              </div>

                              <p className="mt-1 text-sm leading-relaxed text-body-text wrap-break-word">
                                {commentItem.comment}
                              </p>

                              <div className="flex items-center gap-4 mt-2 text-xs text-body-text/80">
                                12.1K likes
                              </div>
                            </div>

                            <div className="pt-1 text-body-text/60">
                              <button className="transition-colors hover:text-red-500">
                                <Heart className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="border-border-color my-3 rounded-full" />
                    </Fragment>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-1 md:grid-cols-3 sm:grid-cols-2">
        {bookmarksList.map((item) => (
          <div
            key={item.id}
            className="relative w-full h-full cursor-pointer"
            onClick={() => {
              setSelectedVideo(item);
              setPopUpToggle(true);
            }}
          >
            <img
              src={item.thumbnail}
              alt="IMG"
              className="object-cover w-full h-full rounded-md"
            />

            {/* Type Icon */}
            <div className="absolute top-3 right-3">
              {item.video ? (
                <AiFillPlaySquare fill="white" size={30} />
              ) : (
                <HiSquare2Stack size={30} fill="white" />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookMarks;
