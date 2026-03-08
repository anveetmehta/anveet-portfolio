import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const SITE_URL = 'https://anveet-portfolio.vercel.app';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Anveet Mehta';
  const pillar = searchParams.get('pillar') ?? '';
  const type = searchParams.get('type') ?? 'site';

  const isArticle = type === 'article';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#080e1c',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '-80px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            right: '-60px',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Dot grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '56px 72px',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Top row: pillar badge (articles) or site tagline */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            {isArticle && pillar ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(59,130,246,0.15)',
                  border: '1px solid rgba(59,130,246,0.35)',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  color: '#93c5fd',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {pillar}
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '14px',
                  letterSpacing: '0.05em',
                }}
              >
                {SITE_URL.replace('https://', '')}
              </div>
            )}
          </div>

          {/* Title */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                color: '#f1f5f9',
                fontSize: isArticle ? '52px' : '60px',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '900px',
                wordBreak: 'break-word',
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom: author + URL */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              paddingTop: '32px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                style={{
                  color: '#f1f5f9',
                  fontSize: '20px',
                  fontWeight: 600,
                }}
              >
                Anveet Mehta
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '15px',
                }}
              >
                Product Builder · Systems, Risk &amp; Compliance
              </div>
            </div>

            {isArticle && (
              <div
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '14px',
                  letterSpacing: '0.03em',
                }}
              >
                {SITE_URL.replace('https://', '')}
              </div>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.7), rgba(99,102,241,0.5), transparent)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
