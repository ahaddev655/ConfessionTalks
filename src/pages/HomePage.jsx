import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SampleVideo from "../assets/sample.mp4";
import SampleVideo2 from "../assets/sample2.mp4";
import {
  Volume2,
  VolumeOff,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Bookmark,
  Send,
  MoreHorizontal,
} from "lucide-react";

const formatCount = (count) => {
  if (count === undefined || count === null) return "0";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
};

const HomePage = () => {
  const uname = "ahad.shk.0";
  const navigate = useNavigate();

  // ---- Mock Data ----
  const initialVideos = [
    {
      id: 1,
      video_id: "qasw36210jsc",
      video_url: SampleVideo,
      description: "Exploring nature views 🌿✨ #nature #vibes",
      likes: 1250,
      commentList: [
        {
          id: 101,
          user: {
            username: "traveler_joe",
            avatar: "https://i.pravatar.cc/150?img=33",
          },
          comment: "Incredible shot!",
          timestamp: "2h ago",
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
      video_id: "zxcv98765mlk",
      video_url: SampleVideo2,
      description: "Quick frontend workflow preview 🚀 #react #tailwind #ui",
      likes: 1250000,
      commentList: [
        {
          id: 1,
          user: {
            username: "dev_alex",
            avatar: "https://i.pravatar.cc/150?img=12",
          },
          comment: "Clean UI implementation!",
          timestamp: "12h ago",
        },
        {
          id: 2,
          user: {
            username: "ui_designer",
            avatar: "https://i.pravatar.cc/150?img=47",
          },
          comment: "Love the micro-interactions!",
          timestamp: "5h ago",
        },
      ],
      user: {
        username: "ahad.shk.0",
        avatar:
          "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
      },
    },
  ];

  // ---- Local UI States ----
  const [videos, setVideos] = useState(initialVideos);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [likedVideos, setLikedVideos] = useState({});
  const [savedVideos, setSavedVideos] = useState({});
  const [newComment, setNewComment] = useState("");

  // ---- Refs ----
  const scrollContainerRef = useRef(null);
  const videoRefs = useRef([]);

  // ---- Handlers ----
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
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

  const toggleLike = (videoId) => {
    setLikedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const toggleSave = (videoId) => {
    setSavedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedVideo) return;

    const updatedComment = {
      id: Date.now(),
      user: {
        username: uname,
        avatar:
          "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg",
      },
      comment: newComment.trim(),
      timestamp: "Just now",
    };

    setVideos((prevVideos) =>
      prevVideos.map((vid) =>
        vid.id === selectedVideo.id
          ? { ...vid, commentList: [updatedComment, ...vid.commentList] }
          : vid,
      ),
    );

    setSelectedVideo((prev) => ({
      ...prev,
      commentList: [updatedComment, ...prev.commentList],
    }));

    setNewComment("");
  };

  // ---- Auto-Play Observer ----
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
  }, [videos]);

  const currentComments = selectedVideo?.commentList || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      {/* Comments Drawer / Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          selectedVideo
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSelectedVideo(null)}
      >
        <div
          className="w-full max-w-lg rounded-t-3xl sm:rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col h-[80vh] sm:h-162.5 overflow-hidden transition-transform duration-300 transform scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
            <h2 className="text-base font-semibold text-slate-900">
              Comments ({currentComments.length})
            </h2>
            <button
              onClick={() => setSelectedVideo(null)}
              className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Comment List */}
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {currentComments.length > 0 ? (
              currentComments.map((comment) => (
                <div key={comment.id} className="flex gap-3 items-start group">
                  <Link
                    to={`/en/@${comment.user.username}`}
                    className="shrink-0"
                  >
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.username}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/en/@${comment.user.username}`}
                        className="text-xs font-semibold text-slate-900 hover:underline"
                      >
                        @{comment.user.username}
                      </Link>
                      <span className="text-[10px] text-slate-500">
                        {comment.timestamp || "12h"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-700 wrap-break-word leading-snug">
                      {comment.comment}
                    </p>
                  </div>
                  <button className="text-slate-400 hover:text-red-600 transition-colors p-1">
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <MessageCircle className="w-10 h-10 mb-2 stroke-1 opacity-50" />
                <p className="text-sm">
                  No comments yet. Start the conversation!
                </p>
              </div>
            )}
          </div>

          {/* Comment Input */}
          <form
            onSubmit={handleAddComment}
            className="p-3 border-t border-slate-200 bg-slate-50 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-white text-slate-900 text-sm rounded-full px-4 py-2.5 outline-none border border-slate-300 focus:border-blue-600 transition-colors placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Feed Container */}
      <main className="max-w-md mx-auto px-2 sm:px-4 py-6">
        {/* Stories Slider */}
        <div className="relative group mb-8">
          <button
            onClick={() => handleScroll("left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-slate-100 text-slate-700 p-2 rounded-full shadow-md border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex items-center gap-3 overflow-x-auto scroll-smooth py-2 px-1 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <Link
                to={`/stories/@${uname}`}
                key={index}
                className="shrink-0 flex flex-col items-center gap-1.5 w-16 group/story"
              >
                {/* Gradient Ring Wrapper */}
                <div className="p-0.5 rounded-full bg-linear-to-tr from-amber-500 via-rose-500 to-blue-600 group-hover/story:scale-105 transition-transform duration-200">
                  <div className="p-0.5 bg-white rounded-full">
                    <img
                      src="https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                      alt={`Story by ${uname}`}
                      className="w-13 h-13 rounded-full object-cover"
                    />
                  </div>
                </div>
                <span className="w-full text-[11px] text-center truncate text-slate-500 group-hover/story:text-slate-900 transition-colors">
                  {index === 0 ? "Your story" : uname}
                </span>
              </Link>
            ))}
          </div>

          <button
            onClick={() => handleScroll("right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-slate-100 text-slate-700 p-2 rounded-full shadow-md border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Video Feed */}
        <section className="space-y-8">
          {videos.map((video, index) => {
            const isLiked = likedVideos[video.id];
            const isSaved = savedVideos[video.id];
            const likeCount = video.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={video.id}
                className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
              >
                {/* Header Profile Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={video.user.avatar || "https://i.pravatar.cc/150"}
                      alt={video.user.username}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span className="text-xs font-semibold text-slate-900">
                      @{video.user.username}
                    </span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-700 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Media Container */}
                <div className="relative aspect-9/16 max-h-150 w-full bg-slate-950">
                  <video
                    onClick={() => togglePlayPause(index)}
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video.video_url}
                    className="w-full h-full object-cover cursor-pointer"
                    muted={isMuted}
                    loop
                    playsInline
                  />

                  {/* Gradient Mask for Overlay Text */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                  {/* Mute Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                    type="button"
                    className="absolute top-4 right-4 bg-slate-900/50 backdrop-blur-md hover:bg-slate-900/70 text-white p-2 rounded-full border border-white/20 transition-all z-10"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeOff size={16} /> : <Volume2 size={16} />}
                  </button>

                  {/* Description Overlay */}
                  {video.description && (
                    <div className="absolute bottom-4 left-4 right-16 z-10 pointer-events-none">
                      <p className="text-xs text-white line-clamp-2 leading-relaxed drop-shadow-sm">
                        {video.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Interactive Action Bar */}
                <div className="flex items-center justify-between px-5 py-3 bg-white">
                  <div className="flex items-center gap-5">
                    {/* Like Action */}
                    <button
                      type="button"
                      onClick={() => toggleLike(video.id)}
                      className="flex items-center gap-1.5 text-slate-600 hover:text-red-600 transition-colors group"
                    >
                      <Heart
                        size={20}
                        className={`transition-all duration-200 ${
                          isLiked
                            ? "fill-red-600 text-red-600 scale-110"
                            : "group-hover:scale-110"
                        }`}
                      />
                      <span className="text-xs font-medium text-slate-700">
                        {formatCount(likeCount)}
                      </span>
                    </button>

                    {/* Comment Action */}
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(video)}
                      className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors group"
                    >
                      <MessageCircle
                        size={20}
                        className="group-hover:scale-110 transition-transform duration-200"
                      />
                      <span className="text-xs font-medium text-slate-700">
                        {formatCount(video.commentList?.length)}
                      </span>
                    </button>
                  </div>

                  {/* Bookmark/Save Action */}
                  <button
                    type="button"
                    onClick={() => toggleSave(video.id)}
                    className="text-slate-600 hover:text-amber-500 transition-colors group"
                  >
                    <Bookmark
                      size={20}
                      className={`transition-all duration-200 ${
                        isSaved
                          ? "fill-amber-500 text-amber-500 scale-110"
                          : "group-hover:scale-110"
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
