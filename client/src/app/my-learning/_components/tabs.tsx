"use client";
import React, { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("courses");
  const tabs = [
    "All",
    "Courses",
    "Wishlist",
    "Completed",
    "In Progress",
    "Archived",
  ];
  return (
    <nav className="border-b md:border-none">
      <div className="flex items-center md:justify-center overflow-x-auto scrollbar-hide px-4 gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 px-1 whitespace-nowrap text-sm font-medium transition-colors relative flex-shrink-0 ${
              activeTab === tab
                ? "text-teal-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
