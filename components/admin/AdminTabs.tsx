'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { FeaturesTab } from './FeaturesTab';
import { ContentTab } from './ContentTab';
import { IdeasTab } from './IdeasTab';

type Tab = 'ideas' | 'content' | 'features';

const TAB_LABELS: Record<Tab, string> = {
  ideas: '💡 Ideas',
  content: 'Articles',
  features: 'Features',
};

export function AdminTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('ideas');

  return (
    <div className="space-y-6">
      <div className="flex gap-1 rounded-xl border border-border bg-muted p-1">
        {(['ideas', 'content', 'features'] as Tab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab
                ? 'bg-card text-foreground shadow-sm'
                : 'text-foreground/60 hover:text-foreground'
            )}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {activeTab === 'ideas' && <IdeasTab />}
      {activeTab === 'content' && <ContentTab />}
      {activeTab === 'features' && <FeaturesTab />}
    </div>
  );
}
