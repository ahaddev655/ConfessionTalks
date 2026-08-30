import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, X, Camera, Plus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StoriesPage = () => {
  // ---- Hooks (Top Level) ----
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // ---- UseStates ----
  const [userStories, setUserStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const currentStory = userStories[currentIndex];

  // ---- Handlers ----
  const handleUserNameFilter = () => {
    const raw_path = location.pathname.split("/");
    const raw_username = raw_path[2] || "";
    const username = raw_username.replace("@", "");

    return username;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleNext = () => {
    if (currentIndex < userStories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      setCurrentIndex(0);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  };

  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.3) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Maps positioning strings from API payload to Tailwind classes
  const getPositionClasses = (vPos, hPos) => {
    let vertical = "justify-center";
    let horizontal = "items-center";

    if (vPos === "top") vertical = "justify-start";
    if (vPos === "bottom") vertical = "justify-end";

    if (hPos === "left") horizontal = "items-start";
    if (hPos === "right") horizontal = "items-end";

    return `${vertical} ${horizontal}`;
  };

  // ---- Stories Fetch ----
  const storiesFetched = () => {
    const username = handleUserNameFilter();
    axios
      .get(`http://localhost:3000/api/user/story/${username}`)
      .then((response) => {
        if (response?.data?.success && response?.data?.stories) {
          setUserStories(response.data.stories);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ---- UseEffects ----
  // Handles video loading and autoplay safe execution
  useEffect(() => {
    setProgress(0);
    setIsPlaying(true);

    if (currentStory?.mediaType === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.log("Autoplay prevented:", err));
      }
    }
  }, [currentIndex, currentStory]);

  // Handles progress timer for static image stories (5s per story)
  useEffect(() => {
    let interval;
    if (currentStory?.mediaType !== "video" && isPlaying) {
      const duration = 5000;
      const step = 50;
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + (step / duration) * 100;
        });
      }, step);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isPlaying, currentStory]);

  useEffect(() => {
    storiesFetched();
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden select-none bg-slate-950">
      {/* Top Left Close Button */}
      <div className="absolute z-40 top-5 left-5">
        <button
          type="button"
          onClick={() => navigate("/en")}
          className="p-2 transition-all rounded-full shadow-md text-white/80 bg-slate-900/40 backdrop-blur-md hover:bg-slate-900/80 hover:text-white"
          aria-label="Close stories"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Story Container */}
      {userStories?.length > 0 ? (
        <div
          className="relative h-[90%] w-full max-w-sm rounded-2xl overflow-hidden bg-slate-900 shadow-2xl cursor-pointer border border-white/10"
          onClick={handleTap}
        >
          {/* Active Story Media */}
          {currentStory?.mediaType === "video" ? (
            <video
              key={currentStory?._id || currentStory?.story}
              ref={videoRef}
              src={
                currentStory?.story?.startsWith("data:video")
                  ? currentStory?.story
                  : `data:video/mp4;base64,${currentStory?.story}`
              }
              className="object-cover w-full h-full"
              autoPlay
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleNext}
            />
          ) : (
            <img
              src={
                currentStory?.story?.startsWith("data:image")
                  ? currentStory?.story
                  : `data:image/png;base64,${currentStory?.story}`
              }
              alt="Story content"
              className="object-cover w-full h-full"
            />
          )}

          {/* Story Text Overlay with dynamic background */}
          {currentStory?.storyText && (
            <div
              className={`absolute inset-0 p-6 flex flex-col pointer-events-none z-10 ${getPositionClasses(
                currentStory?.verticalPos,
                currentStory?.horizontalPos,
              )}`}
            >
              <span
                style={{
                  color: currentStory?.textColor || "#ffffff",
                  backgroundColor:
                    currentStory?.hasBackground === true ||
                    currentStory?.hasBackground === "true"
                      ? currentStory?.bgColor || "#000000"
                      : "transparent",
                }}
                className={`inline-block px-3 py-1.5 rounded-xl font-semibold text-sm wrap-break-word max-w-full ${
                  currentStory?.hasBackground === true ||
                  currentStory?.hasBackground === "true"
                    ? "backdrop-blur-md shadow-md"
                    : "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                }`}
              >
                {currentStory?.storyText}
              </span>
            </div>
          )}

          {/* Top Header & Story Progress Overlay */}
          <div className="absolute top-0 left-0 right-0 z-20 flex flex-col gap-2 p-3 bg-linear-to-b from-slate-950/80 via-slate-950/40 to-transparent">
            {/* Progress Bars Row */}
            <div className="flex w-full space-x-1">
              {userStories.map((story, index) => {
                let barWidth = "0%";
                if (index < currentIndex) {
                  barWidth = "100%";
                } else if (index === currentIndex) {
                  barWidth = `${progress}%`;
                }

                return (
                  <div
                    key={story._id || index}
                    className="flex-1 h-1 overflow-hidden rounded-full bg-white/30"
                  >
                    <div
                      className="h-full transition-all duration-75 ease-linear bg-white"
                      style={{ width: barWidth }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Profile Details & Media Controls */}
            <div className="flex items-center justify-between mt-1">
              <Link to={`/en/${currentStory?.username}`}>
                <div className="flex items-center min-w-0 space-x-2">
                  <img
                    src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                    alt={currentStory?.username || "User avatar"}
                    className="object-cover w-8 h-8 border rounded-full border-white/40 shrink-0"
                  />
                  <span className="text-sm font-semibold text-white truncate drop-shadow">
                    {currentStory?.username || "user"}
                  </span>
                </div>
              </Link>

              {/* Sound & Playback Controls */}
              {currentStory?.mediaType === "video" && (
                <div className="flex items-center space-x-2 text-white">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={togglePlayPause}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[90%] w-full max-w-sm rounded-2xl bg-slate-900/60 border border-white/10 p-6 text-center backdrop-blur-md">
          <div className="relative flex items-center justify-center mb-4">
            <div className="p-4 border shadow-xl rounded-2xl bg-slate-800/80 border-slate-700/60 text-slate-400">
              <Camera size={36} strokeWidth={1.5} />
            </div>
            <div className="absolute p-1 text-white rounded-full shadow-md -bottom-1 -right-1 bg-brand-accent">
              <Plus size={14} strokeWidth={2.5} />
            </div>
          </div>

          <h3 className="text-base font-bold tracking-wide text-white">
            No stories posted yet
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-400 max-w-55">
            Check back later or share a moment with your followers.
          </p>
        </div>
      )}
    </div>
  );
};

export default StoriesPage;
