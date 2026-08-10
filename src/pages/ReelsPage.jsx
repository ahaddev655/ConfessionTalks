import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReelItem from "../components/ReelItem";
import {
  Heart,
  MessageCircle,
  Share2,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import SampleVideo from "../assets/sample.mp4";
import SampleVideo2 from "../assets/sample2.mp4";

const ReelsPage = () => {
  // ---- Arrays ----
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
        "Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling. Sample video description demonstrating smooth auto-play and mute toggling.",
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

  // --- UseStates ----
  const [isMuted, setIsMuted] = useState(true);

  // ---- UseRefs ----
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // --- Functions ----
  const scroll = (direction) => {
    if (!containerRef.current) return;
    const offset =
      direction === "up"
        ? -containerRef.current.clientHeight
        : containerRef.current.clientHeight;
    containerRef.current.scrollBy({ top: offset, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-neutral-900">
      <div className="absolute top-4 left-4">
        <button type="button" className="text-white hover:text-gray-300">
          <X size={24} onClick={() => navigate("/en")} />
        </button>
      </div>

      <div
        ref={containerRef}
        className="w-full max-w-sm h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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

      <div className="absolute z-30 flex-col hidden gap-4 -translate-y-1/2 right-4 top-1/2 md:flex">
        <button
          onClick={() => scroll("up")}
          className="p-3 text-white transition rounded-full shadow-lg bg-neutral-800/80 hover:bg-neutral-700"
        >
          <ChevronUp size={24} />
        </button>
        <button
          onClick={() => scroll("down")}
          className="p-3 text-white transition rounded-full shadow-lg bg-neutral-800/80 hover:bg-neutral-700"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
};

export default ReelsPage;
