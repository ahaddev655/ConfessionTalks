import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReelItem from "../components/ReelItem";
import { ChevronUp, ChevronDown, X } from "lucide-react";

import SampleVideo from "../assets/sample.mp4";
import SampleVideo2 from "../assets/sample2.mp4";

const ReelsPage = () => {
  // ---- Data Arrays ----
  const videosData = [
    {
      id: 1,
      video_id: "qasw36210jsc",
      video_url: SampleVideo,
      description:
        "Welcome to the custom reels feed! Click more to read the rest of this caption! 🚀",
      likes: 1250,
      hashtags: ["#react", "#tailwind", "#reels"],
      commentList: [
        {
          id: 101,
          user: {
            username: "alex_dev",
            avatar:
              "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
          },
          comment: "Awesome implementation!",
        },
      ],
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
      description:
        "Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling.",
      likes: 1250000,
      hashtags: ["#sample", "#video", "#test"],
      commentList: [],
      user: {
        username: "ahad.shk.0",
        avatar:
          "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
      },
    },
  ];

  // ---- UseStates ----
  const [isMuted, setIsMuted] = useState(true);

  // ---- Hooks & Refs ----
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // ---- Functions ----
  const scroll = (direction) => {
    if (!containerRef.current) return;
    const offset =
      direction === "up"
        ? -containerRef.current.clientHeight
        : containerRef.current.clientHeight;
    containerRef.current.scrollBy({ top: offset, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-slate-950 overflow-hidden">
      {/* Top Left Back/Close Button with Smooth Hover Scaling */}
      <div className="absolute top-5 left-5 z-40 transition-transform duration-200 hover:scale-105 active:scale-95">
        <button
          type="button"
          onClick={() => navigate("/en")}
          className="p-2.5 rounded-full text-white/80 bg-slate-900/50 backdrop-blur-md hover:bg-slate-900/90 hover:text-white transition-all duration-200 shadow-lg border border-white/10"
          aria-label="Close feed"
        >
          <X size={22} />
        </button>
      </div>

      {/* Reel Feed Scroll Container */}
      <div
        ref={containerRef}
        className="w-full max-w-sm h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {videosData.map((video) => (
          <ReelItem
            key={video.id}
            video={video}
            isMuted={isMuted}
            toggleMute={() => setIsMuted((prev) => !prev)}
          />
        ))}
      </div>

      {/* Desktop Navigation Arrows with Hover Glow and Spring Transition */}
      <div className="absolute z-30 hidden md:flex flex-col gap-3 -translate-y-1/2 right-6 top-1/2">
        <button
          onClick={() => scroll("up")}
          className="p-3 text-white transition-all duration-200 ease-out rounded-full shadow-xl bg-slate-900/60 backdrop-blur-md hover:bg-slate-800 hover:scale-110 hover:border-white/20 border border-white/10 active:scale-90"
          aria-label="Previous reel"
        >
          <ChevronUp size={22} />
        </button>
        <button
          onClick={() => scroll("down")}
          className="p-3 text-white transition-all duration-200 ease-out rounded-full shadow-xl bg-slate-900/60 backdrop-blur-md hover:bg-slate-800 hover:scale-110 hover:border-white/20 border border-white/10 active:scale-90"
          aria-label="Next reel"
        >
          <ChevronDown size={22} />
        </button>
      </div>
    </div>
  );
};

export default ReelsPage;
