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

  // ---- UseRefs ----
  const videoRef = useRef(null);
  const currentStory = stories[currentIndex];

  // ---- Variables ----
  const navigate = useNavigate();

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
    <div className="relative flex items-center justify-center h-screen select-none bg-neutral-900">
      <div className="absolute top-4 left-4">
        <button type="button" className="text-white hover:text-gray-300">
          <X size={24} onClick={() => navigate("/en")} />
        </button>
      </div>

      <div
        className="relative h-[90%] w-full max-w-sm rounded-2xl overflow-hidden bg-black shadow-2xl cursor-pointer"
        onClick={handleTap}
      >
        {/* Active Video Element */}
        <video
          ref={videoRef}
          src={currentStory.video_url}
          className="object-cover w-full h-full"
          autoPlay
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleNext}
        />

        {/* Top Header & Progress Bars */}
        <div className="absolute top-0 left-0 right-0 z-10 flex flex-col gap-2 p-3 bg-linear-to-b from-black/70 to-transparent">
          {/* Progress Bars Container */}
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

          {/* User Profile Bar */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center space-x-2">
              <img
                src={currentStory.user.avatar}
                alt={currentStory.user.username}
                className="object-cover w-8 h-8 border rounded-full border-white/50"
              />
              <span className="text-sm font-semibold text-white drop-shadow">
                {currentStory.user.username}
              </span>
            </div>

            {/* Mute/Unmute & Play/Pause Controls */}
            <div className="flex items-center space-x-3 text-xs text-white">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="p-1 hover:opacity-80"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button
                onClick={togglePlayPause}
                className="p-1 hover:opacity-80"
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
