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
  metadataBase: new URL('https://anveet-portfolio.vercel.app'),
  icons: {
    icon: '/favicon.svg'
  },
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: 'https://anveet-portfolio.vercel.app',
    siteName: siteMeta.name,
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMeta.title,
    description: siteMeta.description
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
