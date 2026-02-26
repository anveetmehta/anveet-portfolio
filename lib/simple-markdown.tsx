import { type ReactNode } from 'react';

export function renderSimpleMarkdown(text: string): ReactNode[] {
  return text.split('\n').map((line, i) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} className="mt-6 mb-2 text-lg font-semibold text-foreground">
          {trimmed.slice(4)}
        </h3>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="mt-8 mb-3 text-xl font-semibold text-foreground">
          {trimmed.slice(3)}
        </h2>
      );
    }
    if (trimmed.startsWith('# ')) {
      return (
        <h1 key={i} className="mt-10 mb-4 text-2xl font-semibold text-foreground">
          {trimmed.slice(2)}
        </h1>
      );
    }
    if (trimmed.startsWith('- ')) {
      return (
        <li key={i} className="ml-5 list-disc text-foreground/80">
          {trimmed.slice(2)}
        </li>
      );
    }
    if (/^\d+\.\s/.test(trimmed)) {
      return (
        <li key={i} className="ml-5 list-decimal text-foreground/80">
          {trimmed.replace(/^\d+\.\s/, '')}
        </li>
      );
    }
    if (trimmed === '') {
      return <div key={i} className="h-3" />;
    }
    return (
      <p key={i} className="text-foreground/80 leading-relaxed">
        {trimmed}
      </p>
    );
  });
}
