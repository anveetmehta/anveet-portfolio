'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { FeaturesTab } from './FeaturesTab';
import { ContentTab } from './ContentTab';
import { IdeasTab } from './IdeasTab';
import { DomainsTab } from './DomainsTab';
import { RegtechTab } from './RegtechTab';

type Tab = 'ideas' | 'content' | 'features' | 'domains' | 'regtech';

const TAB_LABELS: Record<Tab, string> = {
  ideas: '💡 Ideas',
  content: 'Articles',
  features: 'Features',
  domains: '🧠 Domains',
  regtech: '📡 RegTech',
};

export function AdminTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('ideas');

  return (
    <div className="space-y-6">
      <div className="flex gap-1 rounded-xl border border-border bg-muted p-1 flex-wrap">
        {(['ideas', 'content', 'features', 'domains', 'regtech'] as Tab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors min-w-[80px]',
              activeTab === tab
                ? 'bg-card text-foreground shadow-sm'
                : 'text-foreground/60 hover:text-foreground'
            )}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {activeTab === 'ideas' && <IdeasTab onSwitchToArticles={() => setActiveTab('content')} />}
      {activeTab === 'content' && <ContentTab />}
      {activeTab === 'features' && <FeaturesTab />}
      {activeTab === 'domains' && <DomainsTab />}
      {activeTab === 'regtech' && <RegtechTab onSwitchToArticles={() => setActiveTab('content')} />}
    </div>
  );
}
