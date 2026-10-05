'use client';

import React from 'react';

export type FlyonTabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

interface FlyonTabsProps {
  tabs: FlyonTabItem[];
  defaultTabId?: string;
}

export default function FlyonTabs({ tabs, defaultTabId }: FlyonTabsProps) {
  const activeTabId = defaultTabId || tabs[0]?.id;

  return (
    <div>
      <div className="border-b border-base-300">
        <nav className="tabs tabs-bordered flex space-x-4 overflow-x-auto" role="tablist" data-tabs>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                className={`tab tab-border py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium whitespace-nowrap text-base-content/70 hover:text-primary ${
                  isActive ? 'tab-active border-primary text-primary font-semibold' : ''
                }`}
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                data-tab={`#tab-panel-${tab.id}`}
                aria-controls={`tab-panel-${tab.id}`}
                role="tab"
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-4">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              id={`tab-panel-${tab.id}`}
              className={isActive ? 'block' : 'hidden'}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
