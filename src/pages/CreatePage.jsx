import React, { useState } from "react";
import { Grid3x3, SquarePlay, Sparkles } from "lucide-react";
import Post from "../components/content/Post";
import Reel from "../components/content/Reel";

const CreatePage = () => {
  // ---- UseStates ----
  const [activeTab, setActiveTab] = useState("post");

  // ---- Tabs Config ----
  const navigation_tabs = [
    {
      key: "post",
      icon: Grid3x3,
      label: "Posts",
    },
    {
      key: "reel",
      icon: SquarePlay,
      label: "Reels",
    },
  ];

  return (
    <div className="px-4 py-6 mx-auto max-w-3xl">
      {/* Page Header */}
      <div className="space-y-1">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold tracking-tight text-heading-text">
            Create Your Content
          </h1>
          <Sparkles size={20} className="animate-pulse text-brand-accent" />
        </div>
        <p className="text-sm text-subtext">
          Share new updates, photos, or short videos with your audience.
        </p>
      </div>

      <hr className="my-6 border-border-color" />

      {/* Navigation Segment Control */}
      <div className="flex justify-center my-6 w-full">
        <div className="inline-flex p-1 w-full max-w-sm rounded-xl border bg-slate-100 border-slate-200/80">
          {navigation_tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-white shadow-sm text-brand-accent"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.25 : 1.75} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Tab Content */}
      <div className="mt-6">
        {activeTab === "post" && <Post />}
        {activeTab === "reel" && <Reel />}
      </div>
    </div>
  );
};

export default CreatePage;
