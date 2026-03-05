'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/cn';

export type ToastState = {
  message: string;
  type: 'success' | 'error';
} | null;

type ToastProps = {
  toast: ToastState;
  onDismiss: () => void;
};

export function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-lg transition-all',
        toast.type === 'success'
          ? 'bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400'
          : 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400'
      )}
    >
      <span>{toast.type === 'success' ? '✓' : '✕'}</span>
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="ml-2 opacity-50 hover:opacity-100"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
