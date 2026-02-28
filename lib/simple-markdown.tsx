import { type ReactNode } from 'react';
import { MediaEmbed } from '@/components/MediaEmbed';

/**
 * Parse inline formatting: **bold**, *italic*, `code`, [link](url)
 */
function parseInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      parts.push(<strong key={key++} className="font-semibold text-foreground">{parseInline(boldMatch[1])}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Italic: *text*
    const italicMatch = remaining.match(/^\*(.+?)\*/);
    if (italicMatch) {
      parts.push(<em key={key++}>{parseInline(italicMatch[1])}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Inline code: `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code key={key++} className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground/90">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Link: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a key={key++} href={linkMatch[2]} className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent" target="_blank" rel="noopener noreferrer">
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Plain character — collect until next special char
    const nextSpecial = remaining.slice(1).search(/[\*`\[]/);
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    } else {
      parts.push(remaining.slice(0, nextSpecial + 1));
      remaining = remaining.slice(nextSpecial + 1);
    }
  }

  return parts;
}

export function renderSimpleMarkdown(text: string): ReactNode[] {
  const lines = text.split('\n');
  const elements: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code block: ```
    if (trimmed.startsWith('```')) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre key={elements.length} className="my-4 overflow-x-auto rounded-xl border border-border/50 bg-muted/60 p-4">
          <code className="text-sm font-mono text-foreground/85 leading-relaxed">
            {codeLines.join('\n')}
          </code>
        </pre>
      );
      continue;
    }

    // Image/media: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      elements.push(
        <MediaEmbed key={elements.length} alt={imgMatch[1]} src={imgMatch[2]} caption={imgMatch[1] || undefined} />
      );
      i++;
      continue;
    }

    // Horizontal rule: ---
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      elements.push(
        <hr key={elements.length} className="my-8 h-px border-0 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      );
      i++;
      continue;
    }

    // Blockquote: > text
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <blockquote key={elements.length} className="my-4 border-l-4 border-accent/40 pl-4 italic text-foreground/70">
          {quoteLines.map((ql, qi) => (
            <p key={qi} className="leading-relaxed">{parseInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={elements.length} className="mt-6 mb-2 text-lg font-semibold text-foreground">
          {parseInline(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={elements.length} className="mt-8 mb-3 text-xl font-semibold text-foreground">
          {parseInline(trimmed.slice(3))}
        </h2>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={elements.length} className="mt-10 mb-4 text-2xl font-semibold text-foreground">
          {parseInline(trimmed.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // Unordered list: - text
    if (trimmed.startsWith('- ')) {
      elements.push(
        <li key={elements.length} className="ml-5 list-disc text-foreground/80">
          {parseInline(trimmed.slice(2))}
        </li>
      );
      i++;
      continue;
    }

    // Ordered list: 1. text
    if (/^\d+\.\s/.test(trimmed)) {
      elements.push(
        <li key={elements.length} className="ml-5 list-decimal text-foreground/80">
          {parseInline(trimmed.replace(/^\d+\.\s/, ''))}
        </li>
      );
      i++;
      continue;
    }

    // Empty line
    if (trimmed === '') {
      elements.push(<div key={elements.length} className="h-3" />);
      i++;
      continue;
    }

    // Default: paragraph with inline formatting
    elements.push(
      <p key={elements.length} className="text-foreground/80 leading-relaxed">
        {parseInline(trimmed)}
      </p>
    );
    i++;
  }

  return elements;
}
