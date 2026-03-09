import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from '@/components/ThemeProvider';
import { siteMeta } from '@/content/content';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: siteMeta.title,
    template: '%s | Anveet Mehta'
  },
  description: siteMeta.description,
  metadataBase: new URL('https://anveetmehta.com'),
  icons: {
    icon: '/favicon.svg'
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: 'https://anveetmehta.com',
    siteName: siteMeta.name,
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/api/og?title=Anveet+Mehta&type=site', width: 1200, height: 630, alt: siteMeta.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMeta.title,
    description: siteMeta.description,
    images: ['/api/og?title=Anveet+Mehta&type=site'],
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
