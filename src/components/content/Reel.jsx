import React, { useRef, useState } from "react";
import { Video, X, Hash, Plus, Play, Pause, FileText } from "lucide-react";

const Reel = () => {
  // ---- State ----
  const [videoPreview, setVideoPreview] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [hashtags, setHashtags] = useState([]);

  // ---- Refs ----
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  // ---- Video Handlers ----
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
      setIsPlaying(false);
    }
  };

  const handleRemoveVideo = () => {
    setVideoPreview("");
    setIsPlaying(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // ---- Form Handlers ----
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddHashtag = () => {
    if (!tagInput.trim()) return;
    let formatted = tagInput.trim().replace(/^#+/, ""); // Strip leading '#' if typed
    if (formatted && !hashtags.includes(formatted) && hashtags.length < 10) {
      setHashtags((prev) => [...prev, formatted]);
      setTagInput("");
    }
  };

  const handleRemoveHashtag = (tagToRemove) => {
    setHashtags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="max-w-3xl p-4 mx-auto bg-white border shadow-sm sm:p-6 border-slate-200 rounded-2xl">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 gap-6 md:grid-cols-12"
      >
        {/* Hidden File Input */}
        <input
          type="file"
          accept="video/*"
          ref={fileRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Left Column: Vertical Video Upload / Preview */}
        <div className="flex flex-col items-center md:col-span-5">
          {!videoPreview ? (
            <div
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center justify-center w-full p-6 transition-all border-2 border-dashed cursor-pointer aspect-9/16 max-h-105 border-slate-200 hover:border-brand-accent bg-slate-50 hover:bg-slate-100/50 rounded-2xl group"
            >
              <div className="p-4 mb-3 transition-transform bg-white border rounded-full shadow-sm border-slate-100 text-slate-500 group-hover:text-brand-accent group-hover:scale-110">
                <Video size={30} strokeWidth={1.75} />
              </div>
              <p className="text-xs font-semibold text-center text-slate-700 group-hover:text-brand-accent">
                Upload Reel Video
              </p>
              <p className="mt-1 text-[11px] text-slate-400 text-center">
                MP4 or MOV up to 60s (9:16 recommended)
              </p>
            </div>
          ) : (
            <div className="relative w-full overflow-hidden bg-black shadow-md aspect-9/16 max-h-105 rounded-2xl group">
              <video
                ref={videoRef}
                src={videoPreview}
                className="object-cover w-full h-full"
                onEnded={() => setIsPlaying(false)}
              />

              {/* Video Play/Pause Overlay */}
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/20 group-hover:opacity-100"
              >
                <div className="p-3 text-white transition-transform rounded-full bg-white/30 backdrop-blur-sm hover:scale-110">
                  {isPlaying ? (
                    <Pause size={24} />
                  ) : (
                    <Play size={24} className="ml-0.5" />
                  )}
                </div>
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={handleRemoveVideo}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Reel Details */}
        <div className="flex flex-col justify-between space-y-4 md:col-span-7">
          <div className="space-y-4">
            {/* Title Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider uppercase text-slate-600">
                Reel Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Give your reel a catchy title..."
                className="w-full h-10 px-3 text-sm font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent placeholder:text-slate-400"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wider uppercase text-slate-600">
                Description
              </label>
              <div className="relative flex">
                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write a description or caption..."
                  className="w-full p-3 text-sm font-medium border resize-none pl-9 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent placeholder:text-slate-400"
                />
                <FileText
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-300 pointer-events-none"
                />
              </div>
            </div>

            {/* Hashtags Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold tracking-wider uppercase text-slate-600">
                  Hashtags
                </label>
                <span className="text-[11px] text-slate-400">
                  {hashtags.length}/10
                </span>
              </div>

              {/* Hashtag Input */}
              {hashtags.length < 10 && (
                <div className="relative flex items-center gap-2">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Add tag (e.g. trending)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddHashtag();
                        }
                      }}
                      className="w-full pl-8 pr-3 text-sm font-medium border rounded-lg h-9 border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent"
                    />
                    <Hash
                      size={15}
                      className="absolute left-2.5 top-2.5 text-slate-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddHashtag}
                    className="flex items-center gap-1 px-3 text-xs font-semibold text-white transition-colors rounded-lg h-9 bg-slate-800 hover:bg-slate-900 shrink-0"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
              )}

              {/* Added Hashtags Pills */}
              {hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-brand-accent bg-blue-50 border border-blue-100 rounded-md"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveHashtag(tag)}
                        className="transition-colors hover:text-red-500"
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={!videoPreview || !formData.title.trim()}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-brand-accent hover:bg-blue-600 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Share Reel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reel;
