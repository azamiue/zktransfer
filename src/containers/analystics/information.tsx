"use client";

import { useData } from "@/app/(landing-page)/analytics/data";
import { Tab } from "@/components/Tab/Tab";
import { useState } from "react";
import Analytics from "./component/Analytics";
import Overview from "./component/Overview";

const TABS = [
  { id: "Today", label: "Today" },
  { id: "Week", label: "Week" },
  { id: "Month", label: "Month" },
];

export function Information() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const { data, error, isLoading } = useData({ type: activeTab });

  return (
    <div className="mb-[32px]">
      <div className="p-[40px] bg-white border-b border-[#E1E2E2]">
        <Tab
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={TABS}
          layoutId="Overview"
        />
      </div>

      <Overview data={data} isLoading={isLoading} />

      <Analytics
        data={data?.dataAnalytics?.data}
        isLoading={isLoading}
        activeTab={activeTab}
      />
    </div>
  );
}
