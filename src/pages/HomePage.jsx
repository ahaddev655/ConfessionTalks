import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SampleVideo from "../assets/sample.mp4";
import SampleVideo2 from "../assets/sample2.mp4";
import {
  Volume2,
  VolumeOff,
  Heart,
  X,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Bookmark,
} from "lucide-react";

const formatCount = (count) => {
  if (count === undefined || count === null) return "0";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
};

const HomePage = () => {
  // ---- Variables ----
  const uname = "ahad.shk.0";
  const navigate = useNavigate();

  // ---- Arrays ----
  const videos = [
    {
      id: 1,
      video_id: "qasw36210jsc",
      video_url: SampleVideo,
      likes: 1250,
      commentList: [],
      user: {
        username: "ahad.shk.0",
        avatar:
          "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
      },
    },
    {
      id: 2,
      video_id: "qasw36210jsc",
      video_url: SampleVideo2,
      description: "This is a sample video description.",
      likes: 1250000,
      hastags: ["#sample", "#video", "#test"],
      commentList: [
        {
          id: 1,
          user: {
            username: "user1",
            avatar:
              "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
          },
          comment: "Great video!",
        },
        {
          id: 2,
          user: {
            username: "user2",
            avatar:
              "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
          },
          comment: "I love this!",
        },
      ],
      user: {
        username: "ahad.shk.0",
      },
    },
  ];

  // ---- UseStates ----
  const [isMuted, setIsMuted] = useState(true);
  const [commentsToggle, setCommentsToggle] = useState(false);

  // ---- Derived Data ----
  const allComments = videos.flatMap((video) => video.commentList || []);

  // ---- Refs ----
  const scrollContainerRef = useRef(null);
  const videoRefs = useRef([]);

  // ---- Functions ----
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const togglePlayPause = (index) => {
    const videoElement = videoRefs.current[index];
    if (!videoElement) return;

    if (videoElement.paused) {
      videoElement.play().catch(() => {});
    } else {
      videoElement.pause();
    }
  };

  // ---- UseEffects ----
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play().catch(() => {});
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.6 },
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Modals */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-200 ${
          commentsToggle
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCommentsToggle(false)}
      >
        {/* Modal Container */}
        <div
          className="w-full max-w-lg mx-4 rounded-2xl bg-card-bg shadow-2xl border border-white/10 flex flex-col max-h-[80vh] overflow-hidden transition-all transform scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative flex items-center justify-between px-6 py-4 border-b border-border-color">
            <h2 className="text-lg font-bold text-heading-text">
              Comments ({allComments.length})
            </h2>
            <button
              onClick={() => setCommentsToggle(false)}
              className="p-1 transition-colors rounded-full text-body-text hover:text-heading-text hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Comment List */}
          <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
            {allComments.length > 0 ? (
              allComments.map((comment, i) => (
                <div key={comment.id || i}>
                  <div className={i !== 0 ? "pt-4" : ""}>
                    <div className="flex items-start justify-between gap-3">
                      {/* User Avatar */}
                      <Link
                        to={`/en/@${comment.user.username}`}
                        className="shrink-0"
                      >
                        <img
                          src={comment.user.avatar}
                          alt={comment.user.username}
                          className="object-cover w-10 h-10 transition-all rounded-full ring-2 ring-transparent hover:ring-brand-accent"
                        />
                      </Link>

                      {/* Comment Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <Link
                            to={`/en/@${comment.user.username}`}
                            className="text-sm font-semibold truncate text-heading-text hover:underline"
                          >
                            @{comment.user.username}
                          </Link>
                          <span className="text-xs text-body-text/60">12h</span>
                        </div>

                        <p className="mt-1 text-sm leading-relaxed text-body-text wrap-break-word">
                          {comment.comment}
                        </p>

                        {/* Action Row */}
                        <div className="flex items-center gap-4 mt-2 text-xs text-body-text/80">
                          12.1K likes
                        </div>
                      </div>

                      {/* Actions (Like / Menu) */}
                      <div className="pt-1 text-body-text/60">
                        <button className="transition-colors hover:text-red-500">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {i < allComments.length - 1 && (
                    <hr className="border-border-color! rounded-full my-3" />
                  )}
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-body-text/60">
                No comments yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-xl p-4 mx-auto">
        {/* Stories Slider Wrapper */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute -left-2 top-8 -translate-y-1/2 z-10 bg-card-bg/90 hover:bg-card-bg text-heading-text p-1.5 rounded-full shadow-md border border-border-color opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Scroll left"
          >
            <ArrowLeft size={16} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-4 overflow-x-auto scroll-smooth py-1 px-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <Link
                to={`/stories/@${uname}`}
                key={index}
                className="shrink-0 flex flex-col items-center gap-1.5 w-[calc((100%-5*0.15rem)/6)] sm:w-[calc((100%-5*1rem)/6)] cursor-pointer group/story"
              >
                {/* Instagram-style Ring Container */}
                <div className="p-0.5 rounded-full bg-border-color group-hover/story:bg-brand-accent group-hover/story:scale-105 transition-all duration-200">
                  <div className="p-0.5 bg-card-bg rounded-full">
                    <img
                      src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                      alt={`Story by ${uname}`}
                      className="object-cover w-12 h-12 rounded-full sm:w-14 sm:h-14"
                    />
                  </div>
                </div>

                {/* Username label */}
                <span className="w-full text-xs text-center truncate text-body-text">
                  {uname}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute -right-2 top-8 -translate-y-1/2 z-10 bg-card-bg/90 hover:bg-card-bg text-heading-text p-1.5 rounded-full shadow-md border border-border-color opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Scroll right"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Reels */}
        <div className="mt-6 space-y-5">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="relative w-[75%] mx-auto cursor-pointer"
            >
              {/* Reel */}
              <video
                onClick={() => togglePlayPause(index)}
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.video_url}
                className="object-cover w-full rounded-lg shadow-md h-150"
                muted={isMuted}
                loop
                playsInline
              />

              {/* Muted/UnMuted Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                type="button"
                className="absolute bg-black/50 p-1.5 rounded-full bottom-12 right-5 z-10"
              >
                {isMuted ? (
                  <VolumeOff size={16} color="white" />
                ) : (
                  <Volume2 size={16} color="white" />
                )}
              </button>

              {/* Likes, Comments, Save Button */}
              <div className="flex items-center justify-between gap-2 mt-3">
                <div className="flex items-center gap-3">
                  {/* Likes */}
                  <div className="flex items-center gap-1 text-heading-text">
                    <Heart
                      size={18}
                      strokeWidth={1.5}
                      className="cursor-pointer"
                    />
                    <p className="text-heading-text">
                      {formatCount(video.likes)}
                    </p>
                  </div>

                  {/* Comments */}
                  <button
                    type="button"
                    onClick={() => setCommentsToggle(true)}
                    className="flex items-center gap-1 text-heading-text"
                  >
                    <MessageCircle
                      size={18}
                      strokeWidth={1.5}
                      className="cursor-pointer"
                    />
                    <p className="text-heading-text">
                      {formatCount(video.commentList?.length)}
                    </p>
                  </button>
                </div>

                {/* Save */}
                <div className="flex items-center gap-1 text-heading-text">
                  <Bookmark
                    size={18}
                    strokeWidth={1.5}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
