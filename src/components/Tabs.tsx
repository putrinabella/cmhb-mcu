import { useState } from "react";
import useTabData from "@/hooks/use-tab-data";
import { LoadingIndicator } from "./LoadingIndicator";

interface TabItem {
  label: string;
  apiUrl?: string;
  content?: React.ReactNode; // bisa string, komponen, atau apapun
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
      className={`px-4 py-2 rounded-full text-sm transition focus:outline-none ${
        isActive
          ? "bg-primary text-primary-content shadow-md"
          : "text-base-content hover:bg-base-300 dark:bg-base-700 dark:text-base-200 dark:hover:bg-base-600"
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
      className=" bg-base-100 dark:bg-base-800 dark:border-base-700 text-base-content dark:text-base-200"
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
        // Hanya fetch data kalau apiUrl ada
        const { data, loading, error } = useTabData(
          activeTab === index && tab.apiUrl ? tab.apiUrl : null
        );

        return (
          <TabPanel
            key={index}
            isActive={activeTab === index}
            id={`tabpanel-${index}`}
            labelledBy={`tab-${index}`}
          >
            {tab.apiUrl ? (
              <>
                {loading && <LoadingIndicator />}
                {error && <p className="text-error">Error: {error.message}</p>}
                {data && (
                  <pre className="overflow-x-auto">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                )}
              </>
            ) : (
              tab.content || <p>Konten kosong</p>
            )}
          </TabPanel>
        );
      })}
    </div>
  );
}
