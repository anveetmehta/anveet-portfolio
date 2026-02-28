import { cn } from '@/lib/cn';

type MediaEmbedProps = {
  src: string;
  alt?: string;
  caption?: string;
  type?: 'image' | 'gif' | 'youtube' | 'vimeo';
  className?: string;
};

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

function detectType(src: string): MediaEmbedProps['type'] {
  if (src.match(/youtube\.com|youtu\.be/)) return 'youtube';
  if (src.match(/vimeo\.com/)) return 'vimeo';
  if (src.match(/\.gif(\?|$)/i)) return 'gif';
  return 'image';
}

export function MediaEmbed({ src, alt, caption, type, className }: MediaEmbedProps) {
  const resolvedType = type ?? detectType(src);

  if (resolvedType === 'youtube') {
    const videoId = getYouTubeId(src);
    if (!videoId) return null;
    return (
      <figure className={cn('my-6', className)}>
        <div className="relative overflow-hidden rounded-xl border border-border/50" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={alt ?? 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        {caption && <figcaption className="mt-2 text-center text-sm text-foreground/50">{caption}</figcaption>}
      </figure>
    );
  }

  if (resolvedType === 'vimeo') {
    const videoId = getVimeoId(src);
    if (!videoId) return null;
    return (
      <figure className={cn('my-6', className)}>
        <div className="relative overflow-hidden rounded-xl border border-border/50" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={`https://player.vimeo.com/video/${videoId}`}
            title={alt ?? 'Vimeo video'}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        {caption && <figcaption className="mt-2 text-center text-sm text-foreground/50">{caption}</figcaption>}
      </figure>
    );
  }

  // Image or GIF
  return (
    <figure className={cn('my-6', className)}>
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className="w-full rounded-xl border border-border/50 shadow-sm"
      />
      {caption && <figcaption className="mt-2 text-center text-sm text-foreground/50">{caption}</figcaption>}
    </figure>
  );
}
