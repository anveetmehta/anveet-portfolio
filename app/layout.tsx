import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from '@/components/ThemeProvider';
import { siteMeta } from '@/content/content';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description
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
