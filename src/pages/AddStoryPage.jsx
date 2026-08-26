import React, { useRef, useState } from "react";
import {
  ImagePlus,
  X,
  Type,
  Palette,
  Sparkles,
  Send,
  RefreshCw,
} from "lucide-react";

const AddStoryPage = () => {
  // ---- UseStates ----
  const [formData, setFormData] = useState({
    mediaFile: null,
    mediaPreview: "",
    mediaType: "image",
    storyText: "",
    textColor: "#FFFFFF",
    hasBackground: true,
    bgColor: "#000000",
    verticalPos: "center",
    horizontalPos: "center",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---- Color Options ----
  const colorOptions = [
    "#FFFFFF",
    "#000000",
    "#2563EB",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
  ];

  // ---- Refs ----
  const fileRef = useRef(null);

  // ---- Helpers ----
  const updateForm = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  // Positioning classes helper
  const getPositionClasses = () => {
    let classes = "";

    if (formData.verticalPos === "top") classes += "top-12 ";
    else if (formData.verticalPos === "bottom") classes += "bottom-12 ";
    else classes += "top-1/2 -translate-y-1/2 ";

    if (formData.horizontalPos === "left")
      classes += "text-left left-4 right-auto";
    else if (formData.horizontalPos === "right")
      classes += "text-right right-4 left-auto";
    else classes += "text-center left-4 right-4";

    return classes;
  };

  // ---- Handlers ----
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (formData.mediaPreview) URL.revokeObjectURL(formData.mediaPreview);
      const isVideo = file.type.startsWith("video/");

      updateForm({
        mediaFile: file,
        mediaType: isVideo ? "video" : "image",
        mediaPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleRemoveMedia = () => {
    if (formData.mediaPreview) URL.revokeObjectURL(formData.mediaPreview);
    updateForm({
      mediaFile: null,
      mediaPreview: "",
      mediaType: "image",
    });
    if (fileRef.current) fileRef.current.value = "";
  };

  // ---- Backend Submit Handler ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormEmpty || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const data = new FormData();

      if (!formData.mediaFile) {
        alert("Upload a post or a reel...");
      }

      if (formData.mediaFile) {
        data.append("media", formData.mediaFile);
      }

      data.append("mediaType", formData.mediaType);
      data.append("storyText", formData.storyText);
      data.append("textColor", formData.textColor);
      data.append("hasBackground", formData.hasBackground);
      data.append("bgColor", formData.bgColor);
      data.append("verticalPos", formData.verticalPos);
      data.append("horizontalPos", formData.horizontalPos);

      // API Call

      console.log("Form payload ready to send:", Object.fromEntries(data));
      alert("Story submitted successfully!");
    } catch (error) {
      console.error("Error submitting story:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormEmpty = !formData.mediaPreview && !formData.storyText.trim();

  return (
    <div className="max-w-4xl p-4 mx-auto sm:p-6">
      {/* Header */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create Your Story
          </h1>
          <Sparkles size={20} className="text-brand-accent animate-pulse" />
        </div>
        <p className="text-sm text-slate-500">
          Share quick photos or short videos with your audience.
        </p>
      </div>

      <hr className="my-6 border-slate-200" />

      {/* Editor Form */}
      <form
        onSubmit={handleSubmit}
        className="grid items-start grid-cols-1 gap-8 md:grid-cols-12"
      >
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*,video/*"
          ref={fileRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Left Column: Mobile Story Viewport Preview */}
        <div className="flex flex-col items-center md:col-span-5">
          <label className="mb-2 text-xs font-semibold tracking-wider uppercase text-slate-500">
            Story Live Preview
          </label>

          <div className="relative w-full aspect-9/16 max-h-120 bg-slate-950 rounded-3xl overflow-hidden shadow-xl border-4 border-slate-900 flex items-center justify-center group">
            {!formData.mediaPreview ? (
              <div
                onClick={() => fileRef.current?.click()}
                className="flex flex-col items-center justify-center w-full h-full p-6 text-center transition-colors cursor-pointer hover:bg-slate-900/50"
              >
                <div className="p-4 mb-3 transition-all rounded-full bg-slate-800 text-slate-400 group-hover:text-white group-hover:scale-110">
                  <ImagePlus size={32} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-slate-300">
                  Upload Media
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Tap to add a photo or video
                </p>
              </div>
            ) : (
              <>
                {/* Media Element */}
                {formData.mediaType === "image" ? (
                  <img
                    src={formData.mediaPreview}
                    alt="Story media"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <video
                    src={formData.mediaPreview}
                    className="object-cover w-full h-full"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}

                {/* Text Overlay Layer */}
                {formData.storyText && (
                  <div
                    className={`absolute p-3 transition-all ${getPositionClasses()}`}
                  >
                    <span
                      style={{
                        color: formData.textColor,
                        backgroundColor: formData.hasBackground
                          ? `${formData.bgColor}99`
                          : "transparent",
                      }}
                      className={`inline-block px-3 py-1.5 rounded-xl font-semibold text-sm wrap-break-word max-w-full ${
                        formData.hasBackground
                          ? "backdrop-blur-md shadow-md"
                          : "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      }`}
                    >
                      {formData.storyText}
                    </span>
                  </div>
                )}

                {/* Media Controls */}
                <div className="absolute flex items-center gap-2 transition-opacity opacity-0 top-3 right-3 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="p-2 text-white transition-colors rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md"
                    title="Change Media"
                  >
                    <RefreshCw size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveMedia}
                    className="p-2 text-white transition-colors rounded-full bg-black/60 hover:bg-red-500 backdrop-blur-md"
                    title="Remove Media"
                  >
                    <X size={15} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="p-6 space-y-6 bg-white border shadow-sm md:col-span-7 border-slate-200/80 rounded-2xl">
          {/* Text Overlay Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <Type size={16} />
              Overlay Text
            </label>
            <input
              type="text"
              value={formData.storyText}
              maxLength={100}
              onChange={(e) => updateForm({ storyText: e.target.value })}
              placeholder="Add text to your story..."
              className="w-full h-10 px-3.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent placeholder:text-slate-400"
            />
          </div>

          {/* Text Customization Options */}
          {formData.storyText && (
            <div className="pt-2 space-y-5 border-t border-slate-100">
              {/* Text Color Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  <Palette size={16} />
                  Text Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={`text-${color}`}
                      type="button"
                      onClick={() => updateForm({ textColor: color })}
                      style={{ backgroundColor: color }}
                      className={`w-7 h-7 rounded-full border border-slate-300 transition-transform ${
                        formData.textColor === color
                          ? "scale-110 ring-2 ring-brand-accent ring-offset-1"
                          : "hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Background Toggle & Color Selection */}
              <div className="pt-2 space-y-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold tracking-wider uppercase text-slate-600">
                    Text Background
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      updateForm({ hasBackground: !formData.hasBackground })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      formData.hasBackground
                        ? "bg-brand-accent"
                        : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.hasBackground
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {formData.hasBackground && (
                  <div className="pt-1 space-y-2">
                    <label className="text-xs font-medium text-slate-500">
                      Background Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={`bg-${color}`}
                          type="button"
                          onClick={() => updateForm({ bgColor: color })}
                          style={{ backgroundColor: color }}
                          className={`w-7 h-7 rounded-full border border-slate-300 transition-transform ${
                            formData.bgColor === color
                              ? "scale-110 ring-2 ring-brand-accent ring-offset-1"
                              : "hover:scale-105"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Position Controls */}
              <div className="pt-2 space-y-3 border-t border-slate-100">
                {/* Vertical Position */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider uppercase text-slate-600">
                    Vertical Position
                  </label>
                  <div className="flex gap-2">
                    {["top", "center", "bottom"].map((pos) => (
                      <button
                        key={`v-${pos}`}
                        type="button"
                        onClick={() => updateForm({ verticalPos: pos })}
                        className={`flex-1 py-1.5 text-xs font-medium capitalize rounded-lg border transition-all ${
                          formData.verticalPos === pos
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Horizontal Position */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider uppercase text-slate-600">
                    Horizontal Alignment
                  </label>
                  <div className="flex gap-2">
                    {["left", "center", "right"].map((pos) => (
                      <button
                        key={`h-${pos}`}
                        type="button"
                        onClick={() => updateForm({ horizontalPos: pos })}
                        className={`flex-1 py-1.5 text-xs font-medium capitalize rounded-lg border transition-all ${
                          formData.horizontalPos === pos
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isFormEmpty || isSubmitting}
              className="px-6 py-2.5 flex items-center gap-2 text-xs font-semibold text-white bg-brand-accent hover:bg-blue-600 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={15} />
              {isSubmitting ? "Uploading..." : "Share to Story"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStoryPage;
