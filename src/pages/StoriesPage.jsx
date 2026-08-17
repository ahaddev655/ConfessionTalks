import { useEffect, useRef, useState } from "react";
import SampleVideo from "../assets/sample.mp4";
import SampleVideo2 from "../assets/sample2.mp4";
import { Volume2, VolumeX, Play, Pause, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StoriesPage = () => {
  // ---- Arrays ----
  const stories = [
    {
      id: 1,
      video_id: "qasw36210jsc",
      video_url: SampleVideo,
      user: {
        username: "ahad.shk.0",
        avatar:
          "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
      },
    },
    {
      id: 2,
      video_id: "qasw36210jsd",
      video_url: SampleVideo2,
      user: {
        username: "ahad.shk.0",
        avatar:
          "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
      },
    },
  ];

  // ---- UseStates ----
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // ---- UseRefs & Navigation ----
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const currentStory = stories[currentIndex];

  // ---- Functions ----
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
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

  // ---- UseEffects ----
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [currentIndex]);

  return (
    <div className="relative flex items-center justify-center h-screen select-none bg-slate-950 overflow-hidden">
      {/* Top Left Close Button */}
      <div className="absolute top-5 left-5 z-40">
        <button
          type="button"
          onClick={() => navigate("/en")}
          className="p-2 rounded-full text-white/80 bg-slate-900/40 backdrop-blur-md hover:bg-slate-900/80 hover:text-white transition-all shadow-md"
          aria-label="Close stories"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Story Container */}
      <div
        className="relative h-[90%] w-full max-w-sm rounded-2xl overflow-hidden bg-slate-900 shadow-2xl cursor-pointer border border-white/10"
        onClick={handleTap}
      >
        {/* Active Story Video */}
        <video
          ref={videoRef}
          src={currentStory?.video_url}
          className="object-cover w-full h-full"
          autoPlay
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleNext}
        />

        {/* Top Header & Story Progress Overlay */}
        <div className="absolute top-0 left-0 right-0 z-10 flex flex-col gap-2 p-3 bg-linear-to-b from-slate-950/80 via-slate-950/40 to-transparent">
          {/* Progress Bars Row */}
          <div className="flex w-full space-x-1">
            {stories.map((story, index) => {
              let barWidth = "0%";
              if (index < currentIndex) {
                barWidth = "100%";
              } else if (index === currentIndex) {
                barWidth = `${progress}%`;
              }

              return (
                <div
                  key={story.id}
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
            <div className="flex items-center space-x-2 min-w-0">
              <img
                src={
                  currentStory?.user?.avatar ||
                  "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                }
                alt={currentStory?.user?.username || "User avatar"}
                className="object-cover w-8 h-8 border rounded-full border-white/40 shrink-0"
              />
              <span className="text-sm font-semibold text-white truncate drop-shadow">
                {currentStory?.user?.username || "user"}
              </span>
            </div>

            {/* Sound & Playback Controls */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
