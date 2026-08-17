import {
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ReelItem = ({ video, isMuted, toggleMute }) => {
  // --- UseRefs ----
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  // --- UseStates ----
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentsToggle, setCommentsToggle] = useState(false);
  const [progress, setProgress] = useState(0);

  // --- Variables ----
  const allComments = video?.commentList || [];

  // --- UseEffects ----
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        if (entry.isIntersecting) {
          videoEl.currentTime = 0;
          videoEl
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          videoEl.pause();
          videoEl.currentTime = 0;
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 },
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  // --- Functions ----
  const handleTimeUpdate = () => {
    if (videoRef.current?.duration) {
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100,
      );
    }
  };

  const handleSeek = (e) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const percentage =
      Math.max(0, Math.min(e.clientX - rect.left, rect.width)) / rect.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
    setProgress(percentage * 100);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-slate-950 snap-start shrink-0">
      <div className="relative w-full h-full max-w-sm overflow-hidden bg-slate-950">
        <video
          ref={videoRef}
          src={video?.video_url}
          className="object-cover w-full h-full cursor-pointer"
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlayPause}
        />

        {/* Mute/Unmute Overlay Button */}
        <button
          onClick={toggleMute}
          className="absolute z-20 p-2 text-white transition rounded-full top-4 right-4 bg-slate-900/40 backdrop-blur-md hover:bg-slate-900/60"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Right Action Bar */}
        <div className="absolute z-20 flex flex-col items-center gap-5 text-white right-3 bottom-20">
          <button
            onClick={() => setLiked(!liked)}
            className="flex flex-col items-center group"
          >
            <Heart
              size={28}
              className={`transition-colors ${
                liked
                  ? "fill-red-500 text-red-500"
                  : "text-white group-hover:text-slate-200"
              }`}
            />
            <span className="mt-1 text-xs font-semibold">
              {(video?.likes || 0) + (liked ? 1 : 0)}
            </span>
          </button>

          <button
            onClick={() => setCommentsToggle(true)}
            className="flex flex-col items-center group"
          >
            <MessageCircle
              size={28}
              className="text-white transition-colors group-hover:text-slate-200"
            />
            <span className="mt-1 text-xs font-semibold">
              {allComments.length}
            </span>
          </button>

          <button className="flex flex-col items-center group">
            <Share2
              size={28}
              className="text-white transition-colors group-hover:text-slate-200"
            />
            <span className="mt-1 text-xs font-medium">Share</span>
          </button>
        </div>

        {/* Bottom Details Overlay */}
        <div className="absolute left-0 z-20 p-4 text-white bottom-3 right-12 bg-linear-to-t from-slate-950/90 via-slate-950/50 to-transparent">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={
                video?.user?.avatar ||
                "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
              }
              alt={video?.user?.username || "User avatar"}
              className="object-cover border rounded-full w-9 h-9 border-white/30 shrink-0"
            />
            <span className="text-sm font-semibold truncate">
              @{video?.user?.username || "user"}
            </span>
            <button className="px-3 py-1 text-xs font-semibold transition-colors border rounded-full bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30 shrink-0">
              Follow
            </button>
          </div>

          <div className="mb-2 overflow-y-auto max-h-28 scrollbar-none">
            <p
              className={`text-sm text-slate-200 leading-snug wrap-break-word ${
                !isExpanded ? "line-clamp-2" : ""
              }`}
            >
              {video?.description}
            </p>
            {video?.description?.length > 85 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 text-xs font-semibold underline transition-colors text-slate-400 hover:text-white"
              >
                {isExpanded ? "less" : "more"}
              </button>
            )}
          </div>

          {video?.hashtags && video.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 text-xs font-medium text-blue-400">
              {video.hashtags.map((tag, i) => (
                <span key={i}>#{tag.replace(/^#/, "")}</span>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Bottom Progress Bar */}
        <div
          ref={progressBarRef}
          onClick={handleSeek}
          className="absolute bottom-0 left-0 right-0 z-30 flex items-center h-1.5 transition-all cursor-pointer bg-white/20 hover:h-2 group"
        >
          <div
            className="relative h-full transition-all duration-75 bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Comments Modal Popup */}
        {commentsToggle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setCommentsToggle(false)}
          >
            <div
              className="w-full max-w-lg rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200 flex flex-col max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">
                  Comments ({allComments.length})
                </h2>
                <button
                  onClick={() => setCommentsToggle(false)}
                  className="p-1.5 text-slate-400 rounded-full hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content / Comments List */}
              <div className="p-6 space-y-4 overflow-y-auto">
                {allComments.length > 0 ? (
                  allComments.map((comment, i) => (
                    <div
                      key={comment.id || i}
                      className="flex items-start gap-3"
                    >
                      <Link
                        to={`/en/@${comment?.user?.username}`}
                        className="shrink-0"
                      >
                        <img
                          src={
                            comment?.user?.avatar ||
                            "https://i.pinimg.com/1200x/64/bf/8c/64bf8c6fb58635059b76999b7a3eeda7.jpg"
                          }
                          alt={comment?.user?.username || "Commenter avatar"}
                          className="object-cover transition-all rounded-full w-9 h-9 ring-1 ring-slate-200 hover:ring-blue-600"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/en/@${comment?.user?.username}`}
                          className="block text-xs font-semibold truncate text-slate-900 hover:underline"
                        >
                          @{comment?.user?.username || "user"}
                        </Link>
                        <p className="mt-1 text-sm leading-snug text-slate-700 wrap-break-word">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm font-medium text-slate-500">
                      No comments yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelItem;
