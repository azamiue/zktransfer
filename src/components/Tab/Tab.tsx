"use client";

import { motion } from "framer-motion";

type Props = {
  layoutId: string;
  activeTab: string;
  tabs: { id: string; label: string }[];
  onChange: (id: string) => void;
};

export function Tab({ tabs, layoutId, activeTab, onChange }: Props) {
  return (
    <>
      <h2 className="text-[32px] font-medium leading-[40px] mb-4">Overview</h2>

      <div className="flex space-x-2 z-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`${
              activeTab === tab.id
                ? ""
                : "hover:bg-gray-800 hover:text-white border border-solid border-black"
            } relative rounded-full px-7 py-3 text-sm font-medium outline-sky-400 transition focus-visible:outline-2 `}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 z-1 bg-white mix-blend-difference"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
}
