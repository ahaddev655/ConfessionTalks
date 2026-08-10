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
  const allComments = video.commentList || [];

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
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-black snap-start shrink-0">
      <div className="relative w-full h-full max-w-sm overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={video.video_url}
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
          className="absolute z-20 p-2 text-white transition rounded-full top-4 right-4 bg-black/40 backdrop-blur-md hover:bg-black/60"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Right Action Bar */}
        <div className="absolute z-20 flex flex-col items-center gap-5 text-white right-3 bottom-20">
          <button
            onClick={() => setLiked(!liked)}
            className="flex flex-col items-center"
          >
            <Heart
              size={28}
              className={liked ? "fill-red-500 text-red-500" : "text-white"}
            />
            <span className="mt-1 text-xs font-semibold">
              {video.likes + (liked ? 1 : 0)}
            </span>
          </button>

          <button
            onClick={() => setCommentsToggle(true)}
            className="flex flex-col items-center"
          >
            <MessageCircle size={28} />
            <span className="mt-1 text-xs font-semibold">
              {allComments.length}
            </span>
          </button>

          <button className="flex flex-col items-center">
            <Share2 size={28} />
            <span className="mt-1 text-xs">Share</span>
          </button>
        </div>

        {/* Bottom Details */}
        <div className="absolute left-0 z-20 p-4 text-white bottom-3 right-12 bg-linear-to-t from-black/90 via-black/50 to-transparent">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={video.user.avatar || "https://via.placeholder.com/40"}
              alt={video.user.username}
              className="object-cover border rounded-full w-9 h-9 border-white/40"
            />
            <span className="text-sm font-semibold">
              @{video.user.username}
            </span>
            <button className="px-3 py-1 text-xs font-semibold border rounded-full bg-white/20 backdrop-blur-sm border-white/40">
              Follow
            </button>
          </div>

          <div className="mb-2 overflow-auto max-h-100 scrollbar-none">
            <p
              className={`text-sm text-gray-200 ${!isExpanded ? "line-clamp-2" : ""}`}
            >
              {video.description}
            </p>
            {video.description?.length > 85 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 text-xs font-semibold text-gray-400 underline hover:text-white"
              >
                {isExpanded ? "less" : "more"}
              </button>
            )}
          </div>

          {video.hashtags && (
            <div className="flex flex-wrap gap-2 text-xs font-medium text-blue-400">
              {video.hashtags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Bottom Progress Bar */}
        <div
          ref={progressBarRef}
          onClick={handleSeek}
          className="absolute bottom-0 left-0 right-0 z-30 flex items-center h-1.5 rounded-full transition-all cursor-pointer bg-white/20 hover:h-2 group"
        >
          <div
            className="relative h-full transition-all duration-75 bg-white rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Comments Modal */}
        {commentsToggle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            onClick={() => setCommentsToggle(false)}
          >
            <div
              className="w-full max-w-lg mx-4 rounded-2xl bg-neutral-900 text-white shadow-2xl border border-white/10 flex flex-col max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-bold">
                  Comments ({allComments.length})
                </h2>
                <button
                  onClick={() => setCommentsToggle(false)}
                  className="p-1 text-gray-400 rounded-full hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto">
                {allComments.length > 0 ? (
                  allComments.map((comment, i) => (
                    <div
                      key={comment.id || i}
                      className="flex items-start gap-3"
                    >
                      <Link to={`/en/@${comment.user.username}`}>
                        <img
                          src={comment.user.avatar}
                          alt={comment.user.username}
                          className="object-cover w-10 h-10 rounded-full"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/en/@${comment.user.username}`}
                          className="text-sm font-semibold hover:underline"
                        >
                          @{comment.user.username}
                        </Link>
                        <p className="mt-1 text-sm text-gray-300">
                          {comment.comment}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-8 text-center text-gray-400">
                    No comments yet.
                  </p>
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
