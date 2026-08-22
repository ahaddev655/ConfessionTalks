import {
  Camera,
  ImagePlus,
  X,
  RefreshCw,
  Captions,
  Tag,
  Plus,
  FileImage,
} from "lucide-react";
import React, { useRef, useState } from "react";
import InputItem from "../InputItem";

const Post = () => {
  // ---- State ----
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [hashtags, setHashtags] = useState([]);

  // ---- Refs ----
  const fileRef = useRef(null);

  // ---- Handlers ----
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
      setSelectedFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    setSelectedFile(null);
    setAvatarPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleAddHashtag = () => {
    if (!tagInput.trim()) return;
    const formatted = tagInput.trim().replace(/^#+/, "");
    if (formatted && !hashtags.includes(formatted) && hashtags.length < 8) {
      setHashtags((prev) => [...prev, formatted]);
      setTagInput("");
    }
  };

  const handleRemoveHashtag = (tagToRemove) => {
    setHashtags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const isFormEmpty =
    !selectedFile &&
    !postData.title.trim() &&
    hashtags.length === 0 &&
    !postData.description.trim();

  return (
    <div className="max-w-xl p-6 mx-auto bg-white border shadow-sm rounded-2xl border-slate-200/80">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        {/* Hidden Input File */}
        <input
          type="file"
          name="post"
          id="post"
          accept="image/*"
          className="hidden"
          ref={fileRef}
          onChange={handleFileChange}
        />

        {/* Media Upload Area */}
        {!avatarPreview ? (
          <div
            onClick={() => fileRef.current?.click()}
            className="flex flex-col items-center justify-center w-full p-8 transition-all border-2 border-dashed cursor-pointer min-h-55 rounded-2xl border-slate-200 hover:border-brand-accent bg-slate-50/60 hover:bg-slate-100/40 group"
          >
            <div className="p-4 mb-3 transition-transform duration-200 bg-white border rounded-full shadow-sm border-slate-100 group-hover:scale-110 text-slate-500 group-hover:text-brand-accent">
              <ImagePlus size={26} strokeWidth={1.75} />
            </div>
            <p className="text-sm font-semibold transition-colors text-slate-700 group-hover:text-brand-accent">
              Add photos to your post
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Drag & drop or click to browse files
            </p>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden shadow-inner rounded-2xl bg-slate-950 group">
            <img
              src={avatarPreview}
              alt="Post preview"
              className="block object-cover w-full max-h-96 transition-transform duration-300 group-hover:scale-[1.01]"
            />

            {/* Top Bar File Indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
              <FileImage size={14} className="text-slate-300" />
              <span className="truncate max-w-35">
                {selectedFile?.name}
              </span>
            </div>

            {/* Hover Action Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-200 opacity-0 bg-black/40 backdrop-blur-[2px] group-hover:opacity-100">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl transition-all active:scale-95"
              >
                <RefreshCw size={14} />
                Change
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-500/80 hover:bg-red-600 backdrop-blur-md rounded-xl transition-all active:scale-95"
              >
                <X size={14} />
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Post Title */}
        <InputItem
          identity="title"
          changeFunct={handleInputChange}
          label="Post Title"
          placeholder="Give your post a title..."
          value={postData.title}
          Icon={Captions}
        />

        {/* Interactive Hashtag Manager */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold tracking-wider uppercase text-slate-600">
              Hashtags
            </label>
            <span className="text-[11px] font-medium text-slate-400">
              {hashtags.length}/8
            </span>
          </div>

          {hashtags.length < 8 && (
            <div className="relative flex items-center gap-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Add hashtag (e.g. photography)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddHashtag();
                    }
                  }}
                  className="w-full h-10 pr-3 text-sm font-medium border pl-9 rounded-xl border-slate-200 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 text-slate-800 placeholder:text-slate-400"
                />
                <Tag
                  size={16}
                  className="absolute pointer-events-none left-3 top-3 text-slate-400"
                />
              </div>
              <button
                type="button"
                onClick={handleAddHashtag}
                className="flex items-center h-10 gap-1 px-4 text-xs font-semibold text-white transition-colors bg-slate-800 hover:bg-slate-900 rounded-xl shrink-0"
              >
                <Plus size={15} /> Add
              </button>
            </div>
          )}

          {/* Tag Pills */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-brand-accent bg-blue-50 border border-blue-100 rounded-lg"
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

        {/* Description Field */}
        <div className="space-y-1">
          <label className="text-xs font-semibold tracking-wider uppercase text-slate-600">
            Description
          </label>
          <textarea
            rows={4}
            maxLength={250}
            id="description"
            name="description"
            value={postData.description}
            onChange={handleInputChange}
            placeholder="What's on your mind? Write a detailed description..."
            className="w-full p-3.5 text-sm transition-all border resize-none rounded-xl placeholder:text-slate-400 border-slate-200 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 text-slate-800"
          />
          <div className="text-[11px] font-medium text-right text-slate-400">
            {postData.description.length}/250
          </div>
        </div>

        {/* Form Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="p-2.5 transition-colors rounded-xl text-slate-500 hover:text-brand-accent hover:bg-slate-100"
            title="Attach Media"
          >
            <Camera size={20} />
          </button>

          <button
            type="submit"
            disabled={isFormEmpty}
            className="px-6 py-2.5 text-xs font-semibold text-white transition-all shadow-sm bg-brand-accent hover:bg-blue-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Post;
