'use client';

import { AdminAuth } from '@/components/admin/AdminAuth';
import { AdminTabs } from '@/components/admin/AdminTabs';

export default function AdminPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-2xl font-semibold">Admin Control Center</h1>
        <p className="mt-2 text-sm text-foreground/70">
          Content pipeline, AI generation, and site controls.
        </p>
        <div className="mt-6">
          <AdminAuth>
            <AdminTabs />
          </AdminAuth>
        </div>
      </div>
    </div>
  );
}
