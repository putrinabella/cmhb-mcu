import { useState } from "react";
import useTabData from "@/hooks/use-tab-data";

interface TabItem {
  label: string;
  apiUrl: string;
}

interface TabsProps {
  tabs: TabItem[];
}

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  id: string;
  controls: string;
  children: React.ReactNode;
}

function Tab({ isActive, onClick, id, controls, children }: TabButtonProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={controls}
      id={id}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition ${
        isActive
          ? "bg-gradient-to-r from-purple-300 to-blue-300 shadow-2xs"
          : "text-gray-700 hover:bg-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

interface TabPanelProps {
  isActive: boolean;
  id: string;
  labelledBy: string;
  children: React.ReactNode;
}

function TabPanel({ isActive, id, labelledBy, children }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      id={id}
      aria-labelledby={labelledBy}
      hidden={!isActive}
      className="p-4 border rounded-lg bg-gray-50"
    >
      {children}
    </div>
  );
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div>
      <div role="tablist" className="flex gap-2 mb-4">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
            id={`tab-${index}`}
            controls={`tabpanel-${index}`}
          >
            {tab.label}
          </Tab>
        ))}
      </div>

      {tabs.map((tab, index) => {
        // Gunakan hook useTabData, aktifkan hanya untuk tab saat ini
        const { data, loading, error } = useTabData(
          activeTab === index ? tab.apiUrl : null
        );

        return (
          <TabPanel
            key={index}
            isActive={activeTab === index}
            id={`tabpanel-${index}`}
            labelledBy={`tab-${index}`}
          >
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
          </TabPanel>
        );
      })}
    </div>
  );
}
