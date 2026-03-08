'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

type ArticleShareButtonsProps = {
  title: string;
  slug: string;
  linkedinVersion?: string;
};

export function ArticleShareButtons({ title, slug, linkedinVersion }: ArticleShareButtonsProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [liCopied, setLiCopied] = useState(false);

  const url = `https://anveet-portfolio.vercel.app/writing/${slug}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }

  function copyLinkedIn() {
    if (!linkedinVersion) return;
    navigator.clipboard.writeText(linkedinVersion).then(() => {
      setLiCopied(true);
      setTimeout(() => setLiCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-medium uppercase tracking-wide text-foreground/40 mr-1">
        Share
      </span>

      {/* Share on LinkedIn */}
      <a
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-500/8 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-500/15 transition-colors dark:text-blue-400 dark:border-blue-400/40"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
        Share on LinkedIn
      </a>

      {/* Copy link */}
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
      >
        {linkCopied ? (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy link
          </>
        )}
      </button>

      {/* Copy LinkedIn post — only shown if linkedinVersion is populated */}
      {linkedinVersion && (
        <button
          onClick={copyLinkedIn}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
            liCopied
              ? 'bg-green-500/15 text-green-600 dark:text-green-400'
              : 'bg-accent/10 text-accent hover:bg-accent/20'
          )}
        >
          {liCopied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>📋 Copy LinkedIn post</>
          )}
        </button>
      )}
    </div>
  );
}
